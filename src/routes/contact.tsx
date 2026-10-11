import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import pageImg from "@/assets/contact-team.jpg";
import Page from "../components/site/Page";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — ME-QR" },
      { name: "description", content: "Questions about codes, plans or your account? Write to us — we are happy to help." },
      { property: "og:title", content: "Contact Us — ME-QR" },
      { property: "og:description", content: "Questions about codes, plans or your account? Write to us." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [f, setF] = useState({ name: "", email: "", msg: "" });
  const [err, setErr] = useState<Partial<Record<"name" | "email" | "msg", string>>>({});
  const [sent, setSent] = useState(false);
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const er: Partial<Record<"name" | "email" | "msg", string>> = {};
    if (!f.name.trim()) er.name = "Enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(f.email)) er.email = "Enter a valid email address.";
    if (f.msg.trim().length < 10) er.msg = "Write at least 10 characters.";
    setErr(er);
    if (!Object.keys(er).length) setSent(true);
  };
  const channels = [
    ["✉", "Email us", "support@me-qr.example", "We reply within one business day."],
    ["💬", "Live chat", "Mon–Fri, 9:00–18:00", "Fastest way to get help with the generator."],
    ["📚", "Help center", "", "Guides, instructions and answers to common questions."],
  ];
  if (sent)
    return (
      <Page image={pageImg} title="Contact us">
        <div className="card pad ok">
          <h3>Thanks, {f.name}!</h3>
          <p className="muted">Your message is ready to send. Connect this form to your backend or an email service to receive it.</p>
        </div>
      </Page>
    );
  return (
    <Page title="Contact us" lead="Questions about codes, plans or your account? Write to us — we are happy to help.">
      <div className="grid3">
        {channels.map(([i, t, v, d]) => (
          <article className="card pad" key={t}>
            <div className="cicon">{i}</div>
            <h3>{t}</h3>
            <p>
              <strong>{v}</strong>
            </p>
            <p className="muted">{d}</p>
          </article>
        ))}
      </div>
      <form className="card pad form" onSubmit={submit} noValidate>
        <h3>Send us a message</h3>
        {([["name", "Name", "text"], ["email", "Email", "email"]] as const).map(([k, l, t]) => (
          <div className="fld" key={k}>
            <label htmlFor={k}>{l}</label>
            <input
              id={k}
              type={t}
              value={f[k]}
              onChange={(e) => setF({ ...f, [k]: e.target.value })}
              aria-invalid={!!err[k]}
            />
            {err[k] && <small className="err">{err[k]}</small>}
          </div>
        ))}
        <div className="fld">
          <label htmlFor="msg">Message</label>
          <textarea id="msg" rows={5} value={f.msg} onChange={(e) => setF({ ...f, msg: e.target.value })} aria-invalid={!!err.msg} />
          {err.msg && <small className="err">{err.msg}</small>}
        </div>
        <button className="btn primary">Send message</button>
      </form>
      <p className="muted" style={{ marginTop: 24 }}>
        Prefer reading first? Browse the <Link to="/support">Help center</Link>.
      </p>
    </Page>
  );
}
