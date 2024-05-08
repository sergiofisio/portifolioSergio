import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

import coding from "../../assets/coding.gif";
import file from "../../assets/file.svg";

const pItems = [
  { text: "sobre.p1" },
  { text: "sobre.p2" },
  { text: "sobre.p3" },
  { text: "sobre.p4" },
  { text: "sobre.p5" },
  { text: "sobre.p6" },
];

export default function Main({ currentLanguage }) {
  const { t } = useTranslation();
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center w-full min-h-[calc(100vh-8rem)] px-8 md:h-full md:px-1"
    >
      <div className="flex justify-between h-full items-center gap-4 md:flex-col">
        <img
          className="border-8 rounded-[50%] border-[#444444] w-2/5 h-auto max-h-96 -scale-x-100 md:w-full md:hidden"
          src={coding}
          alt="img coding"
        />
        <div className="w-full h-auto flex flex-col gap-3 md:gap-1 md:h-full">
          <h1 className="text-[#ffffff80]">FullStack Developer</h1>
          <h2 className="font-bold text-4xl md:text-xl">
            <strong>DEV</strong>Sergio
          </h2>
          <div className="flex flex-col md:h-full">
            <div className="flex flex-col gap-3 max-h-96 overflow-y-scroll px-3 scrollbar-thin scrollbar-thumb-[#fff] md:text-center md:h-full">
              {pItems.map((item, key) => (
                <p className="text-xl md:text-sm" key={key}>
                  {t(item.text)}
                </p>
              ))}
            </div>
          </div>
          <a
            className="flex items-center gap-2 md:w-full md:justify-center md:gap-1 md:h-full"
            href={`CV - ${currentLanguage}.pdf`}
            target="_blank"
            download
          >
            <img src={file} alt="CV" className="md:w-20" />
            <h2 className="md:text-4xl">Download CV</h2>
          </a>
        </div>
      </div>
    </motion.section>
  );
}
