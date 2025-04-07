// Sida: VerkstadHistory
// Beskrivning: Visar historik över färdiga verkstadsjobb med möjlighet att söka och ta bort jobb.

import { useState, useEffect } from "react";
import Sidebar from "../../components/layout/Sidebar";
import Header from "../../components/layout/Header";
import DataTable from "../../components/tables/DataTable";
import DeleteButton from "../../components/buttons/DeleteButton";
import "../../styles/Table.css";
import "../../styles/Components.css";

function VerkstadHistory() {
  const [history, setHistory] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchHistory();
  }, []);

  // Hämta alla färdiga verkstadsjobb från backend
  const fetchHistory = () => {
    fetch("http://localhost:5050/api/verkstad/history")
      .then((res) => res.json())
      .then((data) => setHistory(data))
      .catch((err) => console.error("Fel vid hämtning av verkstadshistorik:", err));
  };

  // Radera ett verkstadsjobb från historiken
  const handleDeleteClick = (rowData) => {
    if (!window.confirm("Är du säker på att du vill ta bort detta verkstadsjobb?")) return;

    fetch(`http://localhost:5050/api/verkstad/${rowData.verkstad_id}`, {
      method: "DELETE"
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          fetchHistory();
        } else {
          alert("Kunde inte ta bort verkstadsjobb.");
        }
      })
      .catch((err) => console.error("Fel vid borttagning av verkstadsjobb:", err));
  };

  const filteredHistory = history.filter(
    (v) =>
      v.regnr.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (v.typ_av_jobb && v.typ_av_jobb.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="page-container">
      <Sidebar />
      <main className="page-content">
        <Header 
          title="Verkstadshistorik" 
          showBackButton
          backTo="/verkstad"
          onSearch={setSearchQuery}
          searchQuery={searchQuery}
        />

        <DataTable
          columns={["Regnr", "Typ av jobb", "Kommentar", "Skickad", "Färdig"]}
          data={filteredHistory}
          actions={[
            ({ rowData }) => (
              <DeleteButton onClick={() => handleDeleteClick(rowData)} />
            )
          ]}
          renderCell={(column, rowData) => {
            if (column === "Typ av jobb") return rowData.typ_av_jobb || "-";
            return null;
          }}
        />
      </main>
    </div>
  );
}

export default VerkstadHistory;
