import { useTranslation } from "react-i18next";

export default function LanguageSelector({
  img,
  changeLanguage,
  language,
  languages,
}) {
  const { t } = useTranslation();
  return (
    <div className="flex items-center gap-2 absolute top-1 right-1 md:right-20">
      <img className="h-10 rounded-[200%] md:hidden" src={img} alt="" />
      <h2 className="hidden md:flex">{t("idioma")}</h2>
      <select
        className="w-full bg-transparent outline-none"
        name="language"
        id="language"
        onChange={(e) => changeLanguage(e.target.value)}
        value={language}
      >
        {languages.map((lang) => (
          <option
            key={lang.value}
            value={lang.value}
            className="w-full bg-black"
          >
            {lang.label}
          </option>
        ))}
      </select>
    </div>
  );
}
