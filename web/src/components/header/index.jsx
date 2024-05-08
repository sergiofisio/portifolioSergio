import logo from "../../assets/logo.svg";
import { useNavigate } from "react-router-dom";
import pt from "../../assets/language/BR.svg";
import fr from "../../assets/language/FR.svg";
import us from "../../assets/language/US.svg";
import { setItem } from "../../utils/localstorage";
import Nav from "./nav";
import LanguageSelector from "./languageSelector";
import Hamburger from "hamburger-react";
import { useState } from "react";
import BurgerMenu from "./burguesMenu";

const languages = [
  { value: "pt", label: "Portuguese", img: pt },
  { value: "fr", label: "French", img: fr },
  { value: "en", label: "English", img: us },
];

const navItems = [
  { link: "/main", text: "nav.Quem Sou" },
  { link: "/service", text: "nav.Serviços" },
  { link: "/portifolio", text: "nav.Portifolio" },
  { link: "/skills", text: "nav.Tecnologias" },
  { link: "/contato", text: "nav.Contato" },
];

export default function Header({ setLanguage, language }) {
  const navigate = useNavigate();
  const img = languages.find((lang) => lang.value === language)?.img;
  const [isOpen, setOpen] = useState(false);

  const handleChangeLanguage = (newLanguage) => {
    setItem("language", newLanguage);
    setLanguage(newLanguage);
  };

  return (
    <header className="flex items-center justify-between min-h-24 p-4">
      <div
        className="cursor-pointer flex items-center text-2xl gap-2 min-w-fit"
        onClick={() => navigate("/")}
      >
        <img src={logo} alt="Logo" />
        <h2>
          <strong>DEV</strong>Sergio
        </h2>
      </div>
      <div
        className={`hidden md:flex justify-center ${
          isOpen ? "absolute top-2 z-50 w-full" : ""
        }`}
      >
        <Hamburger toggled={isOpen} toggle={setOpen} />
      </div>
      {isOpen && <BurgerMenu navItems={navItems} setOpen={setOpen} />}

      <Nav />
      <LanguageSelector
        img={img}
        changeLanguage={handleChangeLanguage}
        language={language}
        languages={languages}
      />
    </header>
  );
}
