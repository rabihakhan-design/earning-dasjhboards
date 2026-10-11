import { createFileRoute } from "@tanstack/react-router";
import pageImg from "@/assets/privacy-security.jpg";
import Page from "../components/site/Page";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — ME-QR" },
      { name: "description", content: "How ME-QR collects, uses and protects your data." },
      { property: "og:title", content: "Privacy Policy — ME-QR" },
      { property: "og:description", content: "How ME-QR collects, uses and protects your data." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Privacy,
});

function Privacy() {
  return (
    <Page image={pageImg} title="Privacy Policy" lead="Sample text for this demo — replace it with your own policy before going live.">
      <div className="card pad legal">
        <h3>What we collect</h3>
        <p className="muted">
          We collect the information you give us directly: your email address when you create an account, and the content you put
          into your QR codes (links, text, WiFi names). Saved codes in the free generator are stored only in your own browser.
        </p>
        <h3>How we use it</h3>
        <p className="muted">
          Your data is used to provide the service: generating codes, showing your scan statistics and managing your account. We
          never sell your data to third parties.
        </p>
        <h3>Scan statistics</h3>
        <p className="muted">
          When someone scans a dynamic code, we record the time, an approximate location (city level) and the device type. This
          data is shown only to the code's owner.
        </p>
        <h3>Cookies</h3>
        <p className="muted">
          We use essential cookies to keep you signed in and remember your preferences. Analytics cookies are optional and can be
          disabled.
        </p>
        <h3>Your rights</h3>
        <p className="muted">
          You can export or delete your data at any time from your account settings, or by contacting us. Deleting your account
          removes all your codes and statistics within 30 days.
        </p>
        <h3>Contact</h3>
        <p className="muted">Questions about privacy? Write to privacy@me-qr.example.</p>
      </div>
    </Page>
  );
}
