# HTTPS su HumbleServers / Pterodactyl

Aggiornamento implementazione: per il limite live di 256 MB, il frontend viene compilato in locale e distribuito da Git in `web/dist`, senza installazione o build sul server. Il bootstrap installa solo dipendenze bot, genera/persiste i segreti locali mancanti e scarica/verifica il connector Linux x64/arm64 automaticamente. La guida iniziale in console raccoglie solo valori pubblici e mostra i passaggi Cloudflare/OAuth; token e secret si impostano in variabili protette o `.env`. Le istruzioni sotto conservano il progetto iniziale; la procedura operativa corrente è nel [README](../../README.md).

## Vincoli confermati

- Hosting attuale: `81349c14.humbleservers.net:7777`.
- Egg Node.js Pterodactyl; niente cambio porta e niente installazioni di sistema.
- Account Cloudflare disponibile. Non sono stati consultati account, pannello hosting o credenziali.

## Proposta: tunnel gestito, avviato da Node

```text
Browser → HTTPS sul dominio del bot → Cloudflare
                                         ↑ tunnel in uscita
                              cloudflared nel container
                                         ↓ HTTP loopback
                              Express 127.0.0.1:7777
```

Il processo principale resta Node, con lo stesso entrypoint accettato da Pterodactyl. Node avvia e sorveglia il binario ufficiale `cloudflared` tramite `child_process.spawn`, senza shell. Non servono `sudo`, systemd, un altro container o una seconda porta pubblica. È comunque necessario poter caricare un eseguibile nel filesystem del server e avviarlo: non è un tunnel implementato in puro JavaScript.

Un pacchetto npm che incapsula `cloudflared` non elimina il binario sottostante. Per evitare una dipendenza inutile, preferire il binario ufficiale e la libreria standard Node, se consentiti dall'hosting.

Cloudflare richiede un dominio gestito nell'account per pubblicare un hostname stabile e un connector che raggiunga la rete Cloudflare. Il tunnel non richiede di esporre una nuova porta in ingresso. [Setup ufficiale](https://developers.cloudflare.com/tunnel/get-started/).

**Verifica decisiva sul server:** permesso di esecuzione di un binario Linux della corretta architettura e collegamento in uscita sulla porta `7844`: UDP per QUIC o TCP per HTTP/2. Avere l'allocazione pubblica `7777` non dimostra né impedisce questo egress. Se entrambi i protocolli sono bloccati o il filesystem vieta gli eseguibili, questa soluzione nel container non funziona. Non è stato verificato. [Requisiti di rete](https://developers.cloudflare.com/tunnel/configuration/#firewall-rules).

## Configurazione prevista

