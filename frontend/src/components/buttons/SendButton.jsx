// Komponent: SendButton
// Beskrivning: En knapp som markerar ett jobb som "skickat" eller "påbörjat", beroende på jobbtillhörighet (PWR/Åtgärd).

import React, { useState } from "react";

function SendButton({ jobId, onUpdate, baseUrl }) {
  const [loading, setLoading] = useState(false);

  const isPWRorAtgard = baseUrl.includes("/pwr") || baseUrl.includes("/atgard");
  const buttonLabel = loading
    ? isPWRorAtgard ? "Påbörjar..." : "Skickar..."
    : isPWRorAtgard ? "Påbörja" : "Skicka";

  const handleSend = (e) => {
    e.stopPropagation();
    setLoading(true);

    fetch(`${baseUrl}/send/${jobId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" }
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          onUpdate();
        } else {
          alert("Kunde inte uppdatera Skickad.");
        }
      })
      .catch(() => {
        alert("Fel vid uppdatering av Skickad");
      })
      .finally(() => setLoading(false));
  };

  return (
    <button className="button-base button-black" onClick={handleSend} disabled={loading}>
      {buttonLabel}
    </button>
  );
}

export default SendButton;
