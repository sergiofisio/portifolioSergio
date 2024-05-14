import { NavLink, useMatch } from "react-router-dom";

const navItems = [
  { link: "/main", text: "home" },
  { link: "/service", text: "portifólios" },
  { link: "/portifolio", text: "adicionar" },
];

export default function Nav() {
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
            {text}
          </NavLink>
        );
      })}
    </nav>
  );
}
