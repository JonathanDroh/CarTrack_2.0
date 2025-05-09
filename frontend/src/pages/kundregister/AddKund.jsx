// Komponent: AddKund
// Beskrivning: Sida för att lägga till ny kundpost

import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authUtils";
import Sidebar from "../../components/layout/Sidebar";
import CreateComponent from "../../components/forms/CreateComponent";
import { kundregisterFields } from "../../../utils/fields";
import "../../styles/Create.css";
import "../../styles/Components.css";

function AddKund() {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Hantera submit – ta bort mellanslag innan data skickas
  const handleFormSubmit = (formData) => {
    if (!user || !user.anvandare_id) {
      alert("Fel: Användar-ID saknas!");
      return;
    }

    const cleanedData = {
      ...formData,
      bud: formData.bud?.replace(/\s/g, ""),
      onskat_pris: formData.onskat_pris?.replace(/\s/g, ""),
      inbytespris: formData.inbytespris?.replace(/\s/g, ""),
      trygg_inbytespris: formData.trygg_inbytespris?.replace(/\s/g, ""),
      anvandare_id: user.anvandare_id,
    };

    fetch(`${import.meta.env.VITE_API_URL}/api/kundregister/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cleanedData),
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.success) {
          alert("Kund tillagd!");
          navigate("/kundregister");
        } else {
          alert("Fel: " + response.error);
        }
      })
      .catch((err) =>
        console.error("Fel vid tilläggning av kund:", err)
      );
  };

  return (
    <div className="page-container">
      <Sidebar />
      <main className="create-page-wrapper">
        <CreateComponent
          title="Lägg till Kund"
          fields={kundregisterFields}
          onSubmit={handleFormSubmit}
          enableImageUpload={false}
          backTo="/kundregister"
        />
      </main>
    </div>
  );
}

export default AddKund;
