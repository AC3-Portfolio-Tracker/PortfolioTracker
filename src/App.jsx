import React from "react";
import "./App.css";
import Header from "./components/Header";
import WelcomeSection from "./components/WelcomeSection";
import Settings from "./pages/Settings";
import Broker from "./pages/Broker";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<WelcomeSection />} />
            <Route path="/holdings" element={<HoldingsPage />} />
            <Route path="/performance" element={<PerformancePage />} />
            <Route path="/income" element={<IncomePage />} />
            <Route path="/activities" element={<ActivitiesPage />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/brokers" element={<Broker />} />{" "}
            {/* Add the new route */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

// Placeholder components for other pages
const HoldingsPage = () => <div>Holdings Page</div>;
const PerformancePage = () => <div>Performance Page</div>;
const IncomePage = () => <div>Income Page</div>;
const ActivitiesPage = () => <div>Activities Page</div>;

export default App;
