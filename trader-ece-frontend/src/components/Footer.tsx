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
            <div className="footer_logo_group">
                <div className="footer__logo">
                  <div className="footer-logo-img-wrap">
                    <img src="/traderEceLogo.png" alt="Trader ECE" className="footer-logo-img" />
                  </div>
                  <div className="logo-text">
                    <span className="logo-brand">
                      <span className="logo-trader">TRADER</span>
                      <span className="logo-ece"> ECE</span>
                    </span>
                    <span className="logo-sub">HFM IB &amp; Affiliate</span>
                  </div>
                </div>
                <div className="footer__logo">
                  <div className="footer-logo-img-wrap">
                    <img src="/bullexLogo.png" alt="Trader ECE" className="footer-logo-img" />
                  </div>
                  <div className="logo-text">
                    <span className="logo-brand">
                      <span className="logo-bullex">BULLEX</span>
                    </span>
                    <span className="logo-sub">SINYAL KANALI</span>
                  </div>
                </div>
            </div>
            <p className="footer__desc">
              HFM (HF Markets) resmi Introducing Broker (IB) ve affiliate
              ortağı olarak hizmet vermekteyiz. Forex sinyalleri sunmaktayız.
              Yatırım danışmanlığı veya portföy yönetimi hizmeti
              verilmemektedir.
            </p>
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
