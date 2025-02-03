import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import cuboflix from "../../assets/projects/cuboflix.png";
import biointegral from "../../assets/projects/biointegral.svg";
import cobranca from "../../assets/projects/cobranca.png";
import pokedex from "../../assets/projects/pokedex.png";
import PortifolioInfo from "../../components/portifolio";
import PortifolioTitle from "../../components/portifolio/title";

const projectsInfo = [
  {
    name: "CuboFlix",
    img: cuboflix,
    github: "https://github.com/sergiofisio/cuboflix",
    site: "https://cuboflix.vercel.app/",
    descricao: 9,
    tecnologies: [
      {
        title: "tecnologias",
        ul: ["HTML", "CSS", "JavaScript", "Axios", "DOM"],
      },
    ],
  },
  {
    name: "AplicacaoCobrancas",
    img: cobranca,
    github: "https://github.com/sergiofisio/aplicacaoCobranca",
    site: "https://app-cobranca.vercel.app/",
    descricao: 9,
    tecnologias: [
      {
        title: "tecnologias",
        ul: [
          "React",
          "React Router",
          "Yup",
          "React Toastify",
          "Axios",
          "Moment",
          "React-input-mask",
          "React-spinners",
          "Testing-library/jest-dom",
          "Express.js",
          "Knex",
          "PostgreSQL",
          "Swagger UI Express",
          "Cors",
          "Dotenv",
          "Joi",
          "Bcrypt",
          "Jsonwebtoken",
          "Nodemon",
        ],
      },
    ],
  },
  {
    name: "PokeDex",
    img: pokedex,
    github: "https://github.com/sergiofisio/pokedexNew",
    site: "https://pokedex-new-xi.vercel.app/",
    descricao: 8,
    tecnologias: [
      {
        title: "tecnologias",
        ul: [
          "React",
          "React Router",
          "Yup",
          "React Toastify",
          "Axios",
          "Moment",
          "React-input-mask",
          "React-spinners",
          "Testing-library/jest-dom",
          "Express.js",
          "Knex",
          "PostgreSQL",
          "Swagger UI Express",
          "Cors",
          "Dotenv",
          "Joi",
          "Bcrypt",
          "Jsonwebtoken",
          "Nodemon",
        ],
      },
    ],
  },
  {
    name: "ClinicaBiointegralSaude",
    img: biointegral,
    github: "https://github.com/sergiofisio/biointegralNext",
    site: "https://biointegralsaude.com.br/",
    descricao: 7,
    tecnologias: [
      {
        title: "tecnologias",
        ul: [
          "Next.js",
          "tailwindcss",
          "typescript",
          "react-input-mask",
          "react-spinners",
          "react-toastify",
          "axios",
        ],
      },
    ],
  },
];

export default function Portifolio() {
  const { t } = useTranslation();
  const [projects, setProjects] = useState([]);

  const [showProject, setShowProject] = useState("CuboFlix");

  useEffect(() => {
    const updatedProjects = projectsInfo.map((project) => {
      const descricoes = [];
      for (let i = 1; i <= project.descricao; i++) {
        descricoes.push(t(`Projetos.${project.name}.descricao${i}`));
      }
      return { ...project, descricao: descricoes };
    });

    setProjects(updatedProjects);
  }, [t]);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col justify-between min-w-full h-full bg-[#262626d6] items-center"
    >
      <h1
        className="flex items-center w-full min-h-[6rem] px-10 text-6xl font-bold bg-gray-500 md:min-h-[2rem] md:text-2xl
"
      >
        {t("nav.Portifolio")}
      </h1>
      {projects.length ? (
        <div className="flex flex-col w-full items-center justify-center h-full">
          <div className="flex justify-evenly items-center w-full h-20">
            {projects.map((project, key) => {
              return (
                <PortifolioTitle
                  key={key}
                  title={project.name}
                  name={showProject}
                  setShowProject={setShowProject}
                />
              );
            })}
          </div>
          <div className="flex flex-col justify-center h-full w-full md:justify-normal">
            <PortifolioInfo projects={projects} name={showProject} />
          </div>
        </div>
      ) : (
        "loading"
      )}
    </motion.section>
  );
}
