import "server-only";
import path from "path";
import { firestore } from "./firebase";

const MAX_BYTES = 8 * 1024 * 1024;
const CHUNK_BYTES = 700_000;
const RESUME_COLLECTION = "resume_files";
const ALLOWED_EXT = new Set([".pdf", ".doc", ".docx", ".rtf", ".odt", ".txt"]);
const ALLOWED_MIME = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/rtf",
  "text/rtf",
  "application/vnd.oasis.opendocument.text",
  "text/plain",
  "application/octet-stream",
]);

function extensionOf(filename: string) {
  return path.extname(filename).toLowerCase();
}

function safeBase(filename: string) {
  return path
    .basename(filename)
    .replace(/[^a-zA-Z0-9._-]/g, "_")
    .slice(0, 80);
}

function toBuffer(value: unknown) {
  if (Buffer.isBuffer(value)) return value;
  if (value instanceof Uint8Array) return Buffer.from(value);
  if (value && typeof value === "object" && "toBuffer" in value && typeof value.toBuffer === "function") {
    return (value as { toBuffer: () => Buffer }).toBuffer();
  }
  throw new Error("Invalid resume chunk");
}

export async function saveResume(file: File) {
  if (file.size <= 0) {
    throw new Error("Resume file is empty");
  }
  if (file.size > MAX_BYTES) {
    throw new Error("Resume must be 8MB or smaller");
  }
  const ext = extensionOf(file.name);
  if (!ALLOWED_EXT.has(ext)) {
    throw new Error("Upload a PDF, Word, RTF, ODT, or TXT resume");
  }
  if (file.type && !ALLOWED_MIME.has(file.type)) {
    throw new Error("That resume file type is not allowed");
  }

  const storedName = `${Date.now()}-${crypto.randomUUID()}${ext}`;
  const storedPath = `${RESUME_COLLECTION}/${storedName}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  const mime = file.type || "application/octet-stream";
  const originalName = safeBase(file.name) || `resume${ext}`;
  const chunkCount = Math.max(1, Math.ceil(buffer.length / CHUNK_BYTES));
  const fileRef = (await firestore()).collection(RESUME_COLLECTION).doc(storedName);

  await fileRef.set({
    originalName,
    mime,
    size: file.size,
    chunkCount,
    created_at: new Date(),
  });

  const writes = [];
  for (let index = 0; index < chunkCount; index += 1) {
    const start = index * CHUNK_BYTES;
    writes.push(
      fileRef.collection("chunks").doc(String(index)).set({
        index,
        data: buffer.subarray(start, start + CHUNK_BYTES),
      }),
    );
  }
  await Promise.all(writes);

  return {
    originalName,
    storedName,
    mime,
    size: file.size,
    storedPath,
  };
}

export async function readResume(storedPath: string) {
  const prefix = `${RESUME_COLLECTION}/`;
  if (!storedPath.startsWith(prefix) || storedPath.includes("..")) {
    throw new Error("Invalid resume path");
  }
  const storedName = storedPath.slice(prefix.length);
  const fileRef = (await firestore()).collection(RESUME_COLLECTION).doc(storedName);
  const meta = await fileRef.get();
  if (!meta.exists) {
    throw new Error("Resume file is missing");
  }
  const chunkCount = Number(meta.data()?.chunkCount ?? 0);
  const parts: Buffer[] = [];
  for (let index = 0; index < chunkCount; index += 1) {
    const chunk = await fileRef.collection("chunks").doc(String(index)).get();
    if (!chunk.exists) throw new Error("Resume file is missing");
    parts.push(toBuffer(chunk.data()?.data));
  }
  return Buffer.concat(parts);
}
