"use client";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function Navbar() {
  const { data: session, status } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  // Don't show navbar while loading or if not authenticated
  if (status !== "authenticated") return null;

  return (
    <nav className="bg-gray-900 text-white px-4 py-3 shadow-md">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/dashboard" className="text-xl font-bold text-green-400">
          ØkonomiTracker
        </Link>

        {/* Desktop Links */}
        <div className="hidden sm:flex gap-6 text-sm">
          <Link href="/dashboard" className="hover:text-green-400">Dashboard</Link>
          <Link href="/transactions" className="hover:text-green-400">Logg transaksjon</Link>
          <Link href="/goals" className="hover:text-green-400">Sparemål</Link>
        </div>

        {/* Right: User + Logout */}
        <div className="hidden sm:flex items-center gap-4 text-sm">
          <span className="text-gray-300">Hei, {session.user.name}</span>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-white"
          >
            Logg ut
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="sm:hidden text-white focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="sm:hidden mt-2 space-y-2 text-sm px-2">
          <Link href="/dashboard" className="block px-4 py-2 rounded hover:bg-gray-800">Dashboard</Link>
          <Link href="/transactions" className="block px-4 py-2 rounded hover:bg-gray-800">Logg transaksjon</Link>
          <Link href="/goals" className="block px-4 py-2 rounded hover:bg-gray-800">Sparemål</Link>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="w-full text-left px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white"
          >
            Logg ut
          </button>
        </div>
      )}
    </nav>
  );
}
