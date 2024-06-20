// import React from "react";
// import { NextResponse } from "next/server";

// export default function middlewere({ req }: any) {
//   const user = "";

//   if (!user) {
//     return NextResponse.redirect("/login");
//   }

//   return NextResponse.next();
// }

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Clone the request headers and set a new header `x-hello-from-middleware1`
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-hello-from-middleware1", "hello");

  // You can also set request headers in NextResponse.rewrite
  const response = NextResponse.next({
    request: {
      // New request headers
      headers: requestHeaders,
    },
  });

  // Set a new response header `x-hello-from-middleware2`
  response.headers.set("x-hello-from-middleware2", "hello");
  return response;
}

export const config = {
  matcher: [
    "/profile/:path*", // Protect profile route
    "/dashboard/:path*", // Protect dashboard route
    "/settings/:path*", // Example of another protected route
  ],
};
