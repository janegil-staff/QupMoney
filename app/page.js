"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import LandingPage from "@/components/LandingPage"; // or inline JSX

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.user) {
      router.replace("/dashboard"); // or "/sparemaal"
    }
  }, [session, router]);

  return <LandingPage />;
}
