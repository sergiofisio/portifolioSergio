import { motion } from "framer-motion";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import SkillInfo from "../../components/skill";
import html from "../../assets/front/html.svg";
import react from "../../assets/front/react.svg";
import angular from "../../assets/front/angular.svg";
import tailwind from "../../assets/front/tailwind.svg";
import vanila from "../../assets/back/vanila.svg";
import nest from "../../assets/back/nest.svg";
import prisma from "../../assets/back/prisma.svg";
import postgreSQL from "../../assets/back/postgreSQL.svg";

const skills = {
  front: [
    {
      skill: "html/css",
      img: html,
      text: "skills.Front.html",
    },
    {
      skill: "react",
      img: react,
      text: "skills.Front.react",
    },
    {
      skill: "angular",
      img: angular,
      text: "skills.Front.angular",
    },
    {
      skill: "tailwind",
      img: tailwind,
      text: "skills.Front.tailwind",
    },
  ],
  back: [
    {
      skill: "Node.js",
      img: vanila,
      text: "skills.Back.node",
    },
    {
      skill: "Nest.js",
      img: nest,
      text: "skills.Back.Nest",
    },
    {
      skill: "Prisma",
      img: prisma,
      text: "skills.Back.Prisma",
    },
    {
      skill: "PostgreSQL",
      img: postgreSQL,
      text: "skills.Back.postgresql",
    },
  ],
};

export default function Skills() {
  const [showSkill, setShowSkill] = useState("front");
  const [skill, setSkill] = useState(skills.front);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col justify-between min-w-full h-full bg-[#262626d6] items-center"
    >
      <div className="flex justify-between w-full items-center text-3xl font-bold md:text-xl">
        <h1
          className={`flex justify-center items-center w-full min-h-[6rem] px-10 border-r-2 border-black bg-[#262626d6]  border-solid cursor-pointer transition-all duration-500 ease-in-out ${
            showSkill !== "front" ? "bg-opacity-20 opacity-20" : ""
          } `}
          onClick={() => {
            setShowSkill("front"), setSkill(skills.front);
          }}
        >
          FrontEnd
        </h1>
        <h1
          className={`flex justify-center items-center w-full min-h-[6rem] px-10 border-r-2 border-black bg-[#262626d6] border-solid cursor-pointer transition-all duration-500 ease-in-out ${
            showSkill !== "back" ? "bg-opacity-20 opacity-20" : ""
          }`}
          onClick={() => {
            setShowSkill("back"), setSkill(skills.back);
          }}
        >
          BackEnd
        </h1>
      </div>
      <div className="w-11/12 flex flex-col h-full gap-10 md:gap-4">
        {skill.map((item, index) => (
          <SkillInfo
            key={index}
            skill={item.skill}
            img={item.img}
            text={item.text}
          />
        ))}
      </div>
    </motion.section>
  );
}
