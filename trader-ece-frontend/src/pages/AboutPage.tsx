import "./AboutPage.css";
import Lottie from "lottie-react";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useTranslation } from "react-i18next";
import type { NavigateFn } from "../App";
import customerSupportAnim from "../assets/customer-support.json";
import partnershipAnim from "../assets/partnership.json";
import regulationAnim from "../assets/regulation.json";

interface AboutPageProps {
  navigate: NavigateFn;
}

interface TimelineItem {
  year: string;
  title: string;
  desc: string;
}

interface HfmFeature {
  title: string;
  desc: string;
}

interface BioBadge {
  animationData: object;
  text: string;
  iconClassName: string;
}



export default function AboutPage({ navigate }: AboutPageProps) {
  const { t } = useTranslation();
  const timelineItemRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [visibleTimelineItems, setVisibleTimelineItems] = useState<Set<number>>(new Set());

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
      title: t("about.hfmPartnership.features.0.title"),
      desc: t("about.hfmPartnership.features.0.desc"),
    },
    {
      title: t("about.hfmPartnership.features.1.title"),
      desc: t("about.hfmPartnership.features.1.desc"),
    },
    {
      title: t("about.hfmPartnership.features.2.title"),
      desc: t("about.hfmPartnership.features.2.desc"),
    },
    {
      title: t("about.hfmPartnership.features.3.title"),
      desc: t("about.hfmPartnership.features.3.desc"),
    },
    {
      title: t("about.hfmPartnership.features.4.title"),
      desc: t("about.hfmPartnership.features.4.desc"),
    },
    {
      title: t("about.hfmPartnership.features.5.title"),
      desc: t("about.hfmPartnership.features.5.desc"),
    },
  ];

  const bioBadgesFromTranslation: BioBadge[] = [
    {
      animationData: partnershipAnim,
      text: t("about.badges.0"),
      iconClassName: "bio-badge__icon bio-badge__icon--partnership",
    },
    {
      animationData: customerSupportAnim,
      text: t("about.badges.1"),
      iconClassName: "bio-badge__icon bio-badge__icon--community",
    },
    {
      animationData: regulationAnim,
      text: t("about.badges.2"),
      iconClassName: "bio-badge__icon bio-badge__icon--regulated",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const index = Number((entry.target as HTMLElement).dataset.timelineIndex);
          if (Number.isNaN(index)) return;

          setVisibleTimelineItems((prev) => {
            if (prev.has(index)) return prev;
            const next = new Set(prev);
            next.add(index);
            return next;
          });
        });
      },
      {
        threshold: 0.3,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    timelineItemRefs.current.forEach((item) => {
      if (item) observer.observe(item);
    });

    return () => observer.disconnect();
  }, [timelineFromTranslation.length]);

  const maxVisibleIndex = visibleTimelineItems.size > 0 ? Math.max(...visibleTimelineItems) : -1;
  const timelineProgress =
    timelineFromTranslation.length > 1
      ? (Math.max(maxVisibleIndex, 0) / (timelineFromTranslation.length - 1)) * 100
      : 0;

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
                    <div className={b.iconClassName}>
                      <Lottie animationData={b.animationData} loop autoplay />
                    </div>
                    <span className="bio-badge__text">{b.text}</span>
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
          <div className="grid-2 hfm-features-grid">
            {hfmFeaturesFromTranslation.map((item, i) => (
              <div key={i} className="card hfm-feature-card">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
          <p className="hfm-partnership-note">
            {t("about.hfmPartnership.note")}
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="section timeline-section">
        <div className="container">
          <div className="section-tag">{t("about.timeline.tag")}</div>
          <h2 className="section-title">{t("about.timeline.title")}</h2>
          <div className="timeline">
            <div
              className="timeline-progress"
              style={{ "--progress": `${timelineProgress}%` } as CSSProperties}
              aria-hidden="true"
            />
            {timelineFromTranslation.map((item, i) => (
              <div
                key={i}
                ref={(el) => {
                  timelineItemRefs.current[i] = el;
                }}
                data-timeline-index={i}
                className={`timeline-item ${i % 2 === 0 ? "left" : "right"} ${
                  visibleTimelineItems.has(i) ? "is-visible" : ""
                }`}
                style={{ "--reveal-delay": `${i * 90}ms` } as CSSProperties}
              >
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
