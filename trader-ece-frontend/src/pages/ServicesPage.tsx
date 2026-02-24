import "./ServicesPage.css";
import type { NavigateFn } from "../App";

interface ServicesPageProps {
  navigate: NavigateFn;
}

interface Service {
  icon: string;
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
  icon: string;
  title: string;
  desc: string;
}

const services: Service[] = [
  {
    icon: "📡",
    title: "Telegram & WhatsApp Sinyal Grupları",
    color: "#0088cc",
    desc: "Özel sinyal gruplarımızda günlük ve haftalık piyasa analizleri, bültenler paylaşılmaktadır. Tüm içerikler bilgilendirme amaçlıdır; yatırım tavsiyesi veya bireysel danışmanlık niteliği taşımaz.",
    features: [
      "Günlük teknik analiz bültenleri",
      "Önemli ekonomik takvim takibi",
      "Piyasa haberleri ve yorumları",
      "Gerçek zamanlı bildirimler",
    ],
    disclaimer: "Bu içerikler yatırım tavsiyesi değildir. Kararlarınızı kendiniz alın.",
  },
  {
    icon: "🏦",
    title: "HFM Hesap Açılış Desteği",
    color: "#00d4e8",
    desc: "HFM (HF Markets) resmi IB ortağı olarak, HFM üzerinden hesap açılış sürecinizde rehberlik ve destek sunuyoruz. Hesap yönetimi veya fon yönetimi hizmeti verilmemektedir.",
    features: [
      "HFM hesap açılış rehberliği",
      "Platform (MT4/MT5) kurulum desteği",
      "Hesap tipi seçiminde bilgilendirme",
      "Para yatırma/çekme süreç desteği",
    ],
    disclaimer: "Hesabınız tamamen sizin kontrolünüzdedir. Fon yönetimi yapılmamaktadır.",
  },
  {
    icon: "📊",
    title: "Piyasa Analiz İçerikleri",
    color: "#a855f7",
    desc: "Teknik ve temel analiz içerikleri hazırlanarak bilgilendirme amacıyla paylaşılmaktadır. Bu içerikler alım/satım kararlarında tek başına kullanılmamalıdır.",
    features: [
      "Teknik analiz grafik paylaşımları",
      "Temel analiz özetleri",
      "Destek/direnç seviyeleri",
      "Ekonomik veri takibi",
    ],
    disclaimer: "Analizler geçmiş verilere dayalıdır; gelecek sonuçları garanti etmez.",
  },
];

const packages: Package[] = [
  {
    name: "Ücretsiz",
    price: "0",
    desc: "Başlangıç için temel bilgilendirme içerikleri",
    features: [
      "Genel piyasa haberleri",
      "Haftalık analiz özeti",
      "HFM hesap açılış desteği",
      "Platform bilgilendirmesi",
    ],
    cta: "Başla",
    highlighted: false,
  },
  {
    name: "Premium",
    price: "İletişime Geçin",
    desc: "Kapsamlı bilgilendirme içerikleri ve öncelikli destek",
    features: [
      "Günlük analiz bültenleri",
      "Özel Telegram grubu erişimi",
      "Öncelikli platform desteği",
      "Ekonomik takvim bildirimleri",
      "Aylık piyasa raporu",
    ],
    cta: "Bilgi Al",
    highlighted: true,
  },
];

const advantages: Advantage[] = [
  { icon: "🛡️", title: "Regüle Ortam", desc: "HFM'in uluslararası regüle altyapısı" },
  { icon: "⚡", title: "Hızlı Çekimler", desc: "HFM'in tanınan çekim hızı" },
  { icon: "🌍", title: "Global Erişim", desc: "Dünyanın her yerinden erişilebilir" },
  { icon: "📞", title: "Destek", desc: "Telegram ve e-posta ile hızlı yanıt" },
];

export default function ServicesPage({ navigate }: ServicesPageProps) {
  return (
    <div className="services-page">
      {/* Hero */}
      <section className="page-hero">
        <div className="page-hero__bg" />
        <div className="container">
          <div className="section-tag">Hizmetlerimiz</div>
          <h1 className="section-title" style={{ fontSize: "clamp(40px, 6vw, 64px)" }}>
            Sunduklarımız
          </h1>
          <p className="section-subtitle" style={{ fontSize: 18 }}>
            HFM IB ortağı olarak hesap desteği ve piyasa bilgilendirme
            içerikleri. Yatırım tavsiyesi verilmemektedir.
          </p>
        </div>
      </section>

      {/* Services Detail */}
      <section className="section">
        <div className="container">
          <div className="services-detail-list">
            {services.map((svc, i) => (
              <div key={i} className="service-detail-card card">
                <div className="sdc-header">
                  <div className="service-icon-lg" style={{ "--c": svc.color } as React.CSSProperties}>
                    {svc.icon}
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
          <div className="section-tag">Avantajlar</div>
          <h2 className="section-title">Neden Bizi Seçmelisiniz?</h2>
          <div className="grid-4" style={{ marginTop: 48 }}>
            {advantages.map((a, i) => (
              <div key={i} className="card adv-card">
                <div style={{ fontSize: 32, marginBottom: 12 }}>{a.icon}</div>
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
          <div className="section-tag">Paketler</div>
          <h2 className="section-title">İçerik Paketleri</h2>
          <p className="section-subtitle" style={{ marginBottom: 48 }}>
            Bilgilendirme ve analiz içeriklerine erişim paketleri.
          </p>
          <div className="packages-grid">
            {packages.map((pkg, i) => (
              <div key={i} className={`card package-card ${pkg.highlighted ? "highlighted" : ""}`}>
                {pkg.highlighted && (
                  <div className="package-badge">Önerilen</div>
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
            * Tüm içerikler bilgilendirme amaçlıdır. Yatırım tavsiyesi, portföy yönetimi
            veya bireysel danışmanlık hizmeti verilmemektedir. Forex işlemleri yüksek risk içerir.
          </div>
        </div>
      </section>
    </div>
  );
}
