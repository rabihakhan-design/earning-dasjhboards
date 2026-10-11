import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Link } from "@tanstack/react-router";
import Page from "../components/site/Page";
import { loadCodes, removeCode, type SavedCode } from "../lib/qr-store";

export const Route = createFileRoute("/my-codes")({
  head: () => ({
    meta: [
      { title: "My QR codes — ME-QR" },
      { name: "description", content: "Codes you saved in this browser, ready to download again anytime." },
      { property: "og:title", content: "My QR codes — ME-QR" },
      { property: "og:description", content: "Codes you saved in this browser, ready to download again anytime." },
      { property: "og:type", content: "website" },
      { name: "robots", content: "noindex" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MyCodes,
});

function MyCodes() {
  const [codes, setCodes] = useState<SavedCode[]>([]);
  useEffect(() => setCodes(loadCodes()), []);
  const del = (id: number) => {
    removeCode(id);
    setCodes(loadCodes());
  };
  return (
    <Page title="My QR codes" lead="Codes you saved in this browser.">
      {codes.length === 0 && (
        <div className="card pad ok center-card">
          <h3>Nothing saved yet</h3>
          <p className="muted">Create a QR code and press Save — it will appear here, ready to download again anytime.</p>
          <Link className="btn primary" to="/">
            Create a QR code
          </Link>
        </div>
      )}
      <div className="grid3">
        {codes.map((c) => (
          <article className="card pad saved" key={c.id}>
            <QRCodeSVG value={c.data} size={140} fgColor={c.fg} bgColor={c.bg} marginSize={2} />
            <div>
              <strong>{c.type}</strong>
              <small className="muted">{c.date}</small>
              <p className="clip">{c.data}</p>
              <button className="link-btn" onClick={() => del(c.id)}>
                Delete
              </button>
            </div>
          </article>
        ))}
      </div>
    </Page>
  );
}
