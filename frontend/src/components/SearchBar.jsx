import { FaSearch } from "react-icons/fa";
import "../styles/Components.css";

function SearchBar({ value, onChange }) {
    return (
        <div className="search-bar">
            <input 
                type="text" 
                placeholder="Sök" 
                value={value} 
                onChange={onChange} 
            />
            <FaSearch className="search-icon" />
        </div>
    );
}

export default SearchBar;
