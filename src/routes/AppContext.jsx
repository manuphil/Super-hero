import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Header";
import Home from "../pages/Home";
import Galerie from "../pages/creation/Galerie";
import Create from "../pages/creation/Create";
import Register from "../components/users/Register";
import Login from "../components/users/Login";
import Profile from "../components/users/Profile";

import { AuthProvider, useAuth } from "../contexts/AuthContext";
import { LoadingProvider } from "../contexts/LoadingContext"; // Importe le LoadingProvider
import GlobalLoadingSpinner from "../components/GlobalLoadingSpinner"; // Importe le spinner

// Composant pour les routes protégées
function ProtectedRoute({ children }) {
  const { isLoggedIn } = useAuth();
  if (!isLoggedIn) {
    return <Navigate to="/api/login" replace />;
  }
  return children;
}

function AppContext() {
  const { isLoggedIn } = useAuth();

  return (
    <Router>
      {/* Enveloppe toute l'application avec le LoadingProvider */}
      <LoadingProvider>
        <Navbar />
        <Routes>
          {/* Routes publiques (accessibles à tous) */}
          <Route
            path="/api/login"
            element={isLoggedIn ? <Navigate to="/" replace /> : <Login />}
          />
          <Route
            path="/api/register"
            element={isLoggedIn ? <Navigate to="/" replace /> : <Register />}
          />

          {/* Routes protégées (nécessitent d'être connecté) */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/galerie"
            element={
              <ProtectedRoute>
                <Galerie />
              </ProtectedRoute>
            }
          />
          <Route
            path="/api/create"
            element={
              <ProtectedRoute>
                <Create />
              </ProtectedRoute>
            }
          />
          <Route
            path="/api/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          {/* Redirection pour les routes inconnues (vers la page d'accueil si connecté, sinon vers login) */}
          <Route
            path="*"
            element={
              isLoggedIn ? (
                <Navigate to="/" replace />
              ) : (
                <Navigate to="/api/login" replace />
              )
            }
          />
        </Routes>
        <Footer />
        <GlobalLoadingSpinner /> {/* Le spinner global est rendu ici */}
      </LoadingProvider>
    </Router>
  );
}

export default AppContext;
