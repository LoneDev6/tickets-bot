# Revisione ticket privati: piano di lavoro

Data: 2026-11-04. Base analizzata: `16d648446302de9fb95667fdb8b11f0378d943b7`.
Stato: piano e analisi statica; nessuna modifica al bot in esecuzione.

Questo documento conserva il piano sulla base indicata. Per implementazione e verifiche locali completate vedere [STATUS.md](STATUS.md); nessun deploy di produzione è stato eseguito.

Documenti collegati: [revisione del codice](REVIEW.md), [form Discord e requisiti privacy](DISCORD-INTENTS.md), [informativa dedicata](PRIVACY.md), [deployment HTTPS](DEPLOYMENT.md).

## Obiettivo e decisioni confermate

- Pannello web riservato al proprietario e allo staff autorizzato, con elenco di tutti gli stati e dettaglio ticket.
- Stessi dati delle vecchie cards Discord, senza usare messaggi e colori come database.
- Un solo messaggio Discord persistente con numero di ticket aperti, aggiornato sugli eventi, e link al pannello. Resta un canale che ospita questo messaggio; sparisce la suddivisione tra notifiche complete e ticket aperti.
- Link al ticket Discord aperto in una nuova scheda.
- Prima versione web in lettura; risposta e gestione dalla app predisposte ma disabilitate finché non saranno autorizzate e verificate le capacità richieste.
- Storico dei messaggi sul nostro server: scelta esplicita dell'utente. Conservazione per tutta la durata del ticket aperto e fino a 30 giorni dalla chiusura; non significa massimo 30 giorni dalla creazione del messaggio.
- Contatto pubblico per cancellazione: `info@devs.beer`.
- Informativa separata da quella del sito personale, pubblica su `/privacy` al dominio del bot, senza login.
- Hosting attuale HumbleServers, Node.js su Pterodactyl, `81349c14.humbleservers.net:7777`; porta fissa e nessuna installazione di sistema. Account Cloudflare disponibile: valutare connector `cloudflared` avviato da Node come processo figlio, subordinato a permessi del container e rete in uscita.
- Requisiti del form Discord inclusi nel lavoro, con prove prima di dichiararli soddisfatti. Nessun invio del form in questa attività.

## Stato attuale e punti di intervento

| Area | Evidenza | Conseguenza |
| --- | --- | --- |
| Bot | `index.js`, circa 1500 righe: interazioni, storage, notifiche e scansioni insieme | Separare solo le responsabilità necessarie al riuso web |
| HTTP | `server.js:1`: Express con un solo `GET /` statico, avviato da `index.js:5` | Manca tutto il pannello, inclusi login, autorizzazione e API |
| Persistenza | Enmap `botData`, record `ticket_<threadId>`, `index.js:60`, `index.js:702` | Riutilizzare Enmap inizialmente, con schema versionato; nessuna migrazione a un altro database senza una necessità misurata |
| Record ticket | Autore, ingressi tramite pulsante, ID notifiche, messaggio informativo e verifica | Tipo, descrizione, date, ultimo messaggio e stato non sono conservati come dati autonomi |
| Notifiche | `ticketsNotifications` + `ticketsOpened`; due messaggi per nuovo ticket | Eliminare la duplicazione dopo l'importazione verificata |
| Aggiornamenti | Polling ultimo messaggio ogni 5 minuti; scansione notifiche ogni ora | Non è tempo reale; le cards condizionano la riuscita degli aggiornamenti |
| Intent | Solo `GatewayIntentBits.Guilds`, `index.js:44` | Stati thread disponibili; manca l'ascolto degli eventi dei messaggi |
| Test | `package.json:8`: script test che termina sempre con errore | Servono test mirati prima di cambiare persistenza e transizioni |

Assunzione di carico: un solo processo Node e una sola guild, coerenti con configurazione e codice. Numero di ticket e hosting effettivi da rilevare prima dell'implementazione; non sono stati consultati dati di produzione.

## 1. Modello dati e stati

Un record persistente per ticket, identificato da `threadId` stringa. Campi minimi:

