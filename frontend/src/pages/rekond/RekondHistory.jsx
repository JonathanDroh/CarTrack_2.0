// Komponent: RekondHistory
// Beskrivning: Visar historik över färdiga rekond-jobb med sökfunktion samt möjlighet att ta bort enskilda poster.

import { useEffect, useState } from "react";
import Sidebar from "../../components/layout/Sidebar";
import Header from "../../components/layout/Header";
import DataTable from "../../components/tables/DataTable";
import DeleteButton from "../../components/buttons/DeleteButton";

function RekondHistory() {
  const [history, setHistory] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Hämta rekondhistorik vid komponentens initiala rendering
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/rekond/history`)
      .then((res) => res.json())
      .then((data) => setHistory(data))
      .catch((err) => console.error("Fel vid hämtning av rekondhistorik:", err));
  }, []);

  // Ta bort rekond-jobb från historiken
  const handleDeleteClick = (rowData) => {
    if (!window.confirm("Är du säker på att du vill ta bort denna rekond?")) return;

    fetch(`${import.meta.env.VITE_API_URL}/api/rekond/${rowData.rekond_id}`, { method: "DELETE" })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setHistory((prev) => prev.filter(r => r.rekond_id !== rowData.rekond_id));
        } else {
          alert("Kunde inte ta bort posten.");
        }
      })
      .catch(err => console.error("Fel vid borttagning av rekond:", err));
  };

  // Filtrera och sortera historiken baserat på sökfråga
  const filtered = history
    .filter(r => r.datum_t)
    .filter(r =>
      r.regnr.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (r.firma && r.firma.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) => b.rekond_id - a.rekond_id);

  return (
    <div className="page-container">
      <Sidebar />
      <main className="page-content">
        <Header
          title="Rekondhistorik"
          onSearch={setSearchQuery}
          searchQuery={searchQuery}
          showBackButton={true}
          backTo="/rekond"
        />

        <DataTable
          columns={["Regnr", "Firma", "Tvatt", "Kommentar", "Skickad", "Färdig"]}
          data={filtered}
          actions={[({ rowData }) => (
            <DeleteButton onClick={() => handleDeleteClick(rowData)} />
          )]}
          renderCell={() => null} // Standardrendering sker i DataTable
        />
      </main>
    </div>
  );
}

export default RekondHistory;
