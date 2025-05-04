import React from "react";
import { useNavigate } from "react-router-dom";
import "../components/FeaturesPage.css";
import portfolioImg from "/data/portfolio.jpg";
import aiInsightsImg from "/data/ai-insights.jpg";
import securityImg from "/data/security.jpg";
import devicesImg from "/data/devices.jpg";

const features = [
  {
    title: "Best Portfolio Tracker",
    description:
      "Stay on top of your investments with real-time insights and analytics.",
    image: portfolioImg,
  },
  {
    title: "AI-Powered Insights",
    description:
      "Get smart suggestions on improving your portfolio performance.",
    image: aiInsightsImg,
  },
  {
    title: "Secure and Private",
    description:
      "Your data is encrypted and protected with top-grade security.",
    image: securityImg,
  },
  {
    title: "Multi-Device Access",
    description:
      "Use the app on desktop, tablet, or mobile – synced across all.",
    image: devicesImg,
  },
];

const FeaturesPage = () => {
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate("/signup");
  };

  return (
    <div>
      <div className="features-container">
        <h1 className="features-title">Explore Our Powerful Features</h1>
        <p className="features-subtitle">
          Discover how we help you grow and manage your portfolio efficiently.
        </p>

        <div className="features-grid">
          {features.map((feature, index) => (
            <div className="feature-card" key={index}>
              <img
                src={feature.image}
                alt={feature.title}
                className="feature-image"
              />
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>

        <button className="signup-button" onClick={handleSignUp}>
          Sign Up For Free
        </button>
      </div>
      <footer className="footer">
        <div className="footer-content">
          <p>
            &copy; {new Date().getFullYear()} PortfolioTracker. All rights reserved.
          </p>
          <div className="footer-links">
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms of Service</a>
            <a href="/contact">Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FeaturesPage;
