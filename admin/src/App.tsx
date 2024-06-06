import { AnimatePresence } from "framer-motion";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import { AppContext } from "./context/context";
import { useContext } from "react";

export default function App() {
  const { portifolios, setPortifolios, isLoading } = useContext(AppContext);

  return (
    <div className="flex flex-col min-w-full min-h-full">
      <div className="flex flex-col w-full h-full relative">
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home portifolios={portifolios} />} />
          </Routes>
        </AnimatePresence>
      </div>
    </div>
  );
}
