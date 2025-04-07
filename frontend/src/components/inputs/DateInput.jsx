// Komponent: DateInput
// Beskrivning: Standardiserad input-komponent för datumfält (YYYY-MM-DD).

import React from "react";

function DateInput({ name, value, onChange, placeholder = "YYYY-MM-DD" }) {
  return (
    <input
      type="date"
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
}

export default DateInput;
