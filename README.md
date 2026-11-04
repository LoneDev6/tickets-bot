# LoneDev's Tickets

Bot Discord per ticket privati, pannello staff shadcn/ui, archivio cifrato e unico messaggio riepilogativo. Porta predefinita `7777`; entrypoint Node `index.js` oppure launcher Pterodactyl letteralmente chiamato `*.js`. Entrambi eseguono lo stesso bootstrap automatico prima di caricare il bot.

## Installazione

Runtime supportato: Node **20.19+ oppure 22.12+** (verificato localmente con 24.18). Non cambiare automaticamente la versione dell'egg: controllarla prima del deployment. Il driver SQLite aggiornato ha binari specifici per runtime/architettura; installare le dipendenze sul sistema di destinazione, senza caricare `node_modules` compilati su un altro sistema.

Su Pterodactyl, dopo aver pubblicato questa versione nel repository: **aggiorna con `git pull` e riavvia**. Non occorre aggiungere comandi npm allo startup dell'egg.

L'egg HumbleServers configurato confronta `MAIN_FILE` con la stringa letterale `"*.js"`: impostare **Main File a `*.js`**, asterisco incluso e senza virgolette, per selezionare Node anziché ts-node. Il file è incluso nel repository; il `postinstall` lo ripristina automaticamente se manca nella copia locale, senza sovrascrivere un file esistente. Non serve installare ts-node.

Il bootstrap usa solo moduli standard Node: installa le dipendenze del bot bloccate dal lockfile e scarica il connector quando serve. Il pannello viene distribuito **già compilato in `web/dist`**, versionato su Git: sul server non vengono installati pacchetti frontend né avviati TypeScript/Vite. È la modalità prevista per HumbleServers con 256 MB. Controlla hash del lockfile bot e runtime; un riavvio senza cambiamenti riusa dipendenze e binario. Se mancano build o asset, interrompe l'avvio con un errore chiaro anziché tentare una compilazione sul server. Servono `npm`, filesystem persistente scrivibile e accesso HTTPS ai registry/GitHub. Il consumo effettivo di bot e connector insieme va comunque collaudato sul provider.

Per sviluppo e verifica restano disponibili `npm ci`, `npm --prefix web ci`, `npm run build:web` e `npm test`. Ogni modifica frontend richiede build locale e commit con **tutta `web/dist`**, inclusa la rimozione degli asset obsoleti. `npm start`, `node index.js` e il launcher `*.js` preparano automaticamente l'app; il modulo interno `bot.js` viene caricato solo dopo.

Il frontend usa il registry ufficiale shadcn (`radix-nova`, base `neutral`) con React/Vite. Non contiene ticket fittizi in produzione. HTML, CSS, JavaScript e font statici sono serviti dallo stesso Express del bot. Le dipendenze frontend eventualmente già installate in `web/node_modules` non vengono più caricate dall'avvio.

La navigazione tra elenco, dettaglio e privacy e i pulsanti Retry sono gestiti da React senza ricaricare il documento. URL e cronologia del browser restano utilizzabili. Gli aggiornamenti live mantengono visibili le righe e le pagine già caricate mentre recuperano i dati aggiornati.

## Configurazione

Al primo avvio, se mancano dominio o ID pubblici, compare una **guida in console**. Spiega come creare il tunnel Cloudflare, chiede origine HTTPS, Application ID e ID del proprietario, mostra il redirect OAuth esatto e salva solo questi valori pubblici in `.runtime/setup.json`. Rispondere alle domande usando l'input della console Pterodactyl. Con tutti i valori già configurati la guida viene saltata.

Usare le variabili protette del pannello, oppure una `.env` privata dal gestore file partendo da [.env.example](.env.example). La console può registrare l'input: **non incollare token o secret nelle risposte della guida**. Non inserire segreti nei commit, nei log o nei video per Discord. Se mancano segreti, la guida elenca solo i nomi delle variabili e chiede un riavvio dopo averle configurate.

Da fornire una volta: `DISCORD_TOKEN`, `DISCORD_CLIENT_SECRET` e, per il tunnel, `TUNNEL_TOKEN`. `CLIENT_ID`, `OWNER_ID` e `PUBLIC_BASE_URL` si possono fornire dalle variabili o dalla guida. Il dominio è l'origine HTTPS definitiva, senza percorso. Registrare in Discord la callback esatta `<PUBLIC_BASE_URL>/auth/discord/callback`, con scope `identify`. Creazione del tunnel/route nell'account Cloudflare e registrazione della callback richiedono l'accesso ai rispettivi portali; il bot non possiede credenziali amministrative per farlo al posto del proprietario.

