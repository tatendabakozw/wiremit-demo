// src/lib/auth.ts
import jwt from "jsonwebtoken";
import type { NextApiRequest } from "next";
import type { GetServerSidePropsContext } from "next";

const JWT_SECRET = process.env.JWT_SECRET as string;

export type AuthToken = {
  sub: string;       // user id
  email: string;
  // role?: 'admin' | 'user' | ... (optional)
  iat: number;
  exp: number;
};

export function verifyToken(token: string): AuthToken | null {
  try {
    return jwt.verify(token, JWT_SECRET) as AuthToken;
  } catch {
    return null;
  }
}

// Read cookie from API route request
export function getTokenFromApiReq(req: NextApiRequest): string | null {
  const raw = req.headers.cookie || "";
  const match = raw.match(/(?:^|;\s*)auth_token=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : null;
}

// Read cookie from GSSP ctx
export function getTokenFromGssp(ctx: GetServerSidePropsContext): string | null {
  const raw = ctx.req.headers.cookie || "";
  const match = raw.match(/(?:^|;\s*)auth_token=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : null;
}
