// Komponent: Dropdown
// Beskrivning: Används för både formulär (variant="form") och filtrering (variant="filter").

function Dropdown({ name, options, onChange, selected, placeholder = "Välj", variant = "form" }) {
    const handleChange = (e) => {
      if (typeof onChange === "function") {
        if (name) {
          onChange(e); // skickar hela eventet (formulär)
        } else {
          onChange(e.target.value); // används t.ex. i Historik-filter
        }
      }
    };
  
    return (
      <select
        name={name}
        className={variant === "filter" ? "filter-dropdown" : "form-dropdown"}
        onChange={handleChange}
        value={selected || ""}
      >
        <option value="">{placeholder}</option>
        {options.map((option, idx) => {
          const value = typeof option === "string" ? option : option.value;
          const label = typeof option === "string" ? option : option.label;
          return (
            <option key={idx} value={value}>
              {label}
            </option>
          );
        })}
      </select>
    );
  }
  
  export default Dropdown;
  