- `schemaVersion`, `guildId`, `parentId`, `threadId`, nome, `openerId`, tipo e descrizione iniziale.
- `createdAt`, `updatedAt`, `statusChangedAt`, `archived`, `locked`, `deletedAt`, eventuali motivo e autore dell'ultima azione conosciuta.
- `lastMessageId`, `lastMessageAuthorId`, `lastMessageAt`; distinguere ultimo messaggio assoluto e ultimo messaggio umano per non contare i messaggi automatici come risposta dello staff.
- `joinedUserIds` con provenienza dichiarata: ingressi registrati dal bot, non elenco completo e corrente dei membri.
- `verificationThreadId`, provenienza dell'importazione e ID legacy necessari al controllo/rollback.
- Stato di sincronizzazione, ultimo controllo riuscito e campi non recuperabili. `null` significa sconosciuto, non zero o dato inventato.
- Impostazione di esclusione dalla copia web, scadenza dei dati e informazioni minime per applicare le cancellazioni.

Lo stato di visualizzazione deriva da dati persistiti, con una sola regola condivisa da API, filtri e conteggio:

| Condizione | Stato | Conta come aperto? |
| --- | --- | --- |
| Cancellazione confermata | Eliminato | No |
| Thread presente con `locked=true`, anche se archiviato | Bloccato | No |
| Thread presente con `archived=true`, senza lock | Chiuso / archiviato | No |
| Thread presente, non archiviato e non bloccato | Aperto | Sì |
| Errore di accesso o sincronizzazione incompleta | Mostrare ultimo stato noto + avviso di dato non aggiornato | Non sostituire il conteggio noto con zero; segnalare che può essere incompleto |

“Riaperto” è un evento, non un quinto stato corrente. Registrare una nuova data soltanto quando cambia effettivamente lo stato. Una rinomina non costituisce una nuova chiusura.

L'archiviazione automatica rimane riconoscibile come archiviazione, senza inventare una risoluzione o un operatore. La regola attuale la esclude già dagli aperti: mantenerla nella prima migrazione, rendendola esplicita. Non usare automaticamente `archive_timestamp` come data certa di risoluzione.

Un record “eliminato” mantiene solo i dati consentiti e fino alla scadenza: tutti gli stati devono essere consultabili durante la conservazione, non per sempre. Cancellazione del thread, scadenza e richiesta privacy prevalgono sulla conservazione dello storico.

## 2. Migrazione senza perdere le vecchie cards

1. Inventario di record Enmap e messaggi nei due canali legacy, con scansioni paginate e riprendibili. Fare prima un backup coerente e cifrato, senza copiare dati privati nella repository o in `.tasks/`.
2. Identificare le cards tramite autore atteso, guild, ID thread e struttura validata. Leggere i campi per nome; non affidarsi alla posizione del secondo pulsante.
3. Recuperare tipo, descrizione, autore, creazione, ultimo autore/data e motivo/data di chiusura dalle cards. Usare messaggio informativo nel thread come ulteriore fonte dove necessario. I thread senza Enmap e i ticket già eliminati con card superstite fanno parte dell'importazione.
4. Enumerare thread attivi e archiviati privati accessibili con paginazione; confrontare thread e record. La sola cache non dimostra la completezza. Un thread creato dal bot ha come creatore Discord il bot: non usare quel campo per inventare l'utente che ha aperto il ticket.
5. `403`, timeout, rate limit e indisponibilità della guild non significano “eliminato”. Conservare l'ultimo stato noto; marcare eliminato soltanto con evento pertinente o conferma affidabile di thread inesistente, dopo aver escluso problemi di accesso.
6. Importare con upsert per `threadId` e checkpoint; eseguire una seconda volta senza duplicati, sovrascritture di dati più recenti o nuove date di chiusura.
7. Produrre un rapporto numerico: record prima/dopo, cards abbinate, ticket senza card, legacy recuperati, eliminati recuperati, campi mancanti, errori e conteggi per stato. Nessun contenuto privato nel rapporto.
8. Confrontare campioni di tutti gli stati nel pannello e nelle cards. I messaggi già cancellati e non presenti in altre fonti non si possono ricostruire: dichiarare il limite.
9. Durante il passaggio, salvare ogni nuovo ticket subito nel nuovo formato, prima degli effetti secondari di notifica; gestire esplicitamente thread creati ma incompleti. Le scritture live non devono essere sovrascritte da importazioni arretrate.
10. Spegnere i vecchi aggiornamenti e attivare il messaggio unico solo dopo la verifica. Conservare inizialmente le vecchie cards come riferimento; rimuovere/disattivare i pulsanti legacy secondo una procedura esplicita. Nessuna cancellazione massiva automatica.

Gli archiviati non vengono sincronizzati tutti al collegamento del Gateway; richiedono recupero dedicato. Le cards pubblicate dall'app possono essere recuperabili anche senza Message Content grazie all'eccezione per messaggi propri; verificarne l'autore, soprattutto per il legacy. [Documentazione thread](https://docs.discord.com/developers/topics/threads), [Gateway e Message Content](https://docs.discord.com/developers/events/gateway).

