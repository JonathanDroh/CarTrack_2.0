import { useAuth } from "../../context/authUtils";
import "../../styles/Dashboard.css";
import Sidebar from "../../components/Sidebar"; // 🔹 Importera Sidebar-komponenten

function Dashboard() {
    const { user } = useAuth();

    if (!user) {
        return <h1>Laddar...</h1>;
    }

    return (
        <div className="dashboard-container">
            <Sidebar /> {/* 🔹 Sidebar visas här istället för <aside> */}

            <main className="dashboard-content">
                <h1>Hem</h1>
                <div className="dashboard-boxes">
                    <div className="dashboard-box">
                        <h2>Lackeringar</h2>
                        <p>Antal: 20</p>
                    </div>
                    <div className="dashboard-box">
                        <h2>Rekond</h2>
                        <p>Antal: 15</p>
                    </div>
                    <div className="dashboard-box">
                        <h2>Verkstad</h2>
                        <p>Antal: 10</p>
                    </div>
                    <div className="dashboard-box">
                        <h2>PWR</h2>
                        <p>Antal: 5</p>
                    </div>
                    <div className="dashboard-box">
                        <h2>Besiktning</h2>
                        <p>Antal: 8</p>
                    </div>
                    <div className="dashboard-box">
                        <h2>Körningar</h2>
                        <p>Antal: 7</p>
                    </div>
                    <div className="dashboard-box">
                        <h2>Åtgärder</h2>
                        <p>Antal: 12</p>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Dashboard;
