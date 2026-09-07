import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import "./HomePage.css";
import type { NavigateFn } from "../App";
import DeferredLottie from "../components/DeferredLottie";
import DeferredBackgroundVideo from "../components/DeferredBackgroundVideo";
import TickerTape from "./TickerTape";
import Testimonals from "./Testimonals/Testimonals";
import { getBrokerLinks } from "../utils/brokerLinks";
import BrokerAccountAction from "../components/BrokerAccountAction";

interface HomePageProps {
  navigate: NavigateFn;
}

interface CounterProps {
  end: number;
  suffix?: string;
  prefix?: string;
}

function AnimatedCounter({ end, suffix = "", prefix = "" }: CounterProps) {
  const [count, setCount] = useState<number>(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef<boolean>(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const duration = 1800;
        const steps = 60;
        const increment = end / steps;
        let current = 0;
        const timer = setInterval(() => {
          current += increment;
          if (current >= end) {
            setCount(end);
            clearInterval(timer);
          } else {
            setCount(Math.floor(current));
          }
        }, duration / steps);
      }
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end]);

  return (
    <span ref={ref}>
      {prefix}{count.toLocaleString("tr-TR")}{suffix}
    </span>
  );
}

interface ServiceCard {
  loadAnimation: () => Promise<{ default: object }>;
  title: string;
  desc: string;
  color: string;
}

interface StatItem {
  label: string;
  value: number;
  suffix: string;
  prefix?: string;
  isFloat?: boolean;
  secondaryValue?: string;
  secondaryLabel?: string;
}

