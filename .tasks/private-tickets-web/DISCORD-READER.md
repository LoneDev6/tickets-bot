# Integrazione Discord Reader

Guida per il backend CommonJS Node.js/Express di questa repository. Il servizio read-only è operativo e il backend integra letture REST su richiesta. Gli esempi di import completo sotto sono facoltativi: il runtime carica la pagina recente all'apertura del ticket e il passato durante lo scorrimento, senza scaricare preventivamente tutti i ticket.

Fonti lette sullo stesso computer: [contratto API](/home/matteo/Documents/Progetti/Discord/messages-scraper-api/docs/API.md) e [OpenAPI 3.1](/home/matteo/Documents/Progetti/Discord/messages-scraper-api/docs/openapi.json) nel progetto separato `messages-scraper-api` (file locali, non distribuiti con questa repository). Il servizio non espone `/openapi.json` o Swagger. Le regole sotto sono state confrontate anche con la paginazione in `src/discord.js` e le route in `src/http.js` di quel progetto.

## Configurazione e autenticazione

Configurare nel backend client, tramite variabili protette del pannello o `.env` privata:

```dotenv
DISCORD_READER_BASE_URL=https://ds-scrape-api.devs.beer
DISCORD_READER_API_KEY=<segreto da configurare nel backend>
WEB_CHAT_ENABLED=true
```

L'account Discord usato dal reader deve già appartenere alla guild e avere `View Channel`, `Read Message History` e `Manage Threads` sui canali padri dei ticket da leggere. `Manage Threads` è un permesso di moderazione: limitarlo ai soli canali necessari. Il bot non assegna permessi, non invita né aggiunge il reader ai thread e non modifica iscrizioni esistenti. Un HTTP 403 del reader resta un errore di lettura, senza fallback che aggiunga l'account. I thread archiviati sono leggibili con questi permessi senza riaprirli. La creazione dei ticket continua ad aggiungere il richiedente e gli inviti staff normali restano invariati. `.env` esistenti possono conservare `DISCORD_READER_USER_ID`, ma il bot non ne ha bisogno. Senza chiave reader si conserva il comportamento `discord.js` precedente; con il reader `MESSAGE_CONTENT_APPROVED` può restare `false`.

L'origine non ha prefisso `/api`. Ogni richiesta, anche `/health` e l'apertura SSE, richiede esattamente:

```http
Authorization: Bearer <DISCORD_READER_API_KEY>
```

La chiave corrisponde all'`API_KEY` del servizio esterno. Non usare `DISCORD_TOKEN`, `TUNNEL_TOKEN` o `STATS_API_TOKEN` per autenticare i client reader. Le credenziali del bot e del tunnel attuali mantengono i rispettivi scopi e non vanno trasferite al reader. La chiave reader deve rimanere nel backend: mai nel bundle React/Vite, in variabili `VITE_*`, URL, cookie o log. Non registrare gli header di autorizzazione. Non ci sono account client separati: la chiave accede ai server configurati e ai dati leggibili dall'account del servizio.

## Endpoint e URL

Tutte le route sono **GET senza body**; query sconosciute o duplicate sono rifiutate.

| Richiesta | Risposta / uso |
| --- | --- |
| `/health` | `{ "status": "ok" }`; salute del processo HTTP, non verifica di Gateway, token Discord o permessi |
| `/v1/channels?guild_id=GUILD_ID` | `{ guild_id, channels }`; metadati dei canali, senza messaggi, paginazione o enumerazione completa dei thread |
| `/v1/channel?url=URL_CANALE_O_THREAD` | `{ channel }`; verifica anche guild effettiva e genitore del thread annidato |
| `/v1/messages?url=URL_CANALE_O_THREAD&limit=100` | `{ channel_id, messages, pagination }`; una pagina di cronologia |
| `/v1/message?url=URL_COMPLETO_MESSAGGIO` | `{ message }`; ID esatto, nessun messaggio vicino in sostituzione se assente |
| `/v1/events?url=URL_CANALE_O_THREAD` | `text/event-stream` persistente, un canale/thread per connessione |

