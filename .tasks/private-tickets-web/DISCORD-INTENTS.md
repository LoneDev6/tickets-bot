# Richiesta intent Discord: risposte e requisiti verificabili

Riferimento: PDF fornito dall'utente, “Discord Developer Portal”, 3 pagine, applicazione **LoneDev's Tickets**. Questa è una bozza di compilazione; nessun campo del portale è stato modificato e la richiesta non è stata inviata.

Il [piano](PLAN.md) è stato implementato e verificato localmente: cifratura, archivio predisposto, opt-out, cancellazione, retention e pannello. Vedere [STATUS.md](STATUS.md) per le prove. Questo non attesta un rilascio: URL pubblico, hosting, backup, contatto email e integrazione Discord reale devono ancora essere collaudati. Message Content e azioni web restano disabilitati.

## Decisioni accettate

- Accesso: proprietario e staff autorizzato.
- Archivio conversazioni sul server: sì.
- Durata: mentre il ticket è aperto e fino a 30 giorni dalla chiusura; quindi potenzialmente oltre 30 giorni per singolo messaggio.
- Richieste privacy/cancellazione: `info@devs.beer`.
- Informativa **separata** dal sito personale, pubblicata dal bot su `https://<dominio-bot>/privacy`, senza login. [Bozza dell'informativa](PRIVACY.md).
- HTTPS previsto tramite [Cloudflare Tunnel su Pterodactyl](DEPLOYMENT.md), subordinato alle verifiche indicate. Nessuna nuova porta pubblica.

## Valutazione del vecchio URL privacy

La pagina [devs.beer/privacy#/privacy-policy](https://devs.beer/privacy#/privacy-policy) è leggibile nel browser, ma la versione verificata riguarda il sito: visite, contatti e sicurezza del sito. Non nomina il bot o l'archivio ticket e indica `info@matteodev.it`. Non usarla come informativa di questo bot.

La decisione successiva dell'utente è pubblicare un'informativa distinta. Non occorre cambiare il contatto del sito personale per forza: il nuovo documento deve invece indicare chiaramente `info@devs.beer`, servizio e titolare.

## Form, campo per campo

### 1. What does your application do?

Testo inglese, da aggiornare con link reali e versione effettivamente dimostrabile:

> LoneDev's Tickets manages private support tickets in our Discord server. Users open a Generic or Payment Issue ticket through buttons and a modal, and the bot creates a private support thread. Authorized staff handle these tickets, with controls to close, lock, reopen and rename them.
>
> We have implemented a staff-only web dashboard that lists open, closed, locked and deleted tickets during their retention period. It shows the requester, ticket type and description, creation time, latest message author and time, recorded participants, and the last known status action. The bot maintains a single Discord summary message with the current open-ticket count and a dashboard link. This version has been tested locally with synthetic data and is awaiting deployment verification.
>
> The feature for which we are requesting Message Content access is a private ticket conversation view and encrypted server-side conversation archive. It will let authorized support staff read the conversation and respond through the bot from the dashboard. Message content processing will be limited to configured private support ticket threads; unrelated channels will not be archived. Replies and ticket management from the web app will remain disabled until the required access and permissions are available and verified.

I paragrafi distinguono la funzione del bot, l'implementazione locale e lo scopo della richiesta. Prima dell'invio aggiornare lo stato del rilascio in base alla versione effettivamente mostrata, senza presentare i test sintetici come integrazione Discord reale.

### 2. Do you have a public Privacy Policy telling your users about their data usage?

**Risposta prevista: Yes**, soltanto dopo pubblicazione e controllo anonimo dell'informativa dedicata. La pagina locale esiste e l'accesso anonimo è stato verificato; l'URL HTTPS definitivo non è ancora configurato. Il vecchio documento non copre il caso d'uso.

### 3. Where is your Privacy Policy available?

Testo da utilizzare dopo avere reso reali tutti i punti elencati:

> The bot's dedicated privacy policy is publicly available at its /privacy page without requiring a login. It is linked from the Discord ticket creation panel before users submit a ticket, the bot's /privacy command, and the web dashboard. Users can contact info@devs.beer for privacy and deletion requests.

I link nel pannello di creazione, comando `/privacy` e app sono implementati. Verificare che puntino al dominio definitivo dopo il rilascio. Non dichiarare una bio o un messaggio automatico non implementati.

### 4. Please share a link to your Privacy Policy

`https://<dominio-bot>/privacy`

Sostituire con l'URL HTTPS stabile scelto nel deployment. Non usare un placeholder o un Quick Tunnel nel form inviato.

### 5. Which intents are you applying for?

**Message Content Intent** per lettura e archivio della conversazione. Lasciare **Server Members Intent** e **Presence Intent** non selezionati per questa versione.

`GuildMessages` è già presente per gli eventi dei messaggi e non è un intent privilegiato da richiedere in questo campo. L'ultimo autore, il conteggio e i metadati da soli non giustificano Message Content; lo giustifica l'accesso al contenuto libero della conversazione. `MESSAGE_CONTENT_APPROVED=false` rimane il default. [Documentazione Gateway](https://docs.discord.com/developers/events/gateway).

### 6. Can users opt-out of having their message content data tracked?

Nel PDF è selezionato **No**. Non trasformare la domanda in un obbligo universale di rispondere Yes; deve descrivere il funzionamento reale.

**Risposta prevista: Yes**, dopo il collaudo operativo di `/privacy` e dell'esclusione già implementati e testati localmente. Se il campo rimane No, adeguare informativa e architettura e non promettere l'opt-out.

Comportamento implementato: utente identificato tramite Discord disattiva la copia dei contenuti dei propri ticket; lo staff continua da Discord. Il servizio applica l'esclusione prima di archiviare/mostrare contenuti e cancella le copie già raccolte secondo la richiesta. Per un partecipante escluso interrompe la copia della conversazione interessata anziché mantenere una trascrizione ingannevolmente completa. La ricezione tecnica di un evento per riconoscerne ID e scope non equivale a garantire che nessun payload sia mai arrivato al bot.

L'opposizione alla copia web non equivale a cancellare il thread su Discord. Mantenere solo i metadati strettamente necessari alla gestione e alla preferenza, dichiarandoli; la richiesta di cancellazione ha un flusso separato. Impedire il reimport dei contenuti esclusi.

### 7. Are you storing message content data off-platform?

**Yes** per il prodotto richiesto: il server HumbleServers ospiterà una copia dei messaggi. Non dichiarare “solo su Discord” o “solo metadati” dopo l'attivazione dell'archivio.

Il repository implementa archivio cifrato, recupero cronologia e sincronizzazione edit/delete, coperti dai test locali. La raccolta della conversazione completa è disabilitata fino all'autorizzazione; nessuna conversazione reale è stata acquisita per queste prove.

### 8. Are you storing user message content data for 30 days or less?

**No**, coerente con la scelta dell'utente. Un messaggio conservato per 20 giorni di ticket aperto più 30 giorni dopo la chiusura può rimanere per 50 giorni.

Se viene richiesto un dettaglio:

> Ticket conversation content is retained while the ticket is open and for up to 30 days after it is closed. Content may therefore be retained for more than 30 days from the original message date. Earlier deletion requests and applicable deletion requirements take precedence. The same retention limits apply to derived copies and backups.

La scadenza deve essere eseguita da un job verificato e anche all'avvio; riapertura, cancellazione e restore non devono far rinascere dati già eliminati. Controllare che un ticket inattivo non rimanga indefinitamente aperto senza necessità.

### 9. How do users contact you to request deletion of their activity data?

Testo inglese:

> Users can email info@devs.beer to request deletion of data held by LoneDev's Tickets. They should include their Discord user ID and, if known, the ticket ID. We verify that the requester is entitled to make the request before removing the relevant stored data. The contact address and instructions will be available in the bot's dedicated privacy policy and /privacy command.

Cambiare “will be available” in “are available” solo dopo il rilascio. Comando e pagina sono pronti localmente. Non chiedere password, token Discord o documenti d'identità come normale prova di titolarità. L'email deve essere monitorata e il processo di cancellazione deve funzionare anche per chi non ha accesso al pannello staff; l'operatività della casella non è stata verificata.

### 10. Are you encrypting the data that you store at rest?

Nel PDF è selezionato **Yes**. **Non confermarlo oggi sulla sola base del codice.** Enmap, cookie sicuri e tunnel HTTPS non dimostrano cifratura a riposo.

Risposta utilizzabile: **Yes solo dopo verifica completa**. AES-256-GCM e indici HMAC sono implementati e testati su SQLite reale, incluse chiave errata, manomissione, riavvio e retirement del legacy. Mancano verifiche operative su separazione/recupero chiavi, backup, vecchi `data/log.txt`, esportazioni e record in chiaro. Non basta cifrare i nuovi record lasciando altre copie scoperte. Vedere [deployment](DEPLOYMENT.md) e [README](../../README.md).

I Developer Terms richiedono una policy accurata, un canale per cancellazione e protezione dei dati che includa cifratura a riposo. Il form non certifica queste misure al posto nostro. [Developer Terms, sezione 5](https://support-dev.discord.com/hc/en-us/articles/8562894815383-Discord-Developer-Terms-of-Service).

### 11. Will the message content data be used to train machine learning or AI Models?

**No** come vincolo del progetto: niente addestramento, fine-tuning o invio dei ticket a servizi AI. Non aggiungere successivamente riassunti o suggerimenti AI senza riesaminare finalità, accessi, informativa e richiesta.

Nel codice esaminato non esiste un'integrazione AI; questo non verifica le pratiche esterne di hosting o dello staff. Le prove per Discord devono usare dati sintetici, non conversazioni reali copiate in strumenti terzi.

### 12. Why do you need the Message Content intent?

> Authorized support staff need to read the free-form conversation inside private support ticket threads from our staff-only web dashboard. Users and staff write ordinary messages in these threads, including messages that do not mention the bot. We also need to retrieve the permitted thread history to build and maintain an encrypted server-side conversation archive, and keep that copy in sync with message edits and deletions.
>
> Message metadata alone does not contain the support conversation. Slash commands and ticket-creation modals are suitable for opening and managing a ticket, but they do not provide the ordinary messages exchanged afterwards. Exceptions for the bot's own messages, DMs or mentions do not cover those thread conversations. REST history retrieval also remains subject to Message Content restrictions.
>
> We will filter processing to our configured ticket guild and private ticket parent, restrict dashboard access to the owner and authorized support staff, support exclusion and deletion requests, and retain ticket content only while the ticket is open and for up to 30 days after closure. Content will not be used for AI training or processed from unrelated channels.

Questo testo descrive la funzione richiesta, non afferma che l'intent serva a inviare messaggi. Invio e gestione dipendono dai relativi permessi Discord. Non utilizzare un token utente o altri mezzi per aggirare la mancata autorizzazione.

### 13. Links to screenshots and/or videos demonstrating your use case

**URL pubblici mancanti: non inventarli.** Le [schermate locali sintetiche](screenshots/README.md) documentano il pannello e i suoi limiti; non dimostrano un flusso Discord reale. Preparare una demo con dati sintetici:

1. Pannello di creazione Discord con informativa; apertura di un ticket privato.
2. Conversazione con un account di test distinto dal bot, con messaggi normali senza mention.
3. Pannello staff: elenco, dettaglio e metadati; visibilità negata a un account non autorizzato.
4. Se legittimamente disponibile nell'ambiente di prova: contenuto letto e archiviato, edit/delete sincronizzati, risposta staff attribuita al bot.
5. Opt-out, richiesta di cancellazione e comportamento dopo il purge.
6. Informativa pubblica, schermata delle misure di conservazione/cifratura senza esporre chiavi o dati privati.

Caricare screenshot/video su un URL accessibile ai revisori senza dipendere dall'accesso al pannello staff. Non esporre conversazioni reali. Se l'ambiente non dispone dell'intent, indicare chiaramente ciò che è una predisposizione o un mockup e concordare con Discord la dimostrazione ammissibile; non presentarlo come integrazione funzionante.

La guida Discord chiede di motivare l'accesso necessario e fornire prove della funzione; l'approvazione non è garantita dalla sola compilazione. [Guida alla review](https://docs.discord.com/developers/gateway/getting-started-with-privileged-intent-review).

### 14. Acknowledgement

Spuntare e inviare solo quando le informazioni sono accurate e i requisiti operativi sono effettivi. Il lavoro attuale non invia la domanda né accetta termini per conto dell'utente.

## Corrispondenza requisiti → prova prima dell'invio

| Requisito | Situazione verificata oggi | Prova da raccogliere |
| --- | --- | --- |
| Policy del bot pubblica e raggiungibile | `/privacy` locale anonimo verificato | Dominio HTTPS reale + link nel ticket panel |
| Accesso solo staff | OAuth, non-staff/CSRF/revoca ruolo e SSE testati localmente | Collaudo OAuth/ruoli/stream su Discord reale |
| Archivio esterno | Cifrato e testato su SQLite dopo riavvio; raccolta reale disabilitata | Conversazione di test dopo autorizzazione, edit/delete e cronologia |
| Retention aperto + 30 giorni | Purge, clock/transizioni/riapertura e soppressione reimport testati | Backup e restore operativi senza resurrezione |
| Cifratura a riposo | Nuovi record e indici cifrati/protetti, retirement testato | Separazione chiavi, backup e bonifica copie legacy/log |
| Contatto cancellazione | Email scelta, operatività non provata | Email accessibile, procedura e test richiesta autorizzata |
| Opt-out | Implementato e testato: purge e import rispettano l'esclusione | Percorso `/privacy` con account di test reale |
| Niente AI | Nessuna integrazione nel repo | Vincolo operativo su staff, fornitori e strumenti di supporto |
| Demo del caso d'uso | Sette screenshot sintetici locali del pannello | Link pubblici e demo Discord con funzioni/limiti dichiarati |

Il form non impone di scegliere “Yes” a tutto. Deve corrispondere al servizio vero: oggi non è pronto per essere inviato con le risposte finali proposte.
