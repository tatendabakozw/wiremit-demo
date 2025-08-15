import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { serialize } from "cookie"; // Changed import
import User from "@/lib/models/User";

const JWT_SECRET = process.env.JWT_SECRET as string;
if (!JWT_SECRET) {
  throw new Error("Please add JWT_SECRET to your .env.local");
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ 
      success: false, 
      message: "Method Not Allowed" 
    });
  }

  try {
    const { email, password, rememberMe } = req.body ?? {};
    if (!email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: "Email and password are required" 
      });
    }

    await dbConnect();

    const user = await User.findOne({ email }).lean();
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: "Invalid credentials" 
      });
    }

    const passwordValid = await bcrypt.compare(password, user.passwordHash);
    if (!passwordValid) {
      return res.status(401).json({ 
        success: false, 
        message: "Invalid credentials" 
      });
    }

    const token = jwt.sign(
      { 
        sub: String(user._id), 
        email: user.email 
      },
      JWT_SECRET,
      { expiresIn: rememberMe ? "30d" : "1d" }
    );

    // Using serialize directly instead of cookie.serialize
    const cookie = serialize("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: rememberMe ? 60 * 60 * 24 * 30 : 60 * 60 * 24,
    });

    res.setHeader("Set-Cookie", cookie);

    return res.status(200).json({
      success: true,
      message: "Logged in",
      data: {
        id: String(user._id),
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ 
      success: false, 
      message: "Internal server error" 
    });
  }
}