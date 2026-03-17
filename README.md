PROCEKTBESKRIVNING
Det är en webbaserad applikation där användaren kan ladda upp en ljudfil och automatiskt få den transkriberad till text med hjälp av ett externt api.

Den transkriberade texten sparad som en chatt i applikationen. Användaren kan sedan:
* se tidigare transkriberingar i en sidebar
* favoritmarkera chattar
* pinna viktiga chattar
* radera chattar
* öppna tidigare transkriberingar
Applikationen är byggd med React och använder TanStack Router för routing.

PROJEKTETS STRUKTUR
Projektet är uppdelat i flera mappar för tt göra koden mer organiseras och modulär.
- Routes
src/routes/
 _root.tsx :  Huvudlayouten för applikationen. Här definieras sidebar och övergripande layout
 index.tsx : Startsidan där användaren laddar upp ljudfiler
 chats.tsx : Visar sparade chattar och innehållet i den valda chatten


 - Hooks
 src/hooks/useChats.tsx
 Denna mappen innehåller logik som delas mellan flera komponenter. Den använder React Context via CatsProvider.
 Det är en cutom hook som används för att:
 * hämta alla sprade chattar
 * skapa nya chattar
* radera chattar
* favoritmarkera chattar
* pinna chattar
* sätta aktiv chat

- Components
src/components/
chatList.tsx : Visar alla sparade chattar i sidebaren
AudioFileUpload.tsx : Hanterar uppladdning av ljudfiler

här ligger våra återanvändbara komponenter.


- Components/ui
src/components/ui/
button.tsx
sidebar.tsx
Här finns generella UI-komponenter som används i flera delar av appen.

-Data
src/data/
speechToText.ts : innehåller funktionen som gör API-anropet
languages.ts  : Lista över språk som kan användas vid transkribering


ARBETSFLÖDE 
1. Användaren laddar upp en ljudfil
2. När användaren klickar på "Transkribera" körs funktionen handleTranscribe
3. Ljudfilen skickas till transcribeSpeech()
4. Funktionen för ett API-anrop till speech-to-text tjänsten
5. API:t returnerar den transkriberade texten
6. Texten sparas via funktionen createChat()
7. Den nya chatten visas automatiskt i sidebaren och på /chats

- State-hantering
Chattar hanteras centralt via ChatsProvider.
Den lagrar:
* alla chattar
* Vilken chat som är aktiv
* funktioner för att skapa och uppdatera chattar
state delas i hela applikationen via React Context och hooken useChats. Som också lagras i localStorage så att de finns kvar efter att sidan laddas om.


TILLGÄNGLIGHET
- Sematiska HTML-element
vi har använt oss av sematiska element som:
* button
* label
* select

- aria-atribut
Efter den sista checkpointen uppmanade jag Bayan att lägga in aria-atribut:
* aria-liive="polite"
* aria-label="Favoritisera chatten"

- Tangentbordsnavigering
Alla interaktiva element i applikationen är:
* fokusbara
* klickbara via tagentbord
* tydliga i layouten


ARBETSFLÖDET I GRUPP
Arbetet försökte jag dela upp rättvist, men de var svårt då flera inte svarade eller sköt upp dead-linen. 
Jag skapade skelettet, installerade komponenterna, rensade gammla mappar från TanStack som jag fick med på installationen. Berfin fick göra /about sidan och Bayan gjorde API-anropet samt loggiken krinng det och jobbade kring komponenterna. Jag gjorde dessutom sidebaren, hooksen för chatten, localstorage, små justeringar lite här och där.