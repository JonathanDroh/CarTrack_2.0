// Komponent: SearchBar
// Beskrivning: Sökfält med ikon som uppdateras både internt och via props.

import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import "../../styles/Components.css";

function SearchBar({ value, onChange }) {
  const [inputValue, setInputValue] = useState(value || "");

  useEffect(() => {
    setInputValue(value || "");
  }, [value]);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange(newValue);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Sök"
        value={inputValue}
        onChange={handleChange}
      />
      <FaSearch className="search-icon" />
    </div>
  );
}

export default SearchBar;
