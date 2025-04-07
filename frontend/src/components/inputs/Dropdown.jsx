// Komponent: Dropdown
// Beskrivning: Standard dropdown-komponent för formulärval. Kräver att användaren gör ett aktivt val.

function Dropdown({ name, options, onChange }) {
    return (
      <select name={name} onChange={onChange} required>
        <option value="">Välj roll</option>
        {options.map((option, idx) => (
          <option key={idx} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  }
  
  export default Dropdown;
  