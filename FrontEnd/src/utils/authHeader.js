// Function to read the data from the user's local storage
const getAuth = async () => {
  let userInfo = null;
  try {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      userInfo = JSON.parse(storedToken);
    }
  } catch (error) {
    console.error("Failed to parse token:", error);
  }

  // Initialize userData
  let userData = {
    id: "",
    firstName: "",
    role: "",
    token: userInfo ? userInfo.token : null,
  };

  // If userInfo is found and contains a token, decode it
  if (userInfo && userInfo.token) {
    const decodedToken = await decodeTokenPayload(userInfo.token);
    userData.id = decodedToken.id;
    userData.firstName = decodedToken.firstName;
    userData.role = decodedToken.role;
  }

  return userData;
};

// Function to decode the payload from the token
const decodeTokenPayload = (token) => {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
      .join("")
  );
  return JSON.parse(jsonPayload);
};

export default getAuth;
