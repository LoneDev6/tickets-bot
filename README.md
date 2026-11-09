# LoneDev's Tickets

Bot Discord per ticket privati, pannello staff shadcn/ui, archivio cifrato e unico messaggio riepilogativo. Porta predefinita `7777`; entrypoint Node `index.js` oppure launcher Pterodactyl letteralmente chiamato `*.js`. Entrambi eseguono lo stesso bootstrap automatico prima di caricare il bot.

## Installazione

Runtime supportato: Node **20.19+ oppure 22.12+** (verificato localmente con 24.18). Non cambiare automaticamente la versione dell'egg: controllarla prima del deployment. Il driver SQLite aggiornato ha binari specifici per runtime/architettura; installare le dipendenze sul sistema di destinazione, senza caricare `node_modules` compilati su un altro sistema.

Su Pterodactyl, dopo aver pubblicato questa versione nel repository: **aggiorna con `git pull` e riavvia**. Non occorre aggiungere comandi npm allo startup dell'egg.

L'egg HumbleServers configurato confronta `MAIN_FILE` con la stringa letterale `"*.js"`: impostare **Main File a `*.js`**, asterisco incluso e senza virgolette, per selezionare Node anziché ts-node. Il file è incluso nel repository; il `postinstall` lo ripristina automaticamente se manca nella copia locale, senza sovrascrivere un file esistente. Non serve installare ts-node.

Stop e Restart del pannello devono avviare una chiusura ordinata. Il bot gestisce `SIGINT`, `SIGTERM`, `SIGHUP`, `SIGQUIT` e i comandi console `stop`, `exit`, `quit` e `^C`, anche durante la configurazione, l'installazione o il login. Il carattere Ctrl-C (`ETX`) e `^C` ricevuto come testo sono riconosciuti anche senza invio e con input frammentato. Accetta una sola chiusura anche con segnali ripetuti: interrompe sincronizzazioni e timer, chiude SSE/HTTP, attende le operazioni già iniziate e ferma Discord e cloudflared in parallelo prima di chiudere i database. Il connector ha 5 secondi di grazia; l'intera chiusura ha un limite di 10 secondi, dopo il quale il processo termina con codice 1 e un messaggio di timeout. La chiusura normale termina con codice 0 e `[shutdown] Services stopped.`. Il successivo avvio è gestito da Pterodactyl, senza un secondo bot avviato internamente.

L'egg deve usare `^C` (segnale `SIGINT`) oppure `stop` come Stop Command, come previsto dalla [documentazione Pterodactyl](https://github.com/pterodactyl/documentation/blob/master/community/config/eggs/creating_a_custom_egg.md#stop-command). Se premendo Stop non compare alcuna riga `[shutdown]`, il comando/segnale non raggiunge Node o il processo usa ancora il vecchio codice: provare `stop` nella console. Se la console funziona ma il pulsante no e Stop Command è bloccato, chiedere al provider di impostarlo a `stop`; se lo startup è modificabile, usare `exec /usr/local/bin/node "/home/container/${MAIN_FILE}" ${NODE_ARGS}` nel ramo Node per sostituire la shell. Le fasi `git pull`/`npm install` eseguite dall'egg prima del launcher sono esterne al bot. Kill (`SIGKILL`) e arresti per memoria esaurita non consentono cleanup JavaScript.

Il bootstrap usa solo moduli standard Node: installa le dipendenze del bot bloccate dal lockfile e scarica il connector quando serve. Il pannello viene distribuito **già compilato in `web/dist`**, versionato su Git: sul server non vengono installati pacchetti frontend né avviati TypeScript/Vite. È la modalità prevista per HumbleServers con 256 MB. Controlla hash del lockfile bot e runtime; un riavvio senza cambiamenti riusa dipendenze e binario. Se mancano build o asset, interrompe l'avvio con un errore chiaro anziché tentare una compilazione sul server. Servono `npm`, filesystem persistente scrivibile e accesso HTTPS ai registry/GitHub. Il consumo effettivo di bot e connector insieme va comunque collaudato sul provider.

