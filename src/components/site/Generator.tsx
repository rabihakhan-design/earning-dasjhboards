import { useRef, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { saveCode } from "../../lib/qr-store";

export const moreTypes = [
  { key: "wifi", label: "WiFi", icon: "📶" },
  { key: "whatsapp", label: "WhatsApp", icon: "💬" },
  { key: "email", label: "Email", icon: "✉" },
  { key: "phone", label: "Phone", icon: "📞" },
];

const esc = (s = "") => s.replace(/([\\;,:"])/g, "\\$1");

type Field = { k: keyof Vals; label: string; ph: string; opts?: string[]; multi?: boolean };
type Vals = Partial<Record<"u" | "t" | "s" | "p" | "e" | "n" | "m" | "to" | "sub" | "b", string>>;
const F = (k: keyof Vals, label: string, ph: string, extra: Partial<Field> = {}): Field => ({
  k,
  label,
  ph,
  ...extra,
});

const cfg: Record<
  string,
  { fields: Field[]; build: (f: Vals) => string; empty: string }
> = {
  url: {
    fields: [F("u", "Website link", "https://example.com")],
    build: (f) => f.u || "",
    empty: "https://example.com",
  },
  links: {
    fields: [F("t", "One link per line", "https://site-one.com\nhttps://site-two.com", { multi: true })],
    build: (f) => f.t || "",
    empty: "https://example.com",
  },
  yt: {
    fields: [F("u", "YouTube video link", "https://youtube.com/watch?v=...")],
    build: (f) => f.u || "",
    empty: "https://youtube.com",
  },
  text: {
    fields: [F("t", "Your text", "Write any text here", { multi: true })],
    build: (f) => f.t || "",
    empty: "Hello!",
  },
  wifi: {
    fields: [F("s", "Network name", "MyWiFi"), F("p", "Password", "password"), F("e", "Security", "", { opts: ["WPA", "WEP", "nopass"] })],
    build: (f) => (f.s ? `WIFI:T:${f.e || "WPA"};S:${esc(f.s)};P:${esc(f.p)};;` : ""),
    empty: "WIFI:T:WPA;S:MyWiFi;P:password;;",
  },
  whatsapp: {
    fields: [F("n", "Phone with country code", "923001234567"), F("m", "Ready message (optional)", "Hello!", { multi: true })],
    build: (f) =>
      f.n
        ? `https://wa.me/${f.n.replace(/\D/g, "")}${f.m ? "?text=" + encodeURIComponent(f.m) : ""}`
        : "",
    empty: "https://wa.me/",
  },
  email: {
    fields: [F("to", "Email address", "name@example.com"), F("sub", "Subject", "Hello"), F("b", "Message", "Write here", { multi: true })],
    build: (f) =>
      f.to
        ? `mailto:${f.to}?subject=${encodeURIComponent(f.sub || "")}&body=${encodeURIComponent(f.b || "")}`
        : "",
    empty: "mailto:name@example.com",
  },
  phone: {
    fields: [F("n", "Phone number", "+923001234567")],
    build: (f) => (f.n ? `tel:${f.n.replace(/\s/g, "")}` : ""),
    empty: "tel:+",
  },
};

const dl = (name: string, href: string) => {
  const a = document.createElement("a");
  a.href = href;
  a.download = name;
  a.click();
};

export default function Generator({ type }: { type: string }) {
  const c = cfg[type]!;
  const [vals, setVals] = useState<Record<string, Vals>>({});
  const [fg, setFg] = useState("#0c2340");
  const [bg, setBg] = useState("#ffffff");
  const [level, setLevel] = useState<"L" | "M" | "Q" | "H">("M");
  const [logo, setLogo] = useState<string | null>(null);
  const [msg, setMsg] = useState("");
  const box = useRef<HTMLDivElement>(null);
  const f: Vals = vals[type] || {};
  const data = (c.build(f) || "").trim() || c.empty;
  const set = (k: keyof Vals, v: string) => setVals({ ...vals, [type]: { ...f, [k]: v } });
  const flash = (t: string) => {
    setMsg(t);
    setTimeout(() => setMsg(""), 2200);
  };
  const svgStr = () => new XMLSerializer().serializeToString(box.current!.querySelector("svg")!);

  const saveSvg = () => {
    const u = URL.createObjectURL(new Blob([svgStr()], { type: "image/svg+xml" }));
    dl("qr-code.svg", u);
    URL.revokeObjectURL(u);
  };
  const savePng = () => {
    const img = new Image();
    img.onload = () => {
      const cv = document.createElement("canvas");
      cv.width = cv.height = 1024;
      cv.getContext("2d")!.drawImage(img, 0, 0, 1024, 1024);
      dl("qr-code.png", cv.toDataURL("image/png"));
    };
    img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svgStr());
  };
  const onLogo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const r = new FileReader();
    r.onload = () => setLogo(r.result as string);
    r.readAsDataURL(file);
  };
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(data);
      flash("Content copied");
    } catch {
      flash("Copy not allowed here");
    }
  };
  const save = () => {
    saveCode({ type, data, fg, bg });
    flash("Saved to My QR codes");
  };

  return (
    <div className="container gen">
      <div className="gen-form">
        {c.fields.map((x) => (
          <div className="fld" key={x.k}>
            <label htmlFor={`f-${x.k}`}>{x.label}</label>
            {x.opts ? (
              <select
                id={`f-${x.k}`}
                value={f[x.k] || x.opts[0]}
                onChange={(e) => set(x.k, e.target.value)}
              >
                {x.opts.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            ) : x.multi ? (
              <textarea
                id={`f-${x.k}`}
                rows={3}
                placeholder={x.ph}
                value={f[x.k] || ""}
                onChange={(e) => set(x.k, e.target.value)}
              />
            ) : (
              <input
                id={`f-${x.k}`}
                placeholder={x.ph}
                value={f[x.k] || ""}
                onChange={(e) => set(x.k, e.target.value)}
              />
            )}
          </div>
        ))}
        <div className="opts">
          <label>
            QR color <input type="color" value={fg} onChange={(e) => setFg(e.target.value)} />
          </label>
          <label>
            Background <input type="color" value={bg} onChange={(e) => setBg(e.target.value)} />
          </label>
          <label>
            Error correction
            <select value={level} onChange={(e) => setLevel(e.target.value as "L" | "M" | "Q" | "H")}>
              <option value="L">Low</option>
              <option value="M">Medium</option>
              <option value="Q">High</option>
              <option value="H">Highest</option>
            </select>
          </label>
        </div>
        <div className="opts">
          <label className="file">
            {logo ? "Change logo" : "Add logo"}
            <input type="file" accept="image/*" onChange={onLogo} hidden />
          </label>
          {logo && (
            <button className="link-btn" onClick={() => setLogo(null)}>
              Remove logo
            </button>
          )}
        </div>
      </div>
      <div className="gen-out">
        <div className="qr-frame" ref={box}>
          <QRCodeSVG
            value={data}
            size={240}
            fgColor={fg}
            bgColor={bg}
            level={logo ? "H" : level}
            marginSize={2}
            {...(logo ? { imageSettings: { src: logo, height: 48, width: 48, excavate: true } } : {})}
          />
        </div>
        <div className="dl">
          <button className="btn primary" onClick={savePng}>
            Download PNG
          </button>
          <button className="btn ghost" onClick={saveSvg}>
            Download SVG
          </button>
          <button className="btn ghost" onClick={save}>
            Save
          </button>
          <button className="btn ghost" onClick={copy}>
            Copy content
          </button>
        </div>
        <p className="toast" role="status">
          {msg}
        </p>
      </div>
    </div>
  );
}
