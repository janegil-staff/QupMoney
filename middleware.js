export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/dashboard", "/api/:path*", "/goals", "/transactions"], // ✅ include protected routes
};
