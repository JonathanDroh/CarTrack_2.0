// Komponent: CancelButton
// Beskrivning: En återanvändbar röd knapp för att avbryta handlingar. 
// Tar emot valfri text (label) och klassnamn för anpassning.

import "../../styles/Components.css";

function CancelButton({ onClick, label = "Avbryt", className = "" }) {
    return (
        <button className={`button-base button-red ${className}`} onClick={onClick}>
            {label}
        </button>
    );
}

export default CancelButton;
