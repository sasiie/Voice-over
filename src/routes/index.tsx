import { useState } from "react";
import AudioFileUpload from "@/components/AudioFileUpload";
import Button from "@/components/Button";
import { createFileRoute } from "@tanstack/react-router";
import { transcribeSpeech } from "@/data/speechToText";
import languages from "@/data/languages";

import { Route as RouteIcon, Volume2, FolderKanban } from "lucide-react";

export const Route = createFileRoute("/")({ component: App });

function App() {
  const features = [
    {
      icon: <Volume2 className="w-12 h-12 text-cyan-400" />,
      title: "Tala. Vi skriver.",
      description:
        "Slipp manuellt arbete. Vår AI omvandlar tal till text automatiskt så att du kan fokusera på innehållet istället för tangentbordet.",
    },
    {
      icon: <RouteIcon className="w-12 h-12 text-cyan-400" />,
      title: "Organiserat som en chatt",
      description:
        "Varje ljudfil skapar en ny session som sparas i sidomenyn. Hitta snabbt tillbaka till tidigare transkriberingar.",
    },
    {
      icon: <FolderKanban className="w-12 h-12 text-cyan-400" />,
      title: "Byggd för produktivitet",
      description:
        "Perfekt för studenter, journalister och företag som behöver snabb och pålitlig dokumentation.",
    },
  ];

  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [language, setLanguage] = useState("sv-SE");

  async function handleTranscribe() {
    if (!file) return;

    try {
      const data = await transcribeSpeech(file, language);
      setMessage(data.text ?? JSON.stringify(data, null, 2));
    } catch (error) {
      setMessage("Något gick fel");
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <section className="relative py-20 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10"></div>

        <div className="relative max-w-5xl mx-auto">
          <div className="flex items-center justify-center gap-6 mb-6">
            <h1 className="text-6xl md:text-7xl font-black text-white">
              <span className="text-gray-300">TALA.LADDA UPP.FÅ TEXT.</span>
            </h1>
          </div>

          <p className="text-2xl md:text-3xl text-gray-300 mb-4 font-light">
            Förvandla ljud till text på sekunder
          </p>

          <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-8">
            Har du spelat in en föreläsning, intervju eller ett möte? <br />–
            snabbt, enkelt och automatiskt. Ladda upp din fil och låt systemet
            göra jobbet.
          </p>

          <div className="flex flex-col items-center gap-4">
            <AudioFileUpload onFileSelect={setFile} />

            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white"
            >
              {languages.map((lang) => (
                <option key={lang.value} value={lang.value}>
                  {lang.label}
                </option>
              ))}
            </select>

            <Button
              onClick={handleTranscribe}
              disabled={!file}
              className="px-8 py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-lg transition-colors shadow-lg shadow-cyan-500/50 disabled:opacity-50"
            >
              Transkribera
            </Button>

            {message && <p className="text-cyan-400 mt-4">{message}</p>}
            <p className="text-gray-400 text-sm">Valt språk: {language}</p>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
