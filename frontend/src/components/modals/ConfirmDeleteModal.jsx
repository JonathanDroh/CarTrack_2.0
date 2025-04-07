// Komponent: ConfirmDeleteModal
// Beskrivning: Modal som visas för att bekräfta borttagning av en användare. Innehåller användarens namn och e-post.

import "../../styles/Modal.css";
import SaveButton from "../buttons/SaveButton";
import CancelButton from "../buttons/CancelButton";

function ConfirmDeleteModal({ userEmail, userName, onClose, onConfirm }) {
    return (
        <div className="modal-overlay" role="dialog" aria-modal="true">
            <div className="modal-content">
                <h3>Bekräfta borttagning</h3>
                <p>
                    Är du säker på att du vill ta bort användaren<br />
                    <strong>{userName}</strong> ({userEmail})?
                </p>
                <div className="modal-buttons">
                    <CancelButton onClick={onClose} className="button-base button-red">
                        Avbryt
                    </CancelButton>
                    <SaveButton onClick={onConfirm} className="button-base button-black">
                        Ja, ta bort
                    </SaveButton>
                </div>
            </div>
        </div>
    );
}

export default ConfirmDeleteModal;
