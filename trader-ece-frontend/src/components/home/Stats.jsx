import { motion } from "framer-motion";
import "./Stats.css";

export default function Stats() {
  const stats = [
    { value: "15+", label: "Yıl Tecrübe" },
    { value: "7M $", label: "Fon Büyüklüğü" },
    { value: "4.6M $", label: "Toplam Çekim" },
  ];

  return (
    <section className="stats section-padding">
      <div className="stats-grid">
        {stats.map((item, i) => (
          <motion.div
            key={i}
            className="stat-card"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
          >
            <h2>{item.value}</h2>
            <p>{item.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}