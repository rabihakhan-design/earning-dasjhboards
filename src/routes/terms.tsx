import { createFileRoute } from "@tanstack/react-router";
import pageImg from "@/assets/privacy-security.jpg";
import Page from "../components/site/Page";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions — ME-QR" },
      { name: "description", content: "The terms that govern your use of ME-QR." },
      { property: "og:title", content: "Terms & Conditions — ME-QR" },
      { property: "og:description", content: "The terms that govern your use of ME-QR." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Terms,
});

function Terms() {
  return (
    <Page image={pageImg} title="Terms & Conditions" lead="Sample text for this demo — replace it with your own terms before going live.">
      <div className="card pad legal">
        <h3>1. The service</h3>
        <p className="muted">
          Me-QR provides an online tool to create, customize and manage QR codes. Free static codes are provided as-is; dynamic
          codes and analytics require a paid plan.
        </p>
        <h3>2. Your content</h3>
        <p className="muted">
          You are responsible for the content your codes link to. Do not use the service for phishing, malware, illegal content or
          spam. We may disable codes that violate these terms.
        </p>
        <h3>3. Accounts</h3>
        <p className="muted">
          Keep your login details safe. You are responsible for activity under your account. One person or company per account
          unless your plan allows team members.
        </p>
        <h3>4. Payments</h3>
        <p className="muted">
          Paid plans are billed monthly and renew automatically. You can cancel anytime; the plan stays active until the end of
          the billing period. Refunds are handled case by case.
        </p>
        <h3>5. Availability</h3>
        <p className="muted">
          We aim for 99.9% uptime but cannot guarantee uninterrupted service. We are not liable for losses caused by downtime or
          by codes printed with incorrect content.
        </p>
        <h3>6. Changes</h3>
        <p className="muted">
          We may update these terms. Continued use after a change means you accept the new terms. Major changes are announced by
          email.
        </p>
      </div>
    </Page>
  );
}
