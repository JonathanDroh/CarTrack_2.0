// Komponent: ImageUploadModal
// Beskrivning: Modal för att ladda upp en bildfil. Används för att spara temporär eller permanent bild kopplad till ett jobb.

import { useState } from "react";
import SaveButton from "../buttons/SaveButton";
import CancelButton from "../buttons/CancelButton";
import "../../styles/Modal.css";

function ImageUploadModal({ onClose, onSave }) {
  const [selectedFile, setSelectedFile] = useState(null);

  // Hanterar filvalet från användaren
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  // Skickar bilden som FormData till förälder
  const handleSubmit = () => {
    if (!selectedFile) {
      alert("Du måste välja en bild.");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);
    onSave(formData);
  };

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal-content">
        <h3>Lägg till bild</h3>

        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          aria-label="Välj bild att ladda upp"
        />

        <div className="modal-buttons">
          <CancelButton onClick={onClose}>Avbryt</CancelButton>
          <SaveButton onClick={handleSubmit}>Spara</SaveButton>
        </div>
      </div>
    </div>
  );
}

export default ImageUploadModal;
