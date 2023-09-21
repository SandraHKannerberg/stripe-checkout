# CheckOut Session

Repo: https://github.com/SandraHKannerberg/stripe-checkout.git

# Beskrivning
I detta skolprojekt har jag skapat en e-handel med fokus på checkout och integration med Stripe. Butiken heter Sunflower Posters och ska föreställas sälja posters med solrosmotiv.
I webbshopen går det att lägga och genomföra en order. Man kan registrera sig som kund och logga in på Mina sidor där orderhistorik visas. 

Projektet är byggt med </br>
Backend: Node/Express </br>
Frontend: React/TypeScript </br>

På frontend har jag använt antdesign i kombination med egen css för design och layout.
GitHub är använt under hela arbetet.

# Krav som uppfyllts
Enligt uppgiftsbeskrivningen är följande krav uppfyllda:

**GODKÄND**
- Produkter listas på en sida
- Produkterna som visas och köps hämtas från Stripe
- Det går att lägga till produkter i kundvagnen
- Baserad på kundvagnen går det att lägga en order via Stripe
- Man kan registrera sig som kund (användare) i webbshoppen. När detta sker skapas kunden i Stripe och kunden sparas i en JSON-fil. Alla lösenord sparas hashade
- Registrerad kund kan logga in. Inloggning hanteras av cookies
- Den inloggade kunden används vid placering av en order
- För att kunna lägga en order krävs det att man är inloggad

**VÄL GODKÄND**
- I Stripe är rabattkoden AUTUMN23 skapad som ger kunden rabatt på sitt köp (registreras och dras av i kassan)
- Som inloggad kund ser man sin orderhistorik via länken Mina Sidor
- Alla ordrar sparas i en JSON-fil
- En order sparas enbart om bekräftelse ges från Stripe att betalningen är genomförd

Webbshoppen är dessutom responsiv, men jag har valt att ha skärmstorlek 375 x 667 som minsta skärm vilket motsvarar en iPhone SE.

# Installation
För att få igång projektet gör du följande:
- Se till att ha NodeJS installerat. Börja annars med att installera det enligt NodeJS dokumentation https://nodejs.org/en

- Kopiera sedan repot från GitHub: https://github.com/SandraHKannerberg/stripe-checkout.git

- Klona ner repot på din dator med följande kommando i Terminalen. Navigera först till den mapp där du vill spara projektet:  

        git clone https://github.com/SandraHKannerberg/stripe-checkout.git

- Öppna upp projektet i editor Visual Studio Code för att direkt härifrån nå Terminalen.

**Server**
- Öppna en Terminal

- Navigera till server-mappen genom kommandot:
        cd server

- För att hämta alla dependencies på servern, kör kommandot:
        npm install

- När installationen är klar, starta servern genom något av följande kommandon:

        npm start för att dra igång servern mot node server.js

                eller: 

        npm run dev för att köra med nodemon server.js

- Servern är nu igång

**Client**
- Öppna en till Terminal

- Navigera till client-mappen genom kommandot:
        cd client

- För att hämta alla dependencies på client, kör kommandot:
        npm install

- När installationen är klar, kör kommandot:
        npm run dev

Projektet är nu uppe och snurrar på localhost och du kan se applikationen i din webbläsare
