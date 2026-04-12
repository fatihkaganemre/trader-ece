import "./ServicesPage.css";
import { useTranslation } from "react-i18next";
import Lottie from "lottie-react";
import type { NavigateFn } from "../App";
import socialSignalAnim from "../assets/social-signal.json";
import moneyWithdrawalAnim from "../assets/money-withdrawal.json";
import partnershipAnim from "../assets/partnership.json";
import peopleAnalyzingAnim from "../assets/people-analyzing-growth-charts.json";
import regulationAnim from "../assets/regulation.json";
import supportAnim from "../assets/support.json";
import globalAnim from "../assets/global.json";

interface ServicesPageProps {
  navigate: NavigateFn;
}

interface Service {
  anim: object;
  title: string;
  color: string;
  desc: string;
  features: string[];
  disclaimer: string;
}

interface Package {
  name: string;
  price: string;
  desc: string;
  features: string[];
  cta: string;
  highlighted: boolean;
}

interface Advantage {
  anim: object;
  title: string;
  desc: string;
}

export default function ServicesPage({ navigate }: ServicesPageProps) {
  const { t } = useTranslation();

  const servicesFromTranslation: Service[] = [
    {
      anim: socialSignalAnim,
      title: t("services.cards.0.title"),
      color: "#0088cc",
      desc: t("services.cards.0.desc"),
      features: [
        t("services.cards.0.features.0"),
        t("services.cards.0.features.1"),
        t("services.cards.0.features.2"),
        t("services.cards.0.features.3"),
      ],
      disclaimer: t("services.cards.0.disclaimer"),
    },
    {
      anim: partnershipAnim,
      title: t("services.cards.1.title"),
      color: "#b68a44",
      desc: t("services.cards.1.desc"),
      features: [
        t("services.cards.1.features.0"),
        t("services.cards.1.features.1"),
        t("services.cards.1.features.2"),
        t("services.cards.1.features.3"),
      ],
      disclaimer: t("services.cards.1.disclaimer"),
    },
    {
      anim: peopleAnalyzingAnim,
      title: t("services.cards.2.title"),
      color: "#a855f7",
      desc: t("services.cards.2.desc"),
      features: [
        t("services.cards.2.features.0"),
        t("services.cards.2.features.1"),
        t("services.cards.2.features.2"),
        t("services.cards.2.features.3"),
      ],
      disclaimer: t("services.cards.2.disclaimer"),
    },
  ];

  const packagesFromTranslation: Package[] = [
    {
      name: t("services.packages.free.name"),
      price: t("services.packages.free.price"),
      desc: t("services.packages.free.desc"),
      features: [
        t("services.packages.free.features.0"),
        t("services.packages.free.features.1"),
        t("services.packages.free.features.2"),
        t("services.packages.free.features.3"),
      ],
      cta: t("services.packages.free.cta"),
      highlighted: false,
    },
    {
      name: t("services.packages.premium.name"),
      price: t("services.packages.premium.price"),
      desc: t("services.packages.premium.desc"),
      features: [
        t("services.packages.premium.features.0"),
        t("services.packages.premium.features.1"),
        t("services.packages.premium.features.2"),
        t("services.packages.premium.features.3"),
        t("services.packages.premium.features.4"),
      ],
      cta: t("services.packages.premium.cta"),
      highlighted: true,
    },
  ];

  const advantagesFromTranslation: Advantage[] = [
    {
      anim: regulationAnim,
      title: t("services.advantages.cards.0.title"),
      desc: t("services.advantages.cards.0.desc"),
    },
    {
      anim: moneyWithdrawalAnim,
      title: t("services.advantages.cards.1.title"),
      desc: t("services.advantages.cards.1.desc"),
    },
    {
      anim: globalAnim,
      title: t("services.advantages.cards.2.title"),
      desc: t("services.advantages.cards.2.desc"),
    },
    {
      anim: supportAnim,
      title: t("services.advantages.cards.3.title"),
      desc: t("services.advantages.cards.3.desc"),
    },
  ];

  return (
    <div className="services-page">
      {/* Hero */}
      <section className="page-hero">
        <div className="page-hero__bg" />
        <div className="container">
          <div className="section-tag">{t("services.tag")}</div>
          <h1 className="section-title" style={{ fontSize: "clamp(40px, 6vw, 64px)" }}>
            {t("services.title")}
          </h1>
          <p className="section-subtitle" style={{ fontSize: 18 }}>
            {t("services.subtitle")}
          </p>
        </div>
      </section>

      {/* Services Detail */}
      <section className="section">
        <div className="container">
          <div className="services-detail-list">
            {servicesFromTranslation.map((svc, i) => (
              <div key={i} className="service-detail-card card">
                <div className="sdc-header">
                  <div className="service-icon-lg" style={{ "--c": svc.color } as React.CSSProperties}>
                    <Lottie animationData={svc.anim} loop autoplay style={{ width: 56, height: 56 }} />
                  </div>
                  <div>
                    <h3>{svc.title}</h3>
                    <p className="sdc-desc">{svc.desc}</p>
                  </div>
                </div>
                <div className="sdc-features">
                  {svc.features.map((f, j) => (
                    <div key={j} className="sdc-feature">
                      <span className="check">✓</span>
                      {f}
                    </div>
                  ))}
                </div>
                <div className="sdc-disclaimer">
                  <span>⚠️</span> {svc.disclaimer}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section className="section advantages-section">
        <div className="container">
          <div className="section-tag">{t("services.advantages.tag")}</div>
          <h2 className="section-title">{t("services.advantages.title")}</h2>
          <div className="grid-4" style={{ marginTop: 48 }}>
            {advantagesFromTranslation.map((a, i) => (
              <div key={i} className="card adv-card">
                <div style={{ marginBottom: 12, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 12, padding: 8, width: 64, height: 64, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Lottie animationData={a.anim} loop autoplay style={{ width: 44, height: 44 }} />
                </div>
                <h4>{a.title}</h4>
                <p>{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="section packages-section">
        <div className="container">
          <div className="section-tag">{t("services.packages.tag")}</div>
          <h2 className="section-title">{t("services.packages.title")}</h2>
          <p className="section-subtitle" style={{ marginBottom: 48 }}>
            {t("services.packages.subtitle")}
          </p>
          <div className="packages-grid">
            {packagesFromTranslation.map((pkg, i) => (
              <div key={i} className={`card package-card ${pkg.highlighted ? "highlighted" : ""}`}>
                {pkg.highlighted && (
                  <div className="package-badge">{t("services.packages.premium.badge")}</div>
                )}
                <div className="package-name">{pkg.name}</div>
                <div className="package-price">{pkg.price}</div>
                <p className="package-desc">{pkg.desc}</p>
                <ul className="package-features">
                  {pkg.features.map((f, j) => (
                    <li key={j}>
                      <span className="check">✓</span> {f}
                    </li>
                  ))}
                </ul>
                <button
                  className={`btn ${pkg.highlighted ? "btn-primary" : "btn-outline"}`}
                  style={{ width: "100%", justifyContent: "center", marginTop: "auto" }}
                  onClick={() => navigate("contact")}
                >
                  {pkg.cta}
                </button>
              </div>
            ))}
          </div>
          <div className="packages-note">
            {t("services.packages.note")}
          </div>
        </div>
      </section>
    </div>
  );
}
