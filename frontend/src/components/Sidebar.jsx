import { Link } from "react-router-dom";
import "../styles/Sidebar.css"; // 🔹 CSS för sidomenyn
import { FaHome, FaCar, FaBuffer, FaWrench, FaCheckSquare, FaRoad, FaTools, FaUser, FaTrophy, FaHistory, FaCog } from "react-icons/fa"; // 🔹 Ikoner
import logo from "../assets/CarDeal_logo.webp";

function Sidebar() {
    return (
        <div className="sidebar">
            <div className="logo-sidebar">
                <img src={logo} alt="CarDeal AB" className="logo" />
            </div>

            <ul>
                {/* HEM */}
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
                <li><Link to="/tavling"><FaTrophy /> Tävling</Link></li>

                <h1 className="sidebar-title">ÖVRIGT</h1>
                <li><Link to="/historik"><FaHistory /> Historik</Link></li>
                <li><Link to="/admin-settings"><FaCog /> Admin</Link></li>
            </ul>
        </div>
    );
}

export default Sidebar;
