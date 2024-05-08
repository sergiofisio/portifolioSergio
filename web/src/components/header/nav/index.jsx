import { useTranslation } from "react-i18next";
import { NavLink, useMatch } from "react-router-dom";

const navItems = [
  { link: "/main", text: "nav.Quem Sou" },
  { link: "/service", text: "nav.Serviços" },
  { link: "/portifolio", text: "nav.Portifolio" },
  { link: "/skills", text: "nav.Tecnologias" },
  { link: "/contato", text: "nav.Contato" },
];

export default function Nav() {
  const { t } = useTranslation();
  return (
    <nav className="flex justify-end items-end text-lg font-medium w-full h-full uppercase gap-4 md:hidden">
      {navItems.map(({ link, text }, key) => {
        const match = useMatch(link);
        return (
          <NavLink
            key={key}
            to={link}
            className={` transition-all hover:opacity-100 cursor-pointer text-2xl ${
              match ? "opacity-100" : "opacity-50"
            }`}
          >
            {t(text)}
          </NavLink>
        );
      })}
    </nav>
  );
}
