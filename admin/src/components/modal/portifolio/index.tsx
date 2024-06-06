import Description from "./description";
import Link from "./link";
import Title from "./title";
import { useState } from "react";
import Button from "../../button";
import EditModal from "../edit";

export default function PortifolioModal({
  portifolio,
  setShowModal,
  setModal,
}: {
  portifolio: any;
  setShowModal: (value: boolean) => void;
  setModal: (modal: any) => void;
}) {
  const [info, setInfo] = useState(portifolio);
  const [modal, setModalState] = useState("");

  return (
    <div className="fixed flex items-center justify-center w-full h-full bg-gray-500 bg-opacity-50 top-0">
      <div className="bg-white w-4/5 h-[80%] relative flex flex-col items-center rounded-3xl p-4 gap-4">
        <button
          type="button"
          onClick={() => {
            setShowModal(false);
            setModal({});
          }}
          className="w-11 h-11 text-3xl justify-center rounded-[100%] border border-transparent shadow-sm p-1 bg-black font-medium text-white hover:bg-white hover:text-black transition-all duration-500 ease-in-out absolute right-2 top-2 "
        >
          X
        </button>
        <h2 className="text-black text-5xl font-bold">
          {info.portifolioBr[0].title}
        </h2>
        <div className="w-full h-full flex items-center justify-center gap-3">
          <div className="w-2/6 flex flex-col items-center justify-between h-full">
            <div className="flex flex-col gap-3 h-1/2">
              {["Br", "Fr", "En"].map((language, key) => (
                <Title
                  key={key}
                  text={info[`portifolio${language}`][0].title}
                  language={language}
                />
              ))}
            </div>
            <img
              className="w-full rounded-3xl shadow-black shadow-2xl"
              src={info.image}
              alt=""
            />
          </div>
          <div className="w-4/6 h-full flex flex-col">
            <div className="flex flex-col gap-3">
              {["Br", "Fr", "En"].map((language, key) => (
                <Description
                  key={key}
                  text={info[`portifolio${language}`][0].description}
                  language={language}
                />
              ))}
            </div>
            <div className="flex items-center justify-evenly gap-3 w-full h-full">
              {["github", "url"].map((type, key) => (
                <Link url={info[`${type}`]} type={type} key={key} />
              ))}
            </div>
            <div>
              <Button
                className="bg-blue-600 border-blue-600 hover:text-blue-600"
                type="button"
                text="Editar"
                onClick={() => {
                  setModalState("edit"), setInfo(info);
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {modal === "edit" && (
        <EditModal setModal={setModalState} setInfo={setInfo} info={info} />
      )}
    </div>
  );
}