| Risorsa | URL accettato nel parametro `url` |
| --- | --- |
| Canale o thread diretto | `https://discord.com/channels/GUILD_ID/CHANNEL_ID` |
| Thread annidato | `https://discord.com/channels/GUILD_ID/PARENT_ID/threads/THREAD_ID` |
| Messaggio | `https://discord.com/channels/GUILD_ID/CHANNEL_OR_THREAD_ID/MESSAGE_ID` |

Per un messaggio nel thread usare il **thread come CHANNEL_ID**, senza `/threads/` nel link del messaggio. Sono ammessi anche `www.discord.com` e lo slash finale; non HTTP, query/fragment nell'URL Discord, inviti, domini diversi o DM `@me`. Codificare i parametri con `URLSearchParams` o equivalente.

Tutti gli ID e cursori sono stringhe Snowflake decimali (16–20 cifre, maggiori di zero e al massimo `2^64 - 1`), **mai `Number` JavaScript**. Non ordinare convertendo a Number. I metadati di un canale non garantiscono accesso alla sua cronologia. Categorie e canali senza messaggi danno `400 channel_has_no_messages`; per un forum occorre il thread specifico.

## Cronologia completa accessibile e novità

Non esiste un endpoint che restituisce tutta la chat in un'unica risposta. Per importare tutto il passato ancora accessibile di un canale/thread:

1. Leggere `/v1/messages` con `url` e `limit=100` (range 1–100; default del servizio 50).
2. Salvare/upsertare i messaggi per ID, completando la persistenza prima di avanzare.
3. Richiedere la pagina successiva con `before=pagination.next_before`.
4. Continuare **in sequenza** fino a `next_before=null`.

`before` è esclusivo: ID strettamente minore del cursore. Per le novità partire da `after=ID_PIU_RECENTE_SALVATO` (esclusivo: ID strettamente maggiore), poi avanzare con `pagination.next_after` fino a `null`. Non combinare mai `before` e `after`. Con `after`, Discord legge la pagina adiacente al cursore; il servizio riordina anche questa pagina **dal più recente al più vecchio**. Non fermarsi alla prima pagina piena e non sostituire il cursore con l'ID più vecchio.

`pagination.count` conta i messaggi della singola pagina, non il totale. Solo se `count === limit` entrambi i cursori sono valorizzati: `next_before` è l'ID più vecchio, `next_after` il più recente della pagina. Una pagina corta o vuota ha entrambi a `null`. Una pagina piena può richiedere un'ultima richiesta vuota. Alla fine del recupero incrementale salvare il nuovo checkpoint anche se l'ultima pagina corta ha `next_after=null`: è il messaggio più recente persistito, non il cursore nullo. Se non ci sono novità, conservare il checkpoint precedente.

Il reader può aggiungere `author.avatar_url` opzionale: è derivato dai campi autore già presenti nel messaggio, senza chiamate profilo, e punta al CDN `cdn.discordapp.com`. Il browser carica l'immagine direttamente da quel CDN. La UI usa anche la cache utenti dell'SDK e gli avatar salvati come fallback; il checkpoint reader corrente è formato 3.

Il servizio riusa metadati di canale validati per 60 secondi, fino a 500 canali. Questa cache non include messaggi: ogni lettura della cronologia consulta Discord e verifica i permessi correnti. `/v1/channel` continua a leggere metadati freschi. Una cache fredda o scaduta richiede metadati e cronologia; le pagine ordinarie con metadati caldi eliminano una chiamata GET upstream. La FIFO globale resta attiva. Non sono aggiunte pause casuali dopo i tentativi REST; rimangono i limiti e i reset comunicati da Discord. Il guadagno reale richiede una misura dopo il riavvio dello scraper.

### Esempio Node.js lato backend

Il client implementato in [`discord-reader.js`](../../discord-reader.js) usa `fetch` e `URLSearchParams` nativi, un solo tentativo upstream alla volta e al massimo 50 operazioni locali in attesa. Valida destinazione, ID, ordinamento e cursori delle risposte. Ogni tentativo REST ha timeout di 110 secondi. Ritenta al massimo due volte dopo il primo tentativo per `429`, `500` e `502`, rispettando `Retry-After` con jitter; gli altri errori restano distinti e non vengono convertiti in `[]`. Le richieste e le attese sono cancellate allo shutdown.

