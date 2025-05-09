// Komponent: AddLackering
// Beskrivning: Sida för att lägga till en ny lackering. Skickar formulärdata inklusive användar-ID till backend.
// Använder CreateComponent med bilduppladdning aktiverad.

import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authUtils";
import Sidebar from "../../components/layout/Sidebar";
import CreateComponent from "../../components/forms/CreateComponent";
import { lackeringFields } from "../../../utils/fields";
import "../../styles/Create.css";
import "../../styles/Components.css";

function AddLackering() {
    const navigate = useNavigate();
    const { user } = useAuth();

    const handleFormSubmit = (data) => {
        if (!user || !user.anvandare_id) {
            alert("Fel: Användar-ID saknas!");
            return;
        }

        const requestData = { ...data, anvandare_id: user.anvandare_id };

        fetch(`${import.meta.env.VITE_API_URL}/api/lackering/add`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestData)
        })
            .then((res) => res.json())
            .then((response) => {
                if (response.success) {
                    alert("Lackering tillagd!");
                    navigate("/lackering");
                } else {
                    alert("Fel: " + response.error);
                }
            })
            .catch((err) =>
                console.error("Fel vid tilläggning av lackering:", err)
            );
    };

    return (
        <div className="page-container">
            <Sidebar />
            <main className="create-page-wrapper">
                <CreateComponent
                    title="Lägg till lackering"
                    fields={lackeringFields}
                    onSubmit={handleFormSubmit}
                    enableImageUpload={true}
                    backTo="/lackering"
                />
            </main>
        </div>
    );
}

export default AddLackering;
