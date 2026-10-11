import { createFileRoute } from "@tanstack/react-router";
import Companies from "@/components/admin/Companies";
export const Route = createFileRoute("/companies")({
  head: () => ({
    meta: [
      { title: "Companies | Earnings Dashboard" },
      {
        name: "description",
        content: "Manage logistics companies and view their driver counts and account status.",
      },
      { property: "og:title", content: "Companies | Earnings Dashboard" },
      {
        property: "og:description",
        content: "Manage logistics companies and view their driver counts and account status.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Companies,
});
