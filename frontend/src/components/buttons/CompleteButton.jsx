// Komponent: CompleteButton
// Beskrivning: En svart knapp som markerar ett jobb som färdigställt (PATCH till /complete/:id).
// Används i jobb-tabeller för att uppdatera status till "färdig".

import React, { useState } from "react";

function CompleteButton({ jobId, onUpdate, baseUrl }) {
  const [loading, setLoading] = useState(false);

  const handleComplete = (e) => {
    e.stopPropagation();
    setLoading(true);

    fetch(`${baseUrl}/complete/${jobId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" }
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          onUpdate();
        } else {
          alert("Kunde inte uppdatera status.");
        }
      })
      .catch(() => {
        alert("Fel vid uppdatering av status.");
      })
      .finally(() => setLoading(false));
  };

  return (
    <button
      className="button-base button-black"
      onClick={handleComplete}
      disabled={loading}
    >
      {loading ? "Uppdaterar..." : "Färdig"}
    </button>
  );
}

export default CompleteButton;