## 3. Pannello web

Modalità d'uso: **Operate**, strumento di lavoro dello staff. Percorso principale: elenco → filtro/ricerca → dettaglio → apertura in Discord. Non serve una landing page.

### Elenco

- Vista iniziale aperti, filtro esplicito “Tutti”, accesso a chiusi, bloccati ed eliminati, conteggi per stato.
- Righe leggibili: nome/ID ticket, tipo, richiedente, stato testuale, ultimo autore e attività. Ricerca per ID, utente, nome e descrizione iniziale; niente ricerca globale nei messaggi nella prima versione.
- Filtri stato e tipo, ordinamento per ultima attività e creazione; paginazione e ordinamento stabile. Tutti i filtri operano sul dataset completo, non solo sulla pagina caricata.
- Filtri conservati nell'URL. Gli aggiornamenti non devono far perdere selezione, focus o posizione mentre si legge.

### Dettaglio e parità con le cards

| Dato/comportamento precedente | Destinazione web | Fonte attuale |
| --- | --- | --- |
| Titolo e ID ticket | Intestazione e ID copiabile | Card + thread |
| Richiedente | Nome quando noto e ID, con fallback leggibile | Descrizione card + `userId` |
| Type | Tipo | Campo card `Type` |
| Description | Descrizione integrale | Campo card `Description` / messaggio informativo |
| Creation Time | Data assoluta e relativa | Campo card / creazione thread |
| Last Message By | Ultimo autore | Aggiornamento in `index.js:240` |
| Last Message When | Data assoluta e relativa | Aggiornamento in `index.js:254` |
| Users In Ticket | Ingressi registrati, con indicazione del limite | `joinedUserIds`, `index.js:273` |
| Closed / Locked, motivo e data | Stato e ultima azione conosciuta | Campi card in `handleThreadUpdate` |
| Colori ultimo autore / stato | Etichetta testuale più colore secondario | Logica in `index.js:294`, stati in `index.js:941` |
| Go to Ticket | “Apri in Discord”, nuova scheda | URL da guild e thread ID validati |
| Join Ticket | Accesso Discord da verificare prima del ritiro del pulsante | Aggiunta membro in `index.js:925` |

Il codice rimuove già `Last Message Content` dalle cards: non promettere una preview storica che non c'è. La futura conversazione web è una funzione nuova, soggetta ai requisiti di [DISCORD-INTENTS.md](DISCORD-INTENTS.md).

Il link usa `https://discord.com/channels/<guildId>/<threadId>`, `target="_blank"` e `rel="noopener noreferrer"`, con indicazione accessibile della nuova scheda. Per un eliminato, spiegare che il ticket non è più disponibile invece di offrire un pulsante apparentemente funzionante.

Un link non concede accesso a un thread privato. Verificare i permessi reali del ruolo staff: se manca accesso ai thread, predisporre un ingresso esplicito e autorizzato su Discord prima di togliere “Join Ticket”. Non aggiungere membri come effetto collaterale di un `GET` web. Per i privati l'accesso dipende da invito o permessi di gestione. [Accesso ai thread](https://docs.discord.com/developers/topics/threads).

### Stati di interfaccia e accessibilità

Caricamento, nessun ticket, nessun risultato, dati importati parziali, sincronizzazione interrotta, sessione scaduta, autorizzazione revocata ed errore Discord devono avere messaggi e azioni distinti. Su schermi stretti le righe si adattano senza nascondere stato e apertura. Navigazione da tastiera, focus visibile, etichette dei controlli e stato comprensibile senza dipendere dal colore.

Non è stata scelta una direzione grafica né creato un mockup in questa fase. Prima della UI concreta raccogliere il contesto prodotto/design con `impeccable` e verificare il risultato renderizzato; non introdurre un framework o un design system solo per questo piano.

## 4. API, accesso e aggiornamenti

Riutilizzare Express, lo stesso processo del bot e pagine HTML/CSS/JS servite dalla stessa origine. Prima implementazione senza SPA framework, WebSocket separato, Redis o secondo servizio.

Separazione minima proposta, da adattare alle funzioni effettive:

