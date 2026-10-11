import { createFileRoute } from "@tanstack/react-router";
import Invoices from "@/components/admin/Invoices";
export const Route = createFileRoute("/invoices")({
  head: () => ({
    meta: [
      { title: "Invoices | Earnings Dashboard" },
      {
        name: "description",
        content: "Review monthly invoices, payment statuses and outstanding balances.",
      },
      { property: "og:title", content: "Invoices | Earnings Dashboard" },
      {
        property: "og:description",
        content: "Review monthly invoices, payment statuses and outstanding balances.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Invoices,
});