Per sviluppo e verifica restano disponibili `npm ci`, `npm --prefix web ci`, `npm run build:web` e `npm test`. Ogni modifica frontend richiede build locale e commit con **tutta `web/dist`**, inclusa la rimozione degli asset obsoleti. `npm start`, `node index.js` e il launcher `*.js` preparano automaticamente l'app; il modulo interno `bot.js` viene caricato solo dopo.

Il frontend usa il registry ufficiale shadcn (`radix-nova`, base `neutral`) con React/Vite. Non contiene ticket fittizi in produzione. HTML, CSS, JavaScript e font statici sono serviti dallo stesso Express del bot. Le dipendenze frontend eventualmente già installate in `web/node_modules` non vengono più caricate dall'avvio.

La navigazione tra elenco, dettaglio e privacy e i pulsanti Retry sono gestiti da React senza ricaricare il documento. URL e cronologia del browser restano utilizzabili. Gli aggiornamenti live mantengono visibili le righe e le pagine già caricate mentre recuperano i dati aggiornati.

La data Updated del ticket è quella dell’ultimo messaggio Discord, anche nell’ordinamento Latest message (`sort=updated` per compatibilità API). Importazione, sincronizzazione e azioni dello staff non la sostituiscono. Se manca viene mostrato `—`; la sincronizzazione ha una data separata, Last synchronized.

L’elenco mostra l’anteprima del messaggio iniziale con ellissi e scorrimento su hover/focus (rispettando le preferenze di movimento ridotto). Il clic sulla riga apre i dettagli. Nome e avatar provengono dalla cache Discord del bot; se manca il nome, si usa quello salvato o il vecchio titolo quando l’ID coincide. Gli avatar mancanti mostrano le iniziali. Le azioni sono accanto a Open in Discord e aprono un Dialog fullscreen per motivo opzionale e conferma: non viene inviata alcuna azione prima della conferma.

## Configurazione

Al primo avvio, se mancano dominio o ID pubblici, compare una **guida in console**. Spiega come creare il tunnel Cloudflare, chiede origine HTTPS, Application ID e ID del proprietario, mostra il redirect OAuth esatto e salva solo questi valori pubblici in `.runtime/setup.json`. Rispondere alle domande usando l'input della console Pterodactyl. Con tutti i valori già configurati la guida viene saltata.

Usare le variabili protette del pannello, oppure una `.env` privata dal gestore file partendo da [.env.example](.env.example). La console può registrare l'input: **non incollare token o secret nelle risposte della guida**. Non inserire segreti nei commit, nei log o nei video per Discord. Se mancano segreti, la guida elenca solo i nomi delle variabili e chiede un riavvio dopo averle configurate.

Da fornire una volta: `DISCORD_TOKEN`, `DISCORD_CLIENT_SECRET` e, per il tunnel, `TUNNEL_TOKEN`. `CLIENT_ID`, `OWNER_ID` e `PUBLIC_BASE_URL` si possono fornire dalle variabili o dalla guida. Il dominio è l'origine HTTPS definitiva, senza percorso. Registrare in Discord la callback esatta `<PUBLIC_BASE_URL>/auth/discord/callback`, con scope `identify`. Creazione del tunnel/route nell'account Cloudflare e registrazione della callback richiedono l'accesso ai rispettivi portali; il bot non possiede credenziali amministrative per farlo al posto del proprietario.

`TICKET_ENCRYPTION_KEY` e `SESSION_SECRET` sono generate automaticamente se assenti; i valori forniti esplicitamente vengono conservati senza modificarli. Sono persistiti in `.runtime/secrets.json` con permessi `0600`, dentro una directory `0700` ignorata da Git. Una chiave diversa da quella già persistita interrompe l'avvio. **Non cancellare `.runtime/` durante pull, reinstallazioni o trasferimenti**: la perdita della chiave archivio rende i dati irrecuperabili. Conservare una copia protetta delle chiavi separata dai backup del database; non includere automaticamente segreti e database nello stesso export. Nessuna rotazione automatica della chiave dati è implementata: richiede decifratura/ricifratura controllata e verifica.

