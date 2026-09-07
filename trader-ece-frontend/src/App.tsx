import { lazy, Suspense, useEffect, useState } from "react";
import { AlertTriangle } from "lucide-react";
import { useTranslation } from "react-i18next";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ChatAssistant from "./components/ChatAssistant";
import HomePage from "./pages/HomePage";
import { getAccountWarning } from "./utils/accountWarning";
import "./App.css";

const AboutPage = lazy(() => import("./pages/AboutPage"));
const ServicesPage = lazy(() => import("./pages/ServicesPage"));
const PerformancePage = lazy(() => import("./pages/PerformancePage"));
const ContactPage = lazy(() => import("./pages/Contact/ContactPage"));
const LegalPage = lazy(() => import("./pages/LegalPage"));
const CommunityPage = lazy(() => import("./pages/CommunityPage"));
const FaqPage = lazy(() => import("./pages/FaqPage"));

export type Page = "home" | "about" | "services" | "performance" | "community" | "faq" | "contact" | "privacy" | "cookies" | "terms";
export type NavigateFn = (page: Page) => void;

const SEO_BY_LANGUAGE = {
  en: {
    title: "Trader ECE | Tickmill IB & Affiliate",
    description:
      "Trader ECE provides Tickmill account guidance, trading community access, market analysis content, and broker support for global traders.",
    keywords:
      "Trader ECE, Tickmill, forex, CFD, trading, market analysis, trading community, analysis group, broker support",
  },
  tr: {
    title: "Trader ECE | Tickmill IB ve Affiliate",
    description:
      "Trader ECE, Tickmill hesap açılışı rehberliği, piyasa analiz içerikleri, topluluk erişimi ve işlem desteği sunar.",
    keywords:
      "Trader ECE, Tickmill, forex, CFD, yatırım, piyasa analizi, işlem topluluğu, analiz grubu, broker desteği",
  },
  th: {
    title: "Trader ECE | Tickmill IB และ Affiliate",
    description:
      "Trader ECE offers Tickmill account guidance, trading community access, market analysis content, and broker support for Thai users.",
    keywords:
      "Trader ECE, Tickmill, forex, CFD, trading, market analysis, trading community, analysis group, broker support, Thailand",
  },
  id: {
    title: "Trader ECE | Tickmill IB dan Affiliate",
    description:
      "Trader ECE menyediakan panduan pembukaan akun Tickmill, akses komunitas trading, konten analisis pasar, dan dukungan broker.",
    keywords:
      "Trader ECE, Tickmill, forex, CFD, trading, analisis pasar, komunitas trading, grup analisis, dukungan broker",
  },
  vi: {
    title: "Trader ECE | Tickmill IB và Affiliate",
    description:
      "Trader ECE cung cấp hướng dẫn mở tài khoản Tickmill, quyền truy cập cộng đồng giao dịch, nội dung phân tích thị trường và hỗ trợ broker.",
    keywords:
      "Trader ECE, Tickmill, forex, CFD, giao dịch, phân tích thị trường, cộng đồng giao dịch, nhóm phân tích, hỗ trợ broker",
  },
  zh: {
    title: "Trader ECE | Tickmill IB 与 Affiliate",
    description:
      "Trader ECE 提供 Tickmill 开户指导、交易社区访问、市场分析内容和经纪商支持服务。",
    keywords:
      "Trader ECE, Tickmill, 外汇, CFD, 交易, 市场分析, 交易社区, 分析群, 经纪商支持",
  },
  ru: {
    title: "Trader ECE | Tickmill IB и партнерская программа",
    description:
      "Trader ECE предоставляет сопровождение при открытии счета Tickmill, доступ к торговому сообществу, аналитические материалы и поддержку брокера.",
    keywords:
      "Trader ECE, Tickmill, Forex, CFD, трейдинг, анализ рынка, торговое сообщество, аналитика, поддержка брокера",
  },
  cnr: {
    title: "Trader ECE | Tickmill IB i affiliate partner",
    description:
      "Trader ECE pruža podršku pri otvaranju Tickmill računa, pristup trgovačkoj zajednici, analize tržišta i brokersku podršku.",
    keywords:
      "Trader ECE, Tickmill, Forex, CFD, trgovanje, analiza tržišta, trgovačka zajednica, broker, podrška",
  },
} as const;

const PAGE_PATHS: Record<Page, string> = {
  home: "/",
  about: "/about",
  services: "/services",
  performance: "/performance",
  community: "/community",
  faq: "/faq",
  contact: "/contact",
  privacy: "/privacy",
  cookies: "/cookies",
  terms: "/terms",
};

const CONSENT_STORAGE_KEY = "trader_ece_consent_v2";
const CONSENT_TTL_MS = 30 * 24 * 60 * 60 * 1000;

