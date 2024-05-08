import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function SkillInfo({ skill, img, text }) {
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-center w-full gap-5">
      <img
        className="h-24 w-24 md:h-18 md:w-10"
        src={img}
        alt={`img ${skill}`}
      />
      <div className="w-full h-full">
        <h2 className="uppercase text-3xl font-bold md:text-xl">{skill}</h2>
        {text && (
          <p className="text-xl overflow-y-auto min-h-[2rem] scrollbar-thin scrollbar-thumb-[#fff] scrollbar-thumb-rounded-full scrollbar-track-transparent scrollbar-track-rounded-full max-h-20 pr-3 md:text-sm md:max-h-16">
            {t(text)}
          </p>
        )}
      </div>
    </div>
  );
}
