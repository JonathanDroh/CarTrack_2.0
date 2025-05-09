// Komponent: AddVerkstad
// Beskrivning: Sida för att lägga till nya verkstadsjobb. Hämtar anvandare_id från sessionen och skickar data till backend.

import { useNavigate } from "react-router-dom";
import CreateComponent from "../../components/forms/CreateComponent";
import Sidebar from "../../components/layout/Sidebar";
import { verkstadFields } from "../../../utils/fields";
import "../../styles/Create.css";

function AddVerkstad() {
  const navigate = useNavigate();

  // Hantera formulärinskick och skapa nytt verkstadsjobb
  const handleFormSubmit = (data) => {
    const storedUser = sessionStorage.getItem("user");

    if (storedUser) {
      const user = JSON.parse(storedUser);
      data.anvandare_id = user.anvandare_id;
    } else {
      alert("Användare ej inloggad!");
      return;
    }

    fetch(`${import.meta.env.VITE_API_URL}/api/verkstad/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.success) {
          alert("Verkstadsjobb tillagt!");
          navigate("/verkstad");
        } else {
          alert("Fel: " + response.error);
        }
      })
      .catch((err) =>
        console.error("Fel vid tilläggning av verkstadsjobb:", err)
      );
  };

  return (
    <div className="page-container">
      <Sidebar />
      <main className="create-page-wrapper">
        <CreateComponent
          title="Lägg till Verkstadsjobb"
          fields={verkstadFields}
          onSubmit={handleFormSubmit}
          enableImageUpload={true}
          backTo="/verkstad"
        />
      </main>
    </div>
  );
}

export default AddVerkstad;
