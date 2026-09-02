import asyncHandler from "../utils/asyncHandler";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { successResponse, errorResponse } from "../utils/response";
import * as userRepo from "../repositories/user.repository";
import type { Request, Response } from "express";

export const login = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body as { email?: string; password?: string };

    if (!email || !password) {
      return res.status(400).json(errorResponse({ status: 400 }, "Email and password required"));
    }

    const user = await userRepo.getUserByEmail(email);
    if (!user) {
      return res.status(401).json(errorResponse({ status: 401 }, "Invalid credentials"));
    }

    const isMatch = await bcrypt.compare(password, user.password || "");
    if (!isMatch) {
      return res.status(401).json(errorResponse({ status: 401 }, "Invalid credentials"));
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
    );

    res.json(successResponse({ token }, "Login successful"));
  } catch (error) {
    res.status(500).json(errorResponse(error, "Login failed"));
  }
});

export const signup = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { name, email, password, age } = req.body as { name?: string; email?: string; password?: string; age?: number };

    if (!name || !email || !password) {
      return res.status(400).json(errorResponse({ status: 400 }, "Name, email, and password required"));
    }

    const existingUser = await userRepo.getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json(errorResponse({ status: 400 }, "User already exists"));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userRepo.createUser({
      name,
      email,
      password: hashedPassword,
      age: age || 0,
    });

    const token = jwt.sign(
      { id: newUser.id, email: newUser.email },
      process.env.JWT_SECRET as string,
      { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
    );

    res.status(201).json(successResponse({ token, user: newUser }, "Signup successful"));
  } catch (error) {
    res.status(500).json(errorResponse(error, "Signup failed"));
  }
});
