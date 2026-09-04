import type { MetadataRoute } from "next";
import { jobs } from "@/lib/jobs";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/about", "/services", "/work", "/careers", "/careers/apply", "/contact", "/privacy", "/terms"];
  return [
    ...routes.map((path) => ({
      url: `${site.url}${path}`,
      lastModified: new Date(),
    })),
    ...jobs.map((job) => ({
      url: `${site.url}/careers/${job.slug}`,
      lastModified: new Date(),
    })),
  ];
}
