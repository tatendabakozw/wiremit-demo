// src/pages/api/auth/register.ts
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongoose";
import bcrypt from "bcryptjs";
import User from "@/lib/models/User";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ success: false, message: "Method Not Allowed" });
  }

  try {
    await dbConnect();
    const { firstName, lastName, email, password } = req.body ?? {};

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const existing = await User.findOne({ email }).lean();
    if (existing) {
      return res.status(409).json({ success: false, message: "Email already in use" });
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const doc = await User.create({ firstName, lastName, email, passwordHash });

    return res.status(201).json({
      success: true,
      data: { id: String(doc._id), email: doc.email, firstName: doc.firstName, lastName: doc.lastName },
      message: "Account created",
    });
  } catch (e: any) {
    // duplicate key fallback
    if (e?.code === 11000) {
      return res.status(409).json({ success: false, message: "Email already in use" });
    }
    console.error(e);
    return res.status(500).json({ success: false, message: "Server error" });
  }
}
