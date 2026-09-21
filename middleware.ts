import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const hostname = req.headers.get("host") || "";

  // Check if the request is targeting the support subdomain.
  // Using startsWith allows this to work locally (support.localhost:3000) and in prod.
  if (hostname.startsWith("support.")) {
    // Rewrite the request to our dedicated support folder
    url.pathname = `/support-site${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  // Otherwise, load the marketing pages normally
  return NextResponse.next();
}

// Optimize the middleware to ignore static files and images
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};