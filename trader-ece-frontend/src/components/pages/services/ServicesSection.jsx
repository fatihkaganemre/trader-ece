import { motion } from "framer-motion";
import "./ServicesSection.css";

export default function ServicesSection() {
  return (
    <section className="services section-padding">
      <h1>Hizmetlerimiz</h1>

      <div className="services-grid">
        <motion.div
          className="service-card"
          whileHover={{ scale: 1.05 }}
        >
          <h3>Telegram Sinyalleri</h3>
          <p>
            Günlük ve haftalık piyasa analiz paylaşımları.
            Bilgilendirme amaçlı içerik.
          </p>
        </motion.div>

        <motion.div
          className="service-card"
          whileHover={{ scale: 1.05 }}
        >
          <h3>Fon Süreci</h3>
          <p>
            Risk yönetimi odaklı işlem süreci.
            HFM altyapısı üzerinden işlem ortamı.
          </p>
        </motion.div>

        <motion.div
          className="service-card"
          whileHover={{ scale: 1.05 }}
        >
          <h3>Eğitim & Bilgilendirme</h3>
          <p>
            Piyasa dinamikleri hakkında temel ve ileri düzey içerikler.
          </p>
        </motion.div>
      </div>

      <div className="pricing">
        <h2>Paketler</h2>
        <div className="pricing-grid">
          <div className="price-card">
            <h3>Ücretsiz</h3>
            <p>Genel piyasa bilgilendirmesi</p>
          </div>

          <div className="price-card premium">
            <h3>Premium</h3>
            <p>Özel analiz ve grup erişimi</p>
          </div>
        </div>
      </div>
    </section>
  );
}