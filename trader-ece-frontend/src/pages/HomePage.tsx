import { useEffect, useRef, useState } from "react";
import "./HomePage.css";
import type { NavigateFn } from "../App";

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
  icon: string;
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
}

interface Testimonial {
  name: string;
  text: string;
  role: string;
}

const services: ServiceCard[] = [
  {
    icon: "📡",
    title: "Telegram & WhatsApp Grupları",
    desc: "Özel sinyal gruplarımız aracılığıyla gerçek zamanlı piyasa analizleri ve bültenler. Yatırım tavsiyesi niteliği taşımaz.",
    color: "#0088cc",
  },
  {
    icon: "🏦",
    title: "HFM IB Ortaklığı",
    desc: "HFM (HF Markets) resmi Introducing Broker ortağı olarak hesap açılışı ve platform desteği sağlıyoruz.",
    color: "#00d4e8",
  },
  {
    icon: "🛡️",
    title: "Regüle Edilmiş Ortam",
    desc: "HFM, birden fazla uluslararası otorite tarafından regüle edilmiş küresel bir broker'dır.",
    color: "#c9a84c",
  },
  {
    icon: "📊",
    title: "Piyasa Analizleri",
    desc: "Teknik ve temel analiz içerikleri. Tüm içerikler bilgilendirme amaçlıdır, yatırım tavsiyesi değildir.",
    color: "#a855f7",
  },
];

const stats: StatItem[] = [
  { label: "Yıl Deneyim", value: 15, suffix: "+" },
  { label: "Aktif Hacim ($)", value: 7, prefix: "", suffix: "M+" },
  { label: "Çekim Hacmi ($)", value: 4.6, suffix: "M+", isFloat: true },
  { label: "HFM Ortaklığı (Yıl)", value: 4, suffix: "+" },
];

const testimonials: Testimonial[] = [
  {
    name: "Ahmet K.",
    text: "HFM hesabımı bu sayede açtım. Platform desteği ve analizler için teşekkürler.",
    role: "Trader",
  },
  {
    name: "Zeynep M.",
    text: "Telegram grubundaki analizler piyasayı takip etmemi kolaylaştırdı. Kaliteli içerik.",
    role: "Yatırımcı",
  },
];

const hfmFeatures: string[] = [
  "Uluslararası regülasyon (FCA, CySEC, DFSA ve daha fazlası)",
  "Hızlı para çekme işlemleri",
  "Geniş işlem araçları yelpazesi",
  "Güvenli müşteri fonu ayrımı",
];

const regAuthorities: string[] = ["FCA", "CySEC", "DFSA", "FSC"];

export default function HomePage({ navigate }: HomePageProps) {
  return (
    <div className="home">
      {/* Hero */}
      <section className="hero">
        <div className="hero__bg">
          <div className="glow" style={{ width: 600, height: 600, background: "rgba(0,212,232,0.06)", top: -100, right: -100 }} />
          <div className="glow" style={{ width: 400, height: 400, background: "rgba(30,30,34,0.6)", bottom: -50, left: -100 }} />
          <div className="hero__grid" />
        </div>

        <div className="container hero__content">
          <div className="hero__badge">
            <span className="badge-dot" /> TRADER ECE – HFM Resmi IB &amp; Affiliate Partner
          </div>
          <h1 className="hero__title">
            Forex Piyasalarında
            <br />
            <span className="highlight">Bilinçli Adımlar</span>
            <br />
            Atın
          </h1>
          <p className="hero__subtitle">
            15+ yıllık piyasa deneyimi ile HFM güvencesinde. Regüle edilmiş
            ortamda hesap açılışı ve sinyal grupları. Yatırım danışmanlığı
            verilmemektedir.
          </p>
          <div className="hero__actions">
            <a href="https://t.me/" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.833.941z" />
              </svg>
              Telegram Grubuna Katıl
            </a>
            <button className="btn btn-outline" onClick={() => navigate("contact")}>
              Bilgi Al
            </button>
          </div>
          <div className="hero__trust">
            {["Regüle Edilmiş Broker", "15+ Yıl Deneyim", "7M$ Aktif Hacim"].map((item) => (
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
                <div className="stat-value">
                  {s.isFloat ? (
                    <span>{s.prefix}{s.value}{s.suffix}</span>
                  ) : (
                    <AnimatedCounter end={s.value} suffix={s.suffix} prefix={s.prefix ?? ""} />
                  )}
                </div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="section services-overview">
        <div className="container">
          <div className="section-header">
            <div className="section-tag">Hizmetlerimiz</div>
            <h2 className="section-title">Neler Sunuyoruz?</h2>
            <p className="section-subtitle">
              HFM IB ortağı olarak hesap desteği ve bilgilendirme hizmetleri.
              Tüm içerikler bilgilendirme amaçlıdır.
            </p>
          </div>
          <div className="grid-2 services-grid">
            {services.map((s, i) => (
              <div key={i} className="card service-card">
                <div className="service-icon" style={{ "--c": s.color } as React.CSSProperties}>
                  {s.icon}
                </div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="services-cta">
            <button className="btn btn-outline" onClick={() => navigate("services")}>
              Tüm Hizmetleri Gör →
            </button>
          </div>
        </div>
      </section>

      {/* HFM Trust */}
      <section className="section hfm-section">
        <div className="container">
          <div className="hfm-inner">
            <div className="hfm-content">
              <div className="section-tag">Neden HFM?</div>
              <h2 className="section-title">Küresel &amp; Regüle Bir Broker</h2>
              <p style={{ color: "var(--gray)", lineHeight: 1.7, marginBottom: 24 }}>
                HFM (HF Markets), 2010'dan bu yana faaliyet gösteren ve birden
                fazla uluslararası finansal otorite tarafından regüle edilmiş
                küresel bir forex ve CFD brokerıdır. Hızlı çekim süreleri ve
                güvenilir altyapısı ile tanınmaktadır.
              </p>
              <ul className="hfm-features">
                {hfmFeatures.map((f, i) => (
                  <li key={i}>
                    <span className="check">✓</span> {f}
                  </li>
                ))}
              </ul>
              <a href="https://www.hfm.com" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                HFM Hakkında Daha Fazla →
              </a>
            </div>
            <div className="hfm-visual">
              <div className="hfm-badge-large">
                <div className="hfm-logo-text">HFM</div>
                <div className="hfm-tagline">HF Markets Group</div>
                <div className="hfm-reg">Regüle Edilmiş Broker</div>
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
        <div className="container">
          <div className="section-tag">Kullanıcı Görüşleri</div>
          <h2 className="section-title">Ne Diyorlar?</h2>
          <div className="grid-2" style={{ marginTop: 48 }}>
            {testimonials.map((t, i) => (
              <div key={i} className="card testimonial-card">
                <div className="testimonial-stars">★★★★★</div>
                <p className="testimonial-text">"{t.text}"</p>
                <div className="testimonial-author">
                  <div className="author-avatar">{t.name[0]}</div>
                  <div>
                    <strong>{t.name}</strong>
                    <span>{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="cta-banner">
        <div className="container">
          <div className="cta-banner__inner">
            <div>
              <h2>HFM Hesabı Açmak İster misiniz?</h2>
              <p>Destek ve bilgilendirme için bizimle iletişime geçin.</p>
            </div>
            <div className="cta-banner__actions">
              <a href="https://t.me/" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                Telegram'dan Ulaş
              </a>
              <button className="btn btn-outline" onClick={() => navigate("contact")}>
                İletişim Formu
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
