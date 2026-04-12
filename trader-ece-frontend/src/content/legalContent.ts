export type LegalLocale = "tr" | "en" | "zh" | "id" | "vi" | "th";
export type PolicyKind = "privacy" | "cookies";

export interface LegalSection {
  title: string;
  paragraphs: string[];
}

export interface PolicyContent {
  navLabel: string;
  title: string;
  intro: string;
  highlights: string[];
  sections: LegalSection[];
  note: string;
}

export interface LegalContent {
  tag: string;
  updated: string;
  contactLabel: string;
  contactValue: string;
  contactAction: string;
  backToContact: string;
  summaryTitle: string;
  privacy: PolicyContent;
  cookies: PolicyContent;
}

const legalContent: Record<LegalLocale, LegalContent> = {
  tr: {
    tag: "Legal",
    updated: "Son güncelleme: 11 Nisan 2026",
    contactLabel: "İletişim e-postası",
    contactValue: "info@trader-ece.com",
    contactAction: "E-posta gönder",
    backToContact: "İletişim sayfasına dön",
    summaryTitle: "Temel İlkeler",
    privacy: {
      navLabel: "Gizlilik Politikası",
      title: "Gizlilik Politikası",
      intro:
        "Trader Ece olarak kişisel verilerinizi şeffaflık, veri minimizasyonu ve güvenlik ilkeleri doğrultusunda işleriz. Bu politika; Google Ads gereklilikleri, GDPR ilkeleri ve geçerli veri koruma kuralları dikkate alınarak hazırlanmıştır.",
      highlights: [
        "Ad, e-posta adresi ve mesaj içeriği gibi bilgiler yalnızca iletişim, destek ve hizmet kalitesini artırma amacıyla işlenir.",
        "Kişisel verileriniz satılmaz, izniniz olmadan pazarlama amacıyla paylaşılmaz ve yalnızca gerekli durumlarda sınırlı şekilde işlenir.",
        "Mesaj formları, müşteri taleplerini yanıtlamak, hesap açılış desteği sunmak ve operasyonel kaliteyi geliştirmek için kullanılır.",
        "GDPR kapsamındaki erişim, düzeltme, silme ve itiraz haklarınızı kullanmak için istediğiniz zaman bize yazabilirsiniz."
      ],
      sections: [
        {
          title: "1. Toplanan Veriler",
          paragraphs: [
            "Web sitemiz üzerinden ad, e-posta adresi, konu ve mesaj içeriği gibi doğrudan sizin paylaştığınız iletişim verilerini toplayabiliriz. Buna ek olarak IP adresi, cihaz türü, tarayıcı bilgisi ve sayfa kullanım verileri gibi teknik bilgiler güvenlik, performans ve hata takibi amacıyla sınırlı şekilde işlenebilir.",
            "Yalnızca gerekli olan veriler alınır; hassas kişisel verilerin gönderilmemesi tavsiye edilir."
          ]
        },
        {
          title: "2. Verilerin Kullanım Amaçları",
          paragraphs: [
            "Toplanan veriler; taleplerinizi yanıtlamak, hesap açılış ve platform süreçlerinde destek sağlamak, müşteri deneyimini geliştirmek, hizmet kalitesini ölçmek ve yasal yükümlülükleri yerine getirmek amacıyla kullanılır.",
            "Google Ads veya benzeri ölçüm araçları kullanılması hâlinde, bu kullanım yalnızca açık rıza gerektiği durumlarda onayınıza dayanır ve ilgili veriler sınırlı, meşru ve ölçülü şekilde işlenir."
          ]
        },
        {
          title: "3. Paylaşım, Saklama ve Güvenlik",
          paragraphs: [
            "Kişisel verileriniz üçüncü taraflara satılmaz veya yetkisiz kişi ve kurumlarla paylaşılmaz. Ancak e-posta altyapısı, barındırma, analitik veya yasal zorunluluk kapsamında görev alan hizmet sağlayıcılar, yalnızca gerekli olduğu ölçüde ve gizlilik yükümlülüğü altında sınırlı erişim sağlayabilir.",
            "Veriler makul teknik ve idari güvenlik önlemleriyle korunur ve işleme amacı sona erdiğinde veya saklama süresi dolduğunda silinir, anonimleştirilir ya da güvenli şekilde arşivlenir."
          ]
        },
        {
          title: "4. GDPR Kapsamındaki Haklarınız",
          paragraphs: [
            "Uygulanabildiği ölçüde; verilerinize erişme, düzeltme, silme, işlenmesini sınırlama, itiraz etme ve veri taşınabilirliği talebinde bulunma hakkına sahipsiniz.",
            "Bu haklardan herhangi birini kullanmak veya veri işleme faaliyetlerimiz hakkında soru sormak için info@trader-ece.com adresine e-posta gönderebilirsiniz."
          ]
        }
      ],
      note:
        "Bu politika yatırım tavsiyesi sunmaz; yalnızca iletişim, destek ve bilgilendirme süreçlerine ilişkin veri işleme esaslarını açıklar."
    },
    cookies: {
      navLabel: "Çerez Politikası",
      title: "Çerez Politikası",
      intro:
        "Trader Ece web sitesi; güvenli oturum deneyimi sağlamak, performansı ölçmek ve kullanıcı deneyimini iyileştirmek amacıyla çerezler ve benzeri teknolojiler kullanabilir.",
      highlights: [
        "Zorunlu çerezler sitenin güvenli ve düzgün çalışması için kullanılır.",
        "Tercih ve performans çerezleri dil seçimi, kullanım analizi ve deneyim optimizasyonu için kullanılabilir.",
        "Analitik ve reklam amaçlı çerezler yalnızca gerekli olduğu yerde açık rıza mekanizmalarıyla çalıştırılır.",
        "Tarayıcı ayarlarınızdan çerezleri silebilir, engelleyebilir veya tercihlerinizi güncelleyebilirsiniz."
      ],
      sections: [
        {
          title: "1. Kullandığımız Çerez Türleri",
          paragraphs: [
            "Zorunlu çerezler; güvenlik, oturum devamlılığı ve temel site fonksiyonları için gereklidir. Tercih çerezleri ise dil seçimi gibi kullanıcı ayarlarını hatırlayarak deneyimi kolaylaştırır.",
            "Performans ve analitik çerezleri, hangi sayfaların daha çok kullanıldığını anlamamıza ve siteyi geliştirmemize yardımcı olur."
          ]
        },
        {
          title: "2. Çerezlerin Kullanım Amaçları",
          paragraphs: [
            "Çerezler; kullanıcı deneyimini kişiselleştirmek, sayfa performansını izlemek, hata tespiti yapmak, güvenliği artırmak ve içerik kalitesini iyileştirmek amacıyla kullanılır.",
            "Google Ads veya benzeri reklam çözümleri devredeyse, reklam ölçümü ve yeniden pazarlama yalnızca izin verilen bölgelerde ve uygun onay akışlarıyla yürütülür."
          ]
        },
        {
          title: "3. Çerez Tercihleri ve Kontrol",
          paragraphs: [
            "Çerez tercihlerinizi tarayıcı ayarlarınız üzerinden yönetebilir, mevcut çerezleri silebilir veya gelecekteki çerezleri engelleyebilirsiniz. Bununla birlikte bazı zorunlu çerezlerin kapatılması, sitenin belirli bölümlerinin beklenen şekilde çalışmamasına neden olabilir.",
            "Açık rıza gerektiren çerez kategorileri için kullanıcı onayı alınır ve kullanıcı bu onayı dilediğinde geri çekebilir."
          ]
        },
        {
          title: "4. İletişim",
          paragraphs: [
            "Çerez kullanımı veya veri tercihleri hakkında sorularınız için bizimle info@trader-ece.com adresi üzerinden iletişime geçebilirsiniz.",
            "Politikalarımız gerektiğinde güncellenebilir; güncel sürüm her zaman bu sayfada yayımlanır."
          ]
        }
      ],
      note:
        "Çerezler yatırım tavsiyesi vermek için değil, güvenli ve daha işlevsel bir kullanıcı deneyimi sunmak için kullanılır."
    }
  },
  en: {
    tag: "Legal",
    updated: "Last updated: April 11, 2026",
    contactLabel: "Contact email",
    contactValue: "info@trader-ece.com",
    contactAction: "Send email",
    backToContact: "Back to contact page",
    summaryTitle: "Key Principles",
    privacy: {
      navLabel: "Privacy Policy",
      title: "Privacy Policy",
      intro:
        "At Trader Ece, personal data is handled in line with transparency, data minimisation, and security principles. This policy is written to align with GDPR principles, applicable data protection rules, and Google Ads requirements.",
      highlights: [
        "Information such as your name, email address, and message details is used only for communication, support, and service quality improvement.",
        "Your personal data is not sold and is not shared for unrelated marketing purposes without a lawful basis or your consent where required.",
        "Contact form submissions are used to respond to enquiries, support onboarding, and improve the quality of our services.",
        "You may contact us at any time to request access, correction, deletion, or objection under applicable GDPR rights."
      ],
      sections: [
        {
          title: "1. Data We Collect",
          paragraphs: [
            "We may collect contact information that you provide directly, such as your name, email address, subject line, and message content. Limited technical data such as IP address, browser type, device data, and usage information may also be processed for security, stability, and troubleshooting purposes.",
            "We collect only information that is reasonably necessary and recommend that you do not submit sensitive personal data through general contact forms."
          ]
        },
        {
          title: "2. Why We Use the Data",
          paragraphs: [
            "The data is used to answer your enquiries, assist with onboarding and platform-related processes, improve user experience, measure service quality, and comply with legal obligations.",
            "Where Google Ads or similar measurement tools are used, they operate on a lawful basis and, where required, only after appropriate user consent has been obtained."
          ]
        },
        {
          title: "3. Sharing, Retention, and Security",
          paragraphs: [
            "Personal data is not sold or disclosed to unrelated third parties. Limited processing may occur through hosting, email, analytics, or compliance providers acting under confidentiality obligations and only to the extent necessary.",
            "We apply reasonable technical and organisational safeguards and retain data only for as long as needed to fulfil the stated purpose or comply with legal requirements."
          ]
        },
        {
          title: "4. Your GDPR Rights",
          paragraphs: [
            "Where applicable, you have the right to access, rectify, erase, restrict, object to processing, and request portability of your personal data.",
            "To exercise these rights or ask a privacy-related question, please contact us at info@trader-ece.com."
          ]
        }
      ],
      note:
        "This policy explains how communication and service-related data is handled; it does not constitute investment advice."
    },
    cookies: {
      navLabel: "Cookie Policy",
      title: "Cookie Policy",
      intro:
        "Trader Ece may use cookies and similar technologies to keep the site secure, measure performance, and improve the user experience.",
      highlights: [
        "Essential cookies are used to keep the website functioning properly and securely.",
        "Preference and performance cookies may remember language choices and help us improve usability.",
        "Analytics and advertising cookies are used only where legally permitted and, when required, only after user consent.",
        "You can manage, block, or delete cookies through your browser settings at any time."
      ],
      sections: [
        {
          title: "1. Types of Cookies We Use",
          paragraphs: [
            "Essential cookies support core website functions such as security, session continuity, and basic navigation. Preference cookies help remember settings such as selected language.",
            "Performance and analytics cookies help us understand traffic patterns, diagnose issues, and improve the quality of the site."
          ]
        },
        {
          title: "2. Why We Use Cookies",
          paragraphs: [
            "Cookies are used to personalise the experience, monitor performance, detect errors, support security, and optimise content delivery.",
            "If Google Ads or similar advertising solutions are used, any measurement or remarketing features are configured in accordance with applicable consent requirements."
          ]
        },
        {
          title: "3. Consent and Control",
          paragraphs: [
            "You can manage cookie settings through your browser and delete previously stored cookies. Please note that disabling certain essential cookies may affect site functionality.",
            "Where consent is required for non-essential cookie categories, users are given the opportunity to accept, reject, or withdraw that consent."
          ]
        },
        {
          title: "4. Contact",
          paragraphs: [
            "If you have questions about our cookie practices or your privacy choices, please contact info@trader-ece.com.",
            "These policies may be updated from time to time, and the most current version will always be published on this page."
          ]
        }
      ],
      note:
        "Cookies are used to provide a safer and more functional browsing experience, not to deliver investment advice."
    }
  },
  zh: {
    tag: "法律信息",
    updated: "最后更新：2026年4月11日",
    contactLabel: "联系邮箱",
    contactValue: "info@trader-ece.com",
    contactAction: "发送邮件",
    backToContact: "返回联系页面",
    summaryTitle: "核心原则",
    privacy: {
      navLabel: "隐私政策",
      title: "隐私政策",
      intro:
        "在 Trader Ece，我们按照透明、最小化收集和安全保护的原则处理个人数据。本政策参考 GDPR 原则、适用的数据保护规则以及 Google Ads 要求编写。",
      highlights: [
        "姓名、电子邮件地址和消息内容等信息仅用于沟通、支持和提升服务质量。",
        "您的个人数据不会被出售，也不会在缺乏合法依据的情况下向无关第三方披露。",
        "联系表单中的信息仅用于回复咨询、协助开户流程以及改进服务体验。",
        "如适用，您可以依据 GDPR 请求访问、更正、删除或限制处理您的个人数据。"
      ],
      sections: [
        {
          title: "1. 我们收集的数据",
          paragraphs: [
            "我们可能会收集您主动提供的联系信息，例如姓名、电子邮箱、主题和消息内容。为了安全、稳定性和问题排查，我们也可能有限处理 IP 地址、浏览器类型、设备信息和使用数据等技术信息。",
            "我们仅收集为实现相关目的所必需的数据，并建议不要通过普通联系表单提交敏感个人信息。"
          ]
        },
        {
          title: "2. 数据的使用目的",
          paragraphs: [
            "收集的数据用于回应咨询、协助开户和平台相关流程、改进用户体验、评估服务质量以及履行法律义务。",
            "如使用 Google Ads 或类似衡量工具，将根据适用法律在需要时取得用户同意后才进行相关处理。"
          ]
        },
        {
          title: "3. 共享、保存与安全",
          paragraphs: [
            "个人数据不会被出售，也不会向无关第三方随意共享。只有在托管、邮件、分析或合规服务提供商履行必要职责时，才会在保密义务下进行有限处理。",
            "我们采取合理的技术和组织安全措施，并仅在实现既定目的或符合法律要求所需的期间内保留数据。"
          ]
        },
        {
          title: "4. 您的 GDPR 权利",
          paragraphs: [
            "在适用情况下，您有权访问、更正、删除、限制处理、反对处理，并请求数据可携带。",
            "如需行使上述权利或咨询隐私问题，请发送邮件至 info@trader-ece.com。"
          ]
        }
      ],
      note: "本政策仅说明沟通和服务相关数据的处理方式，不构成投资建议。"
    },
    cookies: {
      navLabel: "Cookie 政策",
      title: "Cookie 政策",
      intro:
        "Trader Ece 可能会使用 Cookie 和类似技术，以保障网站安全、衡量性能并提升用户体验。",
      highlights: [
        "必要 Cookie 用于确保网站安全、稳定和基本功能正常运行。",
        "偏好和性能 Cookie 可用于记住语言选择并优化使用体验。",
        "分析和广告 Cookie 仅在法律允许且需要时，在取得用户同意后启用。",
        "您可以随时通过浏览器设置管理、阻止或删除 Cookie。"
      ],
      sections: [
        {
          title: "1. 我们使用的 Cookie 类型",
          paragraphs: [
            "必要 Cookie 支持安全、会话连续性和基础导航等核心功能。偏好 Cookie 可帮助记住语言等用户设置。",
            "性能和分析 Cookie 帮助我们了解访问情况、诊断问题并持续优化网站质量。"
          ]
        },
        {
          title: "2. 使用 Cookie 的目的",
          paragraphs: [
            "Cookie 用于个性化体验、监测性能、发现错误、加强安全并优化内容展示。",
            "如使用 Google Ads 或类似广告解决方案，相关衡量和再营销功能会按照适用的同意要求进行配置。"
          ]
        },
        {
          title: "3. 同意与管理",
          paragraphs: [
            "您可以通过浏览器设置管理 Cookie，并删除已保存的 Cookie。请注意，禁用某些必要 Cookie 可能会影响部分功能的正常使用。",
            "对于需要事先同意的非必要 Cookie 类型，用户可选择接受、拒绝或之后撤回同意。"
          ]
        },
        {
          title: "4. 联系方式",
          paragraphs: [
            "如对 Cookie 使用或隐私选择有疑问，请联系 info@trader-ece.com。",
            "本政策可能会不时更新，最新版本将始终发布于本页面。"
          ]
        }
      ],
      note: "Cookie 的使用旨在提供更安全、更顺畅的浏览体验，并非用于提供投资建议。"
    }
  },
  id: {
    tag: "Legal",
    updated: "Terakhir diperbarui: 11 April 2026",
    contactLabel: "Email kontak",
    contactValue: "info@trader-ece.com",
    contactAction: "Kirim email",
    backToContact: "Kembali ke halaman kontak",
    summaryTitle: "Prinsip Utama",
    privacy: {
      navLabel: "Kebijakan Privasi",
      title: "Kebijakan Privasi",
      intro:
        "Di Trader Ece, data pribadi diproses berdasarkan prinsip transparansi, minimalisasi data, dan keamanan. Kebijakan ini disusun dengan mengacu pada prinsip GDPR, aturan perlindungan data yang berlaku, dan persyaratan Google Ads.",
      highlights: [
        "Data seperti nama, alamat email, dan isi pesan hanya digunakan untuk komunikasi, dukungan, dan peningkatan kualitas layanan.",
        "Data pribadi tidak dijual dan tidak dibagikan untuk tujuan pemasaran yang tidak relevan tanpa dasar hukum yang sah.",
        "Data formulir kontak digunakan untuk menjawab pertanyaan, membantu proses onboarding, dan meningkatkan kualitas layanan kami.",
        "Anda dapat menghubungi kami kapan saja untuk meminta akses, perbaikan, penghapusan, atau keberatan atas pemrosesan data Anda."
      ],
      sections: [
        {
          title: "1. Data yang Kami Kumpulkan",
          paragraphs: [
            "Kami dapat mengumpulkan informasi kontak yang Anda kirimkan secara langsung, seperti nama, alamat email, subjek, dan isi pesan. Data teknis terbatas seperti alamat IP, jenis browser, perangkat, dan data penggunaan juga dapat diproses untuk keamanan, stabilitas, dan pemecahan masalah.",
            "Kami hanya mengumpulkan data yang benar-benar diperlukan dan menyarankan agar Anda tidak mengirimkan data pribadi sensitif melalui formulir umum."
          ]
        },
        {
          title: "2. Tujuan Penggunaan Data",
          paragraphs: [
            "Data digunakan untuk menjawab pertanyaan Anda, membantu proses pembukaan akun dan dukungan platform, meningkatkan pengalaman pengguna, mengukur kualitas layanan, dan memenuhi kewajiban hukum.",
            "Jika Google Ads atau alat pengukuran serupa digunakan, pemrosesan tersebut dilakukan berdasarkan dasar hukum yang sesuai dan, bila diwajibkan, setelah memperoleh persetujuan pengguna."
          ]
        },
        {
          title: "3. Pembagian, Penyimpanan, dan Keamanan",
          paragraphs: [
            "Data pribadi tidak dijual dan tidak dibagikan kepada pihak ketiga yang tidak relevan. Pemrosesan terbatas hanya dapat dilakukan oleh penyedia hosting, email, analitik, atau kepatuhan yang bekerja di bawah kewajiban kerahasiaan dan hanya sejauh diperlukan.",
            "Kami menerapkan langkah-langkah teknis dan organisasi yang wajar untuk melindungi data serta menyimpannya hanya selama diperlukan untuk tujuan yang sah atau kewajiban hukum."
          ]
        },
        {
          title: "4. Hak Anda berdasarkan GDPR",
          paragraphs: [
            "Jika berlaku, Anda memiliki hak untuk mengakses, memperbaiki, menghapus, membatasi pemrosesan, menolak, dan meminta portabilitas data pribadi Anda.",
            "Untuk menggunakan hak-hak tersebut atau mengajukan pertanyaan privasi, silakan hubungi info@trader-ece.com."
          ]
        }
      ],
      note: "Kebijakan ini menjelaskan pemrosesan data terkait komunikasi dan layanan, dan bukan merupakan nasihat investasi."
    },
    cookies: {
      navLabel: "Kebijakan Cookie",
      title: "Kebijakan Cookie",
      intro:
        "Trader Ece dapat menggunakan cookie dan teknologi serupa untuk menjaga keamanan situs, mengukur kinerja, dan meningkatkan pengalaman pengguna.",
      highlights: [
        "Cookie esensial digunakan agar situs dapat berfungsi dengan aman dan benar.",
        "Cookie preferensi dan kinerja dapat mengingat pilihan bahasa dan membantu peningkatan pengalaman pengguna.",
        "Cookie analitik dan periklanan hanya digunakan jika diizinkan secara hukum dan, bila perlu, setelah persetujuan pengguna.",
        "Anda dapat mengelola, memblokir, atau menghapus cookie kapan saja melalui pengaturan browser."
      ],
      sections: [
        {
          title: "1. Jenis Cookie yang Digunakan",
          paragraphs: [
            "Cookie esensial mendukung fungsi inti situs seperti keamanan, kesinambungan sesi, dan navigasi dasar. Cookie preferensi membantu mengingat pengaturan seperti bahasa yang dipilih.",
            "Cookie performa dan analitik membantu kami memahami pola penggunaan, mendiagnosis masalah, dan meningkatkan kualitas situs."
          ]
        },
        {
          title: "2. Tujuan Penggunaan Cookie",
          paragraphs: [
            "Cookie digunakan untuk mempersonalisasi pengalaman, memantau performa, mendeteksi kesalahan, meningkatkan keamanan, dan mengoptimalkan penyajian konten.",
            "Jika Google Ads atau solusi iklan serupa digunakan, fitur pengukuran atau remarketing akan diatur sesuai persyaratan persetujuan yang berlaku."
          ]
        },
        {
          title: "3. Persetujuan dan Kontrol",
          paragraphs: [
            "Anda dapat mengatur cookie melalui browser dan menghapus cookie yang telah tersimpan. Menonaktifkan cookie esensial tertentu dapat memengaruhi fungsi situs.",
            "Untuk kategori cookie non-esensial yang memerlukan persetujuan, pengguna diberi pilihan untuk menerima, menolak, atau menarik kembali persetujuan tersebut."
          ]
        },
        {
          title: "4. Kontak",
          paragraphs: [
            "Jika Anda memiliki pertanyaan tentang praktik cookie atau preferensi privasi Anda, silakan hubungi info@trader-ece.com.",
            "Kebijakan ini dapat diperbarui dari waktu ke waktu, dan versi terbaru akan selalu dipublikasikan di halaman ini."
          ]
        }
      ],
      note: "Cookie digunakan untuk memberikan pengalaman browsing yang lebih aman dan lebih fungsional, bukan untuk memberikan nasihat investasi."
    }
  },
  vi: {
    tag: "Pháp Lý",
    updated: "Cập nhật lần cuối: 11/04/2026",
    contactLabel: "Email liên hệ",
    contactValue: "info@trader-ece.com",
    contactAction: "Gửi email",
    backToContact: "Quay lại trang liên hệ",
    summaryTitle: "Nguyên Tắc Chính",
    privacy: {
      navLabel: "Chính Sách Bảo Mật",
      title: "Chính Sách Bảo Mật",
      intro:
        "Tại Trader Ece, dữ liệu cá nhân được xử lý theo nguyên tắc minh bạch, tối giản dữ liệu và bảo mật. Chính sách này được xây dựng phù hợp với các nguyên tắc GDPR, quy định bảo vệ dữ liệu hiện hành và yêu cầu của Google Ads.",
      highlights: [
        "Thông tin như họ tên, email và nội dung tin nhắn chỉ được sử dụng cho liên lạc, hỗ trợ và nâng cao chất lượng dịch vụ.",
        "Dữ liệu cá nhân không bị bán và không bị chia sẻ cho mục đích tiếp thị không liên quan khi không có căn cứ pháp lý phù hợp.",
        "Thông tin từ biểu mẫu liên hệ được dùng để phản hồi câu hỏi, hỗ trợ quá trình onboarding và cải thiện dịch vụ của chúng tôi.",
        "Bạn có thể liên hệ với chúng tôi bất kỳ lúc nào để yêu cầu truy cập, chỉnh sửa, xóa hoặc phản đối việc xử lý dữ liệu."
      ],
      sections: [
        {
          title: "1. Dữ Liệu Chúng Tôi Thu Thập",
          paragraphs: [
            "Chúng tôi có thể thu thập thông tin liên hệ do bạn trực tiếp cung cấp như họ tên, email, chủ đề và nội dung tin nhắn. Dữ liệu kỹ thuật giới hạn như địa chỉ IP, loại trình duyệt, thông tin thiết bị và dữ liệu sử dụng cũng có thể được xử lý cho mục đích bảo mật, ổn định hệ thống và khắc phục sự cố.",
            "Chúng tôi chỉ thu thập dữ liệu cần thiết một cách hợp lý và khuyến nghị không gửi dữ liệu cá nhân nhạy cảm qua biểu mẫu liên hệ chung."
          ]
        },
        {
          title: "2. Mục Đích Sử Dụng Dữ Liệu",
          paragraphs: [
            "Dữ liệu được sử dụng để trả lời yêu cầu của bạn, hỗ trợ mở tài khoản và nền tảng, cải thiện trải nghiệm người dùng, đo lường chất lượng dịch vụ và đáp ứng nghĩa vụ pháp lý.",
            "Nếu Google Ads hoặc các công cụ đo lường tương tự được sử dụng, việc xử lý đó sẽ dựa trên căn cứ pháp lý phù hợp và, khi cần, chỉ được kích hoạt sau khi có sự đồng ý của người dùng."
          ]
        },
        {
          title: "3. Chia Sẻ, Lưu Trữ và Bảo Mật",
          paragraphs: [
            "Dữ liệu cá nhân không bị bán và không được chia sẻ cho bên thứ ba không liên quan. Việc xử lý giới hạn chỉ có thể được thực hiện bởi các nhà cung cấp hosting, email, analytics hoặc compliance theo nghĩa vụ bảo mật và chỉ trong phạm vi cần thiết.",
            "Chúng tôi áp dụng các biện pháp kỹ thuật và tổ chức hợp lý để bảo vệ dữ liệu, đồng thời chỉ lưu trữ dữ liệu trong thời gian cần thiết cho mục đích hợp pháp hoặc yêu cầu pháp luật."
          ]
        },
        {
          title: "4. Quyền của Bạn theo GDPR",
          paragraphs: [
            "Nếu áp dụng, bạn có quyền truy cập, chỉnh sửa, xóa, hạn chế xử lý, phản đối xử lý và yêu cầu chuyển dữ liệu cá nhân của mình.",
            "Để thực hiện các quyền này hoặc đặt câu hỏi về quyền riêng tư, vui lòng liên hệ info@trader-ece.com."
          ]
        }
      ],
      note: "Chính sách này giải thích cách xử lý dữ liệu liên quan đến liên lạc và dịch vụ; đây không phải là tư vấn đầu tư."
    },
    cookies: {
      navLabel: "Chính Sách Cookie",
      title: "Chính Sách Cookie",
      intro:
        "Trader Ece có thể sử dụng cookie và công nghệ tương tự để giữ cho trang web an toàn, đo lường hiệu suất và cải thiện trải nghiệm người dùng.",
      highlights: [
        "Cookie thiết yếu được dùng để trang web hoạt động đúng cách và an toàn.",
        "Cookie tùy chọn và hiệu suất có thể ghi nhớ lựa chọn ngôn ngữ và hỗ trợ tối ưu hóa trải nghiệm.",
        "Cookie phân tích và quảng cáo chỉ được sử dụng khi pháp luật cho phép và, nếu cần, sau khi có sự đồng ý của người dùng.",
        "Bạn có thể quản lý, chặn hoặc xóa cookie bất kỳ lúc nào trong cài đặt trình duyệt."
      ],
      sections: [
        {
          title: "1. Các Loại Cookie Chúng Tôi Sử Dụng",
          paragraphs: [
            "Cookie thiết yếu hỗ trợ các chức năng cốt lõi của trang web như bảo mật, duy trì phiên và điều hướng cơ bản. Cookie tùy chọn giúp ghi nhớ các cài đặt như ngôn ngữ đã chọn.",
            "Cookie hiệu suất và phân tích giúp chúng tôi hiểu lưu lượng truy cập, chẩn đoán sự cố và cải thiện chất lượng trang web."
          ]
        },
        {
          title: "2. Mục Đích Sử Dụng Cookie",
          paragraphs: [
            "Cookie được dùng để cá nhân hóa trải nghiệm, theo dõi hiệu suất, phát hiện lỗi, tăng cường bảo mật và tối ưu hóa việc hiển thị nội dung.",
            "Nếu Google Ads hoặc các giải pháp quảng cáo tương tự được sử dụng, các tính năng đo lường hoặc remarketing sẽ được cấu hình theo yêu cầu đồng ý hiện hành."
          ]
        },
        {
          title: "3. Sự Đồng Ý và Kiểm Soát",
          paragraphs: [
            "Bạn có thể quản lý cookie thông qua trình duyệt và xóa các cookie đã lưu. Việc tắt một số cookie thiết yếu có thể ảnh hưởng đến chức năng của trang web.",
            "Đối với các loại cookie không thiết yếu cần có sự đồng ý, người dùng sẽ có tùy chọn chấp nhận, từ chối hoặc rút lại sự đồng ý đó."
          ]
        },
        {
          title: "4. Liên Hệ",
          paragraphs: [
            "Nếu bạn có câu hỏi về việc sử dụng cookie hoặc lựa chọn quyền riêng tư, vui lòng liên hệ info@trader-ece.com.",
            "Các chính sách này có thể được cập nhật định kỳ và phiên bản mới nhất sẽ luôn được công bố trên trang này."
          ]
        }
      ],
      note: "Cookie được sử dụng để mang lại trải nghiệm duyệt web an toàn và tiện lợi hơn, không phải để cung cấp tư vấn đầu tư."
    }
  },
  th: {
    tag: "ข้อมูลทางกฎหมาย",
    updated: "อัปเดตล่าสุด: 11 เมษายน 2026",
    contactLabel: "อีเมลติดต่อ",
    contactValue: "info@trader-ece.com",
    contactAction: "ส่งอีเมล",
    backToContact: "กลับไปหน้าติดต่อ",
    summaryTitle: "หลักการสำคัญ",
    privacy: {
      navLabel: "นโยบายความเป็นส่วนตัว",
      title: "นโยบายความเป็นส่วนตัว",
      intro:
        "ที่ Trader Ece เราดำเนินการกับข้อมูลส่วนบุคคลตามหลักความโปร่งใส การเก็บข้อมูลเท่าที่จำเป็น และความปลอดภัย นโยบายนี้จัดทำขึ้นโดยอ้างอิงหลักการ GDPR กฎคุ้มครองข้อมูลที่เกี่ยวข้อง และข้อกำหนดของ Google Ads.",
      highlights: [
        "ข้อมูล เช่น ชื่อ อีเมล และรายละเอียดข้อความ จะถูกใช้เพื่อการติดต่อ การสนับสนุน และการพัฒนาคุณภาพบริการเท่านั้น",
        "ข้อมูลส่วนบุคคลของคุณจะไม่ถูกขาย และจะไม่ถูกแชร์เพื่อการตลาดที่ไม่เกี่ยวข้องโดยไม่มีฐานทางกฎหมายที่เหมาะสม",
        "ข้อมูลจากแบบฟอร์มติดต่อใช้เพื่อตอบคำถาม ช่วยในกระบวนการ onboarding และปรับปรุงคุณภาพบริการ",
        "คุณสามารถติดต่อเราได้ทุกเมื่อเพื่อขอเข้าถึง แก้ไข ลบ หรือคัดค้านการประมวลผลข้อมูลตามสิทธิที่กฎหมายให้ไว้"
      ],
      sections: [
        {
          title: "1. ข้อมูลที่เราเก็บรวบรวม",
          paragraphs: [
            "เราอาจเก็บข้อมูลติดต่อที่คุณส่งมาโดยตรง เช่น ชื่อ อีเมล หัวข้อ และเนื้อหาข้อความ รวมถึงข้อมูลทางเทคนิคบางส่วน เช่น IP ประเภทเบราว์เซอร์ อุปกรณ์ และข้อมูลการใช้งาน เพื่อความปลอดภัย ความเสถียร และการแก้ไขปัญหา.",
            "เราจะเก็บเฉพาะข้อมูลที่จำเป็นอย่างสมเหตุสมผล และแนะนำไม่ให้ส่งข้อมูลส่วนบุคคลที่มีความอ่อนไหวผ่านแบบฟอร์มทั่วไป."
          ]
        },
        {
          title: "2. วัตถุประสงค์ของการใช้ข้อมูล",
          paragraphs: [
            "ข้อมูลถูกใช้เพื่อตอบคำถามของคุณ ช่วยในขั้นตอนการเปิดบัญชีและการสนับสนุนแพลตฟอร์ม ปรับปรุงประสบการณ์ผู้ใช้ วัดคุณภาพบริการ และปฏิบัติตามข้อกำหนดทางกฎหมาย.",
            "หากมีการใช้ Google Ads หรือเครื่องมือวัดผลที่คล้ายกัน การประมวลผลดังกล่าวจะดำเนินการตามฐานทางกฎหมายที่เหมาะสม และในกรณีที่จำเป็นจะเริ่มใช้งานหลังจากได้รับความยินยอมจากผู้ใช้แล้วเท่านั้น."
          ]
        },
        {
          title: "3. การแบ่งปัน การเก็บรักษา และความปลอดภัย",
          paragraphs: [
            "ข้อมูลส่วนบุคคลจะไม่ถูกขายและจะไม่ถูกเปิดเผยแก่บุคคลที่สามที่ไม่เกี่ยวข้อง การประมวลผลอย่างจำกัดอาจเกิดขึ้นผ่านผู้ให้บริการ hosting อีเมล analytics หรือ compliance ซึ่งทำงานภายใต้ข้อผูกพันด้านความลับและเท่าที่จำเป็นเท่านั้น.",
            "เราใช้มาตรการด้านเทคนิคและการจัดการที่เหมาะสมเพื่อปกป้องข้อมูล และจะเก็บข้อมูลไว้เท่าที่จำเป็นต่อวัตถุประสงค์ที่ระบุหรือข้อกำหนดทางกฎหมาย."
          ]
        },
        {
          title: "4. สิทธิของคุณภายใต้ GDPR",
          paragraphs: [
            "หากกฎหมายที่เกี่ยวข้องบังคับใช้ คุณมีสิทธิในการเข้าถึง แก้ไข ลบ จำกัดการประมวลผล คัดค้าน และขอรับโอนย้ายข้อมูลส่วนบุคคลของคุณ.",
            "หากต้องการใช้สิทธิเหล่านี้หรือสอบถามเรื่องความเป็นส่วนตัว โปรดติดต่อ info@trader-ece.com."
          ]
        }
      ],
      note: "นโยบายนี้อธิบายการประมวลผลข้อมูลที่เกี่ยวข้องกับการติดต่อและบริการเท่านั้น และไม่ถือเป็นคำแนะนำการลงทุน."
    },
    cookies: {
      navLabel: "นโยบายคุกกี้",
      title: "นโยบายคุกกี้",
      intro:
        "Trader Ece อาจใช้คุกกี้และเทคโนโลยีที่คล้ายกันเพื่อให้เว็บไซต์ปลอดภัย วัดประสิทธิภาพ และปรับปรุงประสบการณ์ผู้ใช้.",
      highlights: [
        "คุกกี้ที่จำเป็นถูกใช้เพื่อให้เว็บไซต์ทำงานได้อย่างถูกต้องและปลอดภัย",
        "คุกกี้ด้านการตั้งค่าและประสิทธิภาพอาจใช้จดจำภาษาและช่วยปรับปรุงการใช้งาน",
        "คุกกี้สำหรับวิเคราะห์และโฆษณาจะถูกใช้เฉพาะเมื่อกฎหมายอนุญาต และเมื่อจำเป็นจะต้องได้รับความยินยอมจากผู้ใช้ก่อน",
        "คุณสามารถจัดการ บล็อก หรือลบคุกกี้ได้ทุกเมื่อผ่านการตั้งค่าเบราว์เซอร์"
      ],
      sections: [
        {
          title: "1. ประเภทของคุกกี้ที่เราใช้",
          paragraphs: [
            "คุกกี้ที่จำเป็นช่วยสนับสนุนการทำงานหลักของเว็บไซต์ เช่น ความปลอดภัย ความต่อเนื่องของเซสชัน และการนำทางพื้นฐาน ส่วนคุกกี้การตั้งค่าจะช่วยจดจำการตั้งค่าต่าง ๆ เช่น ภาษาที่เลือก.",
            "คุกกี้ด้านประสิทธิภาพและการวิเคราะห์ช่วยให้เราเข้าใจรูปแบบการใช้งาน วินิจฉัยปัญหา และปรับปรุงคุณภาพเว็บไซต์."
          ]
        },
        {
          title: "2. วัตถุประสงค์ของการใช้คุกกี้",
          paragraphs: [
            "คุกกี้ถูกใช้เพื่อปรับแต่งประสบการณ์ผู้ใช้ ตรวจสอบประสิทธิภาพ ตรวจจับข้อผิดพลาด เพิ่มความปลอดภัย และเพิ่มประสิทธิภาพการแสดงผลเนื้อหา.",
            "หากมีการใช้ Google Ads หรือโซลูชันโฆษณาที่คล้ายกัน ฟังก์ชันวัดผลหรือ remarketing จะถูกตั้งค่าให้สอดคล้องกับข้อกำหนดด้านความยินยอมที่เกี่ยวข้อง."
          ]
        },
        {
          title: "3. ความยินยอมและการควบคุม",
          paragraphs: [
            "คุณสามารถจัดการคุกกี้ผ่านเบราว์เซอร์และลบคุกกี้ที่บันทึกไว้ได้ โปรดทราบว่าการปิดใช้งานคุกกี้ที่จำเป็นบางประเภทอาจส่งผลต่อการทำงานของเว็บไซต์.",
            "สำหรับคุกกี้ที่ไม่จำเป็นซึ่งต้องได้รับความยินยอม ผู้ใช้จะมีตัวเลือกในการยอมรับ ปฏิเสธ หรือถอนความยินยอมในภายหลัง."
          ]
        },
        {
          title: "4. ติดต่อเรา",
          paragraphs: [
            "หากคุณมีคำถามเกี่ยวกับการใช้คุกกี้หรือการตั้งค่าความเป็นส่วนตัว โปรดติดต่อ info@trader-ece.com.",
            "นโยบายนี้อาจมีการอัปเดตเป็นระยะ และเวอร์ชันล่าสุดจะเผยแพร่บนหน้านี้เสมอ."
          ]
        }
      ],
      note: "คุกกี้ถูกใช้เพื่อมอบประสบการณ์การใช้งานที่ปลอดภัยและมีประสิทธิภาพมากขึ้น ไม่ใช่เพื่อให้คำแนะนำการลงทุน."
    }
  }
};

export function resolveLegalLocale(language: string): LegalLocale {
  const normalized = language.toLowerCase();
  if (normalized.startsWith("tr")) return "tr";
  if (normalized.startsWith("zh")) return "zh";
  if (normalized.startsWith("id")) return "id";
  if (normalized.startsWith("vi")) return "vi";
  if (normalized.startsWith("th")) return "th";
  return "en";
}

export function getLegalContent(language: string): LegalContent {
  return legalContent[resolveLegalLocale(language)];
}
