// Komponent: EditJobModal
// Beskrivning: Modal för att redigera ett jobb (alla typer). Stöd för bilduppladdning, PDF-förhandsvisning och hantering av formulärdata.

import React, { useState, useEffect } from "react";
import CancelButton from "../buttons/CancelButton";
import SaveButton from "../buttons/SaveButton";
import AddImageButton from "../buttons/AddImageButton";
import ViewImageButton from "../buttons/ViewImageButton";
import ImageUploadModal from "../modals/ImageUploadModal";
import ViewImageModal from "../modals/ViewImageModal";
import PdfButton from "../buttons/PdfButton";
import PdfPreviewModal from "./PdfPreviewModal";
import CheckboxGroup from "../inputs/CheckboxGroup";

function EditJobModal({
  title,
  jobData,
  fields,
  apiUrl,
  uploadUrl,
  enableImageUpload = false,
  onClose,
  onSave
}) {
  const [formData, setFormData] = useState({});
  const [showImageModal, setShowImageModal] = useState(false);
  const [showImagePreview, setShowImagePreview] = useState(false);
  const [showPdfModal, setShowPdfModal] = useState(false);

  // Sätter upp formulärdata när modalen öppnas, exkluderar vissa datumfält
  useEffect(() => {
    const {
      sista_bes_datum: _1,
      planerat_datum: _2,
      sista_datum: _3,
      ...rest
    } = jobData || {};
    setFormData(rest);
  }, [jobData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Identifiera job ID baserat på jobbtyp
  const jobId =
    formData.lackering_id ||
    formData.rekond_id ||
    formData.verkstad_id ||
    formData.pwr_id ||
    formData.besiktning_id ||
    formData.korning_id ||
    formData.atgard_id;

  // Spara uppdaterad data till API
  const handleSave = () => {
    if (!jobId) {
      alert("Kunde inte identifiera jobbet.");
      return;
    }

    const sanitizedData = { ...formData };
    delete sanitizedData.sista_bes_datum;
    delete sanitizedData.planerat_datum;
    delete sanitizedData.sista_datum;

    fetch(`${apiUrl}/${jobId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sanitizedData)
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          alert("Uppdatering sparad!");
          onSave(sanitizedData);
          onClose();
        } else {
          alert("Fel: " + data.error);
        }
      })
      .catch((err) => console.error("Fel vid uppdatering:", err));
  };

  // Spara bild till API
  const handleImageUpload = (imageFormData) => {
    fetch(`${uploadUrl}/${jobId}/upload`, {
      method: "POST",
      body: imageFormData
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          alert("Bild uppladdad!");
          setFormData((prev) => ({
            ...prev,
            bild_url: data.bild_url
          }));
          setShowImageModal(false);
        } else {
          alert("Fel: " + data.error);
        }
      })
      .catch((err) => console.error("Fel vid bilduppladdning:", err));
  };

  return (
    <div className="modal-overlay">
      <div className="edit-job-modal">
        <div className="modal-header-with-button">
          <h3>{title}</h3>
          {enableImageUpload && (
            <div className="modal-header-buttons">
              <AddImageButton onClick={() => setShowImageModal(true)} />
              {formData.bild_url && (
                <ViewImageButton onClick={() => setShowImagePreview(true)} />
              )}
            </div>
          )}
        </div>

        <div className="edit-job-layout">
          <div className="edit-form-left">
            {fields
              .filter(
                (field) =>
                  field.name !== "sista_bes_datum" &&
                  field.name !== "planerat_datum" &&
                  field.name !== "sista_datum" &&
                  field.name !== "delar"
              )
              .map((field, index) => (
                <div key={index} className="job-field">
                  <label>{field.label}</label>
                  {field.type === "select" ? (
                    <select
                      name={field.name}
                      value={formData[field.name] || ""}
                      onChange={handleChange}
                    >
                      {field.options?.map((option, idx) => (
                        <option key={idx} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  ) : field.type === "textarea" ? (
                    <textarea
                      name={field.name}
                      value={formData[field.name] || ""}
                      onChange={handleChange}
                    />
                  ) : (
                    <input
                      type={field.type}
                      name={field.name}
                      value={formData[field.name] || ""}
                      onChange={handleChange}
                    />
                  )}
                </div>
              ))}
          </div>

          {fields.some((f) => f.name === "delar") && (
            <div className="edit-form-right">
              <label>Delar</label>
              <CheckboxGroup
                name="delar"
                value={formData.delar || ""}
                onChange={handleChange}
                className="edit-checkbox-group"
              />
            </div>
          )}
        </div>

        <div className="modal-buttons">
          <CancelButton onClick={onClose}>Avbryt</CancelButton>
          <PdfButton onClick={() => setShowPdfModal(true)} />
          <SaveButton onClick={handleSave}>Spara</SaveButton>
        </div>

        {enableImageUpload && showImageModal && (
          <ImageUploadModal
            onClose={() => setShowImageModal(false)}
            onSave={handleImageUpload}
          />
        )}

        {enableImageUpload && showImagePreview && formData.bild_url && (
          <ViewImageModal
            imageUrl={formData.bild_url}
            onClose={() => setShowImagePreview(false)}
          />
        )}

        {showPdfModal && (
          <PdfPreviewModal
            jobData={formData}
            fields={fields}
            onClose={() => setShowPdfModal(false)}
          />
        )}
      </div>
    </div>
  );
}

export default EditJobModal;
