import React from "react";
import "./App.css";
import Header from "./components/Header";
import Performance from "./pages/Performance";
import ActivitiesPage from "./pages/ActivitiesPage";
import Settings from "./pages/Settings";
import Broker from "./pages/Broker";
import BrokerUpload from "./pages/BrokerUpload";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import Holdings from "./pages/Holdings";
import LandingPage from "./pages/LandingPage";
import HomePage from "./pages/HomePage";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import PricingPage from "./pages/PricingPage";
import FeaturesPage from "./pages/FeaturesPage";
import { useAuth } from "./contexts/AuthContext";


import Reports from "./pages/Reports";
import ReportRoutes from "./pages/ReportRoutes";


function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      <div className="app">
        <Header />
        <div className="content">
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={isAuthenticated ? <Navigate to="/home" /> : <Login />} />
            <Route path="/signup" element={isAuthenticated ? <Navigate to="/home" /> : <SignUp />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/features" element={<FeaturesPage />} />
            
            {/* Landing page (only for non-authenticated users) */}
            <Route path="/" element={isAuthenticated ? <Navigate to="/home" /> : <LandingPage />} />
            
            {/* Protected routes */}
            <Route path="/home" element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            } />
            
            <Route path="/holdings" element={
              <ProtectedRoute>
                <Holdings />
              </ProtectedRoute>
            } />
            
            <Route path="/performance" element={
              <ProtectedRoute>
                <Performance />
              </ProtectedRoute>
            } />
            
            <Route path="/income" element={
              <ProtectedRoute>
                <IncomePage />
              </ProtectedRoute>
            } />
            
            <Route path="/activities" element={
              <ProtectedRoute>
                <ActivitiesPage />
              </ProtectedRoute>
            } />
            
            <Route path="/settings" element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            } />
            
            <Route path="/brokers" element={
              <ProtectedRoute>
                <Broker />
              </ProtectedRoute>
            } />

            <Route path="/brokers/:brokerId" element={
              <ProtectedRoute>
                <BrokerUpload />
              </ProtectedRoute>
            } />

<Route path="/reports" element={
  <ProtectedRoute>
    <Reports />
  </ProtectedRoute>
} />

<Route path="/reports/*" element={
  <ProtectedRoute>
    <ReportRoutes />
  </ProtectedRoute>
} />

            
            {/* Admin routes */}
            <Route path="/admin/*" element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            } />
            
            {/* Redirect any unmatched routes */}
            <Route path="*" element={<Navigate to={isAuthenticated ? "/home" : "/"} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

// Placeholder components for other pages
const IncomePage = () => <div>Income Page</div>;

export default App;