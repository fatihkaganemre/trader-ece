import { useContactForm } from "./useContactForm";

export default function ContactForm() {
  const { form, submitted, isLoading, error, handleChange, handleSubmit } = useContactForm();

  if (submitted) {
    return (
      <div className="card contact-success">
        <div className="success-icon">✓</div>
        <h3>Mesajınız İletildi!</h3>
        <p>En kısa sürede size geri dönüş yapacağız. Telegram grubuna da katılabilirsiniz.</p>
        <a
          href="https://t.me/tradereceteam"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary"
          style={{ marginTop: 16 }}
        >
          Telegram Grubuna Katıl
        </a>
      </div>
    );
  }

  return (
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
        {error && (
          <div className="form-disclaimer" style={{ color: "red" }}>
            {error}
          </div>
        )}
        <button
          type="submit"
          className="btn btn-primary"
          style={{ width: "100%", justifyContent: "center" }}
          disabled={isLoading}
        >
          {isLoading ? "Gönderiliyor..." : "Mesaj Gönder"}
        </button>
      </form>
    </div>
  );
}