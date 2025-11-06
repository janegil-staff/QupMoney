"use client";
import { useEffect } from "react";

export default function TokenReader() {
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("userToken") || "{}");
    console.log("User ID:", token.id || token.sub);
  }, []);

  return null;
}
