import "server-only";
import { insertApplication, type ApplicationRow } from "./applications";
import { saveResume } from "./resumes";

export type SubmitApplicationInput = {
  role: string;
  roleSlug: string | null;
  engagement: string | null;
  fullName: string;
  email: string;
  location: string | null;
  linkedin: string | null;
  github: string | null;
  portfolio: string | null;
  message: string;
  resume: File;
};

export async function submitApplication(input: SubmitApplicationInput): Promise<ApplicationRow> {
  const saved = await saveResume(input.resume);
  return insertApplication({
    role: input.role,
    roleSlug: input.roleSlug,
    engagement: input.engagement,
    fullName: input.fullName,
    email: input.email,
    location: input.location,
    linkedin: input.linkedin,
    github: input.github,
    portfolio: input.portfolio,
    message: input.message,
    resumeOriginalName: saved.originalName,
    resumeStoredName: saved.storedName,
    resumeMime: saved.mime,
    resumeSize: saved.size,
    resumePath: saved.storedPath,
  });
}

export { getApplication, listApplications, type ApplicationRow } from "./applications";
export { readResume } from "./resumes";
