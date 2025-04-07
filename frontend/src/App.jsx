// Komponent: App (Huvudkomponent för routes)
// Beskrivning: Definierar alla routes och skyddar åtkomst baserat på användarens roll.

import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/authUtils"; 

// Import av sidor
import Login from "./pages/auth/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import AdminSettings from "./pages/admin/AdminSettings";
import AddEmployee from "./pages/admin/AddEmployee";
import Lackering from "./pages/lackering/Lackering"; 
import AddLackering from "./pages/lackering/AddLackering";
import LackeringHistory from "./pages/lackering/LackeringHistory"; 
import Rekond from "./pages/rekond/Rekond";
import AddRekond from "./pages/rekond/AddRekond";
import RekondHistory from "./pages/rekond/RekondHistory";
import Verkstad from "./pages/verkstad/Verkstad";
import AddVerkstad from "./pages/verkstad/AddVerkstad";
import VerkstadHistory from "./pages/verkstad/VerkstadHistory";
import PWR from "./pages/pwr/PWR";
import AddPWR from "./pages/pwr/AddPWR";
import PWRHistory from "./pages/pwr/PWRHistory";
import Besiktning from "./pages/besiktning/Besiktning";
import AddBesiktning from "./pages/besiktning/AddBesiktning";
import BesiktningHistory from "./pages/besiktning/BesiktningHistory";
import Korning from "./pages/korning/Korning";
import AddKorning from "./pages/korning/AddKorning";
import KorningHistory from "./pages/korning/KorningHistory";
import Atgard from "./pages/atgard/Atgard";
import AddAtgard from "./pages/atgard/AddAtgard";
import AtgardHistory from "./pages/atgard/AtgardHistory";

// Komponent för att skydda routes baserat på inloggningsstatus och roll
function ProtectedRoute({ element, role }) {
    const { user, loading } = useAuth(); 

    if (loading) return <h1>Laddar...</h1>;

    if (!user) {
        return <Navigate to="/" replace />;
    }

    if (role && user.role !== role) {
        return <Navigate to="/dashboard" replace />;
    }

    return element;
}

function App() {
    return (
        <Routes>
            {/* Publik route */}
            <Route path="/" element={<Login />} />

            {/* Skyddade routes (inloggning krävs) */}
            <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />

            {/* Admin-routes */}
            <Route path="/admin-settings" element={<ProtectedRoute element={<AdminSettings />} role="Admin" />} />
            <Route path="/add-employee" element={<ProtectedRoute element={<AddEmployee />} role="Admin" />} />

            {/* Lackering */}
            <Route path="/lackering" element={<ProtectedRoute element={<Lackering />} />} />
            <Route path="/add-lackering" element={<ProtectedRoute element={<AddLackering />} />} />
            <Route path="/lackering-history" element={<ProtectedRoute element={<LackeringHistory />} />} />

            {/* Rekond */}
            <Route path="/rekond" element={<ProtectedRoute element={<Rekond />} />} />
            <Route path="/add-rekond" element={<ProtectedRoute element={<AddRekond />} />} />
            <Route path="/rekond-history" element={<ProtectedRoute element={<RekondHistory />} />} />

            {/* Verkstad */}
            <Route path="/verkstad" element={<ProtectedRoute element={<Verkstad />} />} />
            <Route path="/add-verkstad" element={<ProtectedRoute element={<AddVerkstad />} />} />
            <Route path="/verkstad-history" element={<ProtectedRoute element={<VerkstadHistory />} />} />

            {/* PWR */}
            <Route path="/pwr" element={<ProtectedRoute element={<PWR />} />} />
            <Route path="/add-pwr" element={<ProtectedRoute element={<AddPWR />} />} />
            <Route path="/pwr-history" element={<ProtectedRoute element={<PWRHistory />} />} />

            {/* Besiktning */}
            <Route path="/besiktning" element={<ProtectedRoute element={<Besiktning />} />} />
            <Route path="/add-besiktning" element={<ProtectedRoute element={<AddBesiktning />} />} />
            <Route path="/besiktning-history" element={<ProtectedRoute element={<BesiktningHistory />} />} />

            {/* Körning */}
            <Route path="/korning" element={<ProtectedRoute element={<Korning />} />} />
            <Route path="/add-korning" element={<ProtectedRoute element={<AddKorning />} />} />
            <Route path="/korning-history" element={<ProtectedRoute element={<KorningHistory />} />} />

            {/* Åtgärd */}
            <Route path="/atgard" element={<ProtectedRoute element={<Atgard />} />} />
            <Route path="/add-atgard" element={<ProtectedRoute element={<AddAtgard />} />} />
            <Route path="/atgard-history" element={<ProtectedRoute element={<AtgardHistory />} />} />
        </Routes>
    );
}

export default App;
