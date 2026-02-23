import { motion } from "framer-motion";
import "./AboutSection.css";

export default function AboutSection() {
  return (
    <section className="about section-padding">
      <div className="about-container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1>Hakkımızda</h1>
          <p className="subtitle">
            15+ yıllık Forex tecrübesi. 4 yıldır HFM resmi partner (IB).
          </p>
        </motion.div>

        <div className="timeline">
          <div className="timeline-item">
            <h3>2009</h3>
            <p>Forex piyasasına başlangıç.</p>
          </div>

          <div className="timeline-item">
            <h3>2022</h3>
            <p>HFM ile resmi partnerlik (IB) süreci.</p>
          </div>

          <div className="timeline-item">
            <h3>2026</h3>
            <p>7M$ fon büyüklüğüne ulaşım.</p>
          </div>
        </div>

        <div className="hfm-box">
          <h2>HFM Neden?</h2>
          <p>
            Global ölçekte faaliyet gösteren regüle edilmiş broker altyapısı.
            Güvenli işlem ortamı ve şeffaf süreç.
          </p>
        </div>
      </div>
    </section>
  );
}