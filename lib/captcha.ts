import "server-only";
import { serverConfig } from "@/lib/server-config";

const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
const CODE_LENGTH = 5;
const TTL_MS = 10 * 60 * 1000;

const usedTokens = globalThis as typeof globalThis & {
  captchaUsed?: Map<string, number>;
};

function used() {
  if (!usedTokens.captchaUsed) usedTokens.captchaUsed = new Map();
  return usedTokens.captchaUsed;
}

function pruneUsed() {
  const now = Date.now();
  for (const [token, exp] of used()) {
    if (exp <= now) used().delete(token);
  }
}

function encoder() {
  return new TextEncoder();
}

function toBase64Url(bytes: ArrayBuffer | Uint8Array) {
  const view = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  let binary = "";
  for (const byte of view) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function fromBase64Url(value: string) {
  const padded = value.replace(/-/g, "+").replace(/_/g, "/") + "===".slice((value.length + 3) % 4);
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

function timingSafeEqualString(left: string, right: string) {
  const leftBytes = encoder().encode(left);
  const rightBytes = encoder().encode(right);
  const length = Math.max(leftBytes.length, rightBytes.length, 1);
  const a = new Uint8Array(length);
  const b = new Uint8Array(length);
  a.set(leftBytes);
  b.set(rightBytes);
  let mismatch = leftBytes.length === rightBytes.length ? 0 : 1;
  for (let i = 0; i < length; i += 1) mismatch |= a[i] ^ b[i];
  return mismatch === 0;
}

async function sign(value: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder().encode(serverConfig.admin.sessionSecret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder().encode(value));
  return toBase64Url(signature);
}

function randomInt(max: number) {
  return crypto.getRandomValues(new Uint32Array(1))[0] % max;
}

function randomCode() {
  let code = "";
  for (let i = 0; i < CODE_LENGTH; i += 1) code += ALPHABET[randomInt(ALPHABET.length)];
  return code;
}

function renderSvg(code: string, filterId: string) {
  const fills = ["#fff4c8", "#f5d06a", "#e8b84a", "#f6e7b2"];
  const letters = [...code]
    .map((char, index) => {
      const x = 36 + index * 58;
      const y = 72 + randomInt(14) - 7;
      const rotate = randomInt(32) - 16;
      const size = 44 + randomInt(10);
      const fill = fills[randomInt(fills.length)];
      return `<text x="${x}" y="${y}" transform="rotate(${rotate} ${x} ${y})" font-size="${size}" font-family="Georgia, 'Times New Roman', serif" font-weight="700" fill="${fill}" filter="url(#glow-${filterId})">${char}</text>`;
    })
    .join("");
  const decoys = Array.from({ length: 4 }, () => {
    const char = ALPHABET[randomInt(ALPHABET.length)];
    const x = 20 + randomInt(300);
    const y = 24 + randomInt(64);
    const rotate = randomInt(50) - 25;
    return `<text x="${x}" y="${y}" transform="rotate(${rotate} ${x} ${y})" font-size="${16 + randomInt(10)}" font-family="Georgia, serif" fill="rgba(232,184,74,0.18)">${char}</text>`;
  }).join("");
  const streaks = Array.from({ length: 7 }, () => {
    const y = 12 + randomInt(84);
    return `<path d="M${8 + randomInt(20)} ${y} C ${80 + randomInt(40)} ${y + randomInt(18) - 9}, ${180 + randomInt(40)} ${y + randomInt(16) - 8}, ${320 - randomInt(16)} ${y + randomInt(12) - 6}" fill="none" stroke="rgba(245,208,106,0.22)" stroke-width="${1 + randomInt(2)}"/>`;
  }).join("");
  const dots = Array.from({ length: 28 }, () => {
    return `<circle cx="${randomInt(340)}" cy="${randomInt(108)}" r="${0.6 + randomInt(2) / 2}" fill="rgba(255,244,200,${(18 + randomInt(30)) / 100})"/>`;
  }).join("");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="340" height="108" viewBox="0 0 340 108" role="img" aria-label="Verification image">
  <defs>
    <linearGradient id="bg-${filterId}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1a140c"/>
      <stop offset="45%" stop-color="#0c0b10"/>
      <stop offset="100%" stop-color="#24180c"/>
    </linearGradient>
    <filter id="grain-${filterId}">
      <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="4" stitchTiles="stitch"/>
      <feColorMatrix type="saturate" values="0"/>
      <feComponentTransfer><feFuncA type="table" tableValues="0 0.55"/></feComponentTransfer>
      <feBlend in="SourceGraphic" mode="overlay"/>
    </filter>
    <filter id="warp-${filterId}">
      <feTurbulence type="turbulence" baseFrequency="0.018" numOctaves="2" result="t"/>
      <feDisplacementMap in="SourceGraphic" in2="t" scale="6" xChannelSelector="R" yChannelSelector="G"/>
    </filter>
    <filter id="glow-${filterId}">
      <feDropShadow dx="0" dy="1" stdDeviation="0.8" flood-color="#e8b84a" flood-opacity="0.35"/>
    </filter>
    <clipPath id="frame-${filterId}"><rect width="340" height="108" rx="0"/></clipPath>
  </defs>
  <g clip-path="url(#frame-${filterId})">
    <rect width="340" height="108" fill="url(#bg-${filterId})"/>
    <rect width="340" height="108" filter="url(#grain-${filterId})" opacity="0.35"/>
    <text x="16" y="22" font-size="9" letter-spacing="3" font-family="ui-sans-serif, system-ui" fill="rgba(232,184,74,0.28)">LOOTRUSHS VERIFY</text>
    <g filter="url(#warp-${filterId})">${decoys}${streaks}${letters}</g>
    ${dots}
    <rect x="0" y="0" width="340" height="108" fill="none" stroke="rgba(232,184,74,0.18)"/>
  </g>
</svg>`;
}

function normalizeAnswer(value: string) {
  return value.replace(/\s+/g, "").toUpperCase();
}

export async function createCaptcha() {
  pruneUsed();
  const code = randomCode();
  const nonce = crypto.randomUUID();
  const exp = Date.now() + TTL_MS;
  const payload = toBase64Url(encoder().encode(JSON.stringify({ exp, nonce })));
  const token = `${payload}.${await sign(`${code}:${exp}:${nonce}`)}`;
  const svg = renderSvg(code, nonce.slice(0, 8));
  return { token, image: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}` };
}

export async function verifyCaptcha(token: string, answer: string) {
  pruneUsed();
  if (!token || !answer) throw new Error("Complete the captcha");

  const [payloadPart, signature] = token.split(".");
  if (!payloadPart || !signature) throw new Error("Captcha failed, try again");
  if (used().has(token)) throw new Error("Captcha expired, try a new code");

  let payload: { exp?: number; nonce?: string };
  try {
    payload = JSON.parse(new TextDecoder().decode(fromBase64Url(payloadPart))) as { exp?: number; nonce?: string };
  } catch {
    throw new Error("Captcha failed, try again");
  }

  if (!payload.exp || !payload.nonce || payload.exp < Date.now()) {
    throw new Error("Captcha expired, try a new code");
  }

  const expected = await sign(`${normalizeAnswer(answer)}:${payload.exp}:${payload.nonce}`);
  used().set(token, payload.exp);
  if (!timingSafeEqualString(expected, signature)) {
    throw new Error("Captcha failed, try again");
  }
}
