"use client";

import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white flex items-center justify-center px-6">
      <div className="max-w-3xl w-full text-center space-y-8">
        <h1 className="text-5xl font-extrabold tracking-tight leading-tight">
          Bygg dine <span className="text-green-500">sparemål</span> med stil
        </h1>

        <p className="text-lg text-gray-300 max-w-xl mx-auto">
          Enkelt. Oversiktlig. Norsk. Sett mål, følg fremgangen din, og ta
          kontroll over økonomien — alt på ett sted.
        </p>

        <div className="flex justify-center gap-4 flex-wrap">
          <Link
            href="/register"
            className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded text-white font-semibold shadow"
          >
            Kom i gang gratis
          </Link>
          <Link
            href="/login"
            className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded text-white font-semibold shadow"
          >
            Logg inn
          </Link>
        </div>

        <div className="pt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 text-left text-sm text-gray-400">
          <div>
            <h3 className="text-white font-semibold mb-1">🎯 Sett mål</h3>
            <p>Definer dine økonomiske mål og angi beløp og tidsrammer.</p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-1">📊 Følg fremgang</h3>
            <p>Se visuelle fremdriftslinjer og hold deg motivert.</p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-1">🇳🇴 Norsk løsning</h3>
            <p>
              Bygget for norske brukere — med lokal valuta og månedlig oversikt.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
