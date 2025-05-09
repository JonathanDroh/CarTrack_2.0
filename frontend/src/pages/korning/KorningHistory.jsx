// Komponent: KorningHistory
// Beskrivning: Visar historik över körningar med möjlighet att söka, ta bort och (vid behov) skicka eller slutföra ofullständiga jobb.

import { useState, useEffect } from "react";
import Sidebar from "../../components/layout/Sidebar";
import Header from "../../components/layout/Header";
import DataTable from "../../components/tables/DataTable";
import DeleteButton from "../../components/buttons/DeleteButton";
import SendButton from "../../components/buttons/SendButton";
import CompleteButton from "../../components/buttons/CompleteButton";
import "../../styles/Table.css";
import "../../styles/Components.css";

function KorningHistory() {
  const [history, setHistory] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = () => {
    fetch(`${import.meta.env.VITE_API_URL}/api/korning/history`)
      .then((res) => res.json())
      .then((data) => setHistory(data))
      .catch((err) => console.error("Fel vid hämtning av körningshistorik:", err));
  };

  const handleDeleteClick = (rowData) => {
    if (!window.confirm("Är du säker på att du vill ta bort denna körning?")) return;

    fetch(`${import.meta.env.VITE_API_URL}/api/korning/${rowData.korning_id}`, {
      method: "DELETE"
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) fetchHistory();
        else alert("Kunde inte ta bort körningen.");
      })
      .catch((err) => console.error("Fel vid borttagning av körning:", err));
  };

  const hasUnfinishedJobs = history.some((job) => !job.datum_t);

  const columns = [
    "Regnr",
    "Korningstyp",
    "Förare",
    "Kommentar",
    "Planerat datum",
    "Skickad",
    "Färdig"
  ];

  if (hasUnfinishedJobs) {
    columns.push("Status");
  }

  return (
    <div className="page-container">
      <Sidebar />
      <main className="page-content">
        <Header
          title="Körningshistorik"
          showBackButton={true}
          backTo="/korning"
          onSearch={setSearchQuery}
          searchQuery={searchQuery}
        />
        <div className="table-container">
          <DataTable
            columns={columns}
            data={history.filter(
              (k) =>
                k.regnr.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (k.korningstyp &&
                  k.korningstyp.toLowerCase().includes(searchQuery.toLowerCase()))
            )}
            actions={[
              ({ rowData }) => (
                <DeleteButton onClick={() => handleDeleteClick(rowData)} />
              )
            ]}
            renderCell={(column, rowData) => {
              if (column === "Status") {
                if (rowData.datum_t) return null;

                return rowData.datum_s ? (
                  <CompleteButton
                    jobId={rowData.korning_id}
                    onUpdate={fetchHistory}
                    baseUrl={`${import.meta.env.VITE_API_URL}/api/korning`}
                  />
                ) : (
                  <SendButton
                    jobId={rowData.korning_id}
                    onUpdate={fetchHistory}
                    baseUrl={`${import.meta.env.VITE_API_URL}/api/korning`}
                  />
                );
              }

              return null;
            }}
          />
        </div>
      </main>
    </div>
  );
}

export default KorningHistory;
