import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // If the user is authenticated and has admin role, allow access
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        // Only allow if token exists and role is 'admin'
        return token?.role === "admin";
      },
    },
    pages: {
      signIn: "/login", // redirect to login if not authenticated
    },
  },
);

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"], // protect these routes
};
