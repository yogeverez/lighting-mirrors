import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/landing";
import Terms from "./pages/terms";
import Privacy from "./pages/privacy";
import Cancellation from "./pages/cancellation";
import PaymentSuccess from "./pages/paymentSuccess";
import PaymentFailure from "./pages/paymentFailure";

const AppRoutes = ({ location }) => {
  return (
    <Router>
      <Routes>
        <Route path={"/"} element={<Landing />} />
        <Route path={"/terms"} element={<Terms />} />
        <Route path={"/privacy"} element={<Privacy />} />
        <Route path={"/cancellation"} element={<Cancellation />} />
        <Route path={"/payment-success"} element={<PaymentSuccess />} />
        <Route path={"/payment-failure"} element={<PaymentFailure />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