`config.json` definisce guild, canale ticket e ruolo staff. `ticketsNotifications` è il canale predefinito del solo riepilogo (sostituibile con `SUMMARY_CHANNEL_ID`); `ticketsOpened` rimane esclusivamente una sorgente per l'import legacy, non riceve nuovi messaggi. Il proprietario deve appartenere alla guild; il login non concede permessi Discord sui thread.

Permessi bot: accesso e cronologia dei canali interessati, creazione/gestione thread privati, invio nei thread e nel canale riepilogo. I membri staff che non vedono ancora un thread possono usare `/ticket-open id:<ID>`; richiede ruolo autorizzato. Non servono Presence o Guild Members per questa versione.

### Servizio Discord read-only

Il servizio esterno già operativo è `https://ds-scrape-api.devs.beer`. La [guida Discord Reader](.tasks/private-tickets-web/DISCORD-READER.md) documenta configurazione backend `DISCORD_READER_BASE_URL` / `DISCORD_READER_API_KEY`, autenticazione Bearer, import completo tramite pagine, recupero incrementale e SSE, secondo il contratto e l'OpenAPI del progetto `messages-scraper-api`.

Il backend usa il reader quando `DISCORD_READER_API_KEY` è configurata. Per leggere thread privati, l'account del reader deve già avere `View Channel`, `Read Message History` e `Manage Threads` sui canali padri dei ticket. `Manage Threads` è un permesso di moderazione: limitarlo ai soli canali necessari. Il bot non assegna permessi, non invita né aggiunge il reader ai thread e non modifica iscrizioni esistenti; un errore HTTP 403 resta un errore di lettura, senza fallback che aggiunga l'account. I thread archiviati sono leggibili se i permessi sono già sufficienti, senza riaprirli. Con `WEB_CHAT_ENABLED=true`, il pannello mostra 20 messaggi per pagina. All'apertura legge prima la pagina recente dall'archivio cifrato e la mostra mentre aggiorna Discord; nell'intestazione appare `Refreshing messages…` fino al completamento. Lo storico precedente si carica automaticamente scorrendo in cima, con il pulsante accessibile `Load older messages` come alternativa. Ogni risposta esplicita legge un batch massimo di 20; il recupero delle novità continua per batch finché il reader segnala `syncing`/catch-up. Lo stato e i cursori cifrati usano checkpoint formato 3. Non viene avviato un import completo di tutti i ticket né uno stream reader per ogni ticket: gli eventi `GuildMessages` del bot aggiornano metadati e Unread e invalidano le conversazioni aperte tramite l'SSE staff esistente. Le richieste contemporanee sullo stesso ticket condividono il lavoro e gli errori del reader non diventano cronologie vuote né causano logout dello staff.

Il backend espone `GET /api/tickets/:id/messages?limit=20&cached=1` per leggere la pagina recente locale cifrata senza contattare il reader; è distinto dalle route `/v1/*` del servizio esterno. La cache del reader, descritta nella guida qui sotto, riguarda soltanto metadati dei canali e non la cronologia. Avatar e immagini vengono caricati direttamente dal browser dai loro URL; `avatar_url` opzionale del reader è accettato solo sul CDN Discord. Non si fanno lookup `userProfiles`: restano la cache Discord SDK e i fallback già salvati, incluso `openerAvatarUrl` per la lista ticket.

La creazione dei ticket continua ad aggiungere il richiedente; gli inviti staff previsti dal flusso restano invariati. L'accesso del reader dipende dai permessi già assegnati al suo account sui canali padri, non dall'iscrizione ai thread.

`MESSAGE_CONTENT_APPROVED` resta indipendente e non viene attivato dal reader. Senza chiave reader resta il percorso `discord.js` esistente. Il reader non invia messaggi, non sostituisce OAuth, ruoli, webhook o inventario dei thread. Restano cifratura, esclusioni, cancellazioni e retention. La chiave deve rimanere nelle variabili protette del backend, mai in `VITE_*` o nel browser.

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

Le pagine di conversazione già lette non scadono automaticamente; i record preesistenti con expiry a 30 giorni vengono migrati all'avvio prima della scadenza. Il dettaglio web include i metadati ancora conservati. Eliminare un thread cancella subito conversazione e descrizione, mentre i metadati residui del ticket eliminato scadono dopo 30 giorni. Le vecchie cards rimangono in Discord: il codice non le cancella automaticamente.

