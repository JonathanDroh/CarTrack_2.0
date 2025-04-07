// Komponent: TextInput
// Beskrivning: Återanvändbar enkel input-komponent för text, email, number etc.

import "../../styles/Components.css";

function TextInput({ type, name, placeholder, onChange, className }) {
  return (
    <input 
      type={type}
      name={name}
      placeholder={placeholder}
      onChange={onChange}
      className={`text-input ${className || ""}`}
    />
  );
}

export default TextInput;
