import "./Testimonals.css";

interface Testimonial {
  name: string;
  text: string;
  role: string;
}

const testimonials: Testimonial[] = [
  {
    name: "N. Berkan",
    text: "Altın işlemlerindeki analizleriniz harika. Bugün yine değerlendirdik ve kazandık, emeklerinize sağlık.",
    role: "Yatırımcı",
  },
  {
    name: "Neşe Aksoy",
    text: "Arda ve Ece hocam, müthiş bir gündü. Analizleriniz ve işlemleriniz sayesinde haftayı çok karlı kapattık, teşekkürler.",
    role: "Aktif Trader",
  },
  {
    name: "İsmet Yılmaz",
    text: "Piyasanın en belirsiz olduğu dönemde bile süreci çok profesyonel yönettiniz. Emeğinize sağlık, yine farkınızı konuşturduğunuz bir gün oldu.",
    role: "Portföy Yöneticisi",
  },
  {
    name: "T. R. Erdem",
    text: "Bu yıl da tercihimiz sizden yana oldu ve yine yanılmadık. Profesyonel bakış açınız güven veriyor.",
    role: "Uzun Vadeli Yatırımcı",
  },
  {
    name: "Tekin K.",
    text: "Haftalık kâr çekimimi sorunsuz yaptım. Ece hocam ve ekibi bu işi gerçekten dürüst ve şeffaf yapıyor, iyi ki varsınız.",
    role: "Premium Üye",
  },
  {
    name: "Kubilay Demir",
    text: "Keşke daha önce tanışsaymışız. Sayenizde son 4 ayım hem öğretici hem de çok karlı geçti, teşekkürler.",
    role: "Yatırımcı",
  },
  {
    name: "Esin Varol",
    text: "Sektörde sizin gibi bir ekibe denk gelmek büyük şans. İlginiz ve alakanız için çok teşekkür ederim.",
    role: "Danışan",
  },
  {
    name: "Rüstem Q.",
    text: "Kâr çekimimi gerçekleştirdim. Arda ve Ece hocamın analizleri, Gül hanımın desteğiyle her şey çok hızlı ilerliyor.",
    role: "Yatırımcı",
  },
  {
    name: "Hasan Sal",
    text: "Bugün ilk kâr çekimimi yaptım. Doğru strateji ve sabırla neler yapılabileceğini sayenizde gördüm.",
    role: "Yeni Yatırımcı",
  },
  {
    name: "Aykut B.",
    text: "Doğru risk yönetimiyle forexte kazanmak sizinle hiç zor değil. Panik ve heyecan olmadan, sadece verilere odaklanarak kazanıyoruz.",
    role: "Stratejik Trader",
  },
  {
    name: "Esra Çaylak",
    text: "Sizi diğerlerinden ayıran en büyük özellik, bir eğitmen hassasiyetiyle detaylı bilgi paylaşmanız. Farkınız her zaman belli oluyor.",
    role: "Yatırımcı",
  },
  {
    name: "Özlem Çetinkaya",
    text: "Piyasa şartları zorlu olsa da Ece hocam sayesinde üst üste başarılı işlemler alıyoruz. Başarı oranınız gerçekten çok yüksek.",
    role: "Aktif Trader",
  },
  {
    name: "Murat Sencer",
    text: "Çekim talebim anında hesabıma yansıdı. Başarılı işlemler ve profesyonel destek için teşekkürler. Kesinlikle örnek bir grup.",
    role: "Premium Müşteri",
  },
  {
    name: "Cenk Altın",
    text: "Bir süredir ara vermiştim ama dönüşüm muhteşem oldu. Bu hafta her şey süper gidiyor, teşekkürler hocam.",
    role: "Yatırımcı",
  },
  {
    name: "Gulare M.",
    text: "Sisteminize dahil olduğumdan beri kendimi güvende hissediyorum. İlk kârımı aldım, yardımlarınız için teşekkürler.",
    role: "Danışan",
  },
];

// Duplicate for seamless infinite loop
const doubled = [...testimonials, ...testimonials];

export default function Testimonials() {
  return (
    <div className="testimonials-section">
      <div className="container">
        <div className="section-tag">Kullanıcı Görüşleri</div>
        <h2 className="section-title">Ne Diyorlar?</h2>
      </div>

      <div className="testimonials-track-wrapper">
        <div className="testimonials-track">
          {doubled.map((t, i) => (
            <div key={i} className="card testimonial-card">
              <div className="testimonial-stars">★★★★★</div>
              <p className="testimonial-text">"{t.text}"</p>
              <div className="testimonial-author">
                <div className="author-avatar">{t.name[0]}</div>
                <div>
                  <strong>{t.name}</strong>
                  <span>{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}