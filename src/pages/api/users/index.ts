// src/pages/api/users/index.ts
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongoose";
import User from "@/lib/models/User";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  try {
    if (req.method === "GET") {
      const list = await User.find().limit(50).lean();
      return res.status(200).json({ success: true, data: list });
    }

    if (req.method === "POST") {
      const { username, email, passwordHash } = req.body ?? {};
      if (!username || !email || !passwordHash) {
        return res.status(400).json({ success: false, message: "Missing fields" });
      }

      const doc = await User.create({ username, email, passwordHash });
      return res.status(201).json({ success: true, data: { id: String(doc._id) } });
    }

    res.setHeader("Allow", "GET, POST");
    return res.status(405).json({ success: false, message: "Method Not Allowed" });
  } catch (e: any) {
    // Handle unique index conflicts nicely
    if (e?.code === 11000) {
      return res.status(409).json({ success: false, message: "User already exists" });
    }
    console.error(e);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
}
