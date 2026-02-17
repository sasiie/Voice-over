import { useRef, useState } from "react";
import Button from "./Button";

export default function AudioFileUpload({ onFileSelect }) {
  const inputRef = useRef(null);
  const [fileName, setFileName] = useState("");

  function openFilePicker() {
    inputRef.current?.click();
  }

  function handleChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.toLowerCase().endsWith(".wav")) {
      alert("Välj en .wav-fil");
      return;
    }

    setFileName(file.name);
    onFileSelect?.(file);
  }

  return (
    <div className="flex flex-col items-center gap-3">
      
      <Button
        type="button"
        onClick={openFilePicker}
        className="px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
      >
        Ladda upp ljudfil
      </Button>

      <input
        ref={inputRef}
        type="file"
        accept=".wav,audio/wav"
        onChange={handleChange}
        className="hidden"
      />

      <p className="text-gray-400 text-sm">
        {fileName ? `Vald fil: ${fileName}` : "Ingen fil vald"}
      </p>
    </div>
  );
}
