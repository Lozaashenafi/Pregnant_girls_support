import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Import the AuthContext
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import women from "../assets/image/women.jpg";

const Login = () => {
  const { login } = useAuth(); // Get the login function from context
  const navigate = useNavigate(); // Hook to navigate programmatically
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); // State to store error message

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password); // Login using the context function
      navigate("/dashboard"); // Redirect to dashboard after successful login
    } catch (err) {
      setError("Invalid credentials, please try again."); // Set error message if login fails
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-200">
      {/* Main Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-5xl">
        {/* Image Section */}
        <div className="flex items-center justify-center bg-white p-4">
          <img
            src={women}
            alt="Login Illustration"
            className="w-3/4 h-auto object-contain"
          />
        </div>

        {/* Form Section */}
        <div className="flex items-center justify-center p-8">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-sm flex flex-col gap-y-4"
          >
            <h4 className="text-center font-bold text-3xl">Login</h4>
            {error && <p className="text-red-500 text-center">{error}</p>}{" "}
            {/* Display error message if exists */}
            {/* Email Input */}
            <div className="flex flex-col">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="p-2 border border-gray-300 rounded-md"
                placeholder="Enter your email"
                required
              />
            </div>
            {/* Password Input */}
            <div className="flex flex-col">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="p-2 border border-gray-300 rounded-md"
                placeholder="Enter your password"
                required
              />
            </div>
            <div className="mt-4">
              {/* Submit Button */}
              <button
                type="submit"
                className="w-full p-2 bg-blue-500 text-white rounded-md"
              >
                Login
              </button>
            </div>
            <p className="text-center mt-4">
              Not Registered Yet?{" "}
              <Link
                to="/register"
                className="ml-2 link link-hover link-primary capitalize"
              >
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
