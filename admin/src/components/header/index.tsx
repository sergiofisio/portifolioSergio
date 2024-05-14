import logo from "../../assets/logo.svg";
import { useNavigate } from "react-router-dom";

import Nav from "./nav";

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="flex items-center justify-between min-h-24 p-4">
      <div
        className="cursor-pointer flex items-center text-2xl gap-2 min-w-fit"
        onClick={() => navigate("/")}
      >
        <img src={logo} alt="Logo" />
        <h2>
          <strong>DEV</strong>Sergio
        </h2>
      </div>

      <Nav />
    </header>
  );
}
