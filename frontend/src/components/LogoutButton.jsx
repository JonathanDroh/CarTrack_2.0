import { useLogout } from "../context/authUtils"; // 🔹 Importera `useLogout`

function LogoutButton() {
    const logout = useLogout();
    return <button onClick={logout}>Logga ut</button>;
}

export default LogoutButton;
