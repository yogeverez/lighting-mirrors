import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/landing";
import Terms from "./pages/terms";
import Privacy from "./pages/privacy";

const AppRoutes = ({ location }) => {
  return (
    <Router>
      <Routes>
        <Route path={"/"} element={<Landing />} />
        <Route path={"/terms"} element={<Terms />} />
        <Route path={"/privacy"} element={<Privacy />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
