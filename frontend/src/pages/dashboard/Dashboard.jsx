// Komponent: Dashboard
// Beskrivning: Startsida som visar statistik (aktiva och skickade jobb) för alla jobbkategorier.

import { useEffect, useState, useMemo } from "react";
import Sidebar from "../../components/layout/Sidebar";
import "../../styles/Dashboard.css";

function Dashboard() {
  const [stats, setStats] = useState({});

  const sections = useMemo(() => [
    { name: "Lackering", key: "lackering" },
    { name: "Rekond", key: "rekond" },
    { name: "Verkstad", key: "verkstad" },
    { name: "PWR", key: "pwr" },
    { name: "Besiktning", key: "besiktning" },
    { name: "Körningar", key: "korning" },
    { name: "Åtgärder", key: "atgard" }
  ], []);

  useEffect(() => {
    sections.forEach((section) => {
      fetch(`http://localhost:5050/api/${section.key}/stats`)
        .then((res) => res.json())
        .then((data) => {
          setStats((prev) => ({ ...prev, [section.key]: data }));
        });
    });
  }, [sections]);

  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="dashboard-content">
        <h1>Hem</h1>
        <div className="dashboard-boxes">
          {sections.map((section, index) => {
            const data = stats[section.key] || {};
            return (
              <div key={index} className="dashboard-box">
                <h2>{section.name}</h2>
                <p>Aktiva: {data.aktiva ?? "-"}</p>
                <p>Skickade: {data.skickade ?? "-"}</p>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
