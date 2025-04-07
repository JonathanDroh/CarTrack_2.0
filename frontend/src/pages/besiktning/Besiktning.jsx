// Komponent: Besiktning
// Beskrivning: Visar alla pågående besiktningar i en tabell med funktioner för att redigera, skicka, markera som färdig och ta bort.

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/layout/Sidebar";
import Header from "../../components/layout/Header";
import DataTable from "../../components/tables/DataTable";
import DeleteButton from "../../components/buttons/DeleteButton";
import SendButton from "../../components/buttons/SendButton";
import CompleteButton from "../../components/buttons/CompleteButton";
import EditJobModal from "../../components/modals/EditJobModal";
import { besiktningFields } from "../../../utils/fields";
import "../../styles/Table.css";
import "../../styles/Components.css";

function Besiktning() {
  const [besiktningar, setBesiktningar] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedJob, setSelectedJob] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBesiktningar();
  }, []);

  const fetchBesiktningar = () => {
    fetch("http://localhost:5050/api/besiktning")
      .then((res) => res.json())
      .then((data) => setBesiktningar(data))
      .catch((err) => console.error("Fel vid hämtning av besiktningar:", err));
  };

  const handleDeleteClick = (rowData) => {
    if (!window.confirm("Är du säker på att du vill ta bort denna besiktning?")) return;

    fetch(`http://localhost:5050/api/besiktning/${rowData.besiktning_id}`, {
      method: "DELETE"
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) fetchBesiktningar();
        else alert("Kunde inte ta bort besiktning.");
      })
      .catch((err) => console.error("Fel vid borttagning av besiktning:", err));
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
          title="Besiktning"
          showAddButton
          showHistoryButton
          onSearch={setSearchQuery}
          searchQuery={searchQuery}
          onAdd={() => navigate("/add-besiktning")}
          onHistory={() => navigate("/besiktning-history")}
        />

        <div className="table-container">
          <DataTable
            columns={["Regnr", "Sista Besiktningsdatum", "Kommentar", "Skickad", "Status"]}
            data={besiktningar.filter(
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
            renderCell={(column, rowData) => {
              if (column === "Status") {
                return rowData.datum_s ? (
                  <CompleteButton
                    jobId={rowData.besiktning_id}
                    onUpdate={fetchBesiktningar}
                    baseUrl="http://localhost:5050/api/besiktning"
                  />
                ) : (
                  <SendButton
                    jobId={rowData.besiktning_id}
                    onUpdate={fetchBesiktningar}
                    baseUrl="http://localhost:5050/api/besiktning"
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
            title="Redigera Besiktning"
            jobData={selectedJob}
            fields={besiktningFields}
            apiUrl="http://localhost:5050/api/besiktning"
            uploadUrl="http://localhost:5050/api/besiktning"
            enableImageUpload={false}
            onClose={() => setShowEditModal(false)}
            onSave={fetchBesiktningar}
          />
        )}
      </main>
    </div>
  );
}

export default Besiktning;
