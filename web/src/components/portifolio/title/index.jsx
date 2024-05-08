import { useTranslation } from "react-i18next";

export default function PortifolioTitle({ title, name, setShowProject }) {
  const { t } = useTranslation();
  return (
    <h1
      className={`transition-all hover:opacity-100 cursor-pointer text-3xl font-bold ${
        title === name ? "opacity-100" : "opacity-20"
      } md:text-base`}
      onClick={() => setShowProject(title)}
    >
      {t(`Projetos.${title}.title`)}
    </h1>
  );
}
