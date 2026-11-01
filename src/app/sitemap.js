import { SITE_URL } from "@/utility/site-config";

export default function sitemap() {
  return [
    {
      url: SITE_URL,
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
