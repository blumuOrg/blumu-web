import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/lock") {
    return NextResponse.next();
  }

  // Allow static assets and API
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/images") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/lock", request.url));
}

export const config = {
  matcher: ["/((?!_next|images|api|.*\\..*).*)"],
};
