// middleware.ts (at project root)
import { NextResponse, NextRequest } from "next/server";
import { verifyToken } from "@/lib/auth";

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();

  if (url.pathname.startsWith("/portal")) {
    const token = req.cookies.get("auth_token")?.value;
    const auth = token ? verifyToken(token) : null;
    if (!auth) {
      url.pathname = "/auth/login";
      url.searchParams.set("next", req.nextUrl.pathname + req.nextUrl.search);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/app/:path*"], // adjust paths to protect
};
