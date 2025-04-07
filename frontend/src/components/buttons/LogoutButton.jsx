// Komponent: LogoutButton
// Beskrivning: Knapp med utloggningsikon som loggar ut användaren.

import React from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { useLogout } from "../../context/authUtils";
import "../../styles/Components.css";

function LogoutButton() {
  const logout = useLogout();

  return (
    <button className="button-base button-red" onClick={logout}>
      <FaSignOutAlt /> Logga ut
    </button>
  );
}

export default LogoutButton;