1. Scegliere l'hostname effettivo, per esempio `tickets.devs.beer` **solo se confermato e gestito nello stesso account**. Questo esempio non è un servizio già pubblicato.
2. Creare un tunnel remotely managed e una route hostname → `http://127.0.0.1:7777`. Il dominio del provider non va usato come destinazione quando connector ed Express sono nello stesso container.
3. Conservare il token del singolo tunnel tra i segreti/variabili consentiti dal pannello, non nel codice, in un commit o nella linea di comando stampata. Non servono credenziali amministrative Cloudflare nel bot.
4. Caricare una versione esplicita del binario ufficiale adatta a OS/architettura; verificarne origine e checksum. Nessun download di `latest` a ogni avvio e nessun aggiornamento automatico non controllato. [Download ufficiali](https://developers.cloudflare.com/tunnel/downloads/).
5. Mantenere Express sulla porta `7777`. Preferire bind loopback; verificare prima gli health check e le aspettative dell'egg. Se l'hosting richiede un bind diverso, applicare anche le difese dell'origin descritte sotto.
6. Avviare il connector soltanto dopo che il server HTTP è in ascolto, preservando stdin/console del bot. Non sostituire il comando di startup Pterodactyl con il solo `cloudflared`.
7. Usare l'URL pubblico HTTPS come base del pannello, link del messaggio riepilogativo, callback OAuth Discord e informativa `/privacy`. Registrare la callback esatta nel Developer Portal.

Argomenti previsti del processo figlio: `tunnel --no-autoupdate run`; passare `TUNNEL_TOKEN` nell'ambiente del solo figlio, senza stampare l'ambiente completo. `--protocol http2` è un'opzione diagnostica se UDP è bloccato e TCP 7844 funziona, non un modo di usare soltanto la porta 443. [Parametri ufficiali](https://developers.cloudflare.com/tunnel/reference/run-parameters/).

Passare al figlio solo l'ambiente necessario a connector e rete; non trasferire automaticamente token Discord, chiavi dell'archivio e segreti OAuth. Gestire `error` ed `exit`, avvisi senza segreti e riavvii con ritardo limitato; interrompere i riavvii durante lo shutdown. Memorizzare PID/handle e fermare il solo figlio del bot su `SIGTERM`/`SIGINT`, attendendone l'uscita. Il bot Discord può continuare a funzionare se il tunnel cade; il pannello va segnalato non disponibile.

I dettagli del supervisore saranno implementati e testati separatamente: qui non è stato aggiunto né avviato alcun processo persistente.

## Perché non Quick Tunnel

Usare un tunnel gestito con URL stabile, non un URL temporaneo `trycloudflare.com`: i Quick Tunnel sono per test, cambiano hostname e non supportano SSE. Sarebbero inadatti a callback OAuth, privacy pubblica e aggiornamenti live previsti. [Limiti Quick Tunnel](https://developers.cloudflare.com/tunnel/get-started/quick-tunnels/#limitations).

## Autorizzazione, origin e privacy

- La pagina `/privacy` è pubblica senza login, così utenti e revisori Discord possono leggerla. Il pannello e tutte le API ticket richiedono il login Discord e lo staff autorizzato.
- Non aggiungere Cloudflare Access davanti a tutto il sito nella prima versione: bloccherebbe l'informativa pubblica senza eccezioni e aggiungerebbe un secondo login. L'autorizzazione applicativa resta obbligatoria anche se Access viene aggiunto in futuro.
- Non assumere che conoscere il dominio del tunnel sia un'autorizzazione. Verificare i ruoli sul server per ogni area protetta.
- Controllare che l'origin `81349c14.humbleservers.net:7777` non consenta accesso HTTP ai ticket o bypass dell'HTTPS. Con connector locale, fidarsi degli header proxy solo da loopback; niente `trust proxy=true` indiscriminato. Richieste dirette non fidate non devono ottenere dati privati, impostare cookie di sessione o influenzare URL/callback.
- Usare un'origine pubblica canonica configurata, cookie sicuri e callback fissa; non costruire URL sensibili da un `Host` arbitrario. Escludere pagine autenticate e API dalla cache condivisa Cloudflare.
- Collaudare SSE attraverso il tunnel, heartbeat, riconnessione e mancato buffering. Non basta che la homepage si carichi.
- Cloudflare tratta traffico in transito e va descritto nell'informativa; HumbleServers ospita l'archivio. HTTPS e tunnel **non provano** cifratura a riposo del database o dei backup.

## Cifratura sul container gestito

Dato che non controlliamo il sistema operativo, non presumere di poter configurare cifratura disco. Prima chiedere/verificare le garanzie effettive del provider su volume e backup. In assenza di prova sufficiente, prevedere cifratura applicativa dell'archivio e dei dati sensibili con primitive standard Node e gestione separata delle chiavi; non richiede un servizio installato sul sistema.

L'implementazione dovrà coprire tutti i payload e le copie rilevanti, non solo la colonna del testo: descrizioni, embed, identificativi, indici sensibili, log e backup. Prevedere autenticazione dei dati cifrati, nonce univoci, rotazione e ripristino verificato. Non inventare un algoritmo e non collocare chiave e dump nello stesso backup. La soluzione precisa dipende dal modello dati e dall'hosting verificato.

## Collaudo e rollback

- Prima prova autorizzata nel container: versione/architettura binario, esecuzione e connettività egress, senza cambiare la porta pubblica. Nessuna di queste prove è stata eseguita in questa attività.
- HTTPS e certificato validi sul dominio scelto; `/privacy` disponibile da finestra anonima; route inesistente e bot non pronto gestiti correttamente.
- OAuth da un account staff e da un non autorizzato; cookie sicuri, revoca ruolo e accesso diretto all'origin.
- Riconnessione SSE dopo interruzione tunnel; nessuna esposizione di dati in cache o log.
- Stop/restart Pterodactyl: nessun connector orfano o duplicato; la porta rimane `7777`.
- Rollback: fermare solo il connector creato per il bot e rimuovere la sua route DNS se necessario; preservare database, chiavi e funzionalità Discord. Non toccare tunnel o siti preesistenti.

Restano da conoscere: hostname definitivo, architettura/runtime dell'egg, permessi di esecuzione, egress 7844, risorse disponibili, regione del volume e garanzie di cifratura/backup. Se il provider vieta il connector, serve un proxy HTTPS fornito dal provider o un connector su un altro host; non basta una libreria npm per aggirare il divieto.
