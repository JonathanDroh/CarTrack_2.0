// Komponent: AddButton
// Beskrivning: En återanvändbar knapp för att lägga till nya objekt. Visar ett plustecken och texten "Lägg till".

import { FaPlus } from "react-icons/fa";
import "../../styles/Components.css";

function AddButton({ onClick }) {
    return (
        <button className="button-base button-black" onClick={onClick}>
            <FaPlus /> Lägg till
        </button>
    );
}

export default AddButton;
