// Komponent: PdfButton
// Beskrivning: En svart knapp som används för att trigga skapande av PDF-dokument.

import "../../styles/Components.css";

function PdfButton({ onClick }) {
  return (
    <button className="button-base button-black" onClick={onClick}>
      Skapa PDF
    </button>
  );
}

export default PdfButton;
