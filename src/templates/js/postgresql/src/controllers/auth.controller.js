import asyncHandler from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { successResponse, errorResponse } from "../utils/response.js";
import{ findByEmail } from "../repositories/user.repository.js";

// Login endpoint
export const login = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    // const user = await User.findOne({ email });
        const user = await findByEmail(email);
    if (!user) {
      return res.status(401).json(errorResponse(null, "Invalid credentials"));
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json(errorResponse(null, "Invalid credentials"));
    }

    // Generate token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
    );

    res.json(successResponse({ token }, "Login successful"));
  } catch (error) {
    res.status(500).json(errorResponse(error, "Login failed"));
  }
});

export const signup = asyncHandler(async (req, res) => {
  try {
    const { name, email, password, age } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json(errorResponse(null, "User already exists"));
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      age: age || 0,
    });

    // Generate token
    const token = jwt.sign(
      { id: newUser._id, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
    );

    res
      .status(201)
      .json(successResponse({ token, user: newUser }, "Signup successful"));
  } catch (error) {
    res.status(500).json(errorResponse(error, "Login failed"));
  }
});
