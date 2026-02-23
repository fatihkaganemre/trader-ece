import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ServicesPage from "./pages/ServicesPage";
import PerformancePage from "./pages/PerformancePage";
import ContactPage from "./pages/ContactPage";
import "./App.css";

export type Page = "home" | "about" | "services" | "performance" | "contact";
export type NavigateFn = (page: Page) => void;

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");

  const navigate: NavigateFn = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const pages: Record<Page, React.ReactNode> = {
    home: <HomePage navigate={navigate} />,
    about: <AboutPage navigate={navigate} />,
    services: <ServicesPage navigate={navigate} />,
    performance: <PerformancePage navigate={navigate} />,
    contact: <ContactPage />,
  };

  return (
    <div className="app">
      <Header currentPage={currentPage} navigate={navigate} />
      <main>{pages[currentPage]}</main>
      <Footer navigate={navigate} />
    </div>
  );
}
