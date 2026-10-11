import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import Page from "../components/site/Page";
import heroPhoto from "../assets/qr-restaurant-real.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Why Me-QR? — ME-QR" },
      { name: "description", content: "One place to create, style and manage every QR code your business uses — free to start." },
      { property: "og:title", content: "Why Me-QR?" },
      { property: "og:description", content: "One place to create, style and manage every QR code your business uses." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: About,
});

function About() {
  const items = [
    ["Dynamic codes", "Change where a printed code points without reprinting it. Update your menu, offer or link anytime."],
    ["Scan statistics", "See how many people scanned, when, from which city, and on which device."],
    ["Your own style", "Pick colors, add your logo and download in PNG or SVG — codes that match your brand."],
    ["Many QR types", "Links, text, WiFi, WhatsApp, email, phone, YouTube and more — one tool for every need."],
    ["Free to start", "Create and customize unlimited static codes without paying anything."],
    ["Made for print and screen", "High error correction keeps codes scannable on posters, packaging and business cards."],
  ];
  const steps = [
    ["1", "Pick a type", "Choose what your code should open — a website, menu, WiFi, WhatsApp chat or plain text."],
    ["2", "Add your content", "Paste the link or type the text. The live preview updates instantly as you type."],
    ["3", "Style it", "Set your brand colors and place your logo in the center of the code."],
    ["4", "Download & share", "Export a sharp PNG for screens or an SVG that prints crisply at any size."],
  ];
  return (
    <Page title="Why Me-QR?" lead="One place to create, style and manage every QR code your business uses.">
      <div className="about-hero">
        <img src={heroPhoto} alt="People scanning a QR code menu at a restaurant" loading="lazy" width={1024} height={768} />
        <div>
          <h2>Built for businesses that print once and update forever</h2>
          <p className="muted">
            A restaurant changes its menu every season. A shop changes its offers every week. With a dynamic QR code the printed
            code stays the same — only the destination changes. That saves reprinting costs and keeps every poster, card and box
            forever up to date.
          </p>
          <p className="muted">
            Me-QR gives you the generator, the styling tools and the scan statistics in one simple dashboard, so you always know
            which code brings customers in.
          </p>
          <Link className="btn primary" to="/">
            Create your first code
          </Link>
        </div>
      </div>
      <h2>Everything you need</h2>
      <div className="grid3">
        {items.map(([t, d]) => (
          <article className="card pad" key={t}>
            <h3>{t}</h3>
            <p className="muted">{d}</p>
          </article>
        ))}
      </div>
      <h2>How it works</h2>
      <div className="grid4">
        {steps.map(([n, t, d]) => (
          <article className="card pad" key={n}>
            <span className="pill">Step {n}</span>
            <h3>{t}</h3>
            <p className="muted">{d}</p>
          </article>
        ))}
      </div>
      <div className="stats">
        {[["8+", "QR types"], ["2", "Download formats"], ["100%", "Free to start"], ["24/7", "Codes always live"]].map(([n, l]) => (
          <div key={l}>
            <b>{n}</b>
            <span>{l}</span>
          </div>
        ))}
      </div>
    </Page>
  );
}
