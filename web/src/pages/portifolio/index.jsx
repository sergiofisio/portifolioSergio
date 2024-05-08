import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import axiosPrivate from "../../service/github";
import { useEffect, useState } from "react";
import cuboflix from "../../assets/projects/cuboflix.png";
import cobranca from "../../assets/projects/cobranca.png";
import dindin from "../../assets/projects/dindin.png";
import pokedex from "../../assets/projects/pokedex.png";
import PortifolioInfo from "../../components/portifolio";
import PortifolioTitle from "../../components/portifolio/title";

export default function Portifolio() {
  const [projects, setProjects] = useState([]);
  const { t } = useTranslation();
  const [showProject, setShowProject] = useState("cuboflix");

  function getprojetcInfo(projectName, type) {
    switch (projectName) {
      case "cuboflix":
        return type === "img" ? cuboflix : 7;
      case "aplicacaoCobranca":
        return type === "img" ? cobranca : 10;
      case "web-app-dindin-TS":
        return type === "img" ? dindin : 17;
      case "pokedexNew":
        return type === "img" ? pokedex : 11;
      default:
        return "";
    }
  }

  async function getProjects() {
    const { data } = await axiosPrivate.get(
      "/orgs/portifolioSergiofisio/repos",
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
        },
      }
    );
    setProjects(
      data.map((project) => {
        return {
          name: project.name,
          img: getprojetcInfo(project.name, "img"),
          github: project.html_url,
          site: project.homepage,
          numDescriptions: getprojetcInfo(project.name, "description"),
        };
      })
    );
  }

  useEffect(() => {
    getProjects();
  }, []);
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
