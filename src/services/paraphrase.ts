import fetch from "node-fetch";

const API_KEY = "APY0irukENEoCEtURH2HFmL3df0lTRW3FYMde1oPb9947UpQAJHgpQYOfJW9Xu7k";

const content = 'Red Bulls Max Verstappen says this weekends Las Vegas Grand Prix is 99% show and 1% sporting event.Lewis Hamilton said: Its amazing to be here.';

async function (){
    const response = await fetch("https://api.apyhub.com/sharpapi/api/v1/content/paraphrase")
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "apy-token": API_KEY
        },
        body: JSON.stringify({
        content,
        max_length: 500,
        language: "English",
        voice_tone: "David Attenborough alike",
        context: "replace Lewis first name with Bob"
        })
    });

    const result = await response.json();
    console.log(result);
}

run();