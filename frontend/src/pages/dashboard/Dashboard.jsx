import { useAuth } from "../../context/authUtils";
import "../../styles/Dashboard.css";

function Dashboard() {
    const { user } = useAuth();

    if (!user) {
        return <h1>Laddar...</h1>;
    }

    return (
        <div className="dashboard-container">
            <h1>Välkommen till Dashboarden</h1>
            <p>Här ser du en översikt över systemet.</p>

            <div className="dashboard-cards">
                <div className="dashboard-card">📋 Totalt antal jobb: 20</div>
                <div className="dashboard-card">✅ Klara jobb: 12</div>
                <div className="dashboard-card">🚧 Pågående jobb: 8</div>
            </div>

            {/* 🔹 Om användaren är admin, visa admin-specifik information */}
            {user.role === "Admin" && (
                <div className="admin-section">
                    <h2>🔧 Adminfunktioner</h2>
                    <p>Här kan du hantera användare och systeminställningar.</p>
                </div>
            )}
        </div>
    );
}

export default Dashboard;
