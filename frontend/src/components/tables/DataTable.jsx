// Komponent: DataTable
// Beskrivning: Generisk tabellkomponent som renderar kolumner, data och eventuella åtgärdsknappar.
// Kolumnen "Skickad" anpassas till "Påbörjad" på PWR- och Åtgärd-sidorna.
// Formatterar datum och anpassar nycklar för olika kolumnrubriker.

import React from "react";
import { formatDate } from "../../../utils/dateUtils";

function DataTable({ columns = [], data = [], actions = [], renderCell, onRowClick }) {
  return (
    <div className="table-container">
      <table className="data-table">
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th key={index}>
                {col === "Skickad" && window.location.pathname.includes("/pwr") ? "Påbörjad" :
                 col === "Skickad" && window.location.pathname.includes("/atgard") ? "Påbörjad" :
                 col}
              </th>
            ))}
            {actions.length > 0 && <th className="empty-column"></th>}
          </tr>
        </thead>

        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              onClick={() => onRowClick && onRowClick(row)}
              style={{ cursor: onRowClick ? "pointer" : "default" }}
            >
              {columns.map((col, colIndex) => {
                let content;

                // Använd renderCell om den är definierad
                if (renderCell) {
                  const result = renderCell(col, row);
                  if (result !== undefined && result !== null) {
                    content = result;
                  }
                }

                // Standardrendering om renderCell inte returnerade något
                if (content === undefined) {
                  let key = col.toLowerCase().replace(/ /g, "_");

                  // Mappning av specialfält
                  if (col === "Sista Besiktningsdatum") key = "sista_bes_datum";
                  if (col === "Sista Datum") key = "sista_datum";
                  if (col === "Planerat datum") key = "planerat_datum";
                  if (col === "Förare") key = "forare";
                  if (col === "Anställd") key = "anstalld";

                  let value = row[key] || "-";

                  if (col === "Skickad") value = formatDate(row.datum_s);
                  if (col === "Färdig") value = formatDate(row.datum_t);

                  // Formattera ISO-datum
                  if (
                    (col === "Sista Datum" ||
                      col === "Sista Besiktningsdatum" ||
                      col === "Planerat datum") &&
                    typeof value === "string" &&
                    /^\d{4}-\d{2}-\d{2}T/.test(value)
                  ) {
                    value = formatDate(value);
                  }

                  content = value;
                }

                return <td key={colIndex}>{content}</td>;
              })}

              {actions.length > 0 && (
                <td className="delete-column">
                  {actions.map((ActionComponent, actionIndex) => (
                    <ActionComponent key={actionIndex} rowData={row} />
                  ))}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
