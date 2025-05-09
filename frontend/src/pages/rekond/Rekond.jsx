// Komponent: Rekond
// Beskrivning: Visar lista över aktiva rekond-jobb med möjlighet att söka, lägga till, redigera, skicka, färdigställa och ta bort jobb.

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/layout/Sidebar";
import Header from "../../components/layout/Header";
import DataTable from "../../components/tables/DataTable";
import SendButton from "../../components/buttons/SendButton";
import CompleteButton from "../../components/buttons/CompleteButton";
import DeleteButton from "../../components/buttons/DeleteButton";
import EditJobModal from "../../components/modals/EditJobModal";
import { rekondFields } from "../../../utils/fields";
import "../../styles/Table.css";

function Rekond() {
  const [rekondList, setRekondList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedJob, setSelectedJob] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const navigate = useNavigate();

  // Hämta rekond-jobb vid komponentens första rendering
  useEffect(() => {
    fetchRekond();
  }, []);

  // Funktion för att hämta rekond-jobb från API
  const fetchRekond = () => {
    fetch(`${import.meta.env.VITE_API_URL}/api/rekond`)
      .then((res) => res.json())
      .then((data) => setRekondList(data))
      .catch((err) => console.error("Fel vid hämtning av rekond:", err));
  };

  // Ta bort ett rekond-jobb
  const handleDeleteClick = (rowData) => {
    if (!window.confirm("Är du säker på att du vill ta bort denna rekond?")) return;
    fetch(`${import.meta.env.VITE_API_URL}/api/rekond/${rowData.rekond_id}`, { method: "DELETE" })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) fetchRekond();
        else alert("Kunde inte ta bort rekond.");
      })
      .catch((err) => console.error("Fel vid borttagning av rekond:", err));
  };

  // Filtrerar och sorterar listan baserat på sökningen
  const filteredList = rekondList
    .filter((r) => !r.datum_t)
    .filter(
      (r) =>
        r.regnr.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (r.firma && r.firma.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) => b.rekond_id - a.rekond_id);

  // Hantera klick på rad för att öppna redigeringsmodal
  const handleRowClick = (rowData) => {
    setSelectedJob(rowData);
    setShowEditModal(true);
  };

  return (
    <div className="page-container">
      <Sidebar />
      <main className="page-content">
        <Header
          title="Rekond"
          showAddButton
          showHistoryButton
          onSearch={setSearchQuery}
          searchQuery={searchQuery}
          onAdd={() => navigate("/add-rekond")}
          onHistory={() => navigate("/rekond-history")}
        />

        <DataTable
          columns={["Regnr", "Firma", "Tvatt", "Kommentar", "Skickad", "Status"]}
          data={filteredList}
          actions={[
            ({ rowData }) => (
              <DeleteButton onClick={() => handleDeleteClick(rowData)} />
            ),
          ]}
          renderCell={(col, row) => {
            if (col === "Status") {
              return row.datum_s ? (
                <CompleteButton
                  jobId={row.rekond_id}
                  onUpdate={fetchRekond}
                  baseUrl={`${import.meta.env.VITE_API_URL}/api/rekond`}
                />
              ) : (
                <SendButton
                  jobId={row.rekond_id}
                  onUpdate={fetchRekond}
                  baseUrl={`${import.meta.env.VITE_API_URL}/api/rekond`}
                />
              );
            }
            return null; // Standardrendering i DataTable hanterar övriga kolumner
          }}
          onRowClick={handleRowClick}
        />

        {showEditModal && selectedJob && (
          <EditJobModal
            title="Redigera Rekond"
            jobData={selectedJob}
            fields={rekondFields}
            onClose={() => setShowEditModal(false)}
            onSave={fetchRekond}
            enableImageUpload={true}
            apiUrl={`${import.meta.env.VITE_API_URL}/api/rekond`}
            uploadUrl={`${import.meta.env.VITE_API_URL}/api/rekond`}
          />
        )}
      </main>
    </div>
  );
}

export default Rekond;
