import type { Metadata } from "next";
import { ApplyForm } from "@/components/ApplyForm";
import { Photo } from "@/components/Photo";
import { media, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Open application",
  description: `Apply to ${site.name} even if you do not see a matching role.`,
};

export default function OpenApplyPage() {
  return (
    <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:py-20">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">Careers</p>
        <h1 className="mt-3 font-display text-4xl md:text-6xl">Open application</h1>
        <p className="mt-5 max-w-md text-muted">
          Tell us what you want to build and whether you want full-time, part-time, or advisory.
          You apply to Lootrushs; we match qualified people to client projects. Your application
          is stored privately.
        </p>
        <Photo src={media.careers} alt="Lootrushs hiring" className="mt-10 aspect-[16/11] rounded-3xl" />
        <ul className="mt-8 space-y-3 text-sm leading-6 text-muted">
          <li>You apply to Lootrushs, or a client can introduce you to us</li>
          <li>After our hiring process you may interview with the client</li>
          <li>If hired, you work through Lootrushs on that client’s product</li>
        </ul>
      </div>
      <ApplyForm role="Open application" roleSlug="open-application" />
    </div>
  );
}