Esempio da eseguire dalla root del progetto, dentro un flusso backend autorizzato:

```js
const { DiscordReader } = require('./discord-reader');
const reader = new DiscordReader({
    baseUrl: process.env.DISCORD_READER_BASE_URL,
    apiKey: process.env.DISCORD_READER_API_KEY,
});

async function importHistory(guildId, threadId, upsertPage) {
    let before;
    do {
        const page = await reader.messages(guildId, threadId, { ...(before ? { before } : {}) });
        await upsertPage(page.messages);
        before = page.pagination.next_before;
    } while (before !== null);
}

async function recoverNew(guildId, threadId, newestId, upsertPage) {
    let after = newestId;
    do {
        const page = await reader.messages(guildId, threadId, { after });
        await upsertPage(page.messages);
        if (page.messages.length) newestId = page.messages[0].id;
        after = page.pagination.next_after;
    } while (after !== null);
    return newestId; // Persistire solo dopo il successo di tutte le pagine.
}
```

`upsertPage` è un callback da collegare alla persistenza autorizzata. Nel runtime, [`ticket-service.js`](../../ticket-service.js) mappa il JSON nell'archivio cifrato esistente, mantiene attribuzione staff, esclusioni, cancellazioni e retention. Ogni pagina viene salvata in una singola transazione SQLite: se fallisce, i record e il checkpoint tornano allo stato precedente e la cache viene riallineata; il commit riuscito emette un solo evento `change`. I marcatori delle modifiche note vengono persistiti: il messaggio viene riletto per ID quando entra nella pagina consultata. Per elaborare una pagina in ordine cronologico usare `[...page.messages].reverse()`, senza cambiare i cursori. Dopo un import iniziale il checkpoint è l'ID più recente salvato, non quello dell'ultima pagina storica.

Il backend del bot espone inoltre `GET /api/tickets/:id/messages?limit=20&cached=1`: serve la pagina recente locale cifrata prima del refresh, senza chiamare il reader esterno. Non è una route `/v1/*` e non modifica il contratto del servizio esterno. La UI mostra 20 messaggi, poi aggiorna Discord con `Refreshing messages…`; il catch-up continua per batch da 20 mentre `syncing` è vero. Revisioni nuove accorpano i refresh senza annullare richieste ancora utili e la finestra/anchor visibile resta stabile. Lo storico si carica automaticamente scorrendo in cima, con il pulsante `Load older messages` accessibile come fallback.

`GET /api/tickets/:id/mentions?users=CSV&roles=CSV` è una route interna, non un endpoint del reader. Limita a quattro il totale degli ID, valida ticket e staff e ripete il controllo di autorizzazione. La snapshot sparsa in cache torna subito; i lookup dei membri proseguono in background, con un massimo globale di quattro concorrenti, cooldown di 60 secondi sugli errori e cache limitata a 1000 voci. Le mappe includono solo nomi disponibili e colore ruolo quando presente; la UI usa gli ID mancanti come fallback e la preview non aspetta i lookup.

Le pagine già lette rimangono nell'archivio cifrato su disco senza scadenza automatica, anche dopo la chiusura del ticket. Non viene avviato un nuovo import completo automatico della cronologia: la lettura resta progressiva e avviene quando richiesta dalla UI. I record preesistenti con expiry di 30 giorni vengono migrati all'avvio prima dei controlli di scadenza; opt-out, erasure, purge e prevenzione della resurrezione restano applicati.

Un messaggio singolo si legge con `await reader.message(guildId, threadId, messageId)`, che restituisce `{ message }`. Chiamare `reader.close()` quando il client non serve più; il servizio del bot lo fa durante lo shutdown.

## FIFO, timeout ed errori

