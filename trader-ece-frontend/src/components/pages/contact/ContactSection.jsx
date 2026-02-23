import { motion } from "framer-motion";
import "./ContactSection.css";

export default function ContactSection() {
  return (
    <section className="contact section-padding">
      <h1>İletişim</h1>

      <motion.form
        className="contact-form"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        <input type="text" placeholder="Adınız" required />
        <input type="email" placeholder="Email" required />
        <textarea placeholder="Mesajınız" required />
        <button type="submit">Gönder</button>
      </motion.form>

      <div className="contact-links">
        <p>Telegram: https://t.me/yourgroup</p>
        <p>Email: info@example.com</p>
      </div>

      <p className="legal">
        Not: Sunulan içerikler yatırım tavsiyesi değildir.
      </p>
    </section>
  );
}