`TICKET_ENCRYPTION_KEY` e `SESSION_SECRET` sono generate automaticamente se assenti; i valori forniti esplicitamente vengono conservati senza modificarli. Sono persistiti in `.runtime/secrets.json` con permessi `0600`, dentro una directory `0700` ignorata da Git. Una chiave diversa da quella già persistita interrompe l'avvio. **Non cancellare `.runtime/` durante pull, reinstallazioni o trasferimenti**: la perdita della chiave archivio rende i dati irrecuperabili. Conservare una copia protetta delle chiavi separata dai backup del database; non includere automaticamente segreti e database nello stesso export. Nessuna rotazione automatica della chiave dati è implementata: richiede decifratura/ricifratura controllata e verifica.

`config.json` definisce guild, canale ticket e ruolo staff. `ticketsNotifications` è il canale predefinito del solo riepilogo (sostituibile con `SUMMARY_CHANNEL_ID`); `ticketsOpened` rimane esclusivamente una sorgente per l'import legacy, non riceve nuovi messaggi. Il proprietario deve appartenere alla guild; il login non concede permessi Discord sui thread.

Permessi bot: accesso e cronologia dei canali interessati, creazione/gestione thread privati, invio nei thread e nel canale riepilogo. I membri staff che non vedono ancora un thread possono usare `/ticket-open id:<ID>`; richiede ruolo autorizzato. Non servono Presence o Guild Members per questa versione.

## Inventario dei vecchi ticket

La scansione non si basa sulla cache: enumera **thread privati attivi e archiviati**, pagina gli archivi e incrocia Enmap `botData`, vecchie cards e messaggi informativi conosciuti. Rileva anche thread senza record locale. Conserva come sconosciuti i dati non recuperabili; non usa il creatore Discord del thread come richiedente, perché può essere il vecchio bot.

La scansione è limitata alla guild e ai canali ticket autorizzati, per evitare di importare altri thread privati del server. Se il vecchio sistema usava altri canali, aggiungerli a `LEGACY_TICKET_PARENT_IDS`. Se le cards erano inviate da un altro account bot, indicare quell'ID in `LEGACY_BOT_IDS`: non vengono accettati messaggi di autori arbitrari. I thread eliminati si recuperano solo dalle cards o dai record rimasti.

Le cards di un altro account bot possono avere contenuti non accessibili senza Message Content. L'inventario dei thread resta disponibile; i campi non recuperabili vengono segnalati nel rapporto e possono essere integrati con una nuova importazione quando autorizzati.

Non è obbligatorio eseguire comandi di importazione per il deployment ordinario: il primo avvio importa automaticamente le sorgenti legacy. Fermare il vecchio bot e non eseguire due processi sullo stesso database. È consigliato un backup coerente **cifrato** prima del primo aggiornamento, con chiavi separate e una durata compatibile con le cancellazioni. Per un controllo manuale facoltativo, con bot fermo:

```sh
# Simulazione: nessuna importazione dei ticket, nessuna modifica dei thread Discord.
npm run import:legacy
# Verificare conteggi, errori, missingOpener/missingDescription e campioni delle vecchie cards.
npm run import:legacy -- --apply
# Solo dopo il confronto: rimuove le vecchie righe in chiaro, verifica le copie cifrate e compatta SQLite.
npm run import:legacy -- --apply --retire-legacy
```

Il rapporto JSON contiene conteggi di record/cards/thread, stati, dati mancanti e sorgenti non accessibili, senza descrizioni o conversazioni. `403`, timeout e errori di rete non sono cancellazioni. L'import è ripetibile: le cards integrano solo i campi mancanti; nome e stato rilevati direttamente dai thread prevalgono sui valori storici.

Se l'import non è già completato, il primo avvio esegue lo stesso inventario e copia i dati in forma cifrata, **senza eliminare il database legacy né le cards**. Errori mantengono il riepilogo come non aggiornato; una nuova esecuzione dell'import può riparare le sorgenti mancanti. La scansione corrente degli stati viene ripetuta ogni 15 minuti oltre agli eventi live.

I ticket chiusi/bloccati più vecchi della durata concordata possono risultare nell'inventario e poi essere eliminati dalla retention. L'elenco web comprende tutti gli stati **ancora conservati**; non è un archivio personale perpetuo. Le vecchie cards rimangono in Discord: il codice non le cancella automaticamente.

## HTTPS e cloudflared nel container Node

Creare una volta un tunnel **gestito**, con hostname stabile nel proprio account Cloudflare, instradato a `http://127.0.0.1:7777`, seguendo la guida in console. Impostare il token del connector in `TUNNEL_TOKEN` tramite variabili protette o `.env`; non il comando di installazione completo.

