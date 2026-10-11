import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Check, Mail } from "lucide-react";
import { Logo } from "./Navbar";

const groups: Array<[string, Array<[string, string]>]> = [
  [
    "Products",
    [
      ["Benefits", "/about"],
      ["API", "/support"],
      ["Affiliate Program", "/contact"],
    ],
  ],
  [
    "Information",
    [
      ["Payment & Content", "/pricing"],
      ["Pricing", "/pricing"],
      ["Compare", "/pricing"],
      ["Reviews", "/about"],
    ],
  ],
  [
    "Legal",
    [
      ["About Us", "/about"],
      ["Account & Payment", "/pricing"],
      ["Privacy Policy", "/privacy"],
      ["Terms & Conditions", "/terms"],
    ],
  ],
  [
    "Support",
    [
      ["FAQ", "/support"],
      ["Instructions", "/support"],
      ["Blog", "/support"],
      ["Video", "/support"],
      ["Help Center", "/support"],
    ],
  ],
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  return (
    <footer className="footer" id="contact">
      <div className="container foot-grid">
        <div className="foot-about">
          <Logo />
          <p>
            Create polished QR codes for print, packaging, menus and digital campaigns.
          </p>
          <div className="foot-trust"><Check size={16} /> Free to start · No watermark</div>
        </div>
        {groups.map(([h, items]) => (
          <div key={h}>
            <h5>{h}</h5>
            {items.map(([label, to]) => (
              <Link key={label} to={to}>
                {label}
              </Link>
            ))}
          </div>
        ))}
        <div className="news">
          <h5>Our Newsletter</h5>
          <p>Subscribe to our newsletter to receive our latest news and special offers.</p>
          {done ? (
            <p className="subscribed"><Check size={18} /> Thanks! You are subscribed.</p>
          ) : (
            <form
              className="news-row"
              onSubmit={(e) => {
                e.preventDefault();
                if (/^\S+@\S+\.\S+$/.test(email)) setDone(true);
              }}
            >
              <Mail className="news-icon" size={18} />
              <input
                placeholder="Enter Your Email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button className="btn white" type="submit" aria-label="Subscribe">
                <ArrowRight size={18} />
              </button>
            </form>
          )}
        </div>
      </div>
    </footer>
  );
}
