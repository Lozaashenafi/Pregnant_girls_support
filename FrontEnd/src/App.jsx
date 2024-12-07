// /App.js

import React from "react";
import { Route, Routes } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import Home from "./pages/Home";
import AboutUsPage from "./pages/AboutUsPage";
import ContactPage from "./pages/ContactPage";
import Doctors from "./pages/Doctor";
import Services from "./pages/Services";

const App = () => {
  const { isLoggedIn, userData } = useAuth(); // Example usage of auth context

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/aboutus" element={<AboutUsPage />} />
      <Route path="/contactus" element={<ContactPage />} />
      <Route path="/doctors" element={<Doctors />} />
      <Route path="/service" element={<Services />} />
    </Routes>
  );
};

export default App;
