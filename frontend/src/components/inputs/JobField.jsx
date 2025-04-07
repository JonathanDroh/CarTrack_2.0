// Komponent: JobField
// Beskrivning: Återanvändbar formulärkomponent som renderar inputfält, textarea eller select baserat på typ.

import "../../styles/Components.css";

function JobField({ type, name, label, value, onChange, options }) {
  return (
    <div className="job-field">
      <label>{label}</label>
      {type === "select" ? (
        <select name={name} value={value} onChange={onChange}>
          {options.map((option, i) => (
            <option key={i} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : type === "textarea" ? (
        <textarea name={name} value={value} onChange={onChange}></textarea>
      ) : (
        <input type={type} name={name} value={value} onChange={onChange} />
      )}
    </div>
  );
}

export default JobField;
