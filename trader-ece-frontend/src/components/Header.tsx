import { useState, useEffect } from "react";
import "./Header.css";
import type { NavigateFn, Page } from "../App";

interface HeaderProps {
  currentPage: Page;
  navigate: NavigateFn;
}

interface NavItem {
  key: Page;
  label: string;
}

const navItems: NavItem[] = [
  { key: "home", label: "Ana Sayfa" },
  { key: "about", label: "Hakkımızda" },
  { key: "services", label: "Hizmetler" },
  { key: "performance", label: "Performans" },
];

export default function Header({ currentPage, navigate }: HeaderProps) {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`header ${scrolled ? "header--scrolled" : ""}`}>
      <div className="header__inner">

        {/* LEFT — Trader ECE */}
        <div className="header__logo-left" onClick={() => navigate("home")}>
          <img src="/traderEceLogo.png" alt="Trader ECE" className="logo-img logo-img--left" />
          <div className="logo-text">
            <span className="logo-brand">
              <span className="logo-trader">TRADER</span>
              <span className="logo-ece"> ECE</span>
            </span>
            <span className="logo-sub">HFM IB &amp; Affiliate</span>
          </div>
        </div>

        {/* LEFT separator */}
        <div className="header__sep header__sep--left" />

        {/* CENTER — Nav + contact button together */}
        <nav className={`header__nav ${menuOpen ? "open" : ""}`}>
          {navItems.map((item) => (
            <button
              key={item.key}
              className={`nav-item ${currentPage === item.key ? "active" : ""}`}
              onClick={() => {
                navigate(item.key);
                setMenuOpen(false);
              }}
            >
              {item.label}
            </button>
          ))}
          <button
            className="btn btn-primary btn-sm"
            onClick={() => { navigate("contact"); setMenuOpen(false); }}
          >
            İletişime Geç
          </button>
        </nav>

        {/* RIGHT separator */}
        <div className="header__sep header__sep--right" />

        {/* RIGHT — Bullex + hamburger */}
        <div className="header__actions">
          <a
            href="https://t.me/"
            target="_blank"
            rel="noopener noreferrer"
            className="header__logo-right"
          >
            <div className="logo-text logo-text--right">
              <span className="bullex-name">BULLEX</span>
              <span className="logo-sub logo-sub--right">Sinyal Kanalı</span>
            </div>
            <img src="/bullexLogo.png" alt="Bullex" className="logo-img logo-img--right" />
          </a>
          <button
            className={`hamburger ${menuOpen ? "open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menü"
          >
            <span />
            <span />
            <span />
          </button>
        </div>

      </div>
    </header>
  );
}