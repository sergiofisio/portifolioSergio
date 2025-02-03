import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import siteIcon from "../../assets/projects/site.svg";
import githubIcon from "../../assets/projects/github.svg";

export default function PortifolioInfo({ projects, name }) {
  const { t } = useTranslation();
  const [projectInfo, setProjectInfo] = useState(null);

  useEffect(() => {
    if (!projects || !name) return;
    const project = projects.find((proj) => proj.name === name);
    if (project) {
      setProjectInfo(project);
    }
  }, [projects, name]);

  if (!projectInfo) {
    return (
      <p className="text-center text-xl font-semibold">
        Projeto não encontrado.
      </p>
    );
  }

  return (
    <div className="flex items-center justify-evenly w-full h-full min-h-[calc(100vh-20rem)] md:flex-col md:max-h-full md:overflow-y-scroll md:h-full">
      {projectInfo.img && (
        <img
          className="h-[25rem] rounded-[10rem] md:h-40 md:hidden"
          src={projectInfo.img}
          alt={`Imagem do projeto ${projectInfo.name}`}
        />
      )}
      <div className="w-1/4 flex flex-col justify-evenly h-full gap-10 md:w-full md:px-4 md:gap-0 md:justify-around">
        <h2 className="text-4xl font-bold text-center w-full md:text-3xl">
          {t(`Projetos.${projectInfo.name}.title`, projectInfo.name)}
        </h2>
        <div className="flex flex-col gap-1 max-h-72 overflow-y-auto scrollbar-thin scrollbar-thumb-[#fff] scrollbar-thumb-rounded-full scrollbar-track-transparent scrollbar-track-rounded-full">
          {projectInfo.descricao && projectInfo.descricao.length > 0 ? (
            projectInfo.descricao.map((desc, index) => (
              <p key={index}>{desc}</p>
            ))
          ) : (
            <p>Descrição não disponível.</p>
          )}
          {projectInfo.tecnologias && projectInfo.tecnologias.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold">Tecnologias</h3>
              <ul className="list-disc pl-5">
                {projectInfo.tecnologias[0].ul.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="flex w-full gap-3 h-14">
          {projectInfo.site && (
            <a
              href={projectInfo.site}
              target="_blank"
              rel="noreferrer"
              className="flex justify-center items-center gap-4 bg-[#262626] rounded-3xl w-full border-4 border-solid border-blue-600 p-2"
            >
              <img src={siteIcon} alt="Ícone do site" />
              <h2 className="text-center">Teste a aplicação</h2>
            </a>
          )}
          {projectInfo.github && (
            <a
              href={projectInfo.github}
              target="_blank"
              rel="noreferrer"
              className="flex justify-center items-center gap-4 bg-[#262626] rounded-3xl w-full border-4 border-solid border-blue-600 p-2"
            >
              <img src={githubIcon} alt="Ícone do GitHub" />
              <h2>GitHub</h2>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
