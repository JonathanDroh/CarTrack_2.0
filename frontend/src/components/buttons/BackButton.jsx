// Komponent: BackButton
// Beskrivning: En återgångsknapp som navigerar tillbaka till föregående sida med React Router.

import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import "../../styles/Components.css";

function BackButton() {
  const navigate = useNavigate();

  return (
    <button className="button-base button-black" onClick={() => navigate(-1)}>
      <FaArrowLeft className="back-icon" /> Tillbaka
    </button>
  );
}

export default BackButton;
