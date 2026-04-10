import { useTranslation } from "react-i18next";
import { useContactForm } from "./useContactForm";

export default function ContactForm() {
  const { t } = useTranslation();
  const { form, submitted, isLoading, error, handleChange, handleSubmit } = useContactForm();

  if (submitted) {
    return (
      <div className="card contact-success">
        <div className="success-icon">✓</div>
        <h3>{t("form.success.title")}</h3>
        <p>{t("form.success.msg")}</p>
        <a
          href="https://t.me/tradereceteam"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary"
          style={{ marginTop: 16 }}
        >
          {t("form.success.button")}
        </a>
      </div>
    );
  }

  return (
    <div className="card contact-form-card">
      <h3>{t("form.card.title")}</h3>
      <p className="form-subtitle">
        {t("form.card.subtitle")}
      </p>
      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <label>{t("form.fields.name")}</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder={t("form.fields.namePlaceholder")}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>{t("form.fields.email")}</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder={t("form.fields.emailPlaceholder")}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>{t("form.fields.subject")}</label>
          <select name="topic" value={form.topic} onChange={handleChange} className="form-input">
            <option value="">{t("form.fields.subjectDefault")}</option>
            <option value="hesap">{t("form.fields.subjectOptions.0")}</option>
            <option value="telegram">{t("form.fields.subjectOptions.1")}</option>
            <option value="platform">{t("form.fields.subjectOptions.2")}</option>
            <option value="diger">{t("form.fields.subjectOptions.3")}</option>
          </select>
        </div>
        <div className="form-group">
          <label>{t("form.fields.message")}</label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            required
            placeholder={t("form.fields.messagePlaceholder")}
            className="form-input form-textarea"
            rows={5}
          />
        </div>
        <div className="form-disclaimer">
          {t("form.disclaimer")}
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
          {isLoading ? t("form.submitting") : t("form.submit")}
        </button>
      </form>
    </div>
  );
}