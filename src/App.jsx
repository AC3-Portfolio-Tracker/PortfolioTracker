import React from "react";
import "./App.css";
import Header from "./components/Header";
import WelcomeSection from "./components/WelcomeSection";
import Settings from "./pages/Settings"; // Changed import to 'Settings'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<WelcomeSection />} />
            <Route path="/holdings" element={<HoldingsPage />} />{" "}
            {/* Placeholder */}
            <Route path="/performance" element={<PerformancePage />} />{" "}
            {/* Placeholder */}
            <Route path="/income" element={<IncomePage />} />{" "}
            {/* Placeholder */}
            <Route path="/activities" element={<ActivitiesPage />} />{" "}
            {/* Placeholder */}
            <Route path="/settings" element={<Settings />} />{" "}
            {/* Using the correctly imported 'SettingsPage' (which is now 'Settings') */}
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
