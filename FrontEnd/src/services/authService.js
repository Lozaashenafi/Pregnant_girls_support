import { message } from "antd";
import axios from "../utils/axios";

const authService = {
  login: async (formData) => {
    try {
      console.log(formData);
      const response = await axios.post("login", formData);
      console.log(response); // Check the response structure in the console

      if (response && response.data && response.data.success) {
        localStorage.setItem("token", response.data.token);
        return { success: true, message: "Login successful" };
      } else {
        return { success: false, message: "Login failed" };
      }
    } catch (error) {
      console.error("Error during login:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        return { success: false, message: error.response.data.message };
      } else {
        return {
          success: false,
          message: "Failed to login. Please try again later.",
        };
      }
    }
  },
  register: async ({ name, email, phoneNumber, doctorId, password }) => {
    try {
      const response = await fetch("/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          phoneNumber,
          doctorId,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json().catch(() => {
        throw new Error("Failed to parse server response as JSON");
      });

      return {
        success: true,
        message: data.message,
        patient: data.patient,
      };
    } catch (error) {
      console.error("Error during registration:", error.message);
      return {
        success: false,
        message:
          error.message || "Registration failed. Please try again later.",
      };
    }
  },
};

export default authService;
