export default function TermsPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#06060a', color: 'white', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '80px 32px' }}>
        <div style={{ marginBottom: 48 }}>
          <a href="/" style={{ color: '#7b2fff', fontWeight: 'bold', textDecoration: 'none', fontSize: 14 }}>← Terug naar Aimeega</a>
        </div>

        <h1 style={{ fontSize: 48, fontWeight: 'bold', marginBottom: 8 }}>Algemene Voorwaarden</h1>
        <p style={{ color: '#70708a', marginBottom: 48, fontSize: 14 }}>Laatste update: mei 2026</p>

        <div style={{ lineHeight: 1.8, color: '#c0c0d0' }}>

          <h2 style={{ color: 'white', fontSize: 24, fontWeight: 'bold', marginTop: 48, marginBottom: 16 }}>1. Inleiding en aanvaarding</h2>
          <p>Welkom bij Aimeega. Door gebruik te maken van ons platform op aimeega.com ga je akkoord met deze Algemene Voorwaarden ("Voorwaarden"). Lees deze Voorwaarden zorgvuldig door voordat je het platform gebruikt.</p>
          <p style={{ marginTop: 12 }}>Als je niet akkoord gaat met deze Voorwaarden, mag je het platform niet gebruiken. Door een account aan te maken of het platform te gebruiken, bevestig je dat je deze Voorwaarden hebt gelezen, begrepen en aanvaardt.</p>
          <p style={{ marginTop: 12 }}>Aimeega behoudt zich het recht voor deze Voorwaarden te wijzigen. Wezenlijke wijzigingen worden gecommuniceerd via e-mail of een melding op het platform. Voortgezet gebruik na wijziging betekent aanvaarding van de nieuwe Voorwaarden.</p>

          <h2 style={{ color: 'white', fontSize: 24, fontWeight: 'bold', marginTop: 48, marginBottom: 16 }}>2. Over Aimeega</h2>
          <p>Aimeega is een platform voor het uploaden, ontdekken en delen van AI-gegenereerde films en videocontent. Ons platform biedt creators de mogelijkheid om hun AI-gegenereerde content te delen met een wereldwijd publiek.</p>
          <p style={{ marginTop: 12 }}>Aimeega is gevestigd in Nederland en opereert onder Nederlands recht en EU-regelgeving, inclusief de Algemene Verordening Gegevensbescherming (AVG) en de EU AI Act.</p>

          <h2 style={{ color: 'white', fontSize: 24, fontWeight: 'bold', marginTop: 48, marginBottom: 16 }}>3. Accounts en registratie</h2>

          <h3 style={{ color: '#a0a0b0', fontSize: 18, fontWeight: 'bold', marginTop: 24, marginBottom: 12 }}>3.1 Accountvereisten</h3>
          <p>Om gebruik te maken van alle functies van Aimeega dien je een account aan te maken. Je moet:</p>
          <ul style={{ marginTop: 8, paddingLeft: 24 }}>
            <li>Minimaal 16 jaar oud zijn</li>
            <li>Een geldig e-mailadres opgeven</li>
            <li>Een unieke gebruikersnaam kiezen</li>
            <li>Een sterk wachtwoord instellen</li>
            <li>Accuraaate en volledige informatie verstrekken</li>
          </ul>

          <h3 style={{ color: '#a0a0b0', fontSize: 18, fontWeight: 'bold', marginTop: 24, marginBottom: 12 }}>3.2 Gebruikersnamen</h3>
          <p>Gebruikersnamen zijn uniek en permanent — eenmaal gekozen kan een gebruikersnaam niet meer worden gewijzigd. Gebruikersnamen mogen niet:</p>
          <ul style={{ marginTop: 8, paddingLeft: 24 }}>
            <li>Merknamen of handelsnamen van derden bevatten (zie onze gereserveerde namen lijst)</li>
            <li>Aanstootgevend, beledigend of misleidend zijn</li>
            <li>Impersonatie van andere personen of organisaties suggereren</li>
            <li>Illegale of schadelijke content promoten</li>
          </ul>

          <h3 style={{ color: '#a0a0b0', fontSize: 18, fontWeight: 'bold', marginTop: 24, marginBottom: 12 }}>3.3 Accountbeveiliging</h3>
          <p>Je bent verantwoordelijk voor de beveiliging van jouw account en wachtwoord. Aimeega is niet aansprakelijk voor verlies of schade als gevolg van ongeautoriseerde toegang tot jouw account. Meld ongeautoriseerde toegang direct via info@aimeega.com.</p>

          <h2 style={{ color: 'white', fontSize: 24, fontWeight: 'bold', marginTop: 48, marginBottom: 16 }}>4. Content en uploads</h2>

          <h3 style={{ color: '#a0a0b0', fontSize: 18, fontWeight: 'bold', marginTop: 24, marginBottom: 12 }}>4.1 Eigendom van content</h3>
          <p>Jij behoudt alle intellectuele eigendomsrechten op de content die je uploadt. Door content te uploaden verleen je Aimeega een niet-exclusieve, wereldwijde, royaltyvrije licentie om de content te hosten, weergeven, distribueren en promoten via ons platform.</p>

          <h3 style={{ color: '#a0a0b0', fontSize: 18, fontWeight: 'bold', marginTop: 24, marginBottom: 12 }}>4.2 EU AI Act verplichtingen</h3>
          <p>Alle AI-gegenereerde content op Aimeega valt onder de EU AI Act. Als creator ben je verplicht om:</p>
          <ul style={{ marginTop: 8, paddingLeft: 24 }}>
            <li>Alle AI-gegenereerde content duidelijk te labelen als AI-gegenereerd</li>
            <li>De gebruikte AI-tools en -modellen te vermelden</li>
            <li>De bronnen van muziek en stemmen te specificeren</li>
            <li>Aan te geven of echte personen zijn afgebeeld in de content</li>
            <li>Aan te geven of merklogo's of intellectueel eigendom van derden aanwezig zijn</li>
          </ul>
          <p style={{ marginTop: 12 }}>Valse of misleidende disclosure-informatie leidt tot directe en permanente verwijdering van het account.</p>

          <h3 style={{ color: '#a0a0b0', fontSize: 18, fontWeight: 'bold', marginTop: 24, marginBottom: 12 }}>4.3 Verboden content</h3>
          <p>Het is strikt verboden om de volgende content te uploaden of te delen op Aimeega:</p>
          <ul style={{ marginTop: 8, paddingLeft: 24 }}>
            <li>Seksueel expliciet materiaal of pornografie</li>
            <li>Content die minderjarigen seksueel afbeeldt of exploreert</li>
            <li>Haatzaaiende uitlatingen gebaseerd op ras, etniciteit, religie, geslacht, seksuele geaardheid of handicap</li>
            <li>Content die geweld verheerlijkt, aanzet tot geweld of terrorisme promoot</li>
            <li>Deepfakes van echte personen zonder hun expliciete toestemming</li>
            <li>Content die auteursrechten, handelsmerken of andere intellectuele eigendomsrechten van derden schendt</li>
            <li>Misleidende of desinformerende content</li>
            <li>Content die privacyrechten van anderen schendt</li>
            <li>Spam, malware of schadelijke software</li>
            <li>Content die illegale activiteiten promoot of faciliteert</li>
            <li>Niet-geconsenseerde intieme content</li>
          </ul>

          <h3 style={{ color: '#a0a0b0', fontSize: 18, fontWeight: 'bold', marginTop: 24, marginBottom: 12 }}>4.4 Content moderatie</h3>
          <p>Aimeega behoudt zich het recht voor om content te beoordelen, te verwijderen of de zichtbaarheid ervan te beperken als deze in strijd is met deze Voorwaarden. Ons SENTINEL-systeem voert geautomatiseerde controles uit op uploads. Creators worden op de hoogte gesteld van verwijderde content en kunnen bezwaar aantekenen via info@aimeega.com.</p>

          <h2 style={{ color: 'white', fontSize: 24, fontWeight: 'bold', marginTop: 48, marginBottom: 16 }}>5. Creator programma en verdiensten</h2>

          <h3 style={{ color: '#a0a0b0', fontSize: 18, fontWeight: 'bold', marginTop: 24, marginBottom: 12 }}>5.1 VAULT creator programma</h3>
          <p>Aimeega biedt creators de mogelijkheid te verdienen via ons VAULT-systeem. Creators ontvangen 70% van alle gegenereerde inkomsten. Inkomstenbronnen omvatten advertentie-inkomsten, abonnementen, tipping, brand deals en filmlicenties.</p>

          <h3 style={{ color: '#a0a0b0', fontSize: 18, fontWeight: 'bold', marginTop: 24, marginBottom: 12 }}>5.2 Uitbetalingsvoorwaarden</h3>
          <p>Uitbetalingen vinden maandelijks plaats. Minimale uitbetalingsdrempel en betalingsmethoden worden gecommuniceerd in het dashboard. Aimeega behoudt zich het recht voor uitbetalingen op te schorten bij verdenking van fraude of schending van deze Voorwaarden.</p>

          <h3 style={{ color: '#a0a0b0', fontSize: 18, fontWeight: 'bold', marginTop: 24, marginBottom: 12 }}>5.3 Belastingverplichtingen</h3>
          <p>Creators zijn zelf verantwoordelijk voor het aangeven en betalen van belasting over hun verdiensten conform de toepasselijke belastingwetgeving in hun land van verblijf.</p>

          <h2 style={{ color: 'white', fontSize: 24, fontWeight: 'bold', marginTop: 48, marginBottom: 16 }}>6. Intellectueel eigendom</h2>

          <h3 style={{ color: '#a0a0b0', fontSize: 18, fontWeight: 'bold', marginTop: 24, marginBottom: 12 }}>6.1 Aimeega platform</h3>
          <p>Alle intellectuele eigendomsrechten op het Aimeega platform, inclusief software, ontwerp, logo's, namen en systemen (ORACLE, FORGE, SENTINEL, VAULT, PRISM, NEXUS), zijn eigendom van Aimeega. Het is niet toegestaan deze te kopiëren, reproduceren of gebruiken zonder onze uitdrukkelijke schriftelijke toestemming.</p>

          <h3 style={{ color: '#a0a0b0', fontSize: 18, fontWeight: 'bold', marginTop: 24, marginBottom: 12 }}>6.2 Auteursrechtschendingen</h3>
          <p>Wij respecteren intellectuele eigendomsrechten van derden. Als je meent dat content op ons platform jouw auteursrechten schendt, neem dan contact op via info@aimeega.com met een gedetailleerde beschrijving van de schending. Wij handelen klachten af conform de DMCA-procedure en EU-equivalenten.</p>

          <h2 style={{ color: 'white', fontSize: 24, fontWeight: 'bold', marginTop: 48, marginBottom: 16 }}>7. Gedragsregels</h2>
          <p>Als gebruiker van Aimeega verplicht je je om:</p>
          <ul style={{ marginTop: 8, paddingLeft: 24 }}>
            <li>Het platform te gebruiken conform deze Voorwaarden en toepasselijke wetgeving</li>
            <li>Andere gebruikers met respect te behandelen</li>
            <li>Geen spam, harrassing of intimidatie te plegen</li>
            <li>Geen technische maatregelen te omzeilen of het platform te hacken</li>
            <li>Geen geautomatiseerde scripts of bots te gebruiken zonder onze toestemming</li>
            <li>Geen valse informatie te verspreiden over jezelf of anderen</li>
            <li>Geen content te uploaden die je niet het recht hebt te delen</li>
          </ul>

          <h2 style={{ color: 'white', fontSize: 24, fontWeight: 'bold', marginTop: 48, marginBottom: 16 }}>8. Accountbeëindiging</h2>

          <h3 style={{ color: '#a0a0b0', fontSize: 18, fontWeight: 'bold', marginTop: 24, marginBottom: 12 }}>8.1 Beëindiging door gebruiker</h3>
          <p>Je kunt jouw account op elk moment verwijderen via de accountinstellingen of door contact op te nemen via info@aimeega.com. Na verwijdering worden jouw persoonsgegevens conform ons privacybeleid verwijderd.</p>

          <h3 style={{ color: '#a0a0b0', fontSize: 18, fontWeight: 'bold', marginTop: 24, marginBottom: 12 }}>8.2 Beëindiging door Aimeega</h3>
          <p>Aimeega behoudt zich het recht voor accounts te schorsen of te verwijderen bij:</p>
          <ul style={{ marginTop: 8, paddingLeft: 24 }}>
            <li>Schending van deze Voorwaarden</li>
            <li>Uploaden van verboden content</li>
            <li>Fraude of misleiding</li>
            <li>Aanhoudend misbruik van het platform of andere gebruikers</li>
            <li>Niet-naleving van EU AI Act verplichtingen</li>
          </ul>
          <p style={{ marginTop: 12 }}>Bij een permanente ban worden openstaande uitbetalingen ingehouden als de ban het gevolg is van schending van deze Voorwaarden.</p>

          <h2 style={{ color: 'white', fontSize: 24, fontWeight: 'bold', marginTop: 48, marginBottom: 16 }}>9. Aansprakelijkheid</h2>

          <h3 style={{ color: '#a0a0b0', fontSize: 18, fontWeight: 'bold', marginTop: 24, marginBottom: 12 }}>9.1 Beperking van aansprakelijkheid</h3>
          <p>Aimeega is niet aansprakelijk voor:</p>
          <ul style={{ marginTop: 8, paddingLeft: 24 }}>
            <li>Content geüpload door gebruikers</li>
            <li>Schade als gevolg van tijdelijke onbeschikbaarheid van het platform</li>
            <li>Verlies van data als gevolg van technische storingen</li>
            <li>Indirecte schade, gevolgschade of winstderving</li>
            <li>Handelingen van derde partijen</li>
          </ul>

          <h3 style={{ color: '#a0a0b0', fontSize: 18, fontWeight: 'bold', marginTop: 24, marginBottom: 12 }}>9.2 Dienstverlening</h3>
          <p>Aimeega levert haar diensten "as is" en geeft geen garanties over ononderbroken beschikbaarheid, foutloosheid of geschiktheid voor een specifiek doel. Wij streven naar maximale uptime maar kunnen geen 100% beschikbaarheid garanderen.</p>

          <h2 style={{ color: 'white', fontSize: 24, fontWeight: 'bold', marginTop: 48, marginBottom: 16 }}>10. Toepasselijk recht en geschillenbeslechting</h2>
          <p>Op deze Voorwaarden is Nederlands recht van toepassing. Geschillen worden bij voorkeur minnelijk opgelost. Indien dit niet mogelijk is, worden geschillen voorgelegd aan de bevoegde rechter in Nederland.</p>
          <p style={{ marginTop: 12 }}>EU-consumenten kunnen ook gebruikmaken van het Online Dispute Resolution platform van de Europese Commissie: https://ec.europa.eu/consumers/odr</p>

          <h2 style={{ color: 'white', fontSize: 24, fontWeight: 'bold', marginTop: 48, marginBottom: 16 }}>11. Overige bepalingen</h2>
          <p>Als een bepaling in deze Voorwaarden ongeldig of niet-afdwingbaar blijkt, laat dit de geldigheid van de overige bepalingen onverlet. Het nalaten van Aimeega om een recht uit te oefenen betekent geen afstand van dat recht.</p>

          <h2 style={{ color: 'white', fontSize: 24, fontWeight: 'bold', marginTop: 48, marginBottom: 16 }}>12. Contact</h2>
          <p>Voor vragen over deze Voorwaarden:</p>
          <ul style={{ marginTop: 8, paddingLeft: 24 }}>
            <li>E-mail: info@aimeega.com</li>
            <li>Website: https://aimeega.com</li>
          </ul>

        </div>
      </div>
    </div>
  )
}
