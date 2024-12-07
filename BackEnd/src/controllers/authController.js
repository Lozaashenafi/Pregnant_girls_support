const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRATE; // Ensure you have this in your .env file

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Email and password are required" });
  }

  try {
    // Find the user by email (this can be either doctor or patient)
    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true, name: true, email: true, password: true, role: true }, // Only select necessary fields
    });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid password" });
    }

    // Create JWT token
    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
      expiresIn: "1h", // Token expires in 1 hour
    });

    // Send response with success flag
    return res.status(200).json({
      success: true, // Include success flag
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error: ", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

module.exports = { loginUser };
