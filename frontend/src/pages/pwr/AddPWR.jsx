// Komponent: AddPWR
// Beskrivning: Sida för att lägga till ett nytt PWR-jobb med formulär och möjlighet till bilduppladdning.

import { useNavigate } from "react-router-dom";
import CreateComponent from "../../components/forms/CreateComponent";
import Sidebar from "../../components/layout/Sidebar";
import { pwrFields } from "../../../utils/fields";
import "../../styles/Create.css";

function AddPWR() {
  const navigate = useNavigate();

  // Hantera formulärinskickning
  const handleFormSubmit = (data) => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      data.anvandare_id = user.anvandare_id;
    } else {
      alert("Användare ej inloggad!");
      return;
    }

    fetch(`${import.meta.env.VITE_API_URL}/api/pwr/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.success) {
          alert("PWR tillagt!");
          navigate("/pwr");
        } else {
          alert("Fel: " + response.error);
        }
      })
      .catch((err) =>
        console.error("Fel vid tilläggning av PWR:", err)
      );
  };

  return (
    <div className="page-container">
      <Sidebar />
      <main className="create-page-wrapper">
        <CreateComponent
          title="Lägg till PWR"
          fields={pwrFields}
          onSubmit={handleFormSubmit}
          enableImageUpload={true}
          backTo="/pwr"
        />
      </main>
    </div>
  );
}

export default AddPWR;
