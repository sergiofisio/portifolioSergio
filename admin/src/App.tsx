import { AnimatePresence } from "framer-motion";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Header from "./components/header";

function App() {
  return (
    <div className="flex flex-col max-w-[100vw] h-screen">
      <div className="flex flex-col w-full h-full relative">
        <Header />
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
