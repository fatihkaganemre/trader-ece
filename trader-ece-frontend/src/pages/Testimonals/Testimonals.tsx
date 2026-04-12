import { useTranslation } from "react-i18next";
import "./Testimonals.css";

interface Testimonial {
  name: string;
  text: string;
  role: string;
}

export default function Testimonials() {
  const { t } = useTranslation();
  const rawItems = t("testimonials.items", { returnObjects: true });
  const testimonials = Array.isArray(rawItems) ? (rawItems as Testimonial[]) : [];
  const doubled = [...testimonials, ...testimonials];

  return (
    <div className="testimonials-section">
      <div className="container">
        <div className="section-tag">{t("testimonials.tag")}</div>
        <h2 className="section-title">{t("testimonials.title")}</h2>
      </div>

      <div className="testimonials-track-wrapper">
        <div className="testimonials-track">
          {doubled.map((item, i) => (
            <div key={i} className="card testimonial-card">
              <div className="testimonial-stars">★★★★★</div>
              <p className="testimonial-text">"{item.text}"</p>
              <div className="testimonial-author">
                <div className="author-avatar">{item.name[0]}</div>
                <div>
                  <strong>{item.name}</strong>
                  <span>{item.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}