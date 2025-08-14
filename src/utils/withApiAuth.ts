// src/utils/withApiAuth.ts
import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { getTokenFromApiReq, verifyToken } from "@/lib/auth";

export function withApiAuth(handler: NextApiHandler) {
  return (req: NextApiRequest, res: NextApiResponse) => {
    const token = getTokenFromApiReq(req);
    const auth = token ? verifyToken(token) : null;
    if (!auth) return res.status(401).json({ success: false, message: "Unauthorized" });
    (req as any).auth = auth;
    return handler(req, res);
  };
}
