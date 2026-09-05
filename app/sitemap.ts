import type { MetadataRoute } from "next";
import { jobs } from "@/lib/jobs";
import { projects, services, site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/about",
    "/services",
    "/work",
    "/how-we-work",
    "/careers",
    "/careers/apply",
    "/contact",
    "/privacy",
    "/terms",
  ];
  return [
    ...routes.map((path) => ({
      url: `${site.url}${path}`,
      lastModified: new Date(),
    })),
    ...services.map((service) => ({
      url: `${site.url}/services/${service.slug}`,
      lastModified: new Date(),
    })),
    ...projects.map((project) => ({
      url: `${site.url}/work/${project.slug}`,
      lastModified: new Date(),
    })),
    ...jobs.map((job) => ({
      url: `${site.url}/careers/${job.slug}`,
      lastModified: new Date(),
    })),
  ];
}
