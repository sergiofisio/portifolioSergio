import { useTranslation } from "react-i18next";
import siteIcon from "../../assets/projects/site.svg";
import githubIcon from "../../assets/projects/github.svg"; // Corrigido o caminho do ícone do github
import { useEffect, useState } from "react";

export default function PortifolioInfo({ projects, name }) {
  const [projectInfo, setProjectInfo] = useState({
    name: "",
    img: "",
    github: "",
    site: "",
    numDescriptions: 0,
    descriptions: [],
  });
  const { t } = useTranslation();

  useEffect(() => {
    const project = projects.find((project) => project.name === name);
    const descriptions = Array.from(
      { length: project.numDescriptions },
      (_, i) => `Projetos.${project.name}.descricao${i + 1}`
    );
    setProjectInfo({
      ...project,
      descriptions: descriptions,
    });
  }, [projects, name]);

  return (
    <div className="flex items-center justify-evenly w-full h-full min-h-[calc(100vh-20rem)] md:flex-col md:max-h-full md:overflow-y-scroll md:h-full">
      <img
        className="h-[25rem] rounded-[10rem] md:h-40 md:hidden"
        src={projectInfo.img}
        alt="img potifolio"
      />
      <div className="w-1/4 flex flex-col justify-evenly h-full gap-10 md:w-full md:px-4 md:gap-0 md:justify-around">
        <h2 className="text-4xl font-bold text-center w-full md:text-3xl">
          {t(`Projetos.${projectInfo.name}.title`)}
        </h2>
        <div className="flex flex-col gap-1 max-h-72 overflow-y-auto scrollbar-thin scrollbar-thumb-[#fff] scrollbar-thumb-rounded-full scrollbar-track-transparent scrollbar-track-rounded-full">
          {projectInfo.descriptions.map((description, i) => (
            <p key={i}>{t(description)}</p>
          ))}
        </div>
        <div className="flex w-full gap-3 h-14">
          <a
            href={projectInfo.site}
            target="_blank"
            rel="noreferrer"
            className="flex justify-center items-center gap-4 bg-[#262626] rounded-3xl w-full border-4 border-solid border-blue-600"
          >
            <img src={siteIcon} alt="icon site" />
            <h2 className="text-center">Teste a aplicação</h2>
          </a>
          <a
            href={projectInfo.github}
            target="_blank"
            rel="noreferrer"
            className="flex justify-center items-center gap-4 bg-[#262626] rounded-3xl w-full border-4 border-solid border-blue-600"
          >
            <img src={githubIcon} alt="icon github" />
            <h2>GitHub</h2>
          </a>
        </div>
      </div>
    </div>
  );
}
