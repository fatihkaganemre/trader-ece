import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ChatAssistant from "./components/ChatAssistant";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ServicesPage from "./pages/ServicesPage";
import PerformancePage from "./pages/PerformancePage";
import ContactPage from "./pages/Contact/ContactPage";
import LegalPage from "./pages/LegalPage";
import CommunityPage from "./pages/CommunityPage";
import "./App.css";

export type Page = "home" | "about" | "services" | "performance" | "community" | "contact" | "privacy" | "cookies";
export type NavigateFn = (page: Page) => void;

const SEO_BY_LANGUAGE = {
  en: {
    title: "Trader ECE | Tickmill IB & Affiliate",
    description:
      "Trader ECE provides Tickmill account guidance, trading community access, market analysis content, and broker support for global traders.",
    keywords:
      "Trader ECE, Tickmill, forex, CFD, trading, market analysis, trading community, signal group, broker support",
  },
  tr: {
    title: "Trader ECE | Tickmill IB ve Affiliate",
    description:
      "Trader ECE, Tickmill hesap açılışı rehberliği, piyasa analiz içerikleri, topluluk erişimi ve işlem desteği sunar.",
    keywords:
      "Trader ECE, Tickmill, forex, CFD, yatırım, piyasa analizi, işlem topluluğu, sinyal grubu, broker desteği",
  },
  th: {
    title: "Trader ECE | Tickmill IB และ Affiliate",
    description:
      "Trader ECE offers Tickmill account guidance, trading community access, market analysis content, and broker support for Thai users.",
    keywords:
      "Trader ECE, Tickmill, forex, CFD, trading, market analysis, trading community, signal group, broker support, Thailand",
  },
  id: {
    title: "Trader ECE | Tickmill IB dan Affiliate",
    description:
      "Trader ECE menyediakan panduan pembukaan akun Tickmill, akses komunitas trading, konten analisis pasar, dan dukungan broker.",
    keywords:
      "Trader ECE, Tickmill, forex, CFD, trading, analisis pasar, komunitas trading, grup sinyal, dukungan broker",
  },
  vi: {
    title: "Trader ECE | Tickmill IB và Affiliate",
    description:
      "Trader ECE cung cấp hướng dẫn mở tài khoản Tickmill, quyền truy cập cộng đồng giao dịch, nội dung phân tích thị trường và hỗ trợ broker.",
    keywords:
      "Trader ECE, Tickmill, forex, CFD, giao dịch, phân tích thị trường, cộng đồng giao dịch, nhóm tín hiệu, hỗ trợ broker",
  },
  zh: {
    title: "Trader ECE | Tickmill IB 与 Affiliate",
    description:
      "Trader ECE 提供 Tickmill 开户指导、交易社区访问、市场分析内容和经纪商支持服务。",
    keywords:
      "Trader ECE, Tickmill, 外汇, CFD, 交易, 市场分析, 交易社区, 信号群, 经纪商支持",
  },
} as const;

const PAGE_PATHS: Record<Page, string> = {
  home: "/",
  about: "/about",
  services: "/services",
  performance: "/performance",
  community: "/community",
  contact: "/contact",
  privacy: "/privacy",
  cookies: "/cookies",
};

function resolvePageFromPath(pathname: string): Page {
  const normalizedPath = pathname.toLowerCase();
  const match = Object.entries(PAGE_PATHS).find(([, path]) => path === normalizedPath);
  return (match?.[0] as Page | undefined) ?? "home";
}

function resolveSeoLanguage(language: string): keyof typeof SEO_BY_LANGUAGE {
  const currentLang = language.toLowerCase();

  if (currentLang.startsWith("tr")) return "tr";
  if (currentLang.startsWith("th")) return "th";
  if (currentLang.startsWith("id")) return "id";
  if (currentLang.startsWith("vi")) return "vi";
  if (currentLang.startsWith("zh")) return "zh";

  return "en";
}

function setMetaTag(name: string, content: string) {
  let meta = document.querySelector(`meta[name="${name}"]`);

  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute("name", name);
    document.head.appendChild(meta);
  }

  meta.setAttribute("content", content);
}

export default function App() {
  const { i18n } = useTranslation();
  const [currentPage, setCurrentPage] = useState<Page>(() => resolvePageFromPath(window.location.pathname));

  useEffect(() => {
    const seoLanguage = resolveSeoLanguage(i18n.language);
    const seo = SEO_BY_LANGUAGE[seoLanguage];

    document.documentElement.lang = seoLanguage;
    document.title = seo.title;
    setMetaTag("description", seo.description);
    setMetaTag("keywords", seo.keywords);
  }, [i18n.language]);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPage(resolvePageFromPath(window.location.pathname));
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigate: NavigateFn = (page: Page) => {
    const nextPath = PAGE_PATHS[page];
    if (window.location.pathname !== nextPath) {
      window.history.pushState({}, "", nextPath);
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const pages: Record<Page, React.ReactNode> = {
    home: <HomePage navigate={navigate} />,
    about: <AboutPage navigate={navigate} />,
    services: <ServicesPage navigate={navigate} />,
    performance: <PerformancePage navigate={navigate} />,
    community: <CommunityPage />,
    contact: <ContactPage />,
    privacy: <LegalPage kind="privacy" navigate={navigate} />,
    cookies: <LegalPage kind="cookies" navigate={navigate} />,
  };

  return (
    <div className="app">
      <Header currentPage={currentPage} navigate={navigate} />
      <main>{pages[currentPage]}</main>
      <ChatAssistant />
      <Footer navigate={navigate} />
    </div>
  );
}
