import { useRef, useState, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Empty } from "@/components/ui/empty";

// Denna kan vi tabort och använda empty.tsx i ui mappen. den är exakt en sådan här bara att de är en färdig komponent som vi tar från komponentbiblioteket
type AudioFileUploadProps = {
  onFileSelect?: (file: File | null) => void;
};

export default function AudioFileUpload({
  onFileSelect,
}: AudioFileUploadProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [fileName, setFileName] = useState<string>("");

  function openFilePicker() {
    inputRef.current?.click();
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
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
    <Empty className="border-slate-700 bg-slate-800/30 gap-3">
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
    </Empty>
  );
}
