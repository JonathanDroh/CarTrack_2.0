// Sida: Atgard.jsx
// Beskrivning: Visar alla aktiva åtgärdsjobb. Hanterar sökning, radering, redigering, och statusuppdatering.

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/layout/Sidebar";
import Header from "../../components/layout/Header";
import DataTable from "../../components/tables/DataTable";
import DeleteButton from "../../components/buttons/DeleteButton";
import SendButton from "../../components/buttons/SendButton";
import CompleteButton from "../../components/buttons/CompleteButton";
import EditJobModal from "../../components/modals/EditJobModal";
import { atgardFields } from "../../../utils/fields";
import "../../styles/Table.css";
import "../../styles/Components.css";

function Atgard() {
  const [atgardList, setAtgardList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedJob, setSelectedJob] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAtgard();
  }, []);

  // Hämta alla aktiva åtgärdsjobb
  const fetchAtgard = () => {
    fetch(`${import.meta.env.VITE_API_URL}/api/atgard`)
      .then((res) => res.json())
      .then((data) => setAtgardList(data))
      .catch((err) => console.error("Fel vid hämtning av åtgärder:", err));
  };

  // Radera ett jobb
  const handleDeleteClick = (rowData) => {
    if (!window.confirm("Är du säker på att du vill ta bort detta åtgärdsjobb?")) return;

    fetch(`${import.meta.env.VITE_API_URL}/api/atgard/${rowData.atgard_id}`, {
      method: "DELETE"
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          fetchAtgard();
        } else {
          alert("Kunde inte ta bort åtgärdsjobb.");
        }
      })
      .catch((err) => console.error("Fel vid borttagning av åtgärdsjobb:", err));
  };

  // Öppna redigeringsmodal
  const handleRowClick = (rowData) => {
    setSelectedJob(rowData);
    setShowEditModal(true);
  };

  return (
    <div className="page-container">
      <Sidebar />
      <main className="page-content">
        <Header
          title="Åtgärd"
          showAddButton
          showHistoryButton
          onSearch={setSearchQuery}
          searchQuery={searchQuery}
          onAdd={() => navigate("/add-atgard")}
          onHistory={() => navigate("/atgard-history")}
        />

        <div className="table-container">
          <DataTable
            columns={["Regnr", "Anställd", "Kommentar", "Sista Datum", "Skickad", "Status"]}
            data={atgardList.filter(
              (a) =>
                a.regnr.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (a.anstalld && a.anstalld.toLowerCase().includes(searchQuery.toLowerCase()))
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
                    jobId={rowData.atgard_id}
                    onUpdate={fetchAtgard}
                    baseUrl={`${import.meta.env.VITE_API_URL}/api/atgard`}
                  />
                ) : (
                  <SendButton
                    jobId={rowData.atgard_id}
                    onUpdate={fetchAtgard}
                    baseUrl={`${import.meta.env.VITE_API_URL}/api/atgard`}
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
            title="Redigera Åtgärd"
            jobData={selectedJob}
            fields={atgardFields}
            apiUrl={`${import.meta.env.VITE_API_URL}/api/atgard`}
            uploadUrl={`${import.meta.env.VITE_API_URL}/api/atgard`}
            enableImageUpload={false}
            onClose={() => setShowEditModal(false)}
            onSave={fetchAtgard}
          />
        )}
      </main>
    </div>
  );
}

export default Atgard;
