// /App.js

import React from "react";
import { Route, Routes } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";

const App = () => {
  const { isLoggedIn, userData } = useAuth(); // Example usage of auth context

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default App;
