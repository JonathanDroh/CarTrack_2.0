// Sida: AddEmployee
// Beskrivning: Formulärsida för att lägga till en ny användare (anställd eller admin).

import { useNavigate } from "react-router-dom";
import CreateComponent from "../../components/forms/CreateComponent";
import Sidebar from "../../components/layout/Sidebar";
import "../../styles/Create.css";

function AddEmployee() {
    const navigate = useNavigate();

    // Fält som används i formuläret
    const fields = [
        { name: "namn", label: "Namn", type: "text", placeholder: "Ange namn" },
        { name: "email", label: "E-post", type: "email", placeholder: "Ange e-post" },
        { name: "losenord", label: "Lösenord", type: "password", placeholder: "Ange lösenord" },
        { 
            name: "roll", 
            label: "Roll", 
            type: "select", 
            options: [
                { label: "Anställd", value: "Anstalld" },
                { label: "Admin", value: "Admin" }
            ] 
        }
    ];

    // Skickar formulärdata till backend
    const handleFormSubmit = (data) => {
        fetch("http://localhost:5050/api/users/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(response => {
            if (response.success) {
                alert("Anställd tillagd!");
                navigate("/admin-settings"); 
            } else {
                alert("Fel: " + response.error);
            }
        })
        .catch(err => console.error("Fel vid tilläggning av anställd:", err));
    };

    return (
        <div className="page-container">
            <Sidebar />
            <main className="create-page-wrapper">
                <CreateComponent 
                    title="Lägg till anställd" 
                    fields={fields} 
                    onSubmit={handleFormSubmit} 
                />
            </main>
        </div>
    );
}

export default AddEmployee;
