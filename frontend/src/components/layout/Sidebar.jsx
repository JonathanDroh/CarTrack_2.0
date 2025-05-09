// Komponent: Sidebar
// Beskrivning: Sidomeny med navigeringslänkar till olika sidor beroende på inloggad användares roll.

import { Link } from "react-router-dom";
import { useAuth } from "../../context/authUtils";
import "../../styles/Sidebar.css";
import {
  FaHome,
  FaCar,
  FaBuffer,
  FaWrench,
  FaCheckSquare,
  FaRoad,
  FaTools,
  FaUser,
  FaHistory,
  FaCog
} from "react-icons/fa";
import logo from "../../assets/CarDeal_logo.webp";
import LogoutButton from "../buttons/LogoutButton";

function Sidebar() {
  const { user, logoutUser } = useAuth();

  return (
    <div className="sidebar">
      <div className="logo-sidebar">
        <img src={logo} alt="CarDeal AB" className="logo" />
      </div>

      <ul>
        <li><Link to="/dashboard"><FaHome /> Hem</Link></li>

        <h1 className="sidebar-title">JOBB</h1>
        <li><Link to="/lackering"><FaCar /> Lackering</Link></li>
        <li><Link to="/rekond"><FaBuffer /> Rekond</Link></li>
        <li><Link to="/verkstad"><FaWrench /> Verkstad</Link></li>
        <li><Link to="/pwr"><FaTools /> PWR</Link></li>
        <li><Link to="/besiktning"><FaCheckSquare /> Besiktning</Link></li>
        <li><Link to="/korning"><FaRoad /> Körningar</Link></li>
        <li><Link to="/atgard"><FaTools /> Åtgärder</Link></li>

        <h1 className="sidebar-title">MIN SIDA</h1>
        <li><Link to="/kundregister"><FaUser /> Kundregister</Link></li>

        <h1 className="sidebar-title">ÖVRIGT</h1>
        <li><Link to="/historik"><FaHistory /> Historik</Link></li>

        {user?.role === "Admin" && (
          <li><Link to="/admin-settings"><FaCog /> Admin</Link></li>
        )}
      </ul>

      <div className="logout-container">
        <LogoutButton onClick={logoutUser} />
      </div>
    </div>
  );
}

export default Sidebar;
