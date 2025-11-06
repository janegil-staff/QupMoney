// middleware.js
export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/dashboard", "/api/:path*"], // ✅ include protected routes
};
