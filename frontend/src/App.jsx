import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/authUtils"; 
import Login from "./pages/auth/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import AdminSettings from "./pages/admin/AdminSettings"; // 🔹 Importera AdminSettings

function ProtectedRoute({ element, role }) {
    const { user, loading } = useAuth(); 

    if (loading) return <h1>Laddar...</h1>; // 🔹 Vänta tills vi vet om användaren är inloggad

    if (!user) {
        console.log("🔴 Oinloggad användare försöker komma åt en skyddad sida, skickas till login.");
        return <Navigate to="/" replace />;
    }

    if (role && user.role !== role) {
        console.log("🔴 Obehörig användare försöker komma åt en admin-sida. Skickas till dashboard.");
        return <Navigate to="/dashboard" replace />;
    }

    return element;
}

function App() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
            <Route path="/admin-settings" element={<ProtectedRoute element={<AdminSettings />} role="Admin" />} /> {/* 🔹 Endast för Admin */}
        </Routes>
    );
}

export default App;
