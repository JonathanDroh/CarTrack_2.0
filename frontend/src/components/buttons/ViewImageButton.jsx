// Komponent: ViewImageButton
// Beskrivning: En svart knapp som triggar visning av en uppladdad bild i en modal eller separat vy.

import "../../styles/Components.css";

function ViewImageButton({ onClick }) {
  return (
    <button className="button-base button-black" onClick={onClick}>
      Se bild
    </button>
  );
}

export default ViewImageButton;
