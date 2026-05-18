export default function PrivacyPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#06060a', color: 'white', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '80px 32px' }}>
        <div style={{ marginBottom: 48 }}>
          <a href="/" style={{ color: '#7b2fff', fontWeight: 'bold', textDecoration: 'none', fontSize: 14 }}>← Terug naar Aimeega</a>
        </div>

        <h1 style={{ fontSize: 48, fontWeight: 'bold', marginBottom: 8 }}>Privacybeleid</h1>
        <p style={{ color: '#70708a', marginBottom: 48, fontSize: 14 }}>Laatste update: mei 2026</p>

        <div style={{ lineHeight: 1.8, color: '#c0c0d0' }}>

          <h2 style={{ color: 'white', fontSize: 24, fontWeight: 'bold', marginTop: 48, marginBottom: 16 }}>1. Inleiding</h2>
          <p>Aimeega ("wij", "ons", "onze") is een platform voor het uploaden, ontdekken en delen van AI-gegenereerde films. Dit privacybeleid legt uit hoe wij persoonsgegevens verzamelen, verwerken en beschermen van gebruikers ("jij", "jouw") die gebruik maken van ons platform op aimeega.com.</p>
          <p style={{ marginTop: 12 }}>Wij verwerken persoonsgegevens in overeenstemming met de Algemene Verordening Gegevensbescherming (AVG/GDPR), de Nederlandse Uitvoeringswet AVG, en andere toepasselijke privacywetgeving.</p>

          <h2 style={{ color: 'white', fontSize: 24, fontWeight: 'bold', marginTop: 48, marginBottom: 16 }}>2. Wie zijn wij</h2>
          <p>Aimeega is de verwerkingsverantwoordelijke voor de persoonsgegevens die via dit platform worden verzameld.</p>
          <p style={{ marginTop: 12 }}>Contactgegevens:</p>
          <ul style={{ marginTop: 8, paddingLeft: 24 }}>
            <li>E-mail: info@aimeega.com</li>
            <li>Website: https://aimeega.com</li>
          </ul>

          <h2 style={{ color: 'white', fontSize: 24, fontWeight: 'bold', marginTop: 48, marginBottom: 16 }}>3. Welke gegevens verzamelen wij</h2>

          <h3 style={{ color: '#a0a0b0', fontSize: 18, fontWeight: 'bold', marginTop: 24, marginBottom: 12 }}>3.1 Accountgegevens</h3>
          <p>Bij het aanmaken van een account verzamelen wij:</p>
          <ul style={{ marginTop: 8, paddingLeft: 24 }}>
            <li>Volledige naam</li>
            <li>E-mailadres</li>
            <li>Wachtwoord (versleuteld opgeslagen via Clerk)</li>
            <li>Gebruikersnaam (uniek, zelf gekozen)</li>
            <li>Registratiedatum en -tijdstip</li>
          </ul>

          <h3 style={{ color: '#a0a0b0', fontSize: 18, fontWeight: 'bold', marginTop: 24, marginBottom: 12 }}>3.2 Profielgegevens</h3>
          <p>Optioneel kunnen gebruikers de volgende gegevens toevoegen:</p>
          <ul style={{ marginTop: 8, paddingLeft: 24 }}>
            <li>Profielfoto</li>
            <li>Biografie</li>
            <li>Land van verblijf</li>
            <li>Favoriete genres en AI-tools</li>
          </ul>

          <h3 style={{ color: '#a0a0b0', fontSize: 18, fontWeight: 'bold', marginTop: 24, marginBottom: 12 }}>3.3 Uploadgegevens</h3>
          <p>Wanneer je een video uploadt, slaan wij op:</p>
          <ul style={{ marginTop: 8, paddingLeft: 24 }}>
            <li>Videobestand (opgeslagen via Cloudflare Stream)</li>
            <li>Titel en beschrijving</li>
            <li>Genre en gebruikte AI-tool</li>
            <li>AI Disclosure informatie (muziekbron, stemmenbron, aanwezigheid echte personen)</li>
            <li>Upload datum en tijdstip</li>
            <li>Bekijk- en likestatistieken</li>
          </ul>

          <h3 style={{ color: '#a0a0b0', fontSize: 18, fontWeight: 'bold', marginTop: 24, marginBottom: 12 }}>3.4 Gebruiksgegevens</h3>
          <p>Wij verzamelen automatisch de volgende technische gegevens:</p>
          <ul style={{ marginTop: 8, paddingLeft: 24 }}>
            <li>IP-adres</li>
            <li>Browser type en versie</li>
            <li>Apparaattype en besturingssysteem</li>
            <li>Bezochte pagina's en klikgedrag</li>
            <li>Tijdstip en duur van bezoeken</li>
            <li>Verwijzende URL</li>
          </ul>

          <h3 style={{ color: '#a0a0b0', fontSize: 18, fontWeight: 'bold', marginTop: 24, marginBottom: 12 }}>3.5 Communicatiegegevens</h3>
          <p>Wanneer je contact met ons opneemt via e-mail, bewaren wij de correspondentie inclusief e-mailadres en de inhoud van de berichten.</p>

          <h2 style={{ color: 'white', fontSize: 24, fontWeight: 'bold', marginTop: 48, marginBottom: 16 }}>4. Hoe gebruiken wij jouw gegevens</h2>
          <p>Wij gebruiken jouw persoonsgegevens voor de volgende doeleinden:</p>
          <ul style={{ marginTop: 8, paddingLeft: 24 }}>
            <li><strong style={{ color: 'white' }}>Accountbeheer:</strong> het aanmaken, beheren en beveiligen van jouw account</li>
            <li><strong style={{ color: 'white' }}>Platformdiensten:</strong> het aanbieden van onze videodiensten, aanbevelingen en zoekfunctionaliteit</li>
            <li><strong style={{ color: 'white' }}>Communicatie:</strong> het sturen van verificatiemails, platformmeldingen en serviceberichten</li>
            <li><strong style={{ color: 'white' }}>Veiligheid:</strong> het detecteren en voorkomen van fraude, misbruik en ongeautoriseerde toegang</li>
            <li><strong style={{ color: 'white' }}>Wettelijke verplichtingen:</strong> het naleven van toepasselijke wet- en regelgeving, waaronder de EU AI Act</li>
            <li><strong style={{ color: 'white' }}>Platformverbetering:</strong> het analyseren van gebruik om onze diensten te verbeteren</li>
            <li><strong style={{ color: 'white' }}>Uitbetalingen:</strong> het verwerken van creator-uitbetalingen via ons VAULT-systeem</li>
          </ul>

          <h2 style={{ color: 'white', fontSize: 24, fontWeight: 'bold', marginTop: 48, marginBottom: 16 }}>5. Rechtsgronden voor verwerking</h2>
          <p>Wij verwerken jouw persoonsgegevens op basis van de volgende rechtsgronden:</p>
          <ul style={{ marginTop: 8, paddingLeft: 24 }}>
            <li><strong style={{ color: 'white' }}>Uitvoering van een overeenkomst:</strong> het verwerken is noodzakelijk voor het leveren van onze diensten aan jou</li>
            <li><strong style={{ color: 'white' }}>Gerechtvaardigd belang:</strong> voor platformbeveiliging, fraudepreventie en het verbeteren van onze diensten</li>
            <li><strong style={{ color: 'white' }}>Wettelijke verplichting:</strong> voor het naleven van EU AI Act verplichtingen en andere regelgeving</li>
            <li><strong style={{ color: 'white' }}>Toestemming:</strong> voor niet-essentiële cookies en marketingcommunicatie</li>
          </ul>

          <h2 style={{ color: 'white', fontSize: 24, fontWeight: 'bold', marginTop: 48, marginBottom: 16 }}>6. Derde partijen en verwerkers</h2>
          <p>Wij maken gebruik van de volgende derde partijen voor het leveren van onze diensten:</p>

          <h3 style={{ color: '#a0a0b0', fontSize: 18, fontWeight: 'bold', marginTop: 24, marginBottom: 12 }}>6.1 Clerk (Authenticatie)</h3>
          <p>Clerk verwerkt inloggegevens en sessies. Clerk is AVG-compliant en slaat wachtwoorden versleuteld op. Privacybeleid: https://clerk.com/privacy</p>

          <h3 style={{ color: '#a0a0b0', fontSize: 18, fontWeight: 'bold', marginTop: 24, marginBottom: 12 }}>6.2 Supabase (Database)</h3>
          <p>Supabase slaat profielgegevens, videometadata en platformdata op. Supabase is AVG-compliant en biedt data-encryptie. Privacybeleid: https://supabase.com/privacy</p>

          <h3 style={{ color: '#a0a0b0', fontSize: 18, fontWeight: 'bold', marginTop: 24, marginBottom: 12 }}>6.3 Cloudflare (CDN en Video Streaming)</h3>
          <p>Cloudflare verzorgt de DNS, CDN-diensten en videohosting via Cloudflare Stream. Cloudflare is AVG-compliant. Privacybeleid: https://www.cloudflare.com/privacypolicy/</p>

          <h3 style={{ color: '#a0a0b0', fontSize: 18, fontWeight: 'bold', marginTop: 24, marginBottom: 12 }}>6.4 Vercel (Hosting)</h3>
          <p>Vercel host onze webapplicatie. Vercel is AVG-compliant. Privacybeleid: https://vercel.com/legal/privacy-policy</p>

          <h2 style={{ color: 'white', fontSize: 24, fontWeight: 'bold', marginTop: 48, marginBottom: 16 }}>7. Internationale gegevensoverdracht</h2>
          <p>Sommige van onze dienstverleners zijn gevestigd buiten de Europese Economische Ruimte (EER). In dergelijke gevallen zorgen wij ervoor dat de overdracht plaatsvindt op basis van passende waarborgen, zoals Standard Contractual Clauses (SCC's) goedgekeurd door de Europese Commissie.</p>

          <h2 style={{ color: 'white', fontSize: 24, fontWeight: 'bold', marginTop: 48, marginBottom: 16 }}>8. Bewaartermijnen</h2>
          <p>Wij bewaren jouw persoonsgegevens niet langer dan noodzakelijk:</p>
          <ul style={{ marginTop: 8, paddingLeft: 24 }}>
            <li><strong style={{ color: 'white' }}>Accountgegevens:</strong> zolang je account actief is, plus 30 dagen na verwijdering</li>
            <li><strong style={{ color: 'white' }}>Videobestanden:</strong> zolang je account actief is of totdat je de video verwijdert</li>
            <li><strong style={{ color: 'white' }}>Gebruiksgegevens:</strong> maximaal 12 maanden</li>
            <li><strong style={{ color: 'white' }}>Communicatie:</strong> maximaal 2 jaar</li>
            <li><strong style={{ color: 'white' }}>Financiële gegevens:</strong> 7 jaar conform wettelijke bewaarplicht</li>
          </ul>

          <h2 style={{ color: 'white', fontSize: 24, fontWeight: 'bold', marginTop: 48, marginBottom: 16 }}>9. Jouw rechten</h2>
          <p>Op grond van de AVG heb je de volgende rechten:</p>
          <ul style={{ marginTop: 8, paddingLeft: 24 }}>
            <li><strong style={{ color: 'white' }}>Recht op inzage:</strong> je kunt opvragen welke gegevens wij van je bewaren</li>
            <li><strong style={{ color: 'white' }}>Recht op rectificatie:</strong> je kunt onjuiste gegevens laten corrigeren</li>
            <li><strong style={{ color: 'white' }}>Recht op verwijdering:</strong> je kunt verzoeken om verwijdering van je gegevens ("recht om vergeten te worden")</li>
            <li><strong style={{ color: 'white' }}>Recht op beperking:</strong> je kunt verzoeken om beperking van de verwerking</li>
            <li><strong style={{ color: 'white' }}>Recht op overdraagbaarheid:</strong> je kunt jouw gegevens in een machine-leesbaar formaat opvragen</li>
            <li><strong style={{ color: 'white' }}>Recht van bezwaar:</strong> je kunt bezwaar maken tegen verwerking op basis van gerechtvaardigd belang</li>
            <li><strong style={{ color: 'white' }}>Recht om toestemming in te trekken:</strong> je kunt eerder gegeven toestemming altijd intrekken</li>
          </ul>
          <p style={{ marginTop: 12 }}>Om gebruik te maken van je rechten, neem contact op via info@aimeega.com. Wij reageren binnen 30 dagen op je verzoek. Je hebt ook het recht om een klacht in te dienen bij de Autoriteit Persoonsgegevens (autoriteitpersoonsgegevens.nl).</p>

          <h2 style={{ color: 'white', fontSize: 24, fontWeight: 'bold', marginTop: 48, marginBottom: 16 }}>10. Cookies</h2>
          <p>Wij gebruiken cookies en vergelijkbare technologieën voor:</p>
          <ul style={{ marginTop: 8, paddingLeft: 24 }}>
            <li><strong style={{ color: 'white' }}>Functionele cookies:</strong> noodzakelijk voor het functioneren van het platform (inloggen, sessies)</li>
            <li><strong style={{ color: 'white' }}>Analytische cookies:</strong> voor het meten van platformgebruik en het verbeteren van onze diensten</li>
          </ul>
          <p style={{ marginTop: 12 }}>Je kunt cookies beheren via je browserinstellingen. Het uitschakelen van functionele cookies kan de werking van het platform beïnvloeden.</p>

          <h2 style={{ color: 'white', fontSize: 24, fontWeight: 'bold', marginTop: 48, marginBottom: 16 }}>11. Beveiliging</h2>
          <p>Wij nemen passende technische en organisatorische maatregelen om jouw persoonsgegevens te beschermen:</p>
          <ul style={{ marginTop: 8, paddingLeft: 24 }}>
            <li>Versleutelde verbindingen (HTTPS/TLS)</li>
            <li>Versleutelde wachtwoordopslag</li>
            <li>Toegangscontrole en authenticatie via Clerk</li>
            <li>Row Level Security in Supabase database</li>
            <li>Regelmatige beveiligingscontroles</li>
          </ul>

          <h2 style={{ color: 'white', fontSize: 24, fontWeight: 'bold', marginTop: 48, marginBottom: 16 }}>12. Minderjarigen</h2>
          <p>Ons platform is niet bedoeld voor personen jonger dan 16 jaar. Wij verzamelen niet bewust persoonsgegevens van minderjarigen. Als je vermoedt dat een minderjarige een account heeft aangemaakt, neem dan contact op via info@aimeega.com.</p>

          <h2 style={{ color: 'white', fontSize: 24, fontWeight: 'bold', marginTop: 48, marginBottom: 16 }}>13. Wijzigingen in dit beleid</h2>
          <p>Wij behouden ons het recht voor dit privacybeleid te wijzigen. Wezenlijke wijzigingen communiceren wij via e-mail of een melding op het platform. De meest recente versie is altijd beschikbaar op aimeega.com/privacy.</p>

          <h2 style={{ color: 'white', fontSize: 24, fontWeight: 'bold', marginTop: 48, marginBottom: 16 }}>14. Contact</h2>
          <p>Voor vragen over dit privacybeleid of jouw persoonsgegevens:</p>
          <ul style={{ marginTop: 8, paddingLeft: 24 }}>
            <li>E-mail: info@aimeega.com</li>
            <li>Website: https://aimeega.com</li>
          </ul>

        </div>
      </div>
    </div>
  )
}
