import { createFileRoute } from "@tanstack/react-router";
import CompanyUsage from "@/components/admin/CompanyUsage";
export const Route = createFileRoute("/company-usage")({
  head: () => ({
    meta: [
      { title: "Company Usage | Earnings Dashboard" },
      { name: "description", content: "Review company invoice activity and payment performance." },
      { property: "og:title", content: "Company Usage | Earnings Dashboard" },
      {
        property: "og:description",
        content: "Review company invoice activity and payment performance.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CompanyUsage,
});
