export async function transcribeSpeech(file: File, language: string) {
  const form = new FormData();
  form.append("file", file);
  form.append("language", language);

  const response = await fetch("https://api.apyhub.com/stt/file", {
    method: "POST",
    headers: {
      "apy-token": 'APY0SBhWWI0kixOpkR0bkTaqthd3QpAaIzd4EwBzMO7OFRvAMqYM6cMXQ4e0Q29X',
    },
    body: form,
  });

  const data = await response.json();
  console.log("API RESPONSE:", data); // 👈 VIKTIGT

  if (!response.ok) {
    throw new Error("Transcription failed");
  }
console.log(import.meta.env.VITE_APYHUB_TOKEN);
  return data.data;
}
