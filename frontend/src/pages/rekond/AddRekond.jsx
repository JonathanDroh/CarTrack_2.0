// Komponent: AddRekond
// Beskrivning: Sida för att lägga till nya rekond-jobb, inklusive möjlighet att ladda upp bilder.

import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authUtils";
import Sidebar from "../../components/layout/Sidebar";
import CreateComponent from "../../components/forms/CreateComponent";
import { rekondFields } from "../../../utils/fields";
import "../../styles/Create.css";
import "../../styles/Components.css";

function AddRekond() {
    const navigate = useNavigate();
    const { user } = useAuth();

    // Hanterar formulärinskickning för att skapa ett nytt rekond-jobb
    const handleFormSubmit = (data) => {
        if (!user || !user.anvandare_id) {
            alert("Fel: Användar-ID saknas!");
            return;
        }

        const requestData = { ...data, anvandare_id: user.anvandare_id };

        fetch("http://localhost:5050/api/rekond/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestData),
        })
        .then(res => res.json())
        .then(response => {
            if (response.success) {
                alert("Rekond tillagd!");
                navigate("/rekond");
            } else {
                alert("Fel: " + response.error);
            }
        })
        .catch(err => console.error("Fel vid tilläggning av rekond:", err));
    };

    return (
        <div className="page-container">
            <Sidebar />
            <main className="create-page-wrapper">
                <CreateComponent 
                    title="Lägg till rekond" 
                    fields={rekondFields} 
                    onSubmit={handleFormSubmit}
                    enableImageUpload={true}
                    backTo="/rekond"
                />
            </main>
        </div>
    );
}

export default AddRekond;
