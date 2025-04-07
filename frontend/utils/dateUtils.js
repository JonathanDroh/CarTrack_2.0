// dateUtils.js
// Beskrivning: Hjälpfunktion för att formattera datum till formatet YYYY-MM-DD.

/**
 * Formatterar ett datumsträng till 'YYYY-MM-DD'.
 * Returnerar '-' om datum saknas eller är ogiltig.
 * 
 * @param {string} dateString - Datumsträng (kan vara ISO-format)
 * @returns {string} Formaterat datum eller '-'
 */
export const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };
  