- `index.js`: avvio, collegamento client e registrazione interazioni/eventi.
- `tickets.js`: record, regola stati, autorizzazione delle operazioni e sincronizzazione condivisi tra bot e web.
- `server.js`: creazione dell'app con dipendenze esplicite, sessioni e rotte. Evitare import circolari e accesso implicito a globali.
- `public/`: lista, dettaglio e asset del pannello; nessun token o dato privato incluso nei file statici.
- Importazione eseguibile separatamente, con simulazione e riepilogo prima delle scritture.

Contratti iniziali: `GET /api/tickets` con filtri e pagina; `GET /api/tickets/:id`; `GET /api/events` per notifiche di invalidazione; stato di connessione e capacità web nella risposta autenticata. Il frontend rilegge lista/dettaglio dopo l'invalidazione, senza ricevere un flusso indiscriminato di contenuti.

Autenticazione Discord OAuth2 con sessione server e cookie `HttpOnly`, `Secure`, `SameSite`, HTTPS e `state` nel callback. Autorizzare proprietario esplicito e ruolo `config.roles.support_team` nella guild configurata, senza ampliare l'accesso a tutti i membri o usare nomi dei ruoli. Verificare i dati del membro e la revoca del ruolo con durata di cache limitata; proteggere anche dettaglio, stream e future mutazioni.

