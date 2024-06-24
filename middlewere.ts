// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import { cookies } from "next/headers";

// // List of public routes that do not require authentication
// const publicRoutes = ["/login", "/register", "/register"];

// export function middleware(request: NextRequest) {
//   const { pathname } = request.nextUrl;

//   // Retrieve cookies from the request
//   const requestCookies = cookies();
//   const token = requestCookies.get("token");

//   // If the request is for a public route, allow it
//   if (publicRoutes.includes(pathname)) {
//     return NextResponse.next();
//   }

//   // If the token is not present and the user is trying to access a protected route, redirect to login
//   if (!token) {
//     const loginUrl = new URL("/login", request.url);
//     return NextResponse.redirect(loginUrl);
//   }

//   // If the token is present, allow the request
//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
// };

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";

// List of public routes that do not require authentication
const publicRoutes = ["/login", "/register", "/forgotpassword"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Retrieve cookies from the request
  const requestCookies = cookies();
  const token = requestCookies.get("token");

  // Debugging: Check the current path and token
  console.log("Request path:", pathname);
  console.log("Token:", token);

  // If the request is for a public route, allow it
  if (publicRoutes.includes(pathname)) {
    console.log("Accessing public route:", pathname);
    return NextResponse.next();
  }

  // If the token is not present and the user is trying to access a protected route, redirect to login
  if (!token) {
    const loginUrl = new URL("/login", request.url);
    console.log("No token found. Redirecting to:", loginUrl.href);
    return NextResponse.redirect(loginUrl);
  }

  // If the token is present, allow the request
  console.log("Token found. Allowing access to:", pathname);
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
