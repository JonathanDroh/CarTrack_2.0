// Komponent: Korning
// Beskrivning: Visar alla aktiva körningar i en tabell med funktioner för att söka, redigera, skicka, slutföra och ta bort körningsjobb.

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/layout/Sidebar";
import Header from "../../components/layout/Header";
import DataTable from "../../components/tables/DataTable";
import DeleteButton from "../../components/buttons/DeleteButton";
import SendButton from "../../components/buttons/SendButton";
import CompleteButton from "../../components/buttons/CompleteButton";
import EditJobModal from "../../components/modals/EditJobModal";
import { korningFields } from "../../../utils/fields";
import "../../styles/Table.css";
import "../../styles/Components.css";

function Korning() {
  const [korningar, setKorningar] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedJob, setSelectedJob] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchKorningar();
  }, []);

  const fetchKorningar = () => {
    fetch("http://localhost:5050/api/korning")
      .then((res) => res.json())
      .then((data) => setKorningar(data))
      .catch((err) => console.error("Fel vid hämtning av körningar:", err));
  };

  const handleDeleteClick = (rowData) => {
    if (!window.confirm("Är du säker på att du vill ta bort denna körning?")) return;

    fetch(`http://localhost:5050/api/korning/${rowData.korning_id}`, {
      method: "DELETE"
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) fetchKorningar();
        else alert("Kunde inte ta bort körningen.");
      })
      .catch((err) => console.error("Fel vid borttagning av körning:", err));
  };

  const handleRowClick = (rowData) => {
    setSelectedJob(rowData);
    setShowEditModal(true);
  };

  return (
    <div className="page-container">
      <Sidebar />
      <main className="page-content">
        <Header
          title="Körning"
          showAddButton
          showHistoryButton
          onSearch={setSearchQuery}
          searchQuery={searchQuery}
          onAdd={() => navigate("/add-korning")}
          onHistory={() => navigate("/korning-history")}
        />

        <div className="table-container">
          <DataTable
            columns={[
              "Regnr",
              "Korningstyp",
              "Förare",
              "Kommentar",
              "Planerat datum",
              "Skickad",
              "Status"
            ]}
            data={korningar.filter(
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
                return rowData.datum_s ? (
                  <CompleteButton
                    jobId={rowData.korning_id}
                    onUpdate={fetchKorningar}
                    baseUrl="http://localhost:5050/api/korning"
                  />
                ) : (
                  <SendButton
                    jobId={rowData.korning_id}
                    onUpdate={fetchKorningar}
                    baseUrl="http://localhost:5050/api/korning"
                  />
                );
              }
              return null;
            }}
            onRowClick={handleRowClick}
          />
        </div>

        {showEditModal && selectedJob && (
          <EditJobModal
            title="Redigera Körning"
            jobData={selectedJob}
            fields={korningFields}
            apiUrl="http://localhost:5050/api/korning"
            uploadUrl="http://localhost:5050/api/korning"
            enableImageUpload={false}
            onClose={() => setShowEditModal(false)}
            onSave={fetchKorningar}
          />
        )}
      </main>
    </div>
  );
}

export default Korning;
