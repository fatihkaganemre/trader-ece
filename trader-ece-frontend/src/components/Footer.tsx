import "./Footer.css";
import type { NavigateFn, Page } from "../App";

interface FooterProps {
  navigate: NavigateFn;
}

const pageLinks: [Page, string][] = [
  ["home", "Ana Sayfa"],
  ["about", "Hakkımızda"],
  ["services", "Hizmetler"],
  ["performance", "Performans"],
  ["contact", "İletişim"],
];

export default function Footer({ navigate }: FooterProps) {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <div className="footer__logo">
              <div className="footer-logo-img-wrap">
                <img src="/traderEceLogo.jpeg" alt="Trader ECE" className="footer-logo-img" />
              </div>
              <div className="logo-text">
                <span className="logo-brand">
                  <span className="logo-trader">TRADER</span>
                  <span className="logo-ece"> ECE</span>
                </span>
                <span className="logo-sub">HFM IB &amp; Affiliate</span>
              </div>
            </div>
            <p className="footer__desc">
              HFM (HF Markets) resmi Introducing Broker (IB) ve affiliate
              ortağı olarak hizmet vermekteyiz. Forex sinyalleri sunmaktayız.
              Yatırım danışmanlığı veya portföy yönetimi hizmeti
              verilmemektedir.
            </p>
            <div className="footer__social">
              <a href="https://t.me/" target="_blank" rel="noopener noreferrer" className="social-btn">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.833.941z" />
                </svg>
                Telegram
              </a>
              <a href="mailto:info@example.com" className="social-btn">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                E-posta
              </a>
            </div>
          </div>

          <div className="footer__links">
            <div className="footer__col">
              <h4>Sayfalar</h4>
              {pageLinks.map(([key, label]) => (
                <button key={key} onClick={() => navigate(key)}>{label}</button>
              ))}
            </div>
            <div className="footer__col">
              <h4>Yasal</h4>
              <a href="https://www.hfm.com" target="_blank" rel="noopener noreferrer">HFM Resmi Site</a>
              <a href="https://www.hfm.com/regulation" target="_blank" rel="noopener noreferrer">HFM Regülasyon</a>
              <a href="https://www.spk.gov.tr" target="_blank" rel="noopener noreferrer">SPK</a>
              <button onClick={() => navigate("contact")}>İletişim</button>
            </div>
          </div>
        </div>

        <div className="footer__disclaimer">
          <div className="disclaimer-icon">⚠️</div>
          <div>
            <strong>Risk Uyarısı:</strong> Forex ve CFD işlemleri yüksek risk içermektedir.
            Yatırımlarınızın tamamını kaybedebilirsiniz. Bu site, yatırım tavsiyesi veya portföy
            yönetimi hizmeti sunmamaktadır. Buradaki içerikler yalnızca bilgilendirme amaçlıdır.
            HFM (HF Markets) resmi IB/affiliate ortağı sıfatıyla hizmet verilmektedir. Lütfen
            yatırım kararlarınızı vermeden önce bağımsız finansal danışmanınıza başvurunuz.
            Geçmiş performans gelecekteki sonuçların garantisi değildir.
          </div>
        </div>

        <div className="footer__bottom">
          <p>© {new Date().getFullYear()} Trader ECE – HFM IB &amp; Affiliate. Tüm hakları saklıdır.</p>
          <p className="footer__hfm">HF Markets Group tarafından regüle edilmiş ortamda faaliyet gösterilmektedir.</p>
        </div>
      </div>
    </footer>
  );
}
