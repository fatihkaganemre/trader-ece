import "./ContactPage.css";
import { useTranslation } from "react-i18next";
import Lottie from "lottie-react";
import ContactForm from "./ContactForm";
import socialSignalAnim from "../../assets/social-signal.json";
import { getBrokerLinks } from "../../utils/brokerLinks";

interface ContactChannel {
  href: string;
  color: string;
  title: string;
  subtitle: string;
  linkLabel: string;
  icon: React.ReactNode;
}

const telegramIcon = (
  <Lottie animationData={socialSignalAnim} loop autoplay className="telegram-lottie" />
);

const whatsappIcon = (
  <Lottie animationData={socialSignalAnim} loop autoplay className="telegram-lottie" />
);

const emailIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="28" height="28">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

export default function ContactPage() {
  const { t, i18n } = useTranslation();
  const { tickmillLink, hfmLink } = getBrokerLinks(i18n.language);

  const channelsFromTranslation: ContactChannel[] = [
    {
      href: "https://t.me/bullexardav",
      color: "#0088cc",
      title: t("contact.channels.items.0.title"),
      subtitle: t("contact.channels.items.0.desc"),
      linkLabel: t("contact.channels.items.0.link"),
      icon: telegramIcon,
    },
    {
      href: "https://t.me/tradereceteam",
      color: "#0088cc",
      title: t("contact.channels.items.1.title"),
      subtitle: t("contact.channels.items.1.desc"),
      linkLabel: t("contact.channels.items.1.link"),
      icon: telegramIcon,
    },
    {
      href: "https://wa.link/yy3thb",
      color: "#25d366",
      title: t("contact.channels.items.2.title"),
      subtitle: t("contact.channels.items.2.desc"),
      linkLabel: t("contact.channels.items.2.link"),
      icon: whatsappIcon,
    },
    {
      href: "mailto:info@trader-ece.com",
      color: "#00d4e8",
      title: t("contact.channels.items.3.title"),
      subtitle: t("contact.channels.items.3.desc"),
      linkLabel: t("contact.channels.items.3.link"),
      icon: emailIcon,
    },
  ];

  return (
    <div className="contact-page">
      {/* Hero */}
      <section className="page-hero">
        <div className="page-hero__bg" />
        <div className="container">
          <div className="section-tag">{t("contact.tag")}</div>
          <h1 className="section-title" style={{ fontSize: "clamp(40px, 6vw, 64px)" }}>
            {t("contact.title")}
          </h1>
          <p className="section-subtitle" style={{ fontSize: 18 }}>
            {t("contact.subtitle")}
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="contact-grid">
            {/* Contact Info */}
            <div className="contact-info">
              <div className="section-tag">{t("contact.channels.tag")}</div>
              <h2 className="section-title" style={{ fontSize: "clamp(26px, 3vw, 36px)", marginBottom: 32 }}>
                {t("contact.channels.title")}
              </h2>

              <div className="contact-channels">
                {channelsFromTranslation.map((ch, i) => (
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
                  <div className="hoa-logo">{t("contact.hfm.logo")}</div>
                  <div>
                    <h4>{t("contact.hfm.title")}</h4>
                    <p>{t("contact.hfm.desc")}</p>
                  </div>
                </div>
                <div className="hoa-actions">
                  <a href={tickmillLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                    {t("contact.hfm.link")}
                  </a>
                  <a href={hfmLink} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                    {t("contact.hfm.hfmLink")}
                  </a>
                </div>
                <p className="hoa-note">{t("contact.hfm.vpnNote")}</p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="contact-form-wrap">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}