Su Linux x64/arm64, se `CLOUDFLARED_PATH` è vuoto, il bootstrap scarica automaticamente il binario ufficiale in `.runtime/`, controlla il SHA256 prima di renderlo eseguibile e lo riusa agli avvii successivi. Versione fissata **2026.10.2**, con checksum della [release ufficiale](https://github.com/cloudflare/cloudflared/releases/tag/2026.10.2); nessun download di `latest`. Per usare un binario proprio impostare `CLOUDFLARED_PATH`. Node lo avvia come figlio senza shell, senza root, senza installare un servizio e senza condividere i segreti Discord con il processo.

HumbleServers deve permettere esecuzione del binario e uscita verso Cloudflare sulla porta **7844**. `TUNNEL_PROTOCOL=http2` usa TCP se UDP/QUIC non funziona; non elimina il requisito 7844. Se l'hosting vieta questi requisiti, serve un proxy del provider o un connector esterno. Non è stato testato sull'account reale.

Non usare Quick Tunnel in produzione: URL instabile e mancanza di supporto SSE. Non aggiungere Cloudflare Access davanti a `/privacy` o `/api/privacy`: sono pubblici. `/api/stats` è server-to-server e richiede solo il suo `STATS_API_TOKEN` Bearer; non usa una sessione Discord o il ruolo staff. Gli altri endpoint privati per ticket, il pannello, SSE e azioni web richiedono il ruolo configurato in `SUPPORT_TEAM_ROLE_ID`; se la variabile è vuota, si usa `config.roles.support_team`. Il valore HumbleServers di produzione è `784529945049038899`. `OWNER_ID` identifica solo il destinatario delle escalation e non concede alcun bypass. Il server accetta solo hostname HTTPS configurato e si fida degli header proxy soltanto da loopback. Verificare l'eventuale health check Pterodactyl prima di cambiare `WEB_HOST`; nessun accesso ai ticket tramite l'endpoint HTTP del provider è consentito.

Dettagli e criteri di collaudo: [.tasks/private-tickets-web/DEPLOYMENT.md](.tasks/private-tickets-web/DEPLOYMENT.md). Token e domini non vengono creati automaticamente.

## Privacy, archivio e form Discord

La policy effettivamente servita è generata da [privacy.js](privacy.js) su `/privacy`, attraverso il pannello shadcn. Il documento [PRIVACY.md](.tasks/private-tickets-web/PRIVACY.md) conserva la bozza iniziale. Compilare con fatti verificati `PRIVACY_HOSTING_REGION` (incluse garanzie sui trasferimenti), `PRIVACY_EMAIL_PROVIDER` e `PRIVACY_BACKUP_POLICY`: senza questi dati la policy mostra un avviso di configurazione incompleta.

Contatto: **info@devs.beer**. `/privacy` in Discord offre esclusione dalla copia web e cancellazione locale con conferma. Lo staff non deve chiedere password o token personali per identificare il richiedente. Restano preferenze minime protette per impedire che importazioni ricreino i dati esclusi.

I nuovi record e messaggi usano AES-256-GCM con chiavi derivate distinte per cifratura e indici HMAC. Le sessioni, limitate e con scadenza, rimangono in RAM. Il bot non scrive più log privati su disco. **Vecchi `data/log.txt`, esportazioni e backup preesistenti non vengono automaticamente cifrati o eliminati**: devono essere gestiti prima di dichiarare nel form che tutti i dati conservati sono cifrati a riposo.

Conservazione: ticket aperto più massimo 30 giorni dalla chiusura/blocco/archiviazione, salvo cancellazione anticipata. Un job controlla la scadenza ogni minuto e le API la applicano prima di restituire i ticket. Il termine comprende copie derivate e backup: configurare davvero scadenza, cancellazioni e ripristino; ripristinare un backup vecchio senza la lista aggiornata di esclusioni/cancellazioni può ripristinare dati che non devono tornare.

`MESSAGE_CONTENT_APPROVED=false` è il valore iniziale. Il bot riceve solo metadati dei messaggi e non salva la conversazione completa. Dopo concessione e verifica dei requisiti, `true` abilita lettura/archivio, import della cronologia dei soli ticket, modifiche e cancellazioni. Gli allegati sono riferimenti, non copie binarie permanenti; i loro URL possono scadere.

`WEB_CHAT_ENABLED=false` è indipendente: la raccolta delle conversazioni richiede `MESSAGE_CONTENT_APPROVED=true`, mentre la loro visibilità web richiede entrambi i flag a `true`. Le azioni staff abilitate dal pannello sono chiudere, chiudere e bloccare, riaprire, escalare e risolvere un’escalation; il pannello non invia risposte. L’escalation aggiunge al ticket privato il proprietario configurato in `OWNER_ID` e avvisa solo lui.

### Aggregate statistics API

Statistics are encrypted daily UTC counters only: opened, discovered, closed, locked, reopened, deleted, and escalated. They contain numeric counts without user IDs, ticket IDs, or content, and are retained for 730 days. Collection starts on the first installation of this version. Legacy tickets first observed by this version count as discovered; the bot does not reconstruct older events. Small counts can sometimes allow inferences, so these aggregates are not described as fully anonymous. `GET /api/stats` exposes aggregate statistics only, never tickets, and uses its bearer token as the sole authentication method, without a Discord session or staff role.

Set an optional separate `STATS_API_TOKEN` secret (32–256 characters, no whitespace) to enable `GET /api/stats`. Generate a user-chosen secret locally with Node.js:

```sh
node -e "console.log(require('node:crypto').randomBytes(32).toString('base64url'))"
```

Send it only in the `Authorization: Bearer <token>` header. Never put the token in a URL or browser code. The API does not use cookie authentication. An unset token returns 404; an invalid token returns 401; invalid query parameters return 400.

Optional `from` and `to` parameters use inclusive `YYYY-MM-DD` UTC dates, with a maximum range of 730 days. `interval` accepts `day`, `week`, or `month`; weeks start Monday and months use calendar months. Empty buckets are included. The response contains current counters and `collectedSince` metadata, which marks when this version first began collecting; it does not imply historical completeness before that date.

```sh
curl --header "Authorization: Bearer $STATS_API_TOKEN" \
  "https://tickets.devs.beer/api/stats?interval=week&from=2026-11-01&to=2026-11-04"
```

The response includes `periods`, `totals`, `current`, and `sync`. `closed` counts transitions from open to closed or locked; `locked` also records locking an already closed ticket. `discovered` counts older tickets first seen by the collector. Imported history is not reconstructed: zero buckets before `collectedSince` do not prove that no tickets existed. `current` covers retained tickets only; check `sync.ready` before treating the snapshot as complete. This API is intended for your dashboard's backend; keep its token out of browser bundles.

Ticket lists load continuously with cursor/revision snapshots, plus a keyboard-accessible Load more button. The separate owner filter accepts a requester name, Discord ID, or mention. Escalated tickets are marked and can be ordered first. Both UI and public privacy policy are in English. Existing creation panels posted by this bot are updated once per policy version to include the public policy link. Protected API requests recheck the required Discord role through the bot SDK, sharing only pending concurrent lookups; SSE sessions recheck every 15 seconds and never contain conversation payloads.

Non inviare il form con prove inesistenti: risposte e requisiti in [.tasks/private-tickets-web/DISCORD-INTENTS.md](.tasks/private-tickets-web/DISCORD-INTENTS.md). Servono dominio pubblico, pratica privacy operativa, demo con dati sintetici e verifica di hosting/backup. Nessun addestramento o invio a servizi AI è previsto.

## Verifica locale senza Discord

`npm test` usa database temporanei e un provider OAuth simulato, senza leggere token o dati reali. Include un ciclo completo con client Discord simulato in memoria: import storico, creazione, autorizzazioni, stati, messaggio riepilogativo unico, edit/delete, opt-out e cancellazione senza reimport. Per eseguire solo i test del servizio: `node --test test/service.test.js`. Queste simulazioni non verificano il protocollo Gateway, i permessi effettivi e i limiti del servizio Discord: quelli richiedono una guild di prova reale.

Per una verifica visuale manuale, dopo la build:

```sh
NODE_ENV=development node test/ui-fixture.js
```

Lo script stampa URL e PID, ascolta solo su loopback su porta temporanea e contiene solo dati sintetici. Aprire il suo `/fixture/login`; non è una modalità del bot di produzione. Fermarlo con Ctrl+C. Le prove nel browser non attestano accesso al server Discord reale o compatibilità HumbleServers.

## Persistent sign-in

The dashboard uses an HttpOnly, Secure, SameSite=Lax cookie with a rolling 30-day lifetime. Sessions are encrypted in the existing database and survive bot restarts when `data/`, `.runtime/` and the original keys are preserved. OAuth is used only to verify identity at sign-in; OAuth access/refresh tokens are not stored. Later requests verify the required role through the bot SDK, which handles Discord rate limits. Only pending concurrent role checks are shared; completed allow/deny results are not cached. Missing role or guild membership blocks access even with a remembered cookie. Temporary lookup failures return 503 without destroying the session and are logged with safe numeric codes/status. Logout and local data erasure revoke persisted sessions, including protection against stale in-flight saves. Pre-login state lasts at most ten minutes.
