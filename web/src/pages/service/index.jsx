import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import ServiceCard from "../../components/serviceCard";

export default function Service() {
  const { t } = useTranslation();
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col justify-between min-w-full h-full bg-[#262626d6] items-center md:justify-normal"
    >
      <h1 className="flex items-center w-full min-h-[6rem] px-10 text-6xl font-bold bg-gray-500 md:min-h-[2rem] md:text-2xl">
        {t("nav.Serviços")}
      </h1>
      <ServiceCard />
    </motion.section>
  );
}
