import "./AboutPage.css";
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

const timeline: TimelineItem[] = [
  {
    year: "2009",
    title: "Forex Yolculuğu Başlıyor",
    desc: "Forex piyasalarına adım atıldı. Teknik ve temel analiz üzerine yoğun çalışma dönemi.",
  },
  {
    year: "2013",
    title: "İlk Profesyonel Adımlar",
    desc: "Sinyal grupları kuruldu. Piyasa analizleri paylaşılmaya başlandı. Topluluk büyüdü.",
  },
  {
    year: "2018",
    title: "Kurumsal Ortaklıklar",
    desc: "Uluslararası broker ortaklıkları kuruldu. IB faaliyetleri başladı.",
  },
  {
    year: "2021",
    title: "HFM IB Ortaklığı",
    desc: "HFM (HF Markets) ile resmi Introducing Broker ortaklığı başladı. Regüle ortama geçiş.",
  },
  {
    year: "2025",
    title: "Bugün",
    desc: "7M+ dolar aktif işlem hacmi, binlerce kullanıcıya HFM hesap desteği ve piyasa analiz içerikleri.",
  },
];

const hfmFeatures: HfmFeature[] = [
  { icon: "🌍", title: "Global Regülasyon", desc: "FCA, CySEC, DFSA, FSC ve daha fazlası tarafından regüle edilmiştir. Güvenilir kurumsal altyapı." },
  { icon: "⚡", title: "Hızlı Çekimler", desc: "HFM'in hızlı para çekme süreleri ile fonlarınıza hızla erişebilirsiniz." },
  { icon: "📱", title: "Güçlü Platform", desc: "MT4, MT5 ve HFM'e özel platformlar. Mobil ve masaüstü uyumlu." },
  { icon: "🔒", title: "Fon Güvenliği", desc: "Müşteri fonları ayrı hesaplarda tutulur. Düzenleyici kurumların denetimine tabidir." },
  { icon: "📊", title: "Geniş Araç Yelpazesi", desc: "Forex, altın, endeksler, hisseler ve daha fazlası. Tek bir platformda." },
  { icon: "🎓", title: "Eğitim Kaynakları", desc: "HFM'in resmi eğitim içerikleri ve piyasa araştırmaları." },
];

const bioBadges: BioBadge[] = [
  { icon: "🏦", text: "HFM Resmi IB Ortağı" },
  { icon: "📡", text: "Aktif Sinyal Toplulukları" },
  { icon: "🛡️", text: "Regüle Edilmiş Ortam" },
];

export default function AboutPage({ navigate }: AboutPageProps) {
  return (
    <div className="about-page">
      {/* Hero */}
      <section className="page-hero">
        <div className="page-hero__bg" />
        <div className="container">
          <div className="section-tag" style={{ marginTop: 150 }}>Hakkımızda</div>
          <h1 className="section-title" style={{ fontSize: "clamp(40px, 6vw, 64px)" }}>
            Kim Olduğumuzu
            <br />
            <span className="highlight">Tanıyın</span>
          </h1>
          <p className="section-subtitle" style={{ fontSize: 18 }}>
            15+ yıllık piyasa deneyimi, 4+ yıllık HFM ortaklığı. HFM resmi
            IB/Affiliate sıfatıyla hizmet vermekteyiz.
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
                  <span className="bio-years">15+</span>
                  <span className="bio-years-label">Yıl Deneyim</span>
                </div>
              </div>
              <div className="bio-badges">
                {bioBadges.map((b, i) => (
                  <div key={i} className="bio-badge">
                    <span>{b.icon}</span> {b.text}
                  </div>
                ))}
              </div>
            </div>

            <div className="about-bio-content">
              <div className="section-tag">Biyografi</div>
              <h2 className="section-title" style={{ fontSize: "clamp(28px, 4vw, 42px)" }}>
                Deneyim ve Güven
              </h2>
              <p className="about-text">
                2009 yılından bu yana Forex piyasalarında aktif olarak bulunmaktayım.
                Yıllar içinde teknik analiz, temel analiz ve piyasa psikolojisi konularında
                derinlemesine bilgi birikimine ulaştım.
              </p>
              <p className="about-text">
                2021 yılından itibaren <strong>HFM (HF Markets)</strong> ile resmi Introducing
                Broker (IB) ve affiliate ortağı olarak çalışmaktayım. Bu sıfatla; HFM hesap
                açılışı süreçlerinde destek, platform bilgilendirmesi ve piyasa analiz içerikleri
                sunmaktayım.
              </p>
              <p className="about-text">
                <strong style={{ color: "var(--accent)" }}>Önemli Not:</strong> Sunulan içerikler
                ve analizler yatırım tavsiyesi, portföy yönetimi veya bireysel yatırım danışmanlığı
                niteliği taşımamaktadır. Yalnızca bilgilendirme amaçlıdır.
              </p>
              <button className="btn btn-primary" style={{ marginTop: 24 }} onClick={() => navigate("contact")}>
                İletişime Geç
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* HFM Section */}
      <section className="section hfm-about-section">
        <div className="container">
          <div className="section-tag">Neden HFM?</div>
          <h2 className="section-title">HFM ile Ortaklık</h2>
          <p className="section-subtitle" style={{ marginBottom: 48 }}>
            HFM, küresel çapta güvenilir ve regüle edilmiş bir forex brokerıdır.
            IB ortağı olarak size bu güvenilir altyapıyı sunuyoruz.
          </p>
          <div className="grid-3">
            {hfmFeatures.map((item, i) => (
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
          <div className="section-tag">Tarihçemiz</div>
          <h2 className="section-title">Yolculuğumuz</h2>
          <div className="timeline">
            {timeline.map((item, i) => (
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
