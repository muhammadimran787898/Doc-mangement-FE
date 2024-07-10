import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  let token = request.cookies.get("authToken")?.value || "";

  if (
    pathname === "/login" ||
    pathname === "/register" ||
    pathname === "/forgotpassword"
  ) {
    if (token) {
      const homeUrl = new URL("/home", request.url);
      return NextResponse.redirect(homeUrl);
    }
  } else {
    if (!token) {
      const loginUrl = new URL("/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/home", "/login", "/register", "/forgotpassword"],
};
