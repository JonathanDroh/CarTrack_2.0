// Komponent: ViewJobModal
// Beskrivning: Modal för att visa detaljer för ett jobb i readonly-läge.

import "../../styles/Modal.css";
import { formatDate } from "../../../utils/dateUtils";

function ViewJobModal({ title, jobData, fields, onClose }) {
  const formatValue = (field, value) => {
    if (!value) return "";

    // Formatera datumfält
    const dateFields = ["datum", "sista_bes_datum", "sista_datum", "planerat_datum"];
    if (dateFields.includes(field.name)) {
      return formatDate(value);
    }

    // Visa checkboxGroup som kommaseparerad lista
    if (field.type === "checkboxGroup" && Array.isArray(value)) {
      return value.join(", ");
    }

    return value;
  };

  return (
    <div className="modal-overlay">
      <div className="edit-job-modal">
        <div className="modal-header-with-button">
          <h3>{title}</h3>
        </div>

        <div className="edit-job-layout">
          <div className="edit-form-left">
            {fields.map((field, index) => (
              <div key={index} className="job-field">
                <label>{field.label}</label>

                {field.type === "textarea" ? (
                  <textarea
                    value={formatValue(field, jobData[field.name])}
                    readOnly
                    rows={3}
                  />
                ) : (
                  <input
                    type="text"
                    value={formatValue(field, jobData[field.name])}
                    readOnly
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="modal-buttons">
          <button className="button-base button-red" onClick={onClose}>
            Stäng
          </button>
        </div>
      </div>
    </div>
  );
}

export default ViewJobModal;
