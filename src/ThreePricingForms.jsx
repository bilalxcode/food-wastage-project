import React from "react";

const PricingForm = ({ plan, price, features }) => {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "16px",
        margin: "16px",
        flex: 1,
      }}
    >
      <h2>{plan}</h2>
      <p>Price: {price}</p>
      <ul>
        {features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
      <button>Subscribe</button>
    </div>
  );
};

const ThreePricingForms = () => {
  const pricingData = [
    {
      plan: "Basic",
      price: "$9.99/month",
      features: ["Feature 1", "Feature 2", "Feature 3"],
    },
    {
      plan: "Standard",
      price: "$19.99/month",
      features: ["Feature 1", "Feature 2", "Feature 3", "Feature 4"],
    },
    {
      plan: "Premium",
      price: "$29.99/month",
      features: [
        "Feature 1",
        "Feature 2",
        "Feature 3",
        "Feature 4",
        "Feature 5",
      ],
    },
  ];

  return (
    <div style={{ display: "flex" }}>
      {pricingData.map((pricing, index) => (
        <PricingForm key={index} {...pricing} />
      ))}
    </div>
  );
};

export default ThreePricingForms;
