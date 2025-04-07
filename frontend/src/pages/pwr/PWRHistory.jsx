// Komponent: PWRHistory
// Beskrivning: Visar en tabell med historiska (avslutade) PWR-jobb med möjlighet att söka och radera.

import { useState, useEffect } from "react";
import Sidebar from "../../components/layout/Sidebar";
import Header from "../../components/layout/Header";
import DataTable from "../../components/tables/DataTable";
import DeleteButton from "../../components/buttons/DeleteButton";
import "../../styles/Table.css";
import "../../styles/Components.css";

function PWRHistory() {
  const [history, setHistory] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Hämta historik för avslutade PWR-jobb vid första renderingen
  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = () => {
    fetch("http://localhost:5050/api/pwr/history")
      .then((res) => res.json())
      .then((data) => setHistory(data))
      .catch((err) => console.error("Fel vid hämtning av PWR-historik:", err));
  };

  // Hantera borttagning av historiskt PWR-jobb
  const handleDeleteClick = (rowData) => {
    if (!window.confirm("Är du säker på att du vill ta bort detta PWR-jobb?")) return;

    fetch(`http://localhost:5050/api/pwr/${rowData.pwr_id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          fetchHistory();
        } else {
          alert("Kunde inte ta bort PWR-jobbet.");
        }
      })
      .catch((err) => console.error("Fel vid borttagning av PWR-jobb:", err));
  };

  // Filtrera historik baserat på sökfråga
  const filteredHistory = history.filter(
    (p) =>
      p.regnr.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.delar && p.delar.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="page-container">
      <Sidebar />
      <main className="page-content">
        <Header
          title="PWR-historik"
          showBackButton={true}
          backTo="/pwr"
          onSearch={setSearchQuery}
          searchQuery={searchQuery}
        />

        <DataTable
          columns={["Regnr", "Del", "Kommentar", "Skickad", "Färdig"]}
          data={filteredHistory}
          actions={[
            ({ rowData }) => (
              <DeleteButton onClick={() => handleDeleteClick(rowData)} />
            ),
          ]}
          renderCell={(column, rowData) => {
            if (column === "Del") return rowData.delar || "-";
            return null;
          }}
        />
      </main>
    </div>
  );
}

export default PWRHistory;
