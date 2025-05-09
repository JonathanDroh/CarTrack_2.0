// Komponent: Kundregister
// Beskrivning: Visar lista över aktiva kundposter. Stödjer sökning, redigering och radering.

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/layout/Sidebar";
import Header from "../../components/layout/Header";
import DataTable from "../../components/tables/DataTable";
import DeleteButton from "../../components/buttons/DeleteButton";
import CompleteButton from "../../components/buttons/CompleteButton";
import SendButton from "../../components/buttons/SendButton";
import EditJobModal from "../../components/modals/EditJobModal";
import { kundregisterFields } from "../../../utils/fields";
import { formatDate } from "../../../utils/dateUtils";
import "../../styles/Table.css";
import "../../styles/Components.css";

function Kundregister() {
  const [kunder, setKunder] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedJob, setSelectedJob] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchKunder();
  }, []);

  const fetchKunder = () => {
    fetch(`${import.meta.env.VITE_API_URL}/api/kundregister`)
      .then((res) => res.json())
      .then((data) => setKunder(data))
      .catch((err) => console.error("Fel vid hämtning av kunder:", err));
  };

  const handleDeleteClick = (rowData) => {
    if (!window.confirm("Är du säker på att du vill ta bort denna kund?")) return;
    fetch(`${import.meta.env.VITE_API_URL}/api/kundregister/${rowData.kund_id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) fetchKunder();
        else alert("Kunde inte ta bort kundpost.");
      })
      .catch((err) => console.error("Fel vid borttagning av kund:", err));
  };

  const handleRowClick = (rowData) => {
    setSelectedJob(rowData);
    setShowEditModal(true);
  };

  const filtered = kunder
    .filter((k) => !k.datum_t)
    .filter((k) =>
      (k.k_regnmr && k.k_regnmr.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (k.i_regnmr && k.i_regnmr.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (k.anvandarnamn && k.anvandarnamn.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) => b.kund_id - a.kund_id);

  return (
    <div className="page-container">
      <Sidebar />
      <main className="page-content">
        <Header
          title="Kundregister"
          showAddButton
          showHistoryButton
          onSearch={setSearchQuery}
          searchQuery={searchQuery}
          onAdd={() => navigate("/add-kund")}
          onHistory={() => navigate("/kundregister-history")}
        />
        <div className="table-container">
          <DataTable
            columns={["K.Regnr", "I.Regnr", "Telefonnummer", "Säljare", "Datum", "Status"]}
            data={filtered}
            actions={[
              ({ rowData }) => (
                <DeleteButton onClick={() => handleDeleteClick(rowData)} />
              ),
            ]}
            renderCell={(column, rowData) => {
              if (column === "K.Regnr") return rowData.k_regnmr || "-";
              if (column === "I.Regnr") return rowData.i_regnmr || "-";
              if (column === "Telefonnummer") return rowData.telefonnummer || "-";
              if (column === "Säljare") return rowData.anvandarnamn || "-";
              if (column === "Datum") return formatDate(rowData.datum_s);
              if (column === "Status") {
                return rowData.datum_s ? (
                  <CompleteButton
                    jobId={rowData.kund_id}
                    onUpdate={fetchKunder}
                    baseUrl={`${import.meta.env.VITE_API_URL}/api/kundregister`}
                  />
                ) : (
                  <SendButton
                    jobId={rowData.kund_id}
                    onUpdate={fetchKunder}
                    baseUrl={`${import.meta.env.VITE_API_URL}/api/kundregister`}
                  />
                );
              }
              return "-";
            }}
            onRowClick={handleRowClick}
          />
        </div>

        {showEditModal && selectedJob && (
          <EditJobModal
            title="Redigera Kund"
            jobData={selectedJob}
            fields={kundregisterFields}
            apiUrl={`${import.meta.env.VITE_API_URL}/api/kundregister`}
            uploadUrl={`${import.meta.env.VITE_API_URL}/api/kundregister`}
            enableImageUpload={false}
            onClose={() => setShowEditModal(false)}
            onSave={fetchKunder}
          />
        )}
      </main>
    </div>
  );
}

export default Kundregister;