export default function HomePage({ navigate }: HomePageProps) {
  const { t, i18n } = useTranslation();
  const language = i18n.language || "en";
  const { tickmillLink, hfmLink } = getBrokerLinks(language);
  const isTurkish = language.toLowerCase().startsWith("tr");

  const services: ServiceCard[] = [
    {
      loadAnimation: () => import("../assets/social-signal.json"),
      title: t("home.services.cards.0.title"),
      desc: t("home.services.cards.0.desc"),
      color: "#0088cc",
    },
    {
      loadAnimation: () => import("../assets/partnership.json"),
      title: t("home.services.cards.1.title"),
      desc: t("home.services.cards.1.desc"),
      color: "#b68a44",
    },
    {
      loadAnimation: () => import("../assets/global.json"),
      title: t("home.services.cards.2.title"),
      desc: t("home.services.cards.2.desc"),
      color: "#c9a84c",
    },
    {
      loadAnimation: () => import("../assets/people-analyzing-growth-charts.json"),
      title: t("home.services.cards.3.title"),
      desc: t("home.services.cards.3.desc"),
      color: "#a855f7",
    },
    {
      loadAnimation: () => import("../assets/award.json"),
      title: t("home.services.cards.4.title"),
      desc: t("home.services.cards.4.desc"),
      color: "#f59e0b",
    },
  ];

  const stats: StatItem[] = [
    { label: t("home.stats.experience"), value: 15, suffix: "+" },
    { label: t("home.stats.volume"), value: 8.5, prefix: "", suffix: "M+", isFloat: true },
    { label: t("home.stats.withdrawals"), value: 6.7, suffix: "M+", isFloat: true },
    {
      label: t("home.stats.partnership"),
      value: 2,
      prefix: "+",
      suffix: "",
      secondaryValue: "+5",
      secondaryLabel: t("home.stats.hfmPartnership"),
    },
  ];

  const hfmFeatures: string[] = [
    t("home.hfmTrust.features.0"),
    t("home.hfmTrust.features.1"),
    t("home.hfmTrust.features.2"),
    t("home.hfmTrust.features.3"),
  ];

  const regAuthorities: string[] = [
    t("home.regulators.fca"),
    t("home.regulators.cysec"),
    t("home.regulators.dfsa"),
    t("home.regulators.fsc"),
  ];

  const trustItems = [
    t("home.trust.title"),
    t("home.trust.item1"),
    t("home.trust.item2"),
  ];

  return (
    <div className="home">
      {/* Hero */}
      <section className="hero">
        <div className="hero__bg">
          <div className="hero__stars" />
          <div className="glow" style={{ width: 600, height: 600, background: "rgba(182,138,68,0.08)", top: -100, right: -100 }} />
          <div className="glow" style={{ width: 400, height: 400, background: "rgba(30,30,34,0.6)", bottom: -50, left: -100 }} />
          <div className="hero__grid" />
        </div>

        <div className="container hero__content">
          <div className="hero__badge">
            <span className="badge-dot" /> {t("home.badge")}
          </div>
          <h1 className="hero__title">
            <span className="highlight">{t("home.hero.titleHighlight")}</span>
          </h1>
          <div className={`hero__mobile-logos ${isTurkish ? "hero__mobile-logos--single" : ""}`} aria-label="Broker logos">
            <a href={tickmillLink} target="_blank" rel="noopener noreferrer" className="hero__mobile-logo-link">
              <img src="/TickmillLogo.png" alt="Tickmill" className="hero__mobile-logo hero__mobile-logo--tickmill" />
            </a>
            {!isTurkish && (
              <a href={hfmLink} target="_blank" rel="noopener noreferrer" className="hero__mobile-logo-link">
                <img src="/HfmLogo.jpg" alt="HFM" className="hero__mobile-logo hero__mobile-logo--hfm" />
              </a>
            )}
          </div>
          <p className="hero__subtitle">
            {t("home.hero.subtitle")}
          </p>
          <p className="hero__risk-note">
            {t("home.hero.riskNote", { defaultValue: "(75% of retail traders lose money.)" })}
          </p>
          <div className="hero__actions">
            <a href="https://t.me/tradereceteam" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.833.941z" />
              </svg>
              <span className="btn-label-full">{t("home.buttons.telegramTraderEce")}</span>
              <span className="btn-label-short">Trader ECE</span>
            </a>
            <a href="https://t.me/bullexardav" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.833.941z" />
              </svg>
              <span className="btn-label-full">{t("home.buttons.telegramBullex")}</span>
              <span className="btn-label-short">Bullex</span>
            </a>
            <button className="btn btn-outline" onClick={() => navigate("contact")}>
              {t("home.buttons.info")}
            </button>
          </div>
          <div className="hero__trust">
            {trustItems.map((item) => (
              <div key={item} className="trust-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            {stats.map((s, i) => (
              <div key={i} className="stat-card">
                {s.secondaryValue && s.secondaryLabel ? (
                  <div className="stat-partnership-pair">
                    <div className="stat-secondary">
                      <div className="stat-value">{s.secondaryValue}</div>
                      <div className="stat-label">{s.secondaryLabel}</div>
                    </div>
                    <div>
                      <div className="stat-value">
                        <AnimatedCounter end={s.value} suffix={s.suffix} prefix={s.prefix ?? ""} />
                      </div>
                      <div className="stat-label">{s.label}</div>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="stat-value">
                      {s.isFloat ? (
                        <span>{s.prefix}{s.value}{s.suffix}</span>
                      ) : (
                        <AnimatedCounter end={s.value} suffix={s.suffix} prefix={s.prefix ?? ""} />
                      )}
                    </div>
                    <div className="stat-label">{s.label}</div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <TickerTape />

      {/* Services Overview */}
      <section className="section services-overview">
        <div className="container">
          <div className="section-header">
            <div className="section-tag">{t("home.services.tag")}</div>
            <h2 className="section-title">{t("home.services.title")}</h2>
            <p className="section-subtitle">
              {t("home.services.subtitle")}
            </p>
          </div>
          <div className="grid-2 services-grid">
            {services.map((s, i) => (
              <div key={i} className="card service-card">
                <div className="service-icon" style={{ "--c": s.color } as React.CSSProperties}>
                  <DeferredLottie loadAnimation={s.loadAnimation} style={{ width: 68, height: 68 }} />
                </div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}

            <button
              type="button"
              className="card service-card service-card--cta"
              onClick={() => navigate("services")}
            >
              <div className="service-icon" style={{ "--c": "#d6b06a" } as React.CSSProperties}>
                <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M5 12h14" strokeLinecap="round" />
                  <path d="m12 5 7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3>{t("home.services.viewAll")}</h3>
              <p>{t("home.services.viewAllDesc")}</p>
            </button>
          </div>
        </div>
      </section>

      {/* HFM Trust */}
      <section className="section hfm-section">
        <DeferredBackgroundVideo src="/trader-ece-intro.mp4" className="hfm-section__video" />
        <div className="container">
          <div className="hfm-inner">
            <div className="hfm-content">
              <div className="section-tag">{t("home.hfmTrust.tag")}</div>
              <h2 className="section-title">{t("home.hfmTrust.title")}</h2>
              <p style={{ color: "var(--gray)", lineHeight: 1.7, marginBottom: 24 }}>
                {t("home.hfmTrust.desc")}
              </p>
              <ul className="hfm-features">
                {hfmFeatures.map((f, i) => (
                  <li key={i}>
                    <span className="check">✓</span> {f}
                  </li>
                ))}
              </ul>
              <div className="broker-actions">
                <BrokerAccountAction broker="tickmill" accountLink={tickmillLink} className="btn btn-primary">
                  {t("home.hfmTrust.moreLink")}
                </BrokerAccountAction>
                {!isTurkish && (
                  <BrokerAccountAction broker="hfm" accountLink={hfmLink} className="btn btn-outline">
                    {t("home.hfmTrust.hfmLink")}
                  </BrokerAccountAction>
                )}
              </div>
              <p className="broker-note">{t("home.hfmTrust.vpnNote")}</p>
            </div>
            <div className="hfm-visual">
              <div className="hfm-badge-large">
                <div className="hfm-logo-plate">
                  <img src="/TickmillLogo.png" alt={t("home.hfmBadge.text")} className="hfm-logo-image" />
                </div>
                <div className="hfm-tagline">{t("home.hfmBadge.tagline")}</div>
                <div className="hfm-reg">{t("home.hfmBadge.desc")}</div>
              </div>
              <div className="hfm-reg-items">
                {regAuthorities.map((r) => (
                  <div key={r} className="reg-badge">{r}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section testimonials-section">
          <Testimonals/>
      </section>

      {/* CTA Banner */}
      <section className="cta-banner">
        <div className="container">
          <div className="cta-banner__inner">
            <div>
              <h2>{t("home.cta.title")}</h2>
              <p>{t("home.cta.subtitle")}</p>
            </div>
            <div className="cta-banner__actions">
              <a href="https://t.me/" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                {t("home.cta.telegramBtn")}
              </a>
              <button className="btn btn-outline" onClick={() => navigate("contact")}>
                {t("home.cta.formBtn")}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
