// Komponent: AddKorning
// Beskrivning: Formulärsida för att skapa ett nytt körningsjobb. Skickar data till backend och returnerar till körningslistan vid framgång.

import { useNavigate } from "react-router-dom";
import CreateComponent from "../../components/forms/CreateComponent";
import Sidebar from "../../components/layout/Sidebar";
import { korningFields } from "../../../utils/fields";
import "../../styles/Create.css";

function AddKorning() {
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

    fetch("http://localhost:5050/api/korning/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.success) {
          alert("Korning tillagd!");
          navigate("/korning");
        } else {
          alert("Fel: " + response.error);
        }
      })
      .catch((err) => {
        console.error("Fel vid tilläggning av korning:", err);
      });
  };

  return (
    <div className="page-container">
      <Sidebar />
      <main className="create-page-wrapper">
        <CreateComponent
          title="Lägg till Korning"
          fields={korningFields}
          onSubmit={handleFormSubmit}
          enableImageUpload={false}
          backTo="/korning"
        />
      </main>
    </div>
  );
}

export default AddKorning;
