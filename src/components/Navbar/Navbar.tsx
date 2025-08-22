import { FaChartBar, FaHome, FaTags, FaUser } from "react-icons/fa";
import NavBtn from "../NavBtn/NavBtn";

function Navbar() {
  return (
    <nav className="flex flex-row justify-around text-lg border-t border-gray-200 py-3 fixed bottom-0 w-full z-50 bg-white">
      <NavBtn title="Início" to="/">
        <FaHome />
      </NavBtn>

      <NavBtn title="Relatórios" to="/reports">
        <FaChartBar />
      </NavBtn>

      <NavBtn title="Categorias" to="/categories">
        <FaTags />
      </NavBtn>

    </nav>
  );
}

export default Navbar;
