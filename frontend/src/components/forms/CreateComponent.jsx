// Komponent: CreateComponent
// Beskrivning: Återanvändbar komponent för att skapa nya jobb (Lackering, Rekond, etc).
// Dynamiskt fälthantering, stöd för bilduppladdning och datumvalidering. Använder prop: `fields`.

import React, { useState } from "react";
import SaveButton from "../buttons/SaveButton";
import TextInput from "../inputs/TextInput";
import Dropdown from "../inputs/Dropdown";
import CheckboxGroup from "../inputs/CheckboxGroup";
import AddImageButton from "../buttons/AddImageButton";
import ViewImageButton from "../buttons/ViewImageButton";
import ImageUploadModal from "../modals/ImageUploadModal";
import ViewImageModal from "../modals/ViewImageModal";
import DateInput from "../inputs/DateInput";
import BackButton from "../buttons/BackButton";
import "../../styles/Create.css";

function CreateComponent({ title, fields, onSubmit, enableImageUpload = false }) {
  const [formData, setFormData] = useState({});
  const [showImageModal, setShowImageModal] = useState(false);
  const [showImagePreview, setShowImagePreview] = useState(false);

  // Hantera inmatningsförändringar
  const handleChange = (e) => {
    const { name, value, type } = e.target;

    // Validera datumformat om input-typ är "date"
    if (type === "date" && value && !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
      return;
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // Skicka formuläret
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  // Hantera bilduppladdning via modal
  const handleImageSave = (formDataImage) => {
    fetch("http://localhost:5050/api/lackering/upload-temp", {
      method: "POST",
      body: formDataImage,
    })
      .then(res => res.json())
      .then(data => {
        if (data.success && data.bild_url) {
          setFormData(prev => ({ ...prev, bild_url: data.bild_url }));
          setShowImageModal(false);
        } else {
          alert("Kunde inte ladda upp bild.");
        }
      })
      .catch(() => alert("Fel vid bilduppladdning."));
  };

  return (
    <div className="create-page">
      <div className="create-container">
        <div className={enableImageUpload ? "modal-header-with-button" : "centered-header"}>
          <h2 className="create-header">{title}</h2>
          {enableImageUpload && (
            <div style={{ display: "flex", gap: "10px" }}>
              <AddImageButton onClick={() => setShowImageModal(true)} />
              {formData.bild_url && (
                <ViewImageButton onClick={() => setShowImagePreview(true)} />
              )}
              <BackButton to="/lackering" />
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit}>
          {fields.map((field, index) => (
            <div key={index} className="create-group">
              <label>{field.label}</label>
              {field.type === "select" ? (
                <Dropdown name={field.name} options={field.options} onChange={handleChange} />
              ) : field.type === "checkboxGroup" ? (
                <CheckboxGroup name={field.name} onChange={handleChange} className="create-checkbox-group" />
              ) : field.type === "date" ? (
                <DateInput
                  name={field.name}
                  onChange={handleChange}
                  value={formData[field.name] || ""}
                  placeholder={field.placeholder || "YYYY-MM-DD"}
                />
              ) : field.name === "kommentar" ? (
                <textarea
                  name="kommentar"
                  placeholder={field.placeholder || "Skriv en kommentar..."}
                  value={formData[field.name] || ""}
                  onChange={handleChange}
                  className="large-textarea"
                />
              ) : (
                <TextInput
                  type={field.type}
                  name={field.name}
                  placeholder={field.placeholder}
                  onChange={handleChange}
                  value={formData[field.name] || ""}
                />
              )}
            </div>
          ))}

          <div className="create-submit-wrapper">
            <SaveButton type="submit" className="button-base button-black" />
          </div>
        </form>

        {enableImageUpload && showImageModal && (
          <ImageUploadModal onClose={() => setShowImageModal(false)} onSave={handleImageSave} />
        )}

        {enableImageUpload && showImagePreview && formData.bild_url && (
          <ViewImageModal imageUrl={formData.bild_url} onClose={() => setShowImagePreview(false)} />
        )}
      </div>
    </div>
  );
}

export default CreateComponent;
