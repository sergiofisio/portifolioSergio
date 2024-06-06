import { useState } from "react";
import { portifolioTypes } from "../../../types/type";

export default function EditModal({
  setModal,
  setInfo,
  info,
}: {
  setModal: (value: string) => void;
  setInfo: (value: portifolioTypes) => void;
  info: portifolioTypes;
}) {
  console.log({ info });

  const [editForm, setEditForm] = useState(info);
  return (
    <div className="fixed flex items-center justify-center w-full h-full bg-gray-500 bg-opacity-50 top-0">
      <div className="bg-white w-4/5 h-[80%] relative flex flex-col items-center rounded-3xl p-4 gap-4">
        <button
          type="button"
          onClick={() => {
            setModal("");
          }}
          className="w-11 h-11 text-3xl justify-center rounded-[100%] border border-transparent shadow-sm p-1 bg-black font-medium text-white hover:bg-white hover:text-black transition-all duration-500 ease-in-out absolute right-2 top-2 "
        >
          X
        </button>
        <Input
          text={"Titulo Br"}
          placeholder={"Titulo em portugues"}
          onChange={(e) => {
            setEditForm({
              ...editForm,
              portifolioBr: {
                ...editForm.portifolioBr,
                titleBr: e.target.value,
              },
            });
          }}
        />
      </div>
    </div>
  );
}
