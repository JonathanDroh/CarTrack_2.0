import { FaPlus } from "react-icons/fa";
import "../styles/Components.css";

function AddButton({ onClick }) {
    return (
        <button className="add-button" onClick={onClick}>
            <FaPlus /> Lägg till anställd
        </button>
    );
}

export default AddButton;
