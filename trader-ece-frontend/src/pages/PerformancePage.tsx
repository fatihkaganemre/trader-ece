import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import "./PerformancePage.css";
import type { NavigateFn } from "../App";
import { getBrokerLinks } from "../utils/brokerLinks";

interface PerformancePageProps {
  navigate: NavigateFn;
}

interface MetricItem {
  value: string;
  suffix: string;
  prefix: string;
  label: string;
  note: string;
}

interface CounterCardProps extends MetricItem {}

interface ProcessStep {
  step: string;
  title: string;
  desc: string;
}

interface RegAuthority {
  abbr: string;
  full: string;
}

function CounterCard({ value, suffix, prefix, label, note }: CounterCardProps) {
  const [count, setCount] = useState<number>(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef<boolean>(false);
  const numEnd = parseFloat(value);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const duration = 1800;
        const steps = 60;
        const increment = numEnd / steps;
        let current = 0;
        const timer = setInterval(() => {
          current += increment;
          if (current >= numEnd) {
            setCount(numEnd);
            clearInterval(timer);
          } else {
            setCount(current);
          }
        }, duration / steps);
      }
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [numEnd]);

  const display = Number.isInteger(numEnd)
    ? Math.floor(count).toLocaleString("tr-TR")
    : count.toFixed(1);

  return (
    <div ref={ref} className="counter-card card">
      <div className="counter-value">
        {prefix}{display}{suffix}
      </div>
      <div className="counter-label">{label}</div>
      {note && <div className="counter-note">{note}</div>}
    </div>
  );
}

export default function PerformancePage({ navigate }: PerformancePageProps) {
  const { t, i18n } = useTranslation();
  const { tickmillLink, hfmLink, isHfmAllowed } = getBrokerLinks(i18n.language);

  const metricsFromTranslation: MetricItem[] = [
    {
      value: "15",
      suffix: t("performance.metrics.0.suffix"),
      prefix: t("performance.metrics.0.prefix"),
      label: t("performance.metrics.0.label"),
      note: t("performance.metrics.0.note"),
    },
    {
      value: "7",
      suffix: t("performance.metrics.1.suffix"),
      prefix: t("performance.metrics.1.prefix"),
      label: t("performance.metrics.1.label"),
      note: t("performance.metrics.1.note"),
    },
    {
      value: "4.6",
      suffix: t("performance.metrics.2.suffix"),
      prefix: t("performance.metrics.2.prefix"),
      label: t("performance.metrics.2.label"),
      note: t("performance.metrics.2.note"),
    },
    {
      value: "4",
      suffix: t("performance.metrics.3.suffix"),
      prefix: t("performance.metrics.3.prefix"),
      label: t("performance.metrics.3.label"),
      note: t("performance.metrics.3.note"),
    },
  ];

  const processStepsFromTranslation: ProcessStep[] = [
    {
      step: t("performance.process.steps.0.number"),
      title: t("performance.process.steps.0.title"),
      desc: t("performance.process.steps.0.desc"),
    },
    {
      step: t("performance.process.steps.1.number"),
      title: t("performance.process.steps.1.title"),
      desc: t("performance.process.steps.1.desc"),
    },
    {
      step: t("performance.process.steps.2.number"),
      title: t("performance.process.steps.2.title"),
      desc: t("performance.process.steps.2.desc"),
    },
  ];

  const regAuthoritiesFromTranslation: RegAuthority[] = [
    {
      abbr: t("performance.hfmPartnership.authorities.fca"),
      full: t("performance.hfmPartnership.authorities.fca"),
    },
    {
      abbr: t("performance.hfmPartnership.authorities.cysec"),
      full: t("performance.hfmPartnership.authorities.cysec"),
    },
    {
      abbr: t("performance.hfmPartnership.authorities.dfsa"),
      full: t("performance.hfmPartnership.authorities.dfsa"),
    },
    {
      abbr: t("performance.hfmPartnership.authorities.fsc"),
      full: t("performance.hfmPartnership.authorities.fsc"),
    },
  ];
  return (
    <div className="performance-page">
      {/* Hero */}
      <section className="page-hero">
        <div className="page-hero__bg" />
        <div className="container">
          <div className="section-tag">{t("performance.tag")}</div>
          <h1 className="section-title" style={{ fontSize: "clamp(40px, 6vw, 64px)" }}>
            {t("performance.hero.title1")}
            <br />
            <span className="highlight">{t("performance.hero.title2")}</span>
          </h1>
          <p className="section-subtitle" style={{ fontSize: 18 }}>
            {t("performance.hero.subtitle")}
          </p>
        </div>
      </section>

      {/* Counters */}
      <section className="section">
        <div className="container">
          <div className="grid-4 counters-grid">
            {metricsFromTranslation.map((m, i) => (
              <CounterCard key={i} {...m} />
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <div className="container">
        <div className="perf-disclaimer">
          <span>⚠️</span>
          <div>
            <strong>{t("performance.disclaimer")}</strong> {t("performance.disclaimerText")}
          </div>
        </div>
      </div>

      {/* Process */}
      <section className="section">
        <div className="container">
          <div className="section-tag">{t("performance.process.tag")}</div>
          <h2 className="section-title">{t("performance.process.title")}</h2>
          <p className="section-subtitle" style={{ marginBottom: 56 }}>
            {t("performance.process.subtitle")}
          </p>
          <div className="grid-3">
            {processStepsFromTranslation.map((s, i) => (
              <div key={i} className="card process-card">
                <div className="process-step">{s.step}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HFM Partnership */}
      <section className="section hfm-proof-section">
        <div className="container">
          <div className="hfm-proof-grid">
            <div>
              <div className="section-tag">{t("performance.hfmPartnership.tag")}</div>
              <h2 className="section-title" style={{ fontSize: "clamp(28px, 4vw, 42px)" }}>
                {t("performance.hfmPartnership.title")}
              </h2>
              <p className="about-text">
                {t("performance.hfmPartnership.desc1")}
              </p>
              <p className="about-text">
                {t("performance.hfmPartnership.desc2")}
              </p>
              <div className="broker-actions">
                <a
                  href={tickmillLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  {t("performance.hfmPartnership.regulationLink")}
                </a>
                {isHfmAllowed && hfmLink && (
                  <a
                    href={hfmLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline"
                  >
                    {t("performance.hfmPartnership.hfmLink")}
                  </a>
                )}
              </div>
              {isHfmAllowed && <p className="broker-note">{t("performance.hfmPartnership.vpnNote")}</p>}
            </div>
            <div className="reg-logos">
              {regAuthoritiesFromTranslation.map((r, i) => (
                <div key={i} className="reg-logo-card card">
                  <div className="reg-logo-abbr">{r.abbr}</div>
                  <div className="reg-logo-full">{r.full}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-banner">
        <div className="container">
          <div className="cta-banner__inner">
            <div>
              <h2>{t("performance.cta.title")}</h2>
              <p>{t("performance.cta.subtitle")}</p>
            </div>
            <div className="cta-banner__actions">
              <button className="btn btn-primary" onClick={() => navigate("contact")}>
                {t("performance.cta.button")}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
