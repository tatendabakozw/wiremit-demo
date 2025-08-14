// src/pages/api/app/profile.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { withApiAuth } from "@/utils/withApiAuth";

export default withApiAuth(async function handler(req: NextApiRequest, res: NextApiResponse) {
  const auth = (req as any).auth; // { sub, email, ... }
  return res.status(200).json({ success: true, data: { userId: auth.sub } });
});