## HTTPS e cloudflared nel container Node

Creare una volta un tunnel **gestito**, con hostname stabile nel proprio account Cloudflare, instradato a `http://127.0.0.1:7777`, seguendo la guida in console. Impostare il token del connector in `TUNNEL_TOKEN` tramite variabili protette o `.env`; non il comando di installazione completo.

Su Linux x64/arm64, se `CLOUDFLARED_PATH` è vuoto, il bootstrap scarica automaticamente il binario ufficiale in `.runtime/`, controlla il SHA256 prima di renderlo eseguibile e lo riusa agli avvii successivi. Versione fissata **2026.10.2**, con checksum della [release ufficiale](https://github.com/cloudflare/cloudflared/releases/tag/2026.10.2); nessun download di `latest`. Per usare un binario proprio impostare `CLOUDFLARED_PATH`. Node lo avvia come figlio senza shell, senza root, senza installare un servizio e senza condividere i segreti Discord con il processo.

HumbleServers deve permettere esecuzione del binario e uscita verso Cloudflare sulla porta **7844**. `TUNNEL_PROTOCOL=http2` usa TCP se UDP/QUIC non funziona; non elimina il requisito 7844. Se l'hosting vieta questi requisiti, serve un proxy del provider o un connector esterno. Non è stato testato sull'account reale.

Non usare Quick Tunnel in produzione: URL instabile e mancanza di supporto SSE. Non aggiungere Cloudflare Access davanti a `/privacy` o `/api/privacy`: sono pubblici. `/api/stats` è server-to-server e richiede solo il suo `STATS_API_TOKEN` Bearer; non usa una sessione Discord o il ruolo staff. Gli altri endpoint privati per ticket, il pannello, SSE e azioni web richiedono il ruolo configurato in `SUPPORT_TEAM_ROLE_ID`; se la variabile è vuota, si usa `config.roles.support_team`. Il valore HumbleServers di produzione è `784529945049038899`. `OWNER_ID` identifica solo il destinatario delle escalation e non concede alcun bypass. Il server accetta solo hostname HTTPS configurato e si fida degli header proxy soltanto da loopback. Verificare l'eventuale health check Pterodactyl prima di cambiare `WEB_HOST`; nessun accesso ai ticket tramite l'endpoint HTTP del provider è consentito.

Dettagli e criteri di collaudo: [.tasks/private-tickets-web/DEPLOYMENT.md](.tasks/private-tickets-web/DEPLOYMENT.md). Token e domini non vengono creati automaticamente.

## Privacy, archivio e form Discord

La policy effettivamente servita è generata da [privacy.js](privacy.js) su `/privacy`, attraverso il pannello shadcn. Il documento [PRIVACY.md](.tasks/private-tickets-web/PRIVACY.md) conserva la bozza iniziale. Compilare con fatti verificati `PRIVACY_HOSTING_REGION` (incluse garanzie sui trasferimenti), `PRIVACY_EMAIL_PROVIDER` e `PRIVACY_BACKUP_POLICY`: senza questi dati la policy mostra un avviso di configurazione incompleta.

Contatto: **info@devs.beer**. `/tickets-privacy` in Discord mostra la policy e offre esclusione dalla copia web e cancellazione locale con conferma; `/privacy` resta disponibile come alias. Il pannello di creazione mostra il link alla policy sia nell'embed sia come pulsante finale. Lo staff non deve chiedere password o token personali per identificare il richiedente. Restano preferenze minime protette per impedire che importazioni ricreino i dati esclusi.

I nuovi record e messaggi usano AES-256-GCM con chiavi derivate distinte per cifratura e indici HMAC. Le sessioni sono cifrate nel database e scadono dopo 30 giorni di inattività. Il bot non scrive più log privati su disco. **Vecchi `data/log.txt`, esportazioni e backup preesistenti non vengono automaticamente cifrati o eliminati**: devono essere gestiti prima di dichiarare nel form che tutti i dati conservati sono cifrati a riposo.

Conservazione: le pagine di conversazione già lette sono conservate nell'archivio cifrato su disco senza scadenza automatica, anche dopo chiusura, blocco o archiviazione del ticket. Ogni pagina reader viene cifrata e salvata in una singola transazione SQLite: il rollback ripristina record, cache e revisione; il commit emette un solo evento di modifica. Non viene avviato un nuovo import completo automatico. All'avvio, i record preesistenti con scadenza di 30 giorni vengono migrati prima dei controlli di scadenza. I dati già eliminati non vengono ricreati. Eliminare il thread Discord cancella subito conversazione e descrizione; i metadati residui del ticket eliminato scadono dopo 30 giorni. Opt-out, richieste di cancellazione e purge restano applicati e impediscono la resurrezione dei dati. Le sessioni mantengono la scadenza di 30 giorni e le statistiche quella di 730 giorni. Gli allegati sono URL/metadati, non file conservati in modo permanente, e i loro URL possono scadere.

`MESSAGE_CONTENT_APPROVED=false` è il valore iniziale: il bot riceve comunque ID, autore e data tramite `GuildMessages`, senza il contenuto. Con il reader configurato, la conversazione viene recuperata su richiesta senza abilitare l'intent Message Content del bot. In alternativa, dopo concessione e verifica dei requisiti, `true` abilita il percorso diretto `discord.js`, incluso l’import della cronologia dei soli ticket all’avvio. La modifica alla conservazione non aggiunge nuovi import automatici; il percorso reader resta su richiesta. Gli allegati sono riferimenti, non copie binarie permanenti; i loro URL possono scadere.

`WEB_CHAT_ENABLED=false` è indipendente: la visibilità web richiede questo flag a `true` e una sorgente di contenuti abilitata (reader configurato oppure `MESSAGE_CONTENT_APPROVED=true`). Le azioni staff abilitate dal pannello sono chiudere, chiudere e bloccare, riaprire, escalare e risolvere un’escalation. Le risposte web restano disabilitate di default. L’escalation aggiunge al ticket privato il proprietario configurato in `OWNER_ID` e avvisa solo lui.

### Risposte staff via webhook

`WEB_REPLIES_ENABLED=false` resta il valore in `.env.example` e il default. Il composer richiede `WEB_CHAT_ENABLED=true`, `WEB_REPLIES_ENABLED=true` e una sorgente di contenuti abilitata (reader configurato oppure `MESSAGE_CONTENT_APPROVED=true`). Per questa installazione `WEB_REPLIES_ENABLED=true` viene configurato su richiesta esplicita dell’utente; le nuove installazioni mantengono il default disabilitato. Non attivare Message Content prima dell'autorizzazione Discord. Il bot deve poter vedere il thread privato e inviarvi messaggi, e avere **Manage Webhooks** sul canale padre.

`POST /api/tickets/:id/reply` accetta `content` (1–2000 caratteri) e l'opzionale `clientNonce` UUIDv4, con sessione staff, Origin e CSRF validi. Il server rilegge il membro Discord autenticato e usa `displayName` e `displayAvatarURL` aggiornati del server; il nonce non cambia mai l'identità attribuita. Il browser non sceglie nome, avatar, autore, destinazione o URL del webhook. Il webhook viene creato/riusato una volta per canale padre, appartiene al bot e spedisce solo al `threadId` autorizzato; il messaggio è marcato come app. Creazioni concorrenti sono condivise; nessun webhook per persona o per ticket. Non vengono abilitate menzioni automatiche di utenti o ruoli. Token e URL con token rimangono sul server.

L'archivio cifrato conserva l'ID staff reale insieme al webhook, anche dopo eventi Gateway, modifiche e backfill; lo stesso ID permette attribuzione e cancellazione locale. Il clientNonce collega in modo opaco la preview al messaggio salvato quando il server lo conferma; non è persistito per tentare una riconciliazione testuale. Le preview mostrano l'invio attenuato, poi Sent o Failed; un errore richiede retry manuale. Un webhook estraneo con nome simile non acquisisce l'attribuzione. I messaggi Discord restano messaggi webhook/app, non messaggi nativi dell'account personale. Invii e chiusure concorrenti dello stesso ticket sono bloccati; i ticket chiusi/bloccati/esclusi non vengono riaperti dall'invio. Se il webhook fallisce non viene spedita una copia con il bot né un messaggio nel canale padre.

`GET /api/tickets/:id/mentions?users=CSV&roles=CSV` fornisce nomi per le menzioni della chat. Accetta al massimo quattro ID complessivi, con sessione staff e ticket validati e ricontrollati. La snapshot in cache torna subito; il lookup dei membri Discord continua in background con al massimo quattro richieste globali concorrenti e cooldown di 60 secondi dopo un errore, entro una cache limitata a 1000 voci. Il rendering della preview non attende il lookup. I risultati sono mappe sparse: i nomi possono mancare, i ruoli includono il colore quando disponibile e l'ID resta il fallback.

Riferimenti ufficiali: [Execute Webhook](https://github.com/discord/discord-api-docs/blob/main/developers/resources/webhook.mdx#execute-webhook), [Threads — Webhooks](https://github.com/discord/discord-api-docs/blob/main/developers/topics/threads.mdx#webhooks). L'API documenta `thread_id`, `username` e `avatar_url` per i thread in generale; il funzionamento con i permessi effettivi dei nostri thread privati richiede una verifica sul server Discord reale. Queste modifiche sono state provate con webhook simulati; non sono state attivate su Humble.

La regressione browser per caricamento progressivo e refresh si trova in `test/progressive-chat.browser.js`; richiede la dashboard fixture locale con chat mock abilitata e il ticket fixture indicato nello script.

### Diagnostica chat

La diagnostica è disattivata per impostazione predefinita. Per abilitarla, creare via SFTP il file vuoto `.runtime/chat-debug.enabled`. Dopo il primo deploy del codice occorre riavviare il bot; in seguito, la creazione o rimozione del flag attiva o disattiva la raccolta senza riavvio. Dopo averlo attivato, ricaricare il browser: la sessione espone `capabilities.chatDebug` come opt-in e il dettaglio ticket invia un solo `POST /api/debug/chat`, dopo due frame del browser e il completamento di Lit, quando la vista è pronta. La rotta richiede sessione staff e CSRF validi; i report senza autenticazione non vengono accettati. La verifica di autorizzazione avviene dopo che l'anteprima è pronta.

I log restano privati sul server in `.runtime/chat-debug.ndjson`, con un solo file precedente `.runtime/chat-debug.ndjson.1`; ciascun file ruota a circa 2 MiB. Le scritture sono asincrone, serializzate e best effort, con coda massima di 200 eventi; gli errori producono al più un avviso generico. Lo stesso file registra `shutdown_requested`, `shutdown_complete`, `shutdown_timeout` e `shutdown_error`, con origine del comando e durata: se manca `shutdown_requested` dopo Stop, il processo non ha ricevuto un comando/segnale riconosciuto oppure sta ancora eseguendo il codice precedente. Il backend registra fasi HTTP, autenticazione e ricontrollo staff, coda ticket, richieste e risposte del reader, retry, sincronizzazione, persistenza e snapshot. I campi ammessi includono tempi, conteggi, status e indicatori booleani. Ogni `http_end` include `loopMaxMs` e `loopMeanMs`: ritardo del ciclo eventi Node campionato a 20 ms dalla precedente risposta tracciata, utile per distinguere un blocco del processo dall'attesa esterna. Il report browser misura `firstDataMs`, `moduleMs`, `readyMs`, conteggio, cache e visibilità.

Gli eventi possono includere un `requestId` UUID generato dal server e un `viewId` UUID del browser. Per l'analisi autorizzata sono ammessi ID ticket/messaggio e cursori solo dopo validazione; `discordUrl` contiene esclusivamente URL `discord.com/channels/...` senza query. `requestPath` è un percorso interno normalizzato. Si registrano inoltre byte del contenuto e tempi, mai body dei messaggi, segreti o query arbitrarie. Per disattivare basta rimuovere `.runtime/chat-debug.enabled`; i log esistenti non vengono cancellati. Si possono leggere solo tramite accesso SFTP privato: non esiste un endpoint HTTP di download. Il report riguarda il primo rendering visibile del dettaglio chat; non misura il completamento del download di font o immagini. Un campione reale è stato raccolto il 2026-11-06: due aperture hanno richiesto circa 1,8 s e 14,1 s; la seconda partiva senza cache. Letture reader da 4,9 s e 9,8 s, attesa nella coda client fino a 2,1 s e annullamenti/rilanci SSE spiegano il ritardo osservato. I tempi delle fasi possono sovrapporsi e non vanno sommati. Dopo il riavvio dello scraper con le pause arbitrarie rimosse, due nuove aperture hanno registrato letture reader di 0,89 s e 0,83 s e interfaccia pronta in 3,18 s e 2,88 s; il primo risultato era vuoto. Le chiamate sequenziali dirette ai metadati sono scese a 0,54 s e 0,37 s. Gli annullamenti/rilanci della dashboard sono stati corretti con refresh accorpati. Nel controllo successivo sul ticket segnalato: cache1,27 s, reader1,20 s, persistenza0,60 s per5 messaggi e interfaccia3,71 s, senza richieste annullate. Il log ha individuato ulteriori scansioni globali di scadenza: le richieste del singolo ticket ora controllano soltanto quel record, anche dopo le attese; elenco, statistiche e riconciliazione mantengono la pulizia globale. La scadenza resta immediata e non è stata introdotta una finestra di cache. Dopo il riavvio e la riapertura dello stesso ticket, prima risposta in 0,67 s e chat pronta in 1,05 s; persistenza 12 ms per gli stessi 5 messaggi upstream / 4 visibili, reader 1,18 s, senza annullamenti, retry o errori. È un singolo confronto reale con cache presente, non una garanzia per altri ticket. Cache e conteggi differiscono fra i campioni: non è un benchmark controllato né una garanzia di latenza; vedere il [checkpoint](.tasks/private-tickets-web/STATUS.md) per i limiti.

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

Per sviluppare e provare il pannello con dati mock, installare una volta le dipendenze frontend (`npm --prefix web ci`), poi:

```sh
npm run mock
```

Aprire `http://127.0.0.1:4173/fixture/login`. Per gli altri dispositivi della propria rete Tailscale:

```sh
npm run mock:tailscale
```

Il comando usa l’ingresso HTTPS privato Tailscale già configurato: su questo PC è `https://fisso.tail1d020c.ts.net:9443/fixture/login`, che inoltra a `127.0.0.1:8766`. Frontend e backend ascoltano solo su loopback; Tailscale gestisce HTTPS e IPv4/IPv6. Gli altri PC devono avere Tailscale connesso e poter raggiungere questo dispositivo secondo le ACL della rete. Usare l’URL stampato, compreso il nome host, affinché il controllo Origin delle azioni corrisponda. La fixture verifica la rotta Serve attesa e rifiuta una rotta con Funnel pubblico; non modifica la configurazione Tailscale.

Vite serve i sorgenti React e applica HMR: modificare `web/src/` per vedere subito il risultato, senza build o deploy. Il pulsante Sign in with Discord esegue un login simulato locale. Sono disponibili 32 ticket sintetici, utenti/avatar di esempio, tutti gli stati e date dell’ultimo messaggio indipendenti dall’importazione; azioni e aggiornamenti live operano soltanto sui dati in memoria. Riavviare per ripristinare i ticket. `.env`, token reali, bot Discord e tunnel Cloudflare non vengono caricati.

La chat mock è attiva di default in modalità `--dev`, con [Skyra Discord Components](https://github.com/skyra-project/discord-components) e [Discord Markdown Parser](https://github.com/ItzDerock/discord-markdown-parser): avatar, markdown, risposte, reazioni, embed e allegati sintetici. Il primo ticket contiene 64 messaggi per provare lo storico. **Send message** (o Invio) riceve una risposta simulata dopo circa un secondo; **Simulate incoming** permette di provare l'arrivo di nuovi messaggi. SSE aggiorna le altre sessioni aperte senza ricaricare il documento. `UI_FIXTURE_CHAT=false npm run mock:tailscale` nasconde la chat; per la fixture precompilata abilitarla con `UI_FIXTURE_CHAT=true`. L’invio staff attraversa lo stesso endpoint `/api/tickets/:id/reply` e lo stesso servizio di produzione, con un webhook Discord simulato; le altre API mock sono registrate soltanto dalla fixture di sviluppo. La fixture abilita i tre flag solo nel proprio processo e non modifica `.env`, intent o configurazione di produzione.

I ticket con nuovi messaggi hanno sfondo azzurro chiaro e badge **Unread**, condivisi dallo staff. La lettura viene confermata solo quando l'ultimo messaggio è visibile nella chat e la scheda è attiva; scorrere lo storico non segna come letto un messaggio più recente. Se la chat web non è disponibile, **Mark as read** permette la conferma manuale dopo aver letto in Discord. Vengono conservati solo data e ID del messaggio letto, senza registrare l'identità del lettore. Le conferme non cambiano la data dell'ultimo messaggio.

Fermare con Ctrl+C nel terminale che ha avviato il comando. `UI_FIXTURE_PORT` cambia la porta locale (4173 per mock locale, 8766 per Tailscale). `UI_FIXTURE_HTTPS_PORT` cambia la porta HTTPS Tailscale (9443); in quel caso la rotta Serve deve già puntare alla porta locale scelta. L’ingresso HTTPS già configurato resta disponibile dopo l’arresto del mock, ma risponderà solo quando il suo backend è avviato. Per verificare login, CSRF, azioni e isolamento dei file: `npm run test:mock`.

La chat usa un unico pannello con intestazione e composer fissi: **Invio** spedisce, **Maiusc+Invio** inserisce una nuova riga. Il titolo e il placeholder mostrano il nome completo del thread. I refresh live sono accorpati: una revisione nuova non annulla una richiesta ancora utile, e focus, bozza, messaggi già caricati e anchor visibile restano stabili durante aggiornamenti e caricamento dello storico. Le date usano l'inglese come locale predefinito. Lo sfondo chat segue i colori Discord scuri (`#1a1a1e`, intestazione `#121214`, input `#222327`) usando gli stili supportati dal componente, senza accesso forzato allo Shadow DOM. I messaggi in arrivo scorrono in basso solo se si sta leggendo il fondo; nello storico compare il pulsante **New messages — jump to present**.

Regressione browser ripetibile senza dipendenze aggiuntive: aprire un ticket mock, incollare `test/chat-ui.browser.js` nella console DevTools ed eseguire `await verifyTicketChat()`. La funzione rifiuta sessioni non mock. Simula rete lenta e invio fallito; verifica geometria a ogni frame, focus/bozze, invii duplicati, IME, testo multilinea, paginazione, lettura condivisa e recupero dopo errore. Ripetere su un ticket appena aperto per esercitare il cursore dello storico. La prova ripristina `fetch` al termine e aggiunge soltanto messaggi sintetici.

La fixture precompilata rimane disponibile per le verifiche visuali dopo la build:

```sh
NODE_ENV=development node test/ui-fixture.js
```

Senza `--dev`, lo script stampa URL e PID, ascolta solo su loopback su porta temporanea e usa `web/dist`. Aprire il suo `/fixture/login`. Le prove mock non attestano accesso al server Discord reale o compatibilità HumbleServers.

## Persistent sign-in

The dashboard uses an HttpOnly, Secure, SameSite=Lax cookie with a rolling 30-day lifetime. Sessions are encrypted in the existing database and survive bot restarts when `data/`, `.runtime/` and the original keys are preserved. OAuth is used only to verify identity at sign-in; OAuth access/refresh tokens are not stored. Later requests verify the required role through the bot SDK, which handles Discord rate limits. Only pending concurrent role checks are shared; completed allow/deny results are not cached. Missing role or guild membership blocks access even with a remembered cookie. Temporary lookup failures return 503 without destroying the session and are logged with safe numeric codes/status. Logout and local data erasure revoke persisted sessions, including protection against stale in-flight saves. Pre-login state lasts at most ten minutes.
