import { useState } from "react";
import Portifolios from "../../components/portifolios";
import PortifolioModal from "../../components/modal/portifolio";

export default function Home({ portifolios }: { portifolios: any }) {
  const [showModal, setShowModal] = useState(false);
  const [modal, setModal] = useState({});

  return (
    <div className="flex flex-col min-w-full min-h-full">
      <h1>Home</h1>
      <div className="flex w-full h-full">
        {portifolios.map((portifolio: any) => (
          <Portifolios
            key={portifolio.id}
            portifolio={portifolio}
            setShowModal={setShowModal}
            setModal={setModal}
          />
        ))}
      </div>
      {showModal && (
        <PortifolioModal
          portifolio={modal}
          setShowModal={setShowModal}
          setModal={setModal}
        />
      )}
    </div>
  );
}
