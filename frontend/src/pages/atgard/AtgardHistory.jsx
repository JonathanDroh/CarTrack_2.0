// Sida: AtgardHistory.jsx
// Beskrivning: Visar historik över slutförda åtgärdsjobb och möjliggör radering av poster.

import { useState, useEffect } from "react";
import Sidebar from "../../components/layout/Sidebar";
import Header from "../../components/layout/Header";
import DataTable from "../../components/tables/DataTable";
import DeleteButton from "../../components/buttons/DeleteButton";
import "../../styles/Table.css";
import "../../styles/Components.css";

function AtgardHistory() {
  const [history, setHistory] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchHistory();
  }, []);

  // Hämta åtgärdshistorik från backend
  const fetchHistory = () => {
    fetch("http://localhost:5050/api/atgard/history")
      .then((res) => res.json())
      .then((data) => setHistory(data))
      .catch((err) =>
        console.error("Fel vid hämtning av åtgärdshistorik:", err)
      );
  };

  // Radera ett jobb från historik
  const handleDeleteClick = (rowData) => {
    if (!window.confirm("Är du säker på att du vill ta bort detta åtgärdsjobb?")) return;

    fetch(`http://localhost:5050/api/atgard/${rowData.atgard_id}`, {
      method: "DELETE"
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) fetchHistory();
        else alert("Kunde inte ta bort åtgärdsjobb.");
      })
      .catch((err) =>
        console.error("Fel vid borttagning av åtgärdsjobb:", err)
      );
  };

  return (
    <div className="page-container">
      <Sidebar />
      <main className="page-content">
        <Header 
          title="Åtgärdhistorik"
          showBackButton={true}
          backTo="/atgard"
          onSearch={setSearchQuery}
          searchQuery={searchQuery}
        />
        <div className="table-container">
          <DataTable
            columns={["Regnr", "Anställd", "Kommentar", "Sista Datum", "Skickad", "Färdig"]}
            data={history.filter(
              (a) =>
                a.regnr.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (a.anstalld && a.anstalld.toLowerCase().includes(searchQuery.toLowerCase()))
            )}
            actions={[
              ({ rowData }) => (
                <DeleteButton onClick={() => handleDeleteClick(rowData)} />
              )
            ]}
            renderCell={() => null}
          />
        </div>
      </main>
    </div>
  );
}

export default AtgardHistory;
