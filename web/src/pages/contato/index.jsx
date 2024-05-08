import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import phone from "../../assets/contact/phone.svg";
import email from "../../assets/contact/email.svg";
import github from "../../assets/contact/github.svg";
import linkedn from "../../assets/contact/linkedn.svg";

export default function Contact() {
  const { t } = useTranslation();
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col justify-between min-w-full h-full bg-[#262626d6] items-center md:justify-normal"
    >
      <h1 className="flex items-center w-full min-h-[6rem] px-10 text-6xl font-bold bg-gray-500 md:min-h-[2rem] md:text-2xl">
        {t("nav.Contato")}
      </h1>
      <div className="min-h-[calc(100vh-17rem)] flex justify-center items-center gap-10 md:flex-col md:gap-2 md:min-h-[100%] md:justify-around">
        <div className="flex flex-col justify-between w-screen items-center gap-20 ">
          <div className="flex justify-evenly items-center gap-4 w-[35rem] md:w-full">
            <img
              className="w-28 h-28 md:w-10 md:h-10"
              src={phone}
              alt="icon phone"
            />
            <div className="flex flex-col items-center justify-center gap-4 md:gap-0">
              <p className="text-3xl font-bold w-[30rem] text-center md:text-base md:w-full">
                {t("contato.celular")}
              </p>
              <a
                className="text-xl"
                href="https://api.whatsapp.com/send/?phone=5511965932620&text&type=phone_number&app_absent=0"
                target="_blank"
                rel="noreferrer"
              >
                +55 (11) 96593-2620
              </a>
            </div>
          </div>
          <div className="flex justify-evenly items-center gap-4 w-[35rem] md:w-full ">
            <img
              className="w-28 h-28 md:w-10 md:h-10"
              src={email}
              alt="icon email"
            />
            <div className="flex flex-col items-center justify-center gap-4 md:gap-0">
              <p className="text-3xl font-bold w-[30rem] text-center md:text-base md:w-full">
                E-mail
              </p>
              <a
                className="text-xl"
                href="mailto:sergiobastosfisio@gmail.com"
                target="_blank"
                rel="noreferrer"
              >
                sergiobastosfisio@gmail.com
              </a>
            </div>
          </div>
        </div>
        <div className="flex justify-center w-full items-center gap-20">
          <a
            href="https://github.com/sergiofisio"
            className="cursor-pointer flex flex-col items-center"
            target="_blank"
          >
            <img className="h-28 p-2" src={github} alt="icon Github" />
            <h2 className="text-2xl font-bold">GitHub</h2>
          </a>
          <a
            href="https://www.linkedin.com/in/sergio-bastos-jr/"
            className="cursor-pointer flex flex-col items-center rounded-[100%]"
            target="_blank"
          >
            <img className="h-28 p-2" src={linkedn} alt="icon linkedn" />
            <h2 className="text-2xl font-bold">Linkedin</h2>
          </a>
        </div>
      </div>
    </motion.section>
  );
}
