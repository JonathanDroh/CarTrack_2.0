// Komponent: ResetPasswordModal
// Beskrivning: Modal som låter en administratör återställa lösenordet för en specifik användare.

import { useState } from "react";
import "../../styles/Modal.css";
import SaveButton from "../buttons/SaveButton";
import CancelButton from "../buttons/CancelButton";

function ResetPasswordModal({ userEmail, onClose, onSave }) {
    const [newPassword, setNewPassword] = useState("");

    // Hanterar lösenordsändring
    const handleSave = () => {
        if (!userEmail) {
            alert("Ingen användare vald! Välj en användare och försök igen.");
            return;
        }

        if (!newPassword) {
            alert("Du måste ange ett nytt lösenord!");
            return;
        }

        fetch(`${import.meta.env.VITE_API_URL}/api/users/reset-password`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: userEmail, newPassword })
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    alert("Lösenordet har uppdaterats!");
                    setNewPassword("");
                    if (onSave) onSave();
                    onClose();
                } else {
                    alert(`Fel: ${data.error}`);
                }
            })
            .catch(() => {
                alert("Fel vid lösenordsåterställning.");
            });
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>Återställ lösenord</h3>
                <p><strong>Användare:</strong> {userEmail || "Ej vald"}</p>
                <input
                    type="password"
                    placeholder="Nytt lösenord"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
                <div className="modal-buttons">
                    <CancelButton onClick={onClose} className="button-base button-red">
                        Avbryt
                    </CancelButton>
                    <SaveButton onClick={handleSave} className="button-base button-black">
                        Spara
                    </SaveButton>
                </div>
            </div>
        </div>
    );
}

export default ResetPasswordModal;
