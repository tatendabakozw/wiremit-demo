// src/pages/api/auth/logout.ts
import type { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";

export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("auth_token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 0, // delete
    })
  );
  return res.status(200).json({ success: true });
}
