// Sida: Verkstad
// Beskrivning: Visar aktiva verkstadsjobb med funktioner för att redigera, ta bort, skicka och markera som färdiga.

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/layout/Sidebar";
import Header from "../../components/layout/Header";
import DataTable from "../../components/tables/DataTable";
import DeleteButton from "../../components/buttons/DeleteButton";
import SendButton from "../../components/buttons/SendButton";
import CompleteButton from "../../components/buttons/CompleteButton";
import EditJobModal from "../../components/modals/EditJobModal";
import { verkstadFields } from "../../../utils/fields";
import "../../styles/Table.css";
import "../../styles/Components.css";

function Verkstad() {
  const [verkstadList, setVerkstadList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedJob, setSelectedJob] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchVerkstad();
  }, []);

  // Hämta alla aktiva verkstadsjobb från backend
  const fetchVerkstad = () => {
    fetch("http://localhost:5050/api/verkstad")
      .then((res) => res.json())
      .then((data) => setVerkstadList(data))
      .catch((err) => console.error("Fel vid hämtning av verkstad:", err));
  };

  // Radera ett verkstadsjobb
  const handleDeleteClick = (rowData) => {
    if (!window.confirm("Är du säker på att du vill ta bort detta verkstadsjobb?")) return;

    fetch(`http://localhost:5050/api/verkstad/${rowData.verkstad_id}`, {
      method: "DELETE"
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          fetchVerkstad();
        } else {
          alert("Kunde inte ta bort verkstadsjobb.");
        }
      })
      .catch((err) => console.error("Fel vid borttagning av verkstadsjobb:", err));
  };

  // Öppna modal för att redigera valt jobb
  const handleRowClick = (rowData) => {
    setSelectedJob(rowData);
    setShowEditModal(true);
  };

  const filteredList = verkstadList.filter(
    (v) =>
      v.regnr.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (v.typ_av_jobb && v.typ_av_jobb.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="page-container">
      <Sidebar />
      <main className="page-content">
        <Header 
          title="Verkstad" 
          showAddButton 
          showHistoryButton 
          onSearch={setSearchQuery} 
          searchQuery={searchQuery} 
          onAdd={() => navigate("/add-verkstad")}
          onHistory={() => navigate("/verkstad-history")}
        />

        <DataTable
          columns={["Regnr", "Typ av jobb", "Kommentar", "Skickad", "Status"]}
          data={filteredList}
          actions={[
            ({ rowData }) => (
              <DeleteButton onClick={() => handleDeleteClick(rowData)} />
            )
          ]}
          renderCell={(column, rowData) => {
            if (column === "Status") {
              return rowData.datum_s ? (
                <CompleteButton
                  jobId={rowData.verkstad_id}
                  onUpdate={fetchVerkstad}
                  baseUrl="http://localhost:5050/api/verkstad"
                />
              ) : (
                <SendButton
                  jobId={rowData.verkstad_id}
                  onUpdate={fetchVerkstad}
                  baseUrl="http://localhost:5050/api/verkstad"
                />
              );
            }

            if (column === "Typ av jobb") return rowData.typ_av_jobb || "-";

            return null;
          }}
          onRowClick={handleRowClick}
        />

        {showEditModal && selectedJob && (
          <EditJobModal
            title="Redigera Verkstad"
            jobData={selectedJob}
            fields={verkstadFields}
            apiUrl="http://localhost:5050/api/verkstad"
            uploadUrl="http://localhost:5050/api/verkstad"
            enableImageUpload={true}
            onClose={() => setShowEditModal(false)}
            onSave={fetchVerkstad}
          />
        )}
      </main>
    </div>
  );
}

export default Verkstad;
