import { useState } from "react";
/*import "../styles/Modal.css"; // CSS för modal*/

function ResetPasswordModal({ userEmail, onClose, onSave }) {
    const [newPassword, setNewPassword] = useState("");

    const handleSubmit = () => {
        if (!newPassword) return;

        fetch("http://localhost:5050/api/users/reset-password", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: userEmail, newPassword })
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                alert("✅ Lösenordet har uppdaterats!");
                setNewPassword("");

                if (onSave) onSave(); // 🔹 Uppdatera användardatan i AdminSettings
                onClose(); // 🔹 Stäng modalen
            } else {
                alert("❌ Kunde inte uppdatera lösenordet.");
            }
        })
        .catch(err => console.error("❌ Fel vid lösenordsåterställning:", err));
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>Återställ lösenord</h3>
                <p>Användare: {userEmail}</p>
                <input 
                    type="password" 
                    placeholder="Nytt lösenord" 
                    value={newPassword} 
                    onChange={(e) => setNewPassword(e.target.value)}
                />
                <div className="modal-buttons">
                    <button onClick={handleSubmit}>Spara</button>
                    <button className="cancel-button" onClick={onClose}>Avbryt</button>
                </div>
            </div>
        </div>
    );
}

export default ResetPasswordModal;
