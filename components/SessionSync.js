"use client";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function SessionSync() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated" && session?.user?.token) {
      const token = session.user.token;

      localStorage.setItem("userToken", JSON.stringify(token));
      localStorage.setItem("userId", token.id ?? token.sub ?? "missing");
      localStorage.setItem("userEmail", token.email);
      localStorage.setItem("userName", token.name);
    }
  }, [session, status]);

  return null;
}
