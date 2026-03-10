import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/about")({
  component: About,
})

function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-800 text-white px-6 py-20">
      
      <div className="text-center max-w-3xl mx-auto mb-20">
        <h1 className="text-5xl font-bold mb-6">
          Om Oss
        </h1>
        <p className="text-xl text-gray-300">
          Vi är en grupp utvecklare som bygger en modern speech-to-text applikation 
          som gör det enkelt att omvandla ljud till text – snabbt, smart och automatiskt.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">

        <div className="bg-gray-800 p-8 rounded-2xl shadow-xl hover:scale-105 transition">
          <h2 className="text-2xl font-semibold mb-4">🚀 Vår Vision</h2>
          <p className="text-gray-300">
            Att göra transkribering tillgänglig för alla studenter, journalister och företag.
          </p>
        </div>

        <div className="bg-gray-800 p-8 rounded-2xl shadow-xl hover:scale-105 transition">
          <h2 className="text-2xl font-semibold mb-4">💻 Vår Teknik</h2>
          <p className="text-gray-300">
            Vi använder moderna webbverktyg och AI-API:er för att skapa en snabb och responsiv upplevelse.
          </p>
        </div>

        <div className="bg-gray-800 p-8 rounded-2xl shadow-xl hover:scale-105 transition">
          <h2 className="text-2xl font-semibold mb-4">🤝 Vårt Team</h2>
          <p className="text-gray-300">
            Ett engagerat team som samarbetar för att bygga en tillgänglig och användarvänlig lösning.
          </p>
        </div>

      </div>
    </div>
  )
}