Per controllare il ruolo del membro autenticato è disponibile lo scope OAuth2 `guilds.members.read`, insieme a `identify`; non richiede di leggere la lista completa dei membri. [OAuth2](https://docs.discord.com/developers/topics/oauth2), [Get Current User Guild Member](https://docs.discord.com/developers/resources/user#get-current-user-guild-member).

Sessioni con scadenza e logout; usare middleware mantenuto quando necessario anziché inventare un protocollo di autenticazione. Configurare consapevolmente reverse proxy e cookie sicuri. Risposte private `no-store`, niente CORS aperto, rendering del contenuto utente come testo o markup sanitizzato, ID e paginazione validati e nessun segreto nei log.

Per aggiornamenti server → browser bastano Server-Sent Events con heartbeat, chiusura su logout/scadenza/revoca e riconnessione che ricarica uno snapshot completo. Evitare il buco tra snapshot e sottoscrizione con una revisione monotona o sottoscrizione prima della lettura. L'apertura di una pagina non genera scansioni Discord per ogni ticket: si legge il dataset persistito.

## 5. Unico messaggio Discord

Persistire un solo `summaryMessageId` per guild, in un canale configurato. Testo minimo: “Ticket aperti: N” e pulsante/link HTTPS al pannello; nessun nome, descrizione o lista privata.

- Ricalcolo dalla stessa regola dati del pannello dopo creazione completata, chiusura, lock, riapertura e cancellazione.
- Aggiornamenti serializzati e accorpati per evitare edit concorrenti e conteggi arretrati. Modificare solo se cambia la rappresentazione; lasciare a discord.js la gestione dei rate limit e rispettare i retry indicati dall'API.
- Obiettivo in condizioni normali: dato web aggiornato entro 2 secondi dal commit locale; messaggio Discord entro 5 secondi dall'evento elaborato, esclusi rete/limitazioni Discord. Sono criteri di collaudo, non garanzie sull'API esterna.
- Avvio/riconnessione: riconciliare stati prima di certificare il conteggio; mostrare stato non aggiornato durante disconnessione o import incompleto. Un messaggio Discord non può aggiornarsi mentre il bot è offline.
- Se il messaggio non esiste più, ricrearlo una sola volta e salvare il nuovo ID. Non ricrearlo su ogni errore: un `403` richiede diagnosi dei permessi, non un nuovo messaggio.
- Gestire crash dopo invio e prima del salvataggio dell'ID tramite riconoscimento del riepilogo già inviato dal bot, prima di crearne un altro.
- Un controllo periodico leggero, senza sovrapposizione, ripara eventi persi e messaggio cancellato. Nessuna scansione permanente dell'intera cronologia notifiche.

## 6. Conversazioni e gestione futura

Distinguere capacità: `canReadConversation`, `canArchiveConversation`, `canReply`, `canManageTicket`, con motivo di indisponibilità. Valori decisi dal server usando configurazione, abilitazioni Discord e permessi del ticket; il frontend non decide l'autorizzazione.

Nella prima fase i controlli di risposta/gestione sono assenti o disabilitati con spiegazione; eventuali endpoint di scrittura rifiutano la richiesta senza effetti. Il dettaglio resta utile con i metadati. Non mettere in coda risposte da inviare automaticamente dopo l'approvazione.

Per la conversazione completa servirà Message Content. Gli eventi messaggio richiedono anche `GuildMessages`, che è distinto; inviare messaggi e modificare thread dipende dai permessi Discord, non da Message Content. L'attivazione dei nostri comandi web rimane rinviata come richiesto. [Gateway e intent](https://docs.discord.com/developers/events/gateway), [permessi thread](https://docs.discord.com/developers/topics/threads).

Dopo approvazione e verifica:

- Archivio cifrato dei messaggi dei soli ticket autorizzati, indicizzato per ticket e message ID; paginazione della conversazione. Import storico autorizzato, riprendibile e rispettoso di opt-out e scadenze.
- Gestione di creazione/modifica/cancellazione messaggi; aggiornare la copia corrente, non mantenere tutte le revisioni o testi cancellati. Non archiviare canali esterni al supporto.
- Primo archivio: testo, embed necessari, ID/autore/data e metadati degli allegati. Non scaricare automaticamente file binari; i link Discord possono scadere e non equivalgono a un backup degli allegati. Decidere separatamente se servono anche i file.
- Risposte inviate dal bot, attribuite visibilmente all'operatore; non inviate come account personale dello staff. Vietare mention involontarie e preservare la bozza se l'invio fallisce.
- Doppio clic/timeout non devono duplicare messaggi: ID richiesta persistito, controllo dell'esito e retry solo quando sicuro.
- Azioni chiudi/blocca/riapri/rinomina condividono la logica con Discord, riverificano lo stato corrente e registrano operatore, data ed esito senza copiare il contenuto nei log.
- Richieste con sessione/capacità revocata falliscono prima di qualsiasi effetto; protezione CSRF per le mutazioni autenticate tramite cookie.

Non richiedere Presence. Non aggiungere Guild Members solo per replicare esattamente il vecchio campo utenti: inizialmente restano gli ingressi registrati. La documentazione distingue la sincronizzazione completa dei membri dei thread. [Membri thread](https://docs.discord.com/developers/topics/threads).

## 7. Privacy e prerequisiti del form

Questa parte è necessaria prima di abilitare lo storico, non un adempimento da rimandare dopo l'intent. Dettagli e testi inglesi in [DISCORD-INTENTS.md](DISCORD-INTENTS.md).

- Informativa pubblica specifica per LoneDev's Tickets, linkata nel pannello Discord, nel bot e nella app prima della raccolta; spiegare staff autorizzato, hosting e archivio esterno.
- Cifratura a riposo verificata per database, archivio, log contenenti dati e backup. HTTPS non basta; Enmap da solo non ne fornisce prova. Chiavi fuori da repository, database e backup corrispondenti.
- Contenuti per tutta la durata del ticket aperto + massimo 30 giorni dalla chiusura confermata. Stessa scadenza per descrizione iniziale, estratti, indici e copie. Non conservare metadati identificativi per sempre senza una finalità e scadenza esplicite.
- Distinguere opt-out dalla copia web e cancellazione dei dati già raccolti. Prevedere percorso `/privacy` con istruzioni e link email; in esclusione, interrompere copia e archiviazione e gestire il ticket da Discord.
- Richieste a `info@devs.beer`: verificare il richiedente senza raccogliere documenti inutili, cancellare dati propri nelle copie locali ed evitare che sincronizzazione, import o restore li ricreino. Non promettere che un purge locale cancelli dati conservati da Discord.
- Backup cifrati con scadenze compatibili e procedura che applica le cancellazioni prima di un ripristino. Il limite non può diventare “30 giorni nel DB + altri 30 nei backup”.
- Testo e allegati non inviati a servizi AI, nessun addestramento o profilazione. Verificare anche i servizi terzi e la procedura di supporto prima di dichiararlo nel form.

La policy deve descrivere davvero accesso, uso, conservazione e cancellazione; Discord richiede anche cifratura a riposo. [Developer Terms, sezione 5](https://support-dev.discord.com/hc/en-us/articles/8562894815383-Discord-Developer-Terms-of-Service).

La bozza è in [PRIVACY.md](PRIVACY.md). Non pubblicare le note interne né le affermazioni su funzioni non ancora operative; completare regione, fornitori email/backup e scadenze tecniche. L'URL del sito personale non sarà usato per il bot.

## 8. Deployment HTTPS con porta fissa

La proposta verificabile è in [DEPLOYMENT.md](DEPLOYMENT.md): hostname stabile Cloudflare → tunnel in uscita → connector nello stesso container → Express su `127.0.0.1:7777`. Non cambiare la porta allocata né installare un servizio di sistema. Il binario portabile è comunque necessario: un wrapper npm non equivale a un tunnel in puro JavaScript.

Prima verificare esecuzione del binario Linux e connettività in uscita 7844 sul container HumbleServers. Nessuna verifica dell'hosting è già avvenuta. Usare tunnel gestito, token separato, avvio/arresto del figlio controllati da Node, autenticazione applicativa e informativa pubblica. Niente Quick Tunnel per il deployment stabile con SSE.

La prima parte di A comprende anche questa verifica di fattibilità e la scelta del dominio, così URL privacy e callback OAuth non rimangono indefiniti. Non pubblicare ticket sul vecchio endpoint HTTP in attesa di HTTPS.

## 9. Sequenza di implementazione e criteri di accettazione

| Fase | Lavoro | Verifica prima di avanzare |
| --- | --- | --- |
| A | Policy specifica, contatto, scelta cifratura/hosting, opt-out e scadenze; regole dati | Matrice del form con evidenze e nessuna affermazione falsa |
| B | Correggere creazione incompleta, persistenza e transizioni; schema nuovo | Test per input lungo, errore notifica, aggiornamenti concorrenti e idempotenza |
| C | Import legacy e storico metadati | Simulazione, seconda importazione senza differenze, rapporto e confronto di tutti gli stati |
| D | Login staff, API, elenco/dettaglio, aggiornamenti live e link Discord | Utente autorizzato/non autorizzato, revoca, elenco completo/paginato e parità cards |
| E | Messaggio riepilogo e dismissione vecchio flusso | Un solo messaggio dopo riavvio/cancellazione/crash simulato; conteggio uguale al pannello |
| F | Raccolta prove reali per il form e richiesta intent | Screenshot/video accessibili, dati fittizi, differenza tra disponibile e predisposto dichiarata |
| G | Dopo approvazione: archivio completo, risposta e azioni web | Permessi effettivi, privacy, cifratura, purge, sync modifiche/cancellazioni, nessun doppio invio |

F non richiede di fingere che G sia già in produzione. Per mostrare il caso d'uso completo serve un ambiente di test con intent legittimamente disponibile; altrimenti descrivere il limite a Discord e fornire la dimostrazione consentita. Non attivare un intent non concesso sul bot di produzione.

File da raggiungere: `index.js`, `server.js`, `global.js`, `config.json`, `utils/logger.js`; `package.json` e lockfile solo se servono script/test o una dipendenza giustificata; nuovi moduli ticket, asset web, importazione, test e supervisione del connector. Preservare il launcher letteralmente chiamato `*.js`, usato per compatibilità Pterodactyl. L'hosting e la porta sono stati forniti dall'utente; volume dati, dominio pubblico, proprietà del container, proxy e configurazione segreti non sono ancora verificati.

Test minimi richiesti: tabella stati completa; bot offline/eventi persi; archiviati e `403` non classificati eliminati; import duplicata; fallimento notifica dopo creazione; contenuto non autorizzato non leggibile via API/stream; messaggio unico; opt-out/cancellazione/scadenza incluse copie e restore; future scritture negate quando disabilitate. Test UI con dati sintetici su desktop e schermo stretto quando l'interfaccia esiste.

Rollback: mantenere snapshot verificato e dati legacy finché la nuova lettura e il riepilogo sono accettati. Un rollback del codice non deve cancellare i nuovi record o riattivare la raccolta di dati esclusi. Fermare il nuovo writer prima di ripristinare, applicare cancellazioni maturate, verificare conteggi e mantenere temporaneamente accesso operativo da Discord.

## Suggerimenti aggiuntivi, senza ampliare la prima versione

- Indicatore “ultimo messaggio del cliente / dello staff” distinto dai messaggi automatici: evita falsi segnali di risposta. Non dedurre “risolto” da un colore.
- Segnalare ticket aperti da molto tempo e dati non sincronizzati; prima bastano ordinamento e data visibile, senza SLA o notifiche aggiuntive.
- Valutare assegnatario esplicito solo se più operatori iniziano a rispondere contemporaneamente. Nessuna nuova automazione necessaria per la prima lettura web.
- Archiviazione binaria degli allegati solo dopo averne definito necessità, limiti e cancellazione.

Non inclusi: implementazione runtime, deploy, cancellazione delle vecchie cards, pubblicazione della privacy, attivazione intent, invio del form, migrazione dei dati reali o test con token di produzione. Il piano è completo; questi sono lavori successivi con le verifiche indicate sopra.
