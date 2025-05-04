import React, { useState } from "react";
import "../components/PricingPage.css";

const pricingData = {
  monthly: [
    {
      title: "Basic",
      price: "$9",
      features: ["1 Project", "Email Support", "Basic Analytics"],
    },
    {
      title: "Pro",
      price: "$29",
      features: ["10 Projects", "Priority Support", "Advanced Analytics"],
    },
    {
      title: "Enterprise",
      price: "$99",
      features: ["Unlimited Projects", "24/7 Support", "Custom Solutions"],
    },
  ],
  yearly: [
    {
      title: "Basic",
      price: "$90",
      features: ["1 Project", "Email Support", "Basic Analytics"],
    },
    {
      title: "Pro",
      price: "$290",
      features: ["10 Projects", "Priority Support", "Advanced Analytics"],
    },
    {
      title: "Enterprise",
      price: "$990",
      features: ["Unlimited Projects", "24/7 Support", "Custom Solutions"],
    },
  ],
};

const PricingPage = () => {
  const [billingCycle, setBillingCycle] = useState("monthly");

  return (
    <div>
      <div className="pricing-container">
        <h1 className="pricing-title">Choose Your Plan</h1>

        <div className="billing-toggle">
          <button
            className={billingCycle === "monthly" ? "active" : ""}
            onClick={() => setBillingCycle("monthly")}
          >
            Monthly
          </button>
          <button
            className={billingCycle === "yearly" ? "active" : ""}
            onClick={() => setBillingCycle("yearly")}
          >
            Yearly
          </button>
        </div>

        <div className="pricing-grid">
          {pricingData[billingCycle].map((plan, index) => (
            <div className="pricing-card" key={index}>
              <h2>{plan.title}</h2>
              <div className="price">{plan.price}</div>
              <ul>
                {plan.features.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
              <button className="choose-btn">Choose Plan</button>
            </div>
          ))}
        </div>
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

export default PricingPage;
