import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "./Header.css";
import type { NavigateFn, Page } from "../App";

interface HeaderProps {
  currentPage: Page;
  navigate: NavigateFn;
}

export default function Header({ currentPage, navigate }: HeaderProps) {
  const { t, i18n } = useTranslation();
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [langMenuOpen, setLangMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setLangMenuOpen(false);
  };

  const navItems = [
    { key: "home" as Page, label: t("nav.home") },
    { key: "about" as Page, label: t("nav.about") },
    { key: "services" as Page, label: t("nav.services") },
    { key: "performance" as Page, label: t("nav.performance") },
  ];

  return (
    <header className={`header ${scrolled ? "header--scrolled" : ""}`}>
      <div className="header__inner">

        {/* LEFT — Trader ECE */}
        <div className="header__logo-left" onClick={() => navigate("home")}>
          <div className="logo-text">
            <span className="logo-brand">
              <span className="logo-trader">TRADER</span>
              <span className="logo-ece"> ECE</span>
            </span>
            <span className="logo-sub">{t("header.subtitle")}</span>
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
            style={{ marginLeft: "20px" }}
            onClick={() => { navigate("contact"); setMenuOpen(false); }}
          >
            {t("nav.contact")}
          </button>
        </nav>

        {/* RIGHT separator */}
        <div className="header__sep header__sep--right" />

        {/* RIGHT — Bullex + Language Selector + hamburger */}
        <div className="header__actions">
          <div className="language-selector">
            <button
              className="lang-btn"
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              title="Select Language"
            >
              {i18n.language.toUpperCase()}
            </button>
            {langMenuOpen && (
              <div className="lang-menu">
                <button
                  className={`lang-option ${i18n.language === 'en' ? 'active' : ''}`}
                  onClick={() => changeLanguage('en')}
                >
                  English
                </button>
                <button
                  className={`lang-option ${i18n.language === 'tr' ? 'active' : ''}`}
                  onClick={() => changeLanguage('tr')}
                >
                  Türkçe
                </button>
                <button
                  className={`lang-option ${i18n.language === 'th' ? 'active' : ''}`}
                  onClick={() => changeLanguage('th')}
                >
                  ไทย
                </button>
                <button
                  className={`lang-option ${i18n.language === 'id' ? 'active' : ''}`}
                  onClick={() => changeLanguage('id')}
                >
                  Bahasa Indonesia
                </button>
                <button
                  className={`lang-option ${i18n.language === 'zh' ? 'active' : ''}`}
                  onClick={() => changeLanguage('zh')}
                >
                  中文
                </button>
                <button
                  className={`lang-option ${i18n.language === 'vi' ? 'active' : ''}`}
                  onClick={() => changeLanguage('vi')}
                >
                  Tiếng Việt
                </button>
              </div>
            )}
          </div>

          <div
            className="header__logo-right"
            onClick={() => navigate("home")}
          >
            <div className="logo-text logo-text--right">
              <span className="bullex-name">{t("header.bullex")}</span>
              <span className="logo-sub logo-sub--right">{t("header.bullexSubtitle")}</span>
            </div>
          </div>
          <button
            className={`hamburger ${menuOpen ? "open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={t("nav.menu")}
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