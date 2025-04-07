// Komponent: LackeringHistory
// Beskrivning: Visar historik över färdiga lackeringsjobb.
// Innehåller sökfunktionalitet och möjlighet att radera historikposter.

import { useEffect, useState } from "react";
import Sidebar from "../../components/layout/Sidebar";
import Header from "../../components/layout/Header";
import DataTable from "../../components/tables/DataTable";
import DeleteButton from "../../components/buttons/DeleteButton";
import "../../styles/Table.css";
import "../../styles/Components.css";

function LackeringHistory() {
  const [history, setHistory] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchHistory();
  }, []);

  // Hämta historik från backend
  const fetchHistory = () => {
    fetch("http://localhost:5050/api/lackering/history")
      .then((res) => res.json())
      .then((data) => setHistory(data))
      .catch((err) => console.error("Fel vid hämtning av historik:", err));
  };

  // Hantera borttagning av en historikpost
  const handleDeleteClick = (rowData) => {
    if (!rowData || !rowData.lackering_id) {
      alert("Fel: Saknar lackering_id!");
      return;
    }

    if (!window.confirm("Är du säker på att du vill ta bort denna lackering?")) return;

    fetch(`http://localhost:5050/api/lackering/${rowData.lackering_id}`, { method: "DELETE" })
      .then((res) => res.ok ? res.json() : Promise.reject(res))
      .then((data) => {
        if (data.success) {
          fetchHistory();
        } else {
          alert("Kunde inte ta bort lackering.");
        }
      })
      .catch((err) => console.error("Fel vid borttagning av lackering:", err));
  };

  // Filtrera historik baserat på sökning och sortera efter nyaste först
  const filteredHistory = history
    .filter((l) => l.datum_t)
    .filter((l) =>
      l.regnr.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (l.firma && l.firma.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) => b.lackering_id - a.lackering_id);

  return (
    <div className="page-container">
      <Sidebar />
      <main className="page-content">
        <Header
          title="Lackeringshistorik"
          onSearch={setSearchQuery}
          searchQuery={searchQuery}
          showBackButton
          backTo="/lackering"
        />

        <div className="table-container">
          <DataTable
            columns={["Regnr", "Firma", "Delar", "Kommentar", "Skickad", "Färdig"]}
            data={filteredHistory}
            actions={[
              ({ rowData }) => (
                <DeleteButton onClick={() => handleDeleteClick(rowData)} />
              ),
            ]}
          />
        </div>
      </main>
    </div>
  );
}

export default LackeringHistory;