function hasValidConsent() {
  try {
    const rawValue = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    const acceptedAt = rawValue ? Number(rawValue) : NaN;
    return Number.isFinite(acceptedAt) && Date.now() - acceptedAt <= CONSENT_TTL_MS;
  } catch {
    return false;
  }
}

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
  if (currentLang.startsWith("ru")) return "ru";
  if (currentLang.startsWith("cnr")) return "cnr";

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
  const language = i18n.language || "en";
  const [currentPage, setCurrentPage] = useState<Page>(() => resolvePageFromPath(window.location.pathname));
  const [hasConsent, setHasConsent] = useState(hasValidConsent);
  const [consentDismissed, setConsentDismissed] = useState(false);
  const showConsentBanner = !hasConsent && !consentDismissed;

  const isTurkish = language.toLowerCase().startsWith("tr");
  const consentText = isTurkish
    ? "Siteyi kullanmaya devam ederek Çerezler, Gizlilik ve Kullanım Koşulları metinlerimizi kabul etmiş olursunuz."
    : "By continuing to use this website, you acknowledge our Cookies, Privacy, and Terms policies.";
  const acceptLabel = isTurkish ? "Kabul Et" : "Accept";
  const dismissLabel = isTurkish ? "Kapat" : "Dismiss";
  const accountWarning = getAccountWarning(language);

  useEffect(() => {
    const seoLanguage = resolveSeoLanguage(language);
    const seo = SEO_BY_LANGUAGE[seoLanguage];

    document.documentElement.lang = seoLanguage;
    document.title = seo.title;
    setMetaTag("description", seo.description);
    setMetaTag("keywords", seo.keywords);
  }, [language]);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPage(resolvePageFromPath(window.location.pathname));
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    if (!hasConsent || document.getElementById("google-ads-script")) return;

    const analyticsWindow = window as Window & typeof globalThis & {
      dataLayer?: unknown[][];
      gtag?: (...args: unknown[]) => void;
    };
    analyticsWindow.dataLayer ??= [];
    analyticsWindow.gtag ??= (...args: unknown[]) => analyticsWindow.dataLayer?.push(args);
    analyticsWindow.gtag("js", new Date());
    analyticsWindow.gtag("config", import.meta.env.VITE_GOOGLE_ADS_ID);

    const script = document.createElement("script");
    script.id = "google-ads-script";
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${import.meta.env.VITE_GOOGLE_ADS_ID}`;
    document.head.appendChild(script);
  }, [hasConsent]);

  const acceptConsent = () => {
    try {
      window.localStorage.setItem(CONSENT_STORAGE_KEY, String(Date.now()));
    } catch {
      // no-op: user can still dismiss banner in-memory
    }
    setHasConsent(true);
  };

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
    about: <Suspense fallback={<div className="page-loading" />}><AboutPage navigate={navigate} /></Suspense>,
    services: <Suspense fallback={<div className="page-loading" />}><ServicesPage navigate={navigate} /></Suspense>,
    performance: <Suspense fallback={<div className="page-loading" />}><PerformancePage navigate={navigate} /></Suspense>,
    community: <Suspense fallback={<div className="page-loading" />}><CommunityPage /></Suspense>,
    faq: <Suspense fallback={<div className="page-loading" />}><FaqPage /></Suspense>,
    contact: <Suspense fallback={<div className="page-loading" />}><ContactPage /></Suspense>,
    privacy: <Suspense fallback={<div className="page-loading" />}><LegalPage kind="privacy" navigate={navigate} /></Suspense>,
    cookies: <Suspense fallback={<div className="page-loading" />}><LegalPage kind="cookies" navigate={navigate} /></Suspense>,
    terms: <Suspense fallback={<div className="page-loading" />}><LegalPage kind="terms" navigate={navigate} /></Suspense>,
  };

  return (
    <div className="app">
      <Header currentPage={currentPage} navigate={navigate} />
      <main>{pages[currentPage]}</main>
      <ChatAssistant elevated={showConsentBanner} />
      <Footer navigate={navigate} />
      <aside className={`broker-link-notice ${showConsentBanner ? "broker-link-notice--elevated" : ""}`} role="note">
        <AlertTriangle size={18} aria-hidden="true" />
        <span>{accountWarning}</span>
      </aside>

      {showConsentBanner && (
        <div className="consent-banner" role="status" aria-live="polite">
          <p className="consent-banner__text">
            {consentText}
            <button type="button" className="consent-banner__link" onClick={() => navigate("cookies")}>Cookies</button>
            <span> • </span>
            <button type="button" className="consent-banner__link" onClick={() => navigate("privacy")}>Privacy</button>
            <span> • </span>
            <button type="button" className="consent-banner__link" onClick={() => navigate("terms")}>Terms</button>
          </p>
          <div className="consent-banner__actions">
            <button type="button" className="consent-banner__btn consent-banner__btn--ghost" onClick={() => setConsentDismissed(true)}>
              {dismissLabel}
            </button>
            <button type="button" className="consent-banner__btn consent-banner__btn--primary" onClick={acceptConsent}>
              {acceptLabel}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
