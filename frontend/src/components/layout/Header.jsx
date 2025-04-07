// Komponent: Header
// Beskrivning: Gemensam sidhuvudkomponent som visar titel, sökfält, knappar för "lägg till", "historik" och "tillbaka".

import SearchBar from "../inputs/SearchBar";
import AddButton from "../buttons/AddButton";
import HistoryButton from "../buttons/HistoryButton";
import BackButton from "../buttons/BackButton";
import "../../styles/Components.css";

function Header({
  title,
  showAddButton,
  showHistoryButton,
  onSearch,
  onAdd,
  onHistory,
  searchQuery,
  showBackButton,
  backTo
}) {
  return (
    <div className="component-header">
      <h1>{title}</h1>
      <div className="component-actions">
        <SearchBar value={searchQuery || ""} onChange={onSearch} />
        {showBackButton && <BackButton to={backTo} />}
        {showAddButton && <AddButton onClick={onAdd} />}
        {showHistoryButton && <HistoryButton onClick={onHistory} />}
      </div>
    </div>
  );
}

export default Header;
