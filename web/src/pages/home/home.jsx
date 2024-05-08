import { motion } from "framer-motion";

import earth from "../../assets/earth.gif";
import computer from "../../assets/computer2.gif";

export default function Home() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-between w-full h-full bg-none overflow-hidden "
    >
      <div className="border-[#444444] border-solid border-8 rounded-full flex items-center justify-center">
        <img className="w-40 1366:w-32" src={earth} alt="earth gif" />
      </div>
      <img className="max-w-full 1366:max-w-5xl" src={computer} alt="" />
    </motion.section>
  );
}
