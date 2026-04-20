import { useTranslation } from "react-i18next";
import "./Footer.css";
import type { NavigateFn, Page } from "../App";
import { getLegalContent } from "../content/legalContent";

interface FooterProps {
  navigate: NavigateFn;
}

const TICKMILL_REGULATION_URL = "https://tickmill.com/en/about/regulatory-information";
const HFM_REGULATION_URL = "https://www.hfm.com/int/en/about-us/regulatory-environment";

export default function Footer({ navigate }: FooterProps) {
  const { t, i18n } = useTranslation();
  const legalContent = getLegalContent(i18n.language);
  const isTurkish = i18n.language.toLowerCase().startsWith("tr");

  const pageLinks: [Page, string][] = [
    ["home", t("nav.home")],
    ["about", t("nav.about")],
    ["services", t("nav.services")],
    ["community", t("nav.community")],
    ["performance", t("nav.performance")],
    ["contact", t("nav.contact")],
  ];

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <div className="footer_logo_group">
                <div className="footer__logo">
                  <div className="footer-logo-img-wrap">
                    <img src="/traderEceLogo.png" alt="Trader ECE" className="footer-logo-img" />
                  </div>
                  <div className="logo-text">
                    <span className="logo-brand">
                      <span className="logo-trader">TRADER</span>
                      <span className="logo-ece"> ECE</span>
                    </span>
                    <span className="logo-sub">{t("header.subtitle")}</span>
                  </div>
                </div>
                <div className="footer__logo">
                  <div className="footer-logo-img-wrap">
                    <img src="/bullexLogo.png" alt="Bullex" className="footer-logo-img" />
                  </div>
                  <div className="logo-text">
                    <span className="logo-brand">
                      <span className="logo-bullex">{t("header.bullex")}</span>
                    </span>
                    <span className="logo-sub">{t("footer.bullexSubtitle")}</span>
                  </div>
                </div>
            </div>
            <p className="footer__desc">
              {t("footer.partnerDesc")}
            </p>
          </div>

          <div className="footer__links">
            <div className="footer__col">
              <h4>{t("footer.pages")}</h4>
              {pageLinks.map(([key, label]) => (
                <button key={key} onClick={() => navigate(key)}>{label}</button>
              ))}
            </div>
            <div className="footer__col">
              <h4>{t("footer.legal")}</h4>
              <button onClick={() => navigate("privacy")}>{legalContent.privacy.navLabel}</button>
              <button onClick={() => navigate("cookies")}>{legalContent.cookies.navLabel}</button>
              <a href={TICKMILL_REGULATION_URL} target="_blank" rel="noopener noreferrer">{t("footer.links.hfmOfficial")}</a>
              {!isTurkish && (
                <a href={HFM_REGULATION_URL} target="_blank" rel="noopener noreferrer">{t("footer.links.hfmRegulation")}</a>
              )}
            </div>
          </div>
        </div>

        <div className="footer__disclaimer">
          <div className="disclaimer-icon">⚠️</div>
          <div>
            <strong>{t("footer.riskWarning")}</strong> {t("footer.riskDisclaimer")}
          </div>
        </div>

        <div className="footer__bottom">
          <p>{t("footer.copyright", { year: new Date().getFullYear() })}</p>
          <p className="footer__hfm">{t("footer.regulation")}</p>
        </div>
      </div>
    </footer>
  );
}
