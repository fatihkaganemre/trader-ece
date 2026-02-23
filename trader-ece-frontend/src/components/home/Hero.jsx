import { motion } from "framer-motion";
import "./Hero.css";

export default function Hero() {
  return (
    <section className="hero section-padding">
      <motion.div
        className="hero-content"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1>Profesyonel Forex Sinyalleri ve Fon Süreçleri</h1>
        <p>
          15+ Yıllık Tecrübe ile HFM Resmi Partner (IB) Altyapısı
        </p>

        <div className="hero-buttons">
          <a href="https://t.me/yourgroup" className="primary-btn">
            Telegram Grubuna Katıl
          </a>
          <a href="/iletisim" className="secondary-btn">
            Ücretsiz Bilgi Al
          </a>
        </div>
      </motion.div>
    </section>
  );
}