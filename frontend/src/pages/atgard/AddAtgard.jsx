// Sida: AddAtgard
// Beskrivning: Formulär för att lägga till ett nytt åtgärdsjobb.

import { useNavigate } from "react-router-dom";
import CreateComponent from "../../components/forms/CreateComponent";
import Sidebar from "../../components/layout/Sidebar";
import { atgardFields } from "../../../utils/fields";
import "../../styles/Create.css";

function AddAtgard() {
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

    fetch("http://localhost:5050/api/atgard/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.success) {
          alert("Atgård tillagd!");
          navigate("/atgard");
        } else {
          alert("Fel: " + response.error);
        }
      })
      .catch((err) => {
        console.error("Fel vid tilläggning av atgård:", err);
      });
  };

  return (
    <div className="page-container">
      <Sidebar />
      <main className="create-page-wrapper">
        <CreateComponent
          title="Lägg till Atgård"
          fields={atgardFields}
          onSubmit={handleFormSubmit}
          enableImageUpload={false}
        />
      </main>
    </div>
  );
}

export default AddAtgard;
