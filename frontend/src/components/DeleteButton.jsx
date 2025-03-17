import { FaTrash } from "react-icons/fa";
import "../styles/Components.css";

function DeleteButton({ onClick }) {
    return (
        <button className="delete-button" onClick={onClick}>
            <FaTrash />
        </button>
    );
}

export default DeleteButton;
