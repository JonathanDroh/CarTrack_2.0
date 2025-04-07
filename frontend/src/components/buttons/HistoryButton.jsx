// Komponent: HistoryButton
// Beskrivning: Knapp med historik-ikon för att navigera till historiksidan.

import React from "react";
import { FaHistory } from "react-icons/fa";
import "../../styles/Components.css";

function HistoryButton({ onClick }) {
  return (
    <button className="button-base button-black" onClick={onClick}>
      <FaHistory /> Historik
    </button>
  );
}

export default HistoryButton;
