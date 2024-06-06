import { portifolioTypes } from "../../types/type";

export default function Portifolios({
  portifolio,
  setShowModal,
  setModal,
}: {
  portifolio: portifolioTypes;
  setShowModal: (showModal: boolean) => void;
  setModal: (modal: any) => void;
}) {
  return (
    <div className="w-1/2 flex flex-col items-center justify-center p-4">
      <div
        className=" cursor-pointer"
        onClick={() => {
          setShowModal(true);
          setModal(portifolio);
        }}
      >
        <h2>{portifolio.titleId}</h2>
        <img className="h-1/2 rounded-3xl" src={portifolio.image} alt="" />
      </div>
    </div>
  );
}
