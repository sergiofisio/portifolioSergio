import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function ServiceCard() {
  const { t } = useTranslation();
  const [services, setServices] = useState([
    {
      title: "servicos.site.title",
      description: [
        {
          title: "servicos.site.item1.title",
          descricao: "servicos.site.item1.descricao",
        },
        {
          title: "servicos.site.item2.title",
          descricao: "servicos.site.item2.descricao",
        },
        {
          title: "servicos.site.item3.title",
          descricao: "servicos.site.item3.descricao",
        },
      ],
      show: "expandir",
      expandir: true,
    },
    {
      title: "servicos.aplicacao.title",
      description: [
        {
          title: "servicos.aplicacao.item1.title",
          descricao: "servicos.aplicacao.item1.descricao",
        },
        {
          title: "servicos.aplicacao.item2.title",
          descricao: "servicos.aplicacao.item2.descricao",
        },
        {
          title: "servicos.aplicacao.item3.title",
          descricao: "servicos.aplicacao.item3.descricao",
        },
      ],
      show: "expandir",
      expandir: false,
    },
  ]);
  const handleClick = (index) => {
    const newServices = [...services];
    newServices.forEach((service, i) => {
      if (i === index) {
        service.expandir = service.expandir ? true : !service.expandir;
      } else {
        service.expandir = false;
      }
    });
    setServices(newServices);
  };

  return (
    <div className="min-h-[calc(100vh-15rem)] flex flex-col w-full h-full py-3 items-center gap-4 border-gray-500 border-b-2 md:max-h-[80%] md:overflow-y-scroll md:min-h-full">
      {services.map(({ title, description, show, expandir }, index) => (
        <div
          key={index}
          onClick={() => handleClick(index)}
          className="w-full max-h-full py-3 px-10  flex flex-col items-center gap-4 border-gray-500 border-b-2 border-dotted last-of-type:border-none relative transition-all duration-200 ease-in-out "
        >
          <h2
            className={`items-center justify-center absolute top-0 left-0 w-full h-full text-5xl bg-gray-500 opacity-0 transition-all duration-500 ease-in-out hover:opacity-100 text-black font-bold ${
              expandir ? "hidden" : "flex cursor-pointer"
            } md:text-xl`}
          >
            {t(show)}
          </h2>
          <h2 className={`hidden ${expandir ? " md:hidden" : "md:flex"} `}>
            {t("expandir")}
          </h2>
          <h2 className="text-6xl font-bold md:text-2xl md:text-center">
            {t(title)}
          </h2>
          <div
            className={`overflow-hidden transition-all duration-500 ease-in-out gap-8 ${
              expandir ? "max-h-full" : "max-h-0"
            } md:overflow-y-scroll`}
          >
            {description.map(({ title, descricao }, key) => (
              <div
                className="flex flex-col items-center gap-3 my-4 md:border-b-2 md:border-white md:py-4"
                key={key}
              >
                <h3 className="text-5xl md:text-xl">{t(title)}</h3>
                <p className="text-xl md:text-base text-center md:max-h-24 md:overflow-y-scroll">
                  {t(descricao)}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
