import axios from "axios";
import getAuth from "./authHeader";
const serverURL = import.meta.env.VITE_REACT_APP_SERVER_URL;
const instance = axios.create({
  baseURL: serverURL,
  withCredentials: true,
});

// Set the token in the request headers
instance.interceptors.request.use(async (config) => {
  const userData = await getAuth();
  const token = userData.token;

  if (token) {
    config.headers = {
      ...config.headers, // Keep any existing headers
      authorization: `Bearer ${token}`, // Add the token to the Authorization header
    };
  }

  return config;
});

export default instance;
