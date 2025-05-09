// Komponent: KundregisterHistorik
// Beskrivning: Visar lista över avslutade kundposter. Stödjer sökning, radering och visning.

import { useState, useEffect } from "react";
import Sidebar from "../../components/layout/Sidebar";
import Header from "../../components/layout/Header";
import DataTable from "../../components/tables/DataTable";
import DeleteButton from "../../components/buttons/DeleteButton";
import ViewJobModal from "../../components/modals/ViewJobModal";
import { formatDate } from "../../../utils/dateUtils";
import { kundregisterFields } from "../../../utils/fields";
import "../../styles/Table.css";
import "../../styles/Components.css";

function KundregisterHistory() {
  const [history, setHistory] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = () => {
    fetch("http://localhost:5050/api/kundregister/history")
      .then((res) => res.json())
      .then((data) => setHistory(data))
      .catch((err) => console.error("Fel vid hämtning av kundhistorik:", err));
  };

  const handleDeleteClick = (rowData) => {
    if (!window.confirm("Är du säker på att du vill ta bort denna kundpost?")) return;
    fetch(`http://localhost:5050/api/kundregister/${rowData.kund_id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) fetchHistory();
        else alert("Kunde inte ta bort post.");
      })
      .catch((err) => console.error("Fel vid borttagning:", err));
  };

  const handleRowClick = (rowData) => {
    setSelectedRow(rowData);
    setShowModal(true);
  };

  const filtered = history
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
          title="Kundhistorik"
          showBackButton
          backTo="/kundregister"
          onSearch={setSearchQuery}
          searchQuery={searchQuery}
        />
        <div className="table-container">
          <DataTable
            columns={["K.Regnr", "I.Regnr", "Telefonnummer", "Datum", "Färdig"]}
            data={filtered}
            actions={[
              ({ rowData }) => (
                <DeleteButton onClick={() => handleDeleteClick(rowData)} />
              ),
            ]}
            renderCell={(column, rowData) => {
              if (column === "Datum") return formatDate(rowData.datum_s);
              if (column === "Färdig") return formatDate(rowData.datum_t);
              if (column === "K.Regnr") return rowData.k_regnmr;
              if (column === "I.Regnr") return rowData.i_regnmr;
              if (column === "Telefonnummer") return rowData.telefonnummer;
              return null;
            }}
            onRowClick={handleRowClick}
          />
        </div>

        {showModal && selectedRow && (
          <ViewJobModal
            title="Kunddetaljer"
            jobData={selectedRow}
            fields={kundregisterFields}
            onClose={() => setShowModal(false)}
          />
        )}
      </main>
    </div>
  );
}

export default KundregisterHistory;
