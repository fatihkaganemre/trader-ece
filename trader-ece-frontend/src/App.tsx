import { useEffect, useState } from "react";
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

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>(() => resolvePageFromPath(window.location.pathname));

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
