import "./AboutPage.css";
import { useTranslation } from "react-i18next";
import type { NavigateFn } from "../App";

interface AboutPageProps {
  navigate: NavigateFn;
}

interface TimelineItem {
  year: string;
  title: string;
  desc: string;
}

interface HfmFeature {
  icon: string;
  title: string;
  desc: string;
}

interface BioBadge {
  icon: string;
  text: string;
}



export default function AboutPage({ navigate }: AboutPageProps) {
  const { t } = useTranslation();

  const timelineFromTranslation: TimelineItem[] = [
    {
      year: t("about.timeline.items.0.year"),
      title: t("about.timeline.items.0.title"),
      desc: t("about.timeline.items.0.desc"),
    },
    {
      year: t("about.timeline.items.1.year"),
      title: t("about.timeline.items.1.title"),
      desc: t("about.timeline.items.1.desc"),
    },
    {
      year: t("about.timeline.items.2.year"),
      title: t("about.timeline.items.2.title"),
      desc: t("about.timeline.items.2.desc"),
    },
    {
      year: t("about.timeline.items.3.year"),
      title: t("about.timeline.items.3.title"),
      desc: t("about.timeline.items.3.desc"),
    },
    {
      year: t("about.timeline.items.4.year"),
      title: t("about.timeline.items.4.title"),
      desc: t("about.timeline.items.4.desc"),
    },
  ];

  const hfmFeaturesFromTranslation: HfmFeature[] = [
    {
      icon: "🌍",
      title: t("about.hfmPartnership.features.0.title"),
      desc: t("about.hfmPartnership.features.0.desc"),
    },
    {
      icon: "⚡",
      title: t("about.hfmPartnership.features.1.title"),
      desc: t("about.hfmPartnership.features.1.desc"),
    },
    {
      icon: "📱",
      title: t("about.hfmPartnership.features.2.title"),
      desc: t("about.hfmPartnership.features.2.desc"),
    },
    {
      icon: "🔒",
      title: t("about.hfmPartnership.features.3.title"),
      desc: t("about.hfmPartnership.features.3.desc"),
    },
    {
      icon: "📊",
      title: t("about.hfmPartnership.features.4.title"),
      desc: t("about.hfmPartnership.features.4.desc"),
    },
    {
      icon: "🎓",
      title: t("about.hfmPartnership.features.5.title"),
      desc: t("about.hfmPartnership.features.5.desc"),
    },
  ];

  const bioBadgesFromTranslation: BioBadge[] = [
    {
      icon: "🏦",
      text: t("about.badges.0"),
    },
    {
      icon: "📡",
      text: t("about.badges.1"),
    },
    {
      icon: "🛡️",
      text: t("about.badges.2"),
    },
  ];

  return (
    <div className="about-page">
      {/* Hero */}
      <section className="page-hero">
        <div className="page-hero__bg" />
        <div className="container">
          <div className="section-tag">{t("about.tag")}</div>
          <h1 className="section-title" style={{ fontSize: "clamp(40px, 6vw, 64px)" }}>
            {t("about.hero.title1")}
            <br />
            <span className="highlight">{t("about.hero.title2")}</span>
          </h1>
          <p className="section-subtitle" style={{ fontSize: 18 }}>
            {t("about.hero.subtitle")}
          </p>
        </div>
      </section>

      {/* Bio */}
      <section className="section">
        <div className="container">
          <div className="about-bio-grid">
            <div className="about-bio-visual">
              <div className="bio-circle">
                <div className="bio-circle__inner">
                  <span className="bio-years">{t("about.experience")}</span>
                  <span className="bio-years-label">{t("about.experienceLabel")}</span>
                </div>
              </div>
              <div className="bio-badges">
                {bioBadgesFromTranslation.map((b, i) => (
                  <div key={i} className="bio-badge">
                    <span>{b.icon}</span> {b.text}
                  </div>
                ))}
              </div>
            </div>

            <div className="about-bio-content">
              <div className="section-tag">{t("about.biography.tag")}</div>
              <h2 className="section-title" style={{ fontSize: "clamp(28px, 4vw, 42px)" }}>
                {t("about.biography.title")}
              </h2>
              <p className="about-text">
                {t("about.biography.p1")}
              </p>
              <p className="about-text">
                {t("about.biography.p2")}
              </p>
              <p className="about-text">
                <strong style={{ color: "var(--accent)" }}>{t("about.biography.note")}</strong> {t("about.biography.p3")}
              </p>
              <button className="btn btn-primary" style={{ marginTop: 24 }} onClick={() => navigate("contact")}>
                {t("about.biography.button")}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* HFM Section */}
      <section className="section hfm-about-section">
        <div className="container">
          <div className="section-tag">{t("about.hfmPartnership.tag")}</div>
          <h2 className="section-title">{t("about.hfmPartnership.title")}</h2>
          <p className="section-subtitle" style={{ marginBottom: 48 }}>
            {t("about.hfmPartnership.subtitle")}
          </p>
          <div className="grid-3">
            {hfmFeaturesFromTranslation.map((item, i) => (
              <div key={i} className="card hfm-feature-card">
                <div className="feature-icon-lg">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section timeline-section">
        <div className="container">
          <div className="section-tag">{t("about.timeline.tag")}</div>
          <h2 className="section-title">{t("about.timeline.title")}</h2>
          <div className="timeline">
            {timelineFromTranslation.map((item, i) => (
              <div key={i} className={`timeline-item ${i % 2 === 0 ? "left" : "right"}`}>
                <div className="timeline-year">{item.year}</div>
                <div className="timeline-dot" />
                <div className="timeline-card card">
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
