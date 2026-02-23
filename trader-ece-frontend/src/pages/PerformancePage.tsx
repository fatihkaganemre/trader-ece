import { useEffect, useRef, useState } from "react";
import "./PerformancePage.css";
import type { NavigateFn } from "../App";

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

const metrics: MetricItem[] = [
  { value: "15", suffix: "+", prefix: "", label: "Yıl Piyasa Deneyimi", note: "2009'dan bu yana aktif" },
  { value: "7", suffix: "M+", prefix: "$", label: "Aktif Hacim", note: "IB üzerinden takip edilen toplam hacim" },
  { value: "4.6", suffix: "M+", prefix: "$", label: "Çekim Hacmi", note: "HFM kanalıyla gerçekleşen çekimler" },
  { value: "4", suffix: "+", prefix: "", label: "HFM Ortaklık Yılı", note: "Resmi IB ortaklığı" },
];

const processSteps: ProcessStep[] = [
  {
    step: "01",
    title: "HFM Hesap Desteği",
    desc: "Kullanıcılar HFM üzerinden hesap açarken rehberlik sağlıyoruz. Hesap kontrolü tamamen kullanıcıdadır.",
  },
  {
    step: "02",
    title: "İçerik Paylaşımı",
    desc: "Telegram ve WhatsApp gruplarında piyasa analiz içerikleri paylaşılır. Bunlar yatırım tavsiyesi değildir.",
  },
  {
    step: "03",
    title: "Destek",
    desc: "Platform kullanımı ve HFM süreçleri hakkında teknik destek sağlanır.",
  },
];

const regAuthorities: RegAuthority[] = [
  { abbr: "FCA", full: "Financial Conduct Authority" },
  { abbr: "CySEC", full: "Cyprus Securities & Exchange" },
  { abbr: "DFSA", full: "Dubai Financial Services" },
  { abbr: "FSC", full: "Financial Services Commission" },
];

export default function PerformancePage({ navigate }: PerformancePageProps) {
  return (
    <div className="performance-page">
      {/* Hero */}
      <section className="page-hero">
        <div className="page-hero__bg" />
        <div className="container">
          <div className="section-tag" style={{ marginTop: 150 }}>Performans &amp; Rakamlar</div>
          <h1 className="section-title" style={{ fontSize: "clamp(40px, 6vw, 64px)" }}>
            Rakamlarla
            <br />
            <span className="highlight">Kanıtlanmış Deneyim</span>
          </h1>
          <p className="section-subtitle" style={{ fontSize: 18 }}>
            15+ yıllık piyasa pratiğimiz ve HFM üzerinden takip edilen hacimler.
            Geçmiş veriler gelecek performansı garanti etmez.
          </p>
        </div>
      </section>

      {/* Counters */}
      <section className="section">
        <div className="container">
          <div className="grid-4 counters-grid">
            {metrics.map((m, i) => (
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
            <strong>Önemli Not:</strong> Yukarıdaki rakamlar yalnızca bilgilendirme amaçlıdır ve geçmiş
            verileri yansıtmaktadır. Bu rakamlar gelecekteki performans veya getiriyi garanti etmez.
            Forex işlemleri yüksek risk içermekte olup yatırım yapmadan önce bağımsız
            finansal danışmana başvurulması tavsiye edilir.
          </div>
        </div>
      </div>

      {/* Process */}
      <section className="section">
        <div className="container">
          <div className="section-tag">Süreç</div>
          <h2 className="section-title">Nasıl Çalışıyoruz?</h2>
          <p className="section-subtitle" style={{ marginBottom: 56 }}>
            HFM IB ortağı olarak yürüttüğümüz faaliyetler.
          </p>
          <div className="grid-3">
            {processSteps.map((s, i) => (
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
              <div className="section-tag">HFM Ortaklığı</div>
              <h2 className="section-title" style={{ fontSize: "clamp(28px, 4vw, 42px)" }}>
                Neden HFM?
              </h2>
              <p className="about-text">
                HFM (HF Markets) birden fazla uluslararası düzenleyici kurum
                tarafından lisanslanmış küresel bir broker'dır. IB ortağı
                olarak yalnızca HFM üzerinden hesap açılışı süreçlerine
                aracılık ediyor ve bilgilendirme sunuyoruz.
              </p>
              <p className="about-text">
                Fon yönetimi, portföy yönetimi veya bireysel yatırım danışmanlığı
                yapılmamaktadır.
              </p>
              <a
                href="https://www.hfm.com/regulation"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                HFM Regülasyon Bilgisi →
              </a>
            </div>
            <div className="reg-logos">
              {regAuthorities.map((r, i) => (
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
              <h2>HFM Hesabı Açmak İster misiniz?</h2>
              <p>IB ortağı olarak hesap sürecinizde yardımcı olalım.</p>
            </div>
            <div className="cta-banner__actions">
              <button className="btn btn-primary" onClick={() => navigate("contact")}>
                İletişime Geç
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
