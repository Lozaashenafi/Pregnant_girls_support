import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import authService from "../services/authService";
import axios from "../utils/axios"; // Import axios instance for API calls
import women from "../assets/image/flot.jpg";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(""); // New state for phone number
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(""); // Ensure this is correctly set
  const [error, setError] = useState(null);

  // Fetch doctors from the API on component mount
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get("/doctors/list"); // API endpoint to fetch doctors
        if (response.data && response.data.doctors) {
          setDoctors(response.data.doctors); // Set doctors to state
        }
      } catch (err) {
        console.error("Failed to fetch doctors:", err);
        setError("Failed to load doctors. Please try again later.");
      }
    };

    fetchDoctors();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedDoctor) {
      setError("Please select a doctor.");
      return;
    }

    try {
      const response = await authService.register({
        name,
        email,
        password,
        phoneNumber, // Include phone number in the registration payload
        doctorId: selectedDoctor, // Ensure this value is correctly sent
      });

      if (response.success) {
        navigate("/login"); // Redirect to login after successful registration
      } else {
        setError(response.message); // Set error message from response
      }
    } catch (err) {
      setError("Registration failed, please try again."); // Set error message if registration fails
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-200">
      <div className="grid grid-cols-1 md:grid-cols-2 bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-5xl">
        {/* Form Section */}
        <div className="flex items-center justify-center p-8">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-sm flex flex-col gap-y-4"
          >
            <h4 className="text-center font-bold text-3xl">Register</h4>
            {error && <p className="text-red-500 text-center">{error}</p>}

            {/* Name Input */}
            <div className="flex flex-col">
              <label htmlFor="name" className="text-sm font-medium">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="p-2 border border-gray-300 rounded-md"
                placeholder="Enter your name"
                required
              />
            </div>

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

            {/* Phone Number Input */}
            <div className="flex flex-col">
              <label htmlFor="phoneNumber" className="text-sm font-medium">
                Phone Number
              </label>
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="p-2 border border-gray-300 rounded-md"
                placeholder="Enter your phone number"
                required
              />
            </div>

            {/* Doctor Dropdown */}
            <div className="flex flex-col">
              <label htmlFor="doctor" className="text-sm font-medium">
                Select Doctor
              </label>
              <select
                id="doctor"
                name="doctor"
                value={selectedDoctor}
                onChange={(e) => setSelectedDoctor(e.target.value)}
                className="p-2 border border-gray-300 rounded-md"
                required
              >
                <option value="">Select a doctor</option>
                {doctors.map((doctor) => (
                  <option key={doctor.id} value={doctor.id}>
                    {doctor.name} - {doctor.hospitalName}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-4">
              <button
                type="submit"
                className="w-full p-2 bg-blue-500 text-white rounded-md"
              >
                Register
              </button>
            </div>

            <p className="text-center mt-4">
              Already have an account?{" "}
              <Link
                to="/login"
                className="ml-2 link link-hover link-primary capitalize"
              >
                Login
              </Link>
            </p>
          </form>
        </div>

        {/* Image Section */}
        <div className="flex items-center justify-center bg-white p-4">
          <img
            src={women}
            alt="Login Illustration"
            className="w-3/4 h-auto object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
