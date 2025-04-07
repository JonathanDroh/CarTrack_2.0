// Komponent: ViewImageModal
// Beskrivning: Modal som visar en förhandsgranskning av en uppladdad bild.
// Klick utanför bilden stänger modalen, men klick på bilden gör inte det.

import "../../styles/Modal.css";

function ViewImageModal({ imageUrl, onClose }) {
    if (!imageUrl) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div
                className="modal-content image-view-modal"
                onClick={(e) => e.stopPropagation()}
            >
                <button className="close-button" onClick={onClose}>
                    Stäng
                </button>
                <img
                    src={`http://localhost:5050/${imageUrl}`}
                    alt="Förhandsgranskning"
                    className="modal-image-preview"
                />
            </div>
        </div>
    );
}

export default ViewImageModal;
