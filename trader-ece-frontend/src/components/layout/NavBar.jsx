import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./Navbar.css";
import logo from "../../assets/logo.png";

export default function Navbar() {
  return (
    <motion.nav
      className="navbar"
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="navbar-container">
        <div className="logo-section">
          <img src={logo} alt="Trader ECE Logo" className="logo" />
          <span className="brand">TRADER <span>ECE</span></span>
        </div>

        <div className="nav-links">
          <Link to="/">Ana Sayfa</Link>
          <Link to="/hakkimizda">Hakkımızda</Link>
          <Link to="/hizmetlerimiz">Hizmetlerimiz</Link>
          <Link to="/iletisim">İletişim</Link>
        </div>
      </div>
    </motion.nav>
  );
}