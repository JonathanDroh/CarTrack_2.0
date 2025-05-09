// Komponent: AddBesiktning
// Beskrivning: Formulärsida för att lägga till en ny besiktning. Användar-ID hämtas från sessionStorage och skickas med till backend.

import { useNavigate } from "react-router-dom";
import CreateComponent from "../../components/forms/CreateComponent";
import Sidebar from "../../components/layout/Sidebar";
import { besiktningFields } from "../../../utils/fields";
import "../../styles/Create.css";

function AddBesiktning() {
  const navigate = useNavigate();

  const handleFormSubmit = (data) => {
    const storedUser = sessionStorage.getItem("user");

    if (storedUser) {
      const user = JSON.parse(storedUser);
      data.anvandare_id = user.anvandare_id;
    } else {
      alert("Användare ej inloggad!");
      return;
    }

    fetch(`${import.meta.env.VITE_API_URL}/api/besiktning/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.success) {
          alert("Besiktning tillagd!");
          navigate("/besiktning");
        } else {
          alert("Fel: " + response.error);
        }
      })
      .catch((err) => {
        console.error("Fel vid tilläggning av besiktning:", err);
      });
  };

  return (
    <div className="page-container">
      <Sidebar />
      <main className="create-page-wrapper">
        <CreateComponent
          title="Lägg till Besiktning"
          fields={besiktningFields}
          onSubmit={handleFormSubmit}
          enableImageUpload={false}
          backTo="/besiktning"
        />
      </main>
    </div>
  );
}

export default AddBesiktning;
