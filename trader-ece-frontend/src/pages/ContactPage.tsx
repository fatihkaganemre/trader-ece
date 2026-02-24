import { useState, ChangeEvent, FormEvent } from "react";
import "./ContactPage.css";

interface FormState {
  name: string;
  email: string;
  topic: string;
  message: string;
}

interface ContactChannel {
  href: string;
  color: string;
  title: string;
  subtitle: string;
  linkLabel: string;
  icon: React.ReactNode;
}

const telegramIcon = (
  <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.833.941z" />
  </svg>
);

const whatsappIcon = (
  <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const emailIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="28" height="28">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const channels: ContactChannel[] = [
  {
    href: "https://t.me/",
    color: "#0088cc",
    title: "Telegram Grubum",
    subtitle: "Sinyal ve analiz kanalına katıl",
    linkLabel: "t.me/kanalınız →",
    icon: telegramIcon,
  },
  {
    href: "https://t.me/",
    color: "#0088cc",
    title: "Telegram Grubu (Eş)",
    subtitle: "İkinci kanal için buraya tıkla",
    linkLabel: "t.me/ikincikanal →",
    icon: telegramIcon,
  },
  {
    href: "https://wa.me/",
    color: "#25d366",
    title: "WhatsApp",
    subtitle: "WhatsApp üzerinden mesaj gönder",
    linkLabel: "wa.me/numaranız →",
    icon: whatsappIcon,
  },
  {
    href: "mailto:info@example.com",
    color: "#00d4e8",
    title: "E-posta",
    subtitle: "Detaylı sorularınız için",
    linkLabel: "info@example.com →",
    icon: emailIcon,
  },
];

export default function ContactPage() {
  const [form, setForm] = useState<FormState>({ name: "", email: "", topic: "", message: "" });
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="contact-page">
      {/* Hero */}
      <section className="page-hero">
        <div className="page-hero__bg" />
        <div className="container">
          <div className="section-tag">İletişim</div>
          <h1 className="section-title" style={{ fontSize: "clamp(40px, 6vw, 64px)" }}>
            Bize Ulaşın
          </h1>
          <p className="section-subtitle" style={{ fontSize: 18 }}>
            HFM hesap açılışı, platform desteği ve bilgilendirme için bizimle
            iletişime geçin.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="contact-grid">
            {/* Contact Info */}
            <div className="contact-info">
              <div className="section-tag">İletişim Kanalları</div>
              <h2 className="section-title" style={{ fontSize: "clamp(26px, 3vw, 36px)", marginBottom: 32 }}>
                Nasıl Ulaşırsınız?
              </h2>

              <div className="contact-channels">
                {channels.map((ch, i) => (
                  <a key={i} href={ch.href} target="_blank" rel="noopener noreferrer" className="channel-card card">
                    <div className="channel-icon" style={{ "--c": ch.color } as React.CSSProperties}>
                      {ch.icon}
                    </div>
                    <div>
                      <h3>{ch.title}</h3>
                      <p>{ch.subtitle}</p>
                      <span className="channel-link">{ch.linkLabel}</span>
                    </div>
                  </a>
                ))}
              </div>

              <div className="hfm-open-account">
                <div className="hoa-content">
                  <div className="hoa-logo">HFM</div>
                  <div>
                    <h4>HFM'de Hesap Aç</h4>
                    <p>IB bağlantımız üzerinden resmi HFM hesabınızı açın</p>
                  </div>
                </div>
                <a href="https://register.hfm-trade.com/sv/en/new-live-account/?refid=365189&acid=h4ywf710tx" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                  HFM'e Git →
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <div className="contact-form-wrap">
              {!submitted ? (
                <div className="card contact-form-card">
                  <h3>Mesaj Gönder</h3>
                  <p className="form-subtitle">
                    HFM hesabı, platform veya analiz içerikleri hakkında sorularınızı gönderin.
                  </p>
                  <form onSubmit={handleSubmit} className="contact-form">
                    <div className="form-group">
                      <label>Ad Soyad *</label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        placeholder="Adınız Soyadınız"
                        className="form-input"
                      />
                    </div>
                    <div className="form-group">
                      <label>E-posta *</label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        placeholder="ornek@email.com"
                        className="form-input"
                      />
                    </div>
                    <div className="form-group">
                      <label>Konu</label>
                      <select name="topic" value={form.topic} onChange={handleChange} className="form-input">
                        <option value="">Konu Seçin</option>
                        <option value="hesap">HFM Hesap Açılışı</option>
                        <option value="telegram">Telegram Grubu</option>
                        <option value="platform">Platform Desteği</option>
                        <option value="diger">Diğer</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Mesajınız *</label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        required
                        placeholder="Mesajınızı buraya yazın..."
                        className="form-input form-textarea"
                        rows={5}
                      />
                    </div>
                    <div className="form-disclaimer">
                      Bu form yatırım danışmanlığı talebi için kullanılamaz.
                      Yalnızca HFM hesap desteği ve bilgilendirme amaçlıdır.
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }}>
                      Mesaj Gönder
                    </button>
                  </form>
                </div>
              ) : (
                <div className="card contact-success">
                  <div className="success-icon">✓</div>
                  <h3>Mesajınız İletildi!</h3>
                  <p>En kısa sürede size geri dönüş yapacağız. Telegram grubuna da katılabilirsiniz.</p>
                  <a
                    href="https://t.me/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                    style={{ marginTop: 16 }}
                  >
                    Telegram Grubuna Katıl
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
