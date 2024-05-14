import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function BurgerMenu({ navItems, setOpen }) {
  const { t } = useTranslation();
  return (
    <div className="absolute top-0 left-0 flex flex-col items-center justify-evenly w-full h-full bg-black z-40 text-4xl">
      {navItems.map((item, index) => (
        <Link
          key={index}
          to={item.link}
          onClick={() => setOpen(false)}
          className="border-y-2 border-gray-500 w-full h-full text-center flex items-center justify-center"
        >
          {t(item.text)}
        </Link>
      ))}
    </div>
  );
}
