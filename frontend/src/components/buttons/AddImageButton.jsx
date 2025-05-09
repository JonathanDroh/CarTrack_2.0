// Komponent: AddImageButton
// Beskrivning: En knapp för att ladda upp bild samt visa en förhandsgranskning om bild finns.

import "../../styles/Components.css";

function AddImageButton({ onClick, imageUrl }) {
    return (
        <div className="add-image-wrapper">
            <button className="button-base button-black" onClick={onClick}>
                Lägg till bild
            </button>

            {/* Visa förhandsgranskning om bild finns */}
            {imageUrl && (
                <div className="image-preview">
                    <img
                        src={`${import.meta.env.VITE_API_URL}/${imageUrl}`}
                        alt="Uppladdad bild"
                        className="preview-image"
                    />
                </div>
            )}
        </div>
    );
}

export default AddImageButton;
