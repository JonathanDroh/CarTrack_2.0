// Komponent: Historik
// Beskrivning: Visar blandad historik från alla jobbkategorier med filtrering på regnr och jobbkategori.

import { useState, useEffect } from "react";
import Sidebar from "../../components/layout/Sidebar";
import Header from "../../components/layout/Header";
import DataTable from "../../components/tables/DataTable";
import Dropdown from "../../components/inputs/Dropdown";
import ViewJobModal from "../../components/modals/ViewJobModal";
import { formatDate } from "../../../utils/dateUtils";
import {
  lackeringFields,
  rekondFields,
  verkstadFields,
  pwrFields,
  besiktningFields,
  korningFields,
  atgardFields,
} from "../../../utils/fields";

import "../../styles/Table.css";
import "../../styles/Components.css";

function Historik() {
  const [historik, setHistorik] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedFields, setSelectedFields] = useState([]);

  const jobOptions = [
    { label: "Rekond", value: "Rekond" },
    { label: "Lackering", value: "Lackering" },
    { label: "Verkstad", value: "Verkstad" },
    { label: "PWR", value: "PWR" },
    { label: "Besiktning", value: "Besiktning" },
    { label: "Åtgärd", value: "Åtgärd" },
    { label: "Körning", value: "Körning" }
  ];

  useEffect(() => {
    fetch("http://localhost:5050/api/historik")
      .then((res) => res.json())
      .then((data) => setHistorik(data))
      .catch((err) => console.error("Fel vid hämtning av historik:", err));
  }, []);

  const handleFilterChange = (e) => {
    const value = typeof e === "string" ? e : e?.target?.value;
    setFilter(value || "");
  };

  const handleRowClick = async (rowData) => {
    let endpoint = "";
    let fields = [];

    switch (rowData.typ) {
      case "Lackering":
        endpoint = `lackering/${rowData.id}`;
        fields = lackeringFields;
        break;
      case "Rekond":
        endpoint = `rekond/${rowData.id}`;
        fields = rekondFields;
        break;
      case "Verkstad":
        endpoint = `verkstad/${rowData.id}`;
        fields = verkstadFields;
        break;
      case "PWR":
        endpoint = `pwr/${rowData.id}`;
        fields = pwrFields;
        break;
      case "Besiktning":
        endpoint = `besiktning/${rowData.id}`;
        fields = besiktningFields;
        break;
      case "Körning":
        endpoint = `korning/${rowData.id}`;
        fields = korningFields;
        break;
      case "Åtgärd":
        endpoint = `atgard/${rowData.id}`;
        fields = atgardFields;
        break;
      default:
        return;
    }

    try {
      const res = await fetch(`http://localhost:5050/api/${endpoint}`);
      const data = await res.json();
      setSelectedRow(data);
      setSelectedFields(fields);
      setShowModal(true);
    } catch (err) {
      console.error("Fel vid hämtning av jobbinformation:", err);
    }
  };

  const filteredData = historik
    .filter((item) =>
      filter === "" ? true : item.typ === filter
    )
    .filter((item) =>
      item.regnr.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div className="page-container">
      <Sidebar />
      <main className="page-content">
        <Header
          title="Historik"
          onSearch={setSearchQuery}
          searchQuery={searchQuery}
          extraContent={
            <Dropdown
              name="job-filter"
              options={jobOptions}
              selected={filter}
              onChange={handleFilterChange}
              variant="filter"
              placeholder="Välj jobb"
            />
          }
        />

        <div className="table-container">
          <DataTable
            columns={["Typ", "Regnr", "Datum"]}
            data={filteredData}
            onRowClick={handleRowClick}
            renderCell={(column, rowData) => {
              if (column === "Typ") return rowData.typ;
              if (column === "Regnr") return rowData.regnr;
              if (column === "Datum") return formatDate(rowData.datum);
              return "-";
            }}
          />
        </div>

        {showModal && selectedRow && (
          <ViewJobModal
            title={`Detaljer – ${selectedRow.regnr}`}
            jobData={selectedRow}
            fields={selectedFields}
            onClose={() => setShowModal(false)}
          />
        )}
      </main>
    </div>
  );
}

export default Historik;
