// Komponent: BesiktningHistory
// Beskrivning: Visar historik för avslutade besiktningar med möjlighet att söka och ta bort poster.

import { useState, useEffect } from "react";
import Sidebar from "../../components/layout/Sidebar";
import Header from "../../components/layout/Header";
import DataTable from "../../components/tables/DataTable";
import DeleteButton from "../../components/buttons/DeleteButton";
import "../../styles/Table.css";
import "../../styles/Components.css";

function BesiktningHistory() {
  const [history, setHistory] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = () => {
    fetch(`${import.meta.env.VITE_API_URL}/api/besiktning/history`)
      .then((res) => res.json())
      .then((data) => setHistory(data))
      .catch((err) =>
        console.error("Fel vid hämtning av besiktningshistorik:", err)
      );
  };

  const handleDeleteClick = (rowData) => {
    if (!window.confirm("Är du säker på att du vill ta bort denna besiktning?")) return;

    fetch(`${import.meta.env.VITE_API_URL}/api/besiktning/${rowData.besiktning_id}`, {
      method: "DELETE"
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) fetchHistory();
        else alert("Kunde inte ta bort besiktningen.");
      })
      .catch((err) =>
        console.error("Fel vid borttagning av besiktning:", err)
      );
  };

  return (
    <div className="page-container">
      <Sidebar />
      <main className="page-content">
        <Header
          title="Besiktninghistorik"
          showBackButton
          backTo="/besiktning"
          onSearch={setSearchQuery}
          searchQuery={searchQuery}
        />

        <div className="table-container">
          <DataTable
            columns={["Regnr", "Sista Besiktningsdatum", "Kommentar", "Skickad", "Färdig"]}
            data={history.filter(
              (b) =>
                b.regnr.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (b.sista_bes_datum &&
                  b.sista_bes_datum.toLowerCase().includes(searchQuery.toLowerCase()))
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

export default BesiktningHistory;
