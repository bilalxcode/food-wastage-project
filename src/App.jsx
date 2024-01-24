import React from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "./Homepage";
import Features from "./Features";
import Login from "./Login";
import SignupForm from "./Signupform";
import SubscriptionComponent from "./Subscription";
import SuccessComponent from "./SuccessComponent";
import Dashboard from "./Dashboard";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/features" element={<Features />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/subscription" element={<SubscriptionComponent />} />
        <Route path="/success" element={<SuccessComponent />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
};

export default App;
