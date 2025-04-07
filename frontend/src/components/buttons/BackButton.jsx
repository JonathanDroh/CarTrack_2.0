// Komponent: BackButton
// Beskrivning: En återgångsknapp som navigerar till en angiven route via React Router.

import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import "../../styles/Components.css";

function BackButton({ to }) {
    const navigate = useNavigate();

    return (
        <button className="button-base button-black" onClick={() => navigate(to)}>
            <FaArrowLeft className="back-icon" /> Tillbaka
        </button>
    );
}

export default BackButton;
