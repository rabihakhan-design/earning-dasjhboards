import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import pageImg from "@/assets/pricing-team.jpg";
import Page from "../components/site/Page";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — ME-QR" },
      { name: "description", content: "Start free. Upgrade when you need tracking and teamwork. Plans for every business." },
      { property: "og:title", content: "Pricing — ME-QR" },
      { property: "og:description", content: "Start free. Upgrade when you need tracking and teamwork." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Pricing,
});

function Pricing() {
  const plans = [
    { n: "Free", p: "$0", f: ["Unlimited static codes", "PNG and SVG download", "Custom colors and logo", "Save codes in your browser", "All 8 QR types"] },
    { n: "Pro", p: "$9", f: ["Everything in Free", "Dynamic codes — edit links anytime", "Scan statistics and locations", "Edit links after printing", "No watermark"], hot: true },
    { n: "Business", p: "$29", f: ["Everything in Pro", "Team access for 5 members", "API access for your developers", "Bulk code creation", "Priority support"] },
  ];
  const compare = [
    ["Static QR codes", true, true, true],
    ["PNG / SVG download", true, true, true],
    ["Custom colors & logo", true, true, true],
    ["Dynamic (editable) codes", false, true, true],
    ["Scan analytics", false, true, true],
    ["Team members", false, false, true],
    ["API access", false, false, true],
  ];
  const Yes = () => <span className="tick yes">✓</span>;
  const No = () => <span className="tick no">—</span>;
  return (
    <Page image={pageImg} title="Pricing" lead="Start free. Upgrade when you need tracking and teamwork. (Sample prices for this demo.)">
      <div className="grid3">
        {plans.map((x) => (
          <article key={x.n} className={`card pad plan ${x.hot ? "hot" : ""}`}>
            {x.hot && <span className="pill">Most popular</span>}
            <h3>{x.n}</h3>
            <div className="price">
              {x.p}
              <small>/month</small>
            </div>
            <ul>
              {x.f.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
            <Link className="btn primary" to="/">
              Create QR code
            </Link>
          </article>
        ))}
      </div>
      <h2>Compare plans</h2>
      <div className="card pad table-wrap">
        <table className="cmp">
          <thead>
            <tr>
              <th>Feature</th>
              <th>Free</th>
              <th>Pro</th>
              <th>Business</th>
            </tr>
          </thead>
          <tbody>
            {compare.map(([f, a, b, c]) => (
              <tr key={f as string}>
                <td>{f}</td>
                <td>{a ? <Yes /> : <No />}</td>
                <td>{b ? <Yes /> : <No />}</td>
                <td>{c ? <Yes /> : <No />}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="muted center">All plans include codes that never expire and scan on every modern phone camera.</p>
    </Page>
  );
}
