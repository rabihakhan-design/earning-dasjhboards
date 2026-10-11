import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, Moon, QrCode, Sun, X } from "lucide-react";

export function Logo() {
  return (
    <Link to="/" className="logo">
      <span className="logo-mark"><QrCode size={19} strokeWidth={2.4} /></span>
      ME<span>QR</span>
    </Link>
  );
}

export default function Navbar() {
  const [menu, setMenu] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    try {
      if (localStorage.getItem("qr-theme") === "dark") setTheme("dark");
    } catch {}
  }, []);

  useEffect(() => {
    document.documentElement.dataset["theme"] = theme;
    try {
      localStorage.setItem("qr-theme", theme);
    } catch {}
  }, [theme]);

  return (
    <header className="nav">
      <div className="container nav-inner">
        <Logo />
        <button
          className="burger"
          aria-label="Menu"
          aria-expanded={menu}
          onClick={() => setMenu(!menu)}
        >
          {menu ? <X size={22} /> : <Menu size={22} />}
        </button>
        <nav
          className={`nav-links ${menu ? "open" : ""}`}
          onClick={() => setMenu(false)}
        >
          <Link to="/about">Solutions</Link>
          <Link to="/" hash="generate">
            Generate QR
          </Link>
          <Link to="/pricing">Pricing</Link>
          <Link to="/support">Resources</Link>
          <Link to="/contact">Contact</Link>
          <button
            className="theme"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle dark mode"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <Link to="/my-codes" className="btn login">
            My QR codes <span aria-hidden="true">→</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
