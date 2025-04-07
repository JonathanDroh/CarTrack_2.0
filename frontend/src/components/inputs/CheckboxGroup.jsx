// Komponent: CheckboxGroup
// Beskrivning: Dynamisk checkbox-grupp för att välja flera delar (t.ex. karossdelar).
// Används främst i formulär för lackering. Sparar valet som kommaseparerad sträng.

import { useState, useEffect } from "react";

// Alternativ som kan väljas
const delarAlternativ = [
  "Front", "Huv", "V.Framskärm", "H. Framskärm", "Stötfångare bak", "Tak",
  "V. Tröskel", "Baklucka", "H. Tröskel", "V. Framdörr", "H. Framdörr",
  "V. Bakdörr", "H. Bakdörr", "V. Bakskärm", "H. Bakskärm"
];

function CheckboxGroup({ name, value = "", onChange, className = "" }) {
  const [selected, setSelected] = useState([]);

  // Om value finns vid mount – förifyll valen
  useEffect(() => {
    if (value) {
      const förifyllda = value.split(",").map(item => item.trim());
      setSelected(förifyllda);
    }
  }, [value]);

  // Lägg till eller ta bort val
  const handleCheckboxChange = (del) => {
    const updatedSelection = selected.includes(del)
      ? selected.filter(item => item !== del)
      : [...selected, del];

    setSelected(updatedSelection);
    onChange({ target: { name, value: updatedSelection.join(", ") } });
  };

  return (
    <div className={`checkbox-group ${className}`}>
      {delarAlternativ.map((del, index) => (
        <label key={index} className="checkbox-label">
          <input
            type="checkbox"
            value={del}
            checked={selected.includes(del)}
            onChange={() => handleCheckboxChange(del)}
          />
          {del}
        </label>
      ))}
    </div>
  );
}

export default CheckboxGroup;
