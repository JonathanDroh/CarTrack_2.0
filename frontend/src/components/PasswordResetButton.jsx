function PasswordResetButton({ userEmail, onReset }) {
    return (
        <button 
            className="reset-password-button" 
            onClick={() => onReset(userEmail)}
        >
            Återställ lösenord
        </button>
    );
}

export default PasswordResetButton;
