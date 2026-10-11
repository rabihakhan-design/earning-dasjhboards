import { createFileRoute } from "@tanstack/react-router";
import Dashboard from "@/components/admin/Dashboard";
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Earnings Dashboard | Super Admin" },
      {
        name: "description",
        content:
          "Company activity, driver totals, invoice usage and payment status in the Earnings Dashboard.",
      },
      { property: "og:title", content: "Earnings Dashboard | Super Admin" },
      {
        property: "og:description",
        content: "An overview of company operations and invoice performance.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Dashboard,
});
