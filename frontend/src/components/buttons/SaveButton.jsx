// Komponent: SaveButton
// Beskrivning: En svart knapp som används för att spara formulär eller data. Kan ta emot valfri etikett och typ.

import "../../styles/Components.css";

function SaveButton({ onClick, label = "Spara", type = "button", className = "" }) {
    return (
        <button
            type={type}
            className={`button-base button-black ${className}`}
            onClick={onClick}
        >
            {label}
        </button>
    );
}

export default SaveButton;