- FIFO globale condivisa fra i client: **una sola operazione REST upstream alla volta**, massimo **50 richieste in attesa**, attesa massima **60 secondi**; oltre i limiti `429 queue_full` / `queue_timeout`. Le pagine dipendono dal cursore precedente e non vanno parallelizzate.
- Nessuna pausa artificiale fra tentativi upstream; una lettura può fare più richieste Discord e deve rispettare i reset dei bucket. Timeout REST client consigliato: **110 secondi**, distinto dalla connessione SSE persistente.
- Quote condivise per processo: 30 richieste autenticate/minuto e 120 HTTP totali/minuto, inclusi `/health` e apertura SSE. Gli eventi di uno stream aperto non sono nuove richieste HTTP. Evitare health polling frequente.
- Ogni `429` applicativo contiene `Retry-After` in secondi interi. Attendere almeno quel valore, aggiungere jitter e fissare un numero finito di retry; lo scraper usa il maggiore fra `Retry-After` e `retry_after` validi più un secondo di margine, senza un minimo fisso di un minuto. Solo senza indicazioni valide usa un fallback di 60 secondi più margine. Il cooldown è conservativamente condiviso fra tutte le letture upstream; non esiste retry automatico dello scraper.

Gli errori applicativi hanno forma `{ "error": { "code": "discord_rate_limited" } }`, senza `error.message` né `retry_after` nel JSON REST. Il client conserva `readerStatus`, `readerCode` e `retryAfter` nell'errore backend. Un proxy può invece restituire HTML, errori di rete o timeout: verificare status e Content-Type, senza presumere JSON o mascherare l'errore come cronologia vuota.

| HTTP | Gestione |
| --- | --- |
| 400 / 405 | Correggere URL/query/cursori/body o metodo; nessun retry identico |
| 401 `unauthorized` | Chiave API client mancante/errata; correggere il segreto backend |
| 403 | Distinguere `guild_not_allowed`, `channel_mismatch`, `discord_access_denied` da blocchi del proxy; correggere server/URL/permessi |
| 404 | Route o risorsa non trovata, compreso messaggio cancellato; non equivale a cronologia vuota |
| 429 | `api_rate_limited`, `discord_rate_limited`, `queue_full`, `queue_timeout`, `too_many_streams`: `Retry-After`, jitter, retry limitati |
| 500 / 502 | `internal_error` / `discord_unavailable`, oppure errore proxy: backoff e retry limitati, segnalare persistenza |
| 503 | `discord_authentication_failed` / `shutting_down`: servizio da correggere o in arresto, evitare cicli rapidi |

`401` riguarda il client reader. `503 discord_authentication_failed` riguarda invece il token Discord del servizio, che interrompe le chiamate Discord fino al riavvio con credenziali corrette. Non tentare di risolverlo sostituendo la chiave client con `DISCORD_TOKEN`.

## Eventi SSE e riconnessione

Questa sezione descrive il contratto del servizio esterno. L'adattatore attuale non apre `/v1/events`: usa gli eventi Gateway del bot e l'SSE staff già esistente. Il limite di 10 stream del reader non limita quindi il numero di ticket consultabili dal pannello.

`GET /v1/events?url=URL_CANALE_O_THREAD` richiede `Authorization`. L'`EventSource` nativo del browser non permette questo header e il servizio non abilita CORS cross-origin: usare il backend o un client SSE basato su `fetch`, mantenendo comunque la chiave sul backend. Non sostituire con questo URL l'`EventSource` del pannello, che usa la sessione staff di questa applicazione.

| Evento | Applicazione |
| --- | --- |
| `message_create` | Upsert del messaggio per ID |
| `message_update` | Merge dei soli campi presenti; è parziale, campo assente non azzera, `null` esplicito mantiene il suo significato |
| `message_delete` | Elimina o marca cancellato il record con `id` |
| `message_delete_bulk` | Stessa operazione per ciascun elemento di `ids` |
| `status` | Stato della connessione, mai contenuto della cronologia |

Gli stati sono `connecting`, `ready`, `reconnecting`, `unavailable`, `failed`. Con `reconnecting`, `retry_after` è un'attesa Gateway indicativa in secondi: **tenere aperto lo stream**, senza aprirne altri. `ready` indica Gateway connesso e sottoscrizione inviata, non backfill completato. `unavailable` (`channel_access_lost`) e `failed` (`discord_gateway_rejected`) precedono la chiusura. Prima del `200` gli errori sono HTTP JSON; dopo il `200` osservare eventi `status` o fine stream, anche senza ultimo evento.

