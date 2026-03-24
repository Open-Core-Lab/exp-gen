/**
 * Auth middleware to protect routes using JWT
 *
 * How to use:
 * 1. Generate a JWT token after user login using `jwt.sign(payload, JWT_SECRET, { expiresIn })`.
 * 2. Send the token in the request headers: Authorization: Bearer <token>
 * 3. Add this middleware to routes you want to protect:
 *      router.get('/protected', protect, protectedController)
 * 4. Inside your controller, `req.user` will have the decoded user info
 */

import jwt from "jsonwebtoken";
import { errorResponse } from "../utils/response.js";
import { Request, Response, NextFunction } from "express";
import type { HttpError } from "http-errors";

export const protect = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json(
          errorResponse(
            { status: 401 } as HttpError<number>,
            "Authorization token missing or malformed"
          )
        );
    }

    // Get token from headers
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json(
          errorResponse(
            { status: 401 } as HttpError<number>,
            "Not authorized, token missing"
          )
        );
    }

    // Verify token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    } catch (err: any) {
      if (err.name === "TokenExpiredError") {
        return res
          .status(401)
          .json(
            errorResponse({ status: 401 } as HttpError<number>, "Token expired")
          );
      }
      return res
        .status(401)
        .json(
          errorResponse(
            { status: 401 } as HttpError<number>,
            "Unauthorized: Invalid token"
          )
        );
    }

    // Attach decoded user info to request
    req.user = decoded;

    next();
  } catch (err: any) {
    return res
      .status(500)
      .json(
        errorResponse(
          { status: 500 } as HttpError<number>,
          "Server error: " + err.message
        )
      );
  }
};
