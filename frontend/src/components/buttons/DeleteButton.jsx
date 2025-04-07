// Komponent: DeleteButton
// Beskrivning: En röd ikonknapp med papperskorg för att radera ett jobb.
// Stoppar klick från att bubbla upp till radens klickhändelse.

import React from "react";
import { FaTrash } from "react-icons/fa";
import "../../styles/Components.css";

function DeleteButton({ onClick }) {
  const handleClick = (e) => {
    e.stopPropagation();
    onClick();
  };

  return (
    <button className="button-base button-red" onClick={handleClick}>
      <FaTrash />
    </button>
  );
}

export default DeleteButton;
