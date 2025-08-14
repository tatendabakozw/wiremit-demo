// src/pages/api/auth/me.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { getTokenFromApiReq, verifyToken } from "@/lib/auth";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = getTokenFromApiReq(req);
  const auth = token ? verifyToken(token) : null;
  if (!auth) return res.status(401).json({ success: false });
  return res.status(200).json({ success: true, data: { id: auth.sub, email: auth.email } });
}
