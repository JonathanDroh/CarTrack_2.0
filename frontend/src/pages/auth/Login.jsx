// Komponent: Login
// Beskrivning: Inloggningssida som skickar användaruppgifter till backend, hanterar svar och sparar JWT-token via AuthContext.

import { useState } from "react";
import { useAuth } from "../../context/authUtils";
import { useNavigate } from "react-router-dom";
import "../../styles/Login.css";
import logo from "../../assets/CarDeal_logo.webp";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                login(data.token, data.role);
                navigate("/dashboard");
            } else {
                setError(data.error);
            }
        } catch (err) {
            console.error("Fel vid API-anrop:", err);
            setError("Serverfel, försök igen senare.");
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <div className="left-side">
                    <img src={logo} alt="CarDeal AB" className="logo" />
                    <p className="slogan">Gedigen bilhandlare i Örebro</p>
                </div>

                <div className="right-side">
                    <h2>Logga in</h2>
                    {error && <p className="error">{error}</p>}
                    <form onSubmit={handleSubmit}>
                        <label>Email</label>
                        <input
                            type="email"
                            placeholder="E-post"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        <label>Lösenord</label>
                        <input
                            type="password"
                            placeholder="*********"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                        <button type="submit">Logga in</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
