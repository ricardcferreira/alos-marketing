// proxy.ts
//
// FIX: renamed from middleware.ts — Next.js 16 renamed this convention to
// proxy.ts, with the exported function renamed to `proxy`. Confirmed
// directly; middleware.ts still technically works but is deprecated, and
// the old export name isn't what the framework is actually looking for
// on this version.
//
// Still needs merging if the project already has its own proxy.ts —
// Next.js only runs one per project.

import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const hostname = request.headers.get("host") || "";

  if (hostname.startsWith("support.")) {
    const url = request.nextUrl.clone();
    url.pathname = `/support-site${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};