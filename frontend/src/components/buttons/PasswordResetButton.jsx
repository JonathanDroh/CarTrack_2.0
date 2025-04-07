// Komponent: PasswordResetButton
// Beskrivning: Knapp som triggar ett återställningsanrop för en användares lösenord.

function PasswordResetButton({ user, onReset }) {
    return (
      <button
        className="button-base button-black"
        onClick={() => onReset(user)}
      >
        Återställ lösenord
      </button>
    );
  }
  
  export default PasswordResetButton;
  