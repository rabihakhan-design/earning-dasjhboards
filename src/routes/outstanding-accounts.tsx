import { createFileRoute } from "@tanstack/react-router";
import OutstandingAccounts from "@/components/admin/OutstandingAccounts";
export const Route = createFileRoute("/outstanding-accounts")({
  head: () => ({
    meta: [
      { title: "Outstanding Accounts | Earnings Dashboard" },
      {
        name: "description",
        content: "Review companies with outstanding balances and overdue payments.",
      },
      { property: "og:title", content: "Outstanding Accounts | Earnings Dashboard" },
      {
        property: "og:description",
        content: "Review companies with outstanding balances and overdue payments.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: OutstandingAccounts,
});
