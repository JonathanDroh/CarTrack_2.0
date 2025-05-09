// Komponent: Lackering
// Beskrivning: Visar lista över alla aktiva lackeringsjobb.
// Stödjer sökning, redigering via modal, samt statusuppdatering (skicka/färdig).

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/layout/Sidebar";
import Header from "../../components/layout/Header";
import DataTable from "../../components/tables/DataTable";
import DeleteButton from "../../components/buttons/DeleteButton";
import CompleteButton from "../../components/buttons/CompleteButton";
import SendButton from "../../components/buttons/SendButton";
import EditJobModal from "../../components/modals/EditJobModal";
import { lackeringFields } from "../../../utils/fields";
import "../../styles/Table.css";
import "../../styles/Components.css";

function Lackering() {
  const [lackeringar, setLackeringar] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedJob, setSelectedJob] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchLackeringar();
  }, []);

  // Hämta alla lackeringar från backend
  const fetchLackeringar = () => {
    fetch(`${import.meta.env.VITE_API_URL}/api/lackering`)
      .then((res) => res.json())
      .then((data) => setLackeringar(data))
      .catch((err) => console.error("Fel vid hämtning av lackeringar:", err));
  };

  // Radera en lackering
  const handleDeleteClick = (rowData) => {
    if (!window.confirm("Är du säker på att du vill ta bort denna lackering?")) return;

    fetch(`${import.meta.env.VITE_API_URL}/api/lackering/${rowData.lackering_id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          fetchLackeringar();
        } else {
          alert("Kunde inte ta bort lackering.");
        }
      })
      .catch((err) => console.error("Fel vid borttagning av lackering:", err));
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
          title="Lackering"
          showAddButton
          showHistoryButton
          onSearch={setSearchQuery}
          searchQuery={searchQuery}
          onAdd={() => navigate("/add-lackering")}
          onHistory={() => navigate("/lackering-history")}
        />
        
        <div className="table-container">
          <DataTable
            columns={["Regnr", "Firma", "Delar", "Kommentar", "Skickad", "Status"]}
            data={lackeringar.filter(
              (l) =>
                l.regnr.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (l.firma && l.firma.toLowerCase().includes(searchQuery.toLowerCase()))
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
                    jobId={rowData.lackering_id}
                    onUpdate={fetchLackeringar}
                    baseUrl="http://localhost:5050/api/lackering"
                  />
                ) : (
                  <SendButton
                    jobId={rowData.lackering_id}
                    onUpdate={fetchLackeringar}
                    baseUrl="http://localhost:5050/api/lackering"
                  />
                );
              }
              return undefined; // Hanteras av DataTable
            }}
            onRowClick={handleRowClick}
          />
        </div>

        {showEditModal && selectedJob && (
          <EditJobModal
            title="Redigera Lackering"
            jobData={selectedJob}
            fields={lackeringFields}
            apiUrl="http://localhost:5050/api/lackering"
            uploadUrl="http://localhost:5050/api/lackering"
            enableImageUpload={true}
            onClose={() => setShowEditModal(false)}
            onSave={fetchLackeringar}
          />
        )}
      </main>
    </div>
  );
}

export default Lackering;
