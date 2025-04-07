// Komponent: PWR
// Beskrivning: Visar en tabell med aktiva PWR-jobb med möjlighet att söka, lägga till, redigera, radera och ändra status.

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/layout/Sidebar";
import Header from "../../components/layout/Header";
import DataTable from "../../components/tables/DataTable";
import DeleteButton from "../../components/buttons/DeleteButton";
import SendButton from "../../components/buttons/SendButton";
import CompleteButton from "../../components/buttons/CompleteButton";
import EditJobModal from "../../components/modals/EditJobModal";
import { pwrFields } from "../../../utils/fields";
import "../../styles/Table.css";
import "../../styles/Components.css";

function PWR() {
  const [pwrList, setPwrList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedJob, setSelectedJob] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const navigate = useNavigate();

  // Hämta alla aktiva PWR-jobb
  useEffect(() => {
    fetchPWR();
  }, []);

  const fetchPWR = () => {
    fetch("http://localhost:5050/api/pwr")
      .then((res) => res.json())
      .then((data) => setPwrList(data))
      .catch((err) => console.error("Fel vid hämtning av PWR:", err));
  };

  // Hantera borttagning av PWR-jobb
  const handleDeleteClick = (rowData) => {
    if (!window.confirm("Är du säker på att du vill ta bort detta PWR-jobb?")) return;

    fetch(`http://localhost:5050/api/pwr/${rowData.pwr_id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) fetchPWR();
        else alert("Kunde inte ta bort PWR-jobbet.");
      })
      .catch((err) => console.error("Fel vid borttagning av PWR-jobb:", err));
  };

  // Öppna redigeringsmodal vid radklick
  const handleRowClick = (rowData) => {
    setSelectedJob(rowData);
    setShowEditModal(true);
  };

  return (
    <div className="page-container">
      <Sidebar />
      <main className="page-content">
        <Header
          title="PWR"
          showAddButton
          showHistoryButton
          onSearch={setSearchQuery}
          searchQuery={searchQuery}
          onAdd={() => navigate("/add-pwr")}
          onHistory={() => navigate("/pwr-history")}
        />

        <DataTable
          columns={["Regnr", "Del", "Kommentar", "Skickad", "Status"]}
          data={pwrList.filter(
            (p) =>
              p.regnr.toLowerCase().includes(searchQuery.toLowerCase()) ||
              (p.delar && p.delar.toLowerCase().includes(searchQuery.toLowerCase()))
          )}
          actions={[
            ({ rowData }) => (
              <DeleteButton onClick={() => handleDeleteClick(rowData)} />
            ),
          ]}
          renderCell={(column, rowData) => {
            if (column === "Status") {
              return rowData.datum_s ? (
                <CompleteButton
                  jobId={rowData.pwr_id}
                  onUpdate={fetchPWR}
                  baseUrl="http://localhost:5050/api/pwr"
                />
              ) : (
                <SendButton
                  jobId={rowData.pwr_id}
                  onUpdate={fetchPWR}
                  baseUrl="http://localhost:5050/api/pwr"
                />
              );
            }

            if (column === "Del") {
              return rowData.delar || "-";
            }

            return null;
          }}
          onRowClick={handleRowClick}
        />

        {showEditModal && selectedJob && (
          <EditJobModal
            title="Redigera PWR"
            jobData={selectedJob}
            fields={pwrFields}
            apiUrl="http://localhost:5050/api/pwr"
            uploadUrl="http://localhost:5050/api/pwr"
            enableImageUpload={true}
            onClose={() => setShowEditModal(false)}
            onSave={fetchPWR}
          />
        )}
      </main>
    </div>
  );
}

export default PWR;
