import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import pageImg from "@/assets/support-team.jpg";
import Page from "../components/site/Page";

export const Route = createFileRoute("/support")({
  head: () => ({
    meta: [
      { title: "Support and FAQ — ME-QR" },
      { name: "description", content: "Search the answers, browse the guides, or contact us — support within one business day." },
      { property: "og:title", content: "Support and FAQ — ME-QR" },
      { property: "og:description", content: "Guides, instructions and answers to common questions." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Support,
});

const qa: Array<[string, string]> = [
  ["Is QR code free?", "Yes, creating a static QR code is completely free — no account, no watermark, no expiry."],
  ["When will my QR code expire?", "Static codes never expire. Dynamic codes stay active while your plan is active."],
  ["How do I create a QR code for my restaurant menu?", "Put your menu PDF or page online, paste its link in the URL type, style the code and download it. Print it on a table card and guests can scan it with any phone camera."],
  ["Can I change the link after printing?", "Yes — with a dynamic code (Pro plan). The printed code stays the same; only the destination changes in your dashboard."],
  ["Which formats can I download?", "PNG for screens and social media, and SVG for print at any size without losing sharpness."],
  ["Can I add my logo to the code?", "Yes. Upload your logo in the generator — error correction automatically rises to the highest level so the code still scans perfectly."],
  ["Do QR codes work without internet?", "The code itself always scans. Opening a link needs internet, but Text and WiFi types work fully offline."],
  ["What size should I print my QR code?", "At least 2 × 2 cm for close-range scanning (business cards, packaging) and bigger for distance — roughly 1/10 of the scanning distance."],
  ["Can I track how many people scanned my code?", "Yes. Dynamic codes record scan counts, approximate locations and device types in your dashboard."],
  ["Where are my saved codes stored?", "In this browser only, under My QR codes. Create an account to sync them across devices."],
];

const guides = [
  ["📖", "Getting started", "Create, style and download your first QR code in under two minutes."],
  ["🍽", "QR menus for restaurants", "From menu PDF to table card — the complete setup guide."],
  ["📶", "Share WiFi with a scan", "Let guests join your network without typing a password."],
  ["🖨", "Printing best practices", "Sizes, contrast and materials that always scan."],
];

function Support() {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState<number | null>(0);
  const list = qa.filter(([a, b]) => (a + b).toLowerCase().includes(q.toLowerCase()));
  return (
    <Page image={pageImg} title="Support and FAQ" lead="Search the answers below, browse the guides, or contact us.">
      <h2>Popular guides</h2>
      <div className="grid4">
        {guides.map(([i, t, d]) => (
          <article className="card pad" key={t}>
            <div className="cicon">{i}</div>
            <h3>{t}</h3>
            <p className="muted">{d}</p>
          </article>
        ))}
      </div>
      <h2>Frequently asked questions</h2>
      <input
        className="search"
        placeholder="Search questions"
        aria-label="Search questions"
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />
      {list.length === 0 && (
        <p className="muted">
          No match. <Link to="/contact"><u>Contact us</u></Link> instead.
        </p>
      )}
      {list.map(([a, b], i) => (
        <div className="faq" key={a}>
          <button onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i}>
            {a}
            <span className={open === i ? "rot" : ""}>⌄</span>
          </button>
          {open === i && <p>{b}</p>}
        </div>
      ))}
      <div className="card pad ok center-card">
        <h3>Still stuck?</h3>
        <p className="muted">Our support team answers within one business day.</p>
        <Link className="btn primary" to="/contact">
          Contact support
        </Link>
      </div>
    </Page>
  );
}