Il consumer deve decodificare UTF-8 in modo incrementale e accumulare frame fino alla riga vuota: i chunk HTTP non coincidono con gli eventi. Leggere `event` e il JSON di `data`, ignorare commenti `:` e heartbeat ogni 15 secondi. Non usare `response.json()` sullo stream né un timeout totale REST. Chiudere con `AbortController`/cancel quando non serve; massimo **10 stream per processo**, un client lento può essere scollegato.

Non ci sono replay persistente, frame `id:`, supporto `Last-Event-ID` o garanzia exactly-once. Aprire lo stream e attivare il consumer con buffer limitato prima del recupero REST; recuperare con `after` dal checkpoint persistito, poi deduplicare per ID. Su fine stream riconnettersi con backoff (rispettando `Retry-After` se l'apertura riceve `429`) e ripetere REST. Le novità ancora leggibili sono recuperabili; **modifiche e cancellazioni perse non sono garantite recuperabili** con `after`. Un resume Gateway non è replay per il client HTTP.

## Dati e discrepanze dell'integrazione attuale

La cronologia comprende soltanto ciò che l'account del servizio può ancora leggere: nessun recupero dei messaggi cancellati. `content` è testo non attendibile, da rendere senza HTML non sanitizzato. `author` può essere `null`; `timestamp` e `type` possono mancare. Allegati, embed e riferimenti mantengono la forma JSON upstream: gli allegati sono metadati/URL, anche firmati e in scadenza, non file scaricati né link permanenti garantiti.

- [`settings.js`](../../settings.js) legge e valida `DISCORD_READER_*`; [`.env.example`](../../.env.example) contiene le variabili, senza credenziali reali. Il reader abilita una sorgente di contenuti indipendente dall'intent del bot; visibilità e invio restano controllati da `WEB_CHAT_ENABLED` e `WEB_REPLIES_ENABLED`.
- [`ticket-service.js`](../../ticket-service.js) recupera pagine su richiesta, accorpa richieste concorrenti sullo stesso ticket e salva messaggi e checkpoint formato 3 cifrati. Gli eventi [`bot.js`](../../bot.js) mantengono data/Unread per tutti i ticket e marcano le modifiche dei messaggi già archiviati senza richiedere subito contenuti. Le cancellazioni note lasciano un marcatore che impedisce a risposte tardive di ricreare i messaggi. `openerAvatarUrl` salvato alimenta l'avatar nella lista.
- L'inventario e il riallineamento periodico dei metadati restano nel bot; `/v1/channels` non enumera tutti i thread privati. Creazione/gestione ticket, inviti, webhook, verifica ruoli e OAuth restano responsabilità del bot/backend.
- [`server.js`](../../server.js) espone `/health` con `{ ready }`, `/api/events` con sessione staff e `/api/stats` con `STATS_API_TOKEN`: sono endpoint distinti da quelli del reader. Gli errori upstream `401`/`403`/`404` diventano un errore di disponibilità della conversazione (`503`) con messaggio distinto, senza revocare il login staff; `429` conserva `Retry-After`. Il backend ricontrolla sessione, ruolo e conservazione dopo le letture lunghe.
- Le modifiche/cancellazioni avvenute mentre il bot era scollegato non sono tutte ricostruibili con `after`. Gli URL allegati possono scadere; il browser scarica direttamente dal CDN gli avatar forniti dal reader, senza lookup `userProfiles`; in loro assenza usa gli avatar locali disponibili e poi il fallback del pannello. Non sono stati aggiunti endpoint al reader esterno, replay o download dei file. Il test browser di regressione del flusso progressivo è `test/progressive-chat.browser.js`.

Il controllo di scadenza durante apertura, lettura e ricontrollo del ticket è puntuale: non decifra tutti gli altri ticket. Elenco, statistiche e riconciliazione mantengono la pulizia globale; le scadenze e le esclusioni restano verificate senza intervalli di tolleranza.
