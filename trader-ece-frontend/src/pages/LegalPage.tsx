import { useTranslation } from "react-i18next";
import type { NavigateFn } from "../App";
import { getLegalContent, type PolicyKind } from "../content/legalContent";
import "./LegalPage.css";

interface LegalPageProps {
  kind: PolicyKind;
  navigate: NavigateFn;
}

export default function LegalPage({ kind, navigate }: LegalPageProps) {
  const { i18n } = useTranslation();
  const content = getLegalContent(i18n.language);
  const policy = content[kind];

  return (
    <div className="legal-page">
      <section className="legal-hero section">
        <div className="legal-hero__glow legal-hero__glow--one" />
        <div className="legal-hero__glow legal-hero__glow--two" />
        <div className="container legal">
          <div className="section-tag">{content.tag}</div>
          <h1 className="section-title">{policy.title}</h1>
          <p className="section-subtitle legal__intro">{policy.intro}</p>

          <div className="legal__meta card">
            <div>
              <span className="legal__meta-label">{content.contactLabel}</span>
              <a className="legal__email" href={`mailto:${content.contactValue}`}>
                {content.contactValue}
              </a>
            </div>
            <div className="legal__meta-right">
              <span className="legal__updated">{content.updated}</span>
              <a className="btn btn-primary" href={`mailto:${content.contactValue}`}>
                {content.contactAction}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container legal">
          <div className="legal__switcher card">
            <div className="legal__tabs">
              <button
                type="button"
                className={`legal__tab ${kind === "privacy" ? "legal__tab--active" : ""}`}
                onClick={() => navigate("privacy")}
              >
                {content.privacy.navLabel}
              </button>
              <button
                type="button"
                className={`legal__tab ${kind === "cookies" ? "legal__tab--active" : ""}`}
                onClick={() => navigate("cookies")}
              >
                {content.cookies.navLabel}
              </button>
            </div>
            <button type="button" className="btn btn-outline" onClick={() => navigate("contact")}>
              {content.backToContact}
            </button>
          </div>

          <div className="legal__summary-wrap">
            <h2 className="legal__summary-title">{content.summaryTitle}</h2>
            <div className="legal__summary-grid">
              {policy.highlights.map((item, index) => (
                <div key={item} className="card legal__highlight">
                  <span className="legal__highlight-index">0{index + 1}</span>
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="legal__sections">
            {policy.sections.map((section) => (
              <article key={section.title} className="card legal__section">
                <h2>{section.title}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </article>
            ))}
          </div>

          <div className="card legal__note">
            <strong>{policy.note}</strong>
          </div>
        </div>
      </section>
    </div>
  );
}
