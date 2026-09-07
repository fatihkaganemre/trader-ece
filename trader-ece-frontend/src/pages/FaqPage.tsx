import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";
import "./FaqPage.css";

interface FaqItem {
  question: string;
  answer: string;
}

const SORO_EMBED_URL = "https://app.trysoro.com/api/embed/c45b4c7d-2750-448e-b08f-00e02cba74e9";
const MAX_SORO_CARDS = 6;

function SoroGallery() {
  useEffect(() => {
    const host = document.getElementById("soro-blog");
    if (!host) return;

    const limitCards = () => {
      const list = host.querySelector<HTMLElement>(".soro-blog-list");
      const cards = list ? Array.from(list.children) as HTMLElement[] : Array.from(host.querySelectorAll<HTMLElement>('[class*="soro-blog-card"]'));
      const candidates = cards.length ? cards : Array.from(host.children) as HTMLElement[];
      candidates.forEach((card, index) => {
        card.hidden = index >= MAX_SORO_CARDS;
      });
    };

    const observer = new MutationObserver(limitCards);
    observer.observe(host, { childList: true, subtree: true });

    const script = document.createElement("script");
    script.id = "soro-blog-script";
    script.src = SORO_EMBED_URL;
    script.async = true;
    script.addEventListener("load", limitCards);
    document.body.appendChild(script);

    return () => {
      observer.disconnect();
      script.remove();
      host.replaceChildren();
    };
  }, []);

  return <div id="soro-blog" className="soro-gallery" />;
}

export default function FaqPage() {
  const { t } = useTranslation();
  const [openItem, setOpenItem] = useState<number | null>(0);
  const items = t("faq.items", { returnObjects: true }) as FaqItem[];

  return (
    <div className="faq-page">
      <section className="page-hero faq-hero">
        <div className="page-hero__bg" />
        <div className="container">
          <div className="section-tag">{t("faq.tag")}</div>
          <h1 className="section-title">{t("faq.title")}</h1>
          <p className="section-subtitle">{t("faq.subtitle")}</p>
        </div>
      </section>

      <section className="section faq-section">
        <div className="container faq-layout">
          <div className="faq-list">
            {items.map((item, index) => {
              const isOpen = openItem === index;
              return (
                <article key={item.question} className={`faq-item ${isOpen ? "faq-item--open" : ""}`}>
                  <button
                    type="button"
                    className="faq-item__question"
                    onClick={() => setOpenItem(isOpen ? null : index)}
                    aria-expanded={isOpen}
                  >
                    <span>{item.question}</span>
                    <ChevronDown aria-hidden="true" size={20} />
                  </button>
                  {isOpen && <p className="faq-item__answer">{item.answer}</p>}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section soro-section">
        <div className="container">
          <div className="section-header">
            <div className="section-tag">{t("faq.guidesTag")}</div>
            <h2 className="section-title">{t("faq.guidesTitle")}</h2>
            <p className="section-subtitle">{t("faq.guidesSubtitle")}</p>
          </div>
          <SoroGallery />
        </div>
      </section>
    </div>
  );
}