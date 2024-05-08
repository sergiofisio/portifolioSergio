import i18n from "i18next";
import { useEffect, useState } from "react";
import { initReactI18next } from "react-i18next";
import enTranslation from "./locales/en.json";
import frTranslation from "./locales/fr.json";
import ptTranslation from "./locales/pt.json";
import Header from "./components/header";
import { AnimatePresence } from "framer-motion";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/home";
import Main from "./pages/main";
import Service from "./pages/service";
import Portifolio from "./pages/portifolio";
import Skills from "./pages/skills";
import Contact from "./pages/contato";

i18n.use(initReactI18next).init({
  resources: {
    fr: {
      translation: frTranslation,
    },
    pt: {
      translation: ptTranslation,
    },
    en: {
      translation: enTranslation,
    },
  },
  lng: localStorage.getItem("language") || "pt",
  fallbackLng: "pt",
  interpolation: {
    escapeValue: false,
  },
});

export default function App() {
  const [changeLanguage, setChangeLanguage] = useState(
    localStorage.getItem("language") || "pt"
  );

  function setLanguage(userLanguage) {
    localStorage.setItem("language", userLanguage);
    i18n.changeLanguage(userLanguage);
  }

  useEffect(() => {
    setLanguage(changeLanguage);
  }, [changeLanguage]);

  return (
    <div className="flex flex-col max-w-[100vw] h-screen">
      <div className="flex flex-col w-full h-full relative">
        <Header setLanguage={setChangeLanguage} language={changeLanguage} />
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/main"
              element={<Main currentLanguage={changeLanguage} />}
            />
            <Route path="/service" element={<Service />} />
            <Route path="/portifolio" element={<Portifolio />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/contato" element={<Contact />} />
          </Routes>
        </AnimatePresence>
      </div>
    </div>
  );
}
