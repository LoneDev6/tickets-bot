# Implementation checkpoint

Aggiornato il 2026-11-04. Implementazione locale completata; nessun rilascio sul server reale. Piano e revisione iniziale descrivono la base `16d6484`, non il codice finale. Configurazione e procedure correnti: [README](../../README.md).

## Stato accettato

- Record e conversazioni AES-256-GCM, indici HMAC, verifica chiave all'avvio, opt-out/cancellazione e protezione dal reimport; retention ticket aperto + 30 giorni dalla chiusura corrente, senza proroga per successivo blocco/eliminazione. Una riapertura effettiva avvia un nuovo periodo aperto.
- Inventario vecchio bot: Enmap/cards, thread attivi e archiviati privati paginati, canali/autori legacy espliciti. Stato Discord osservato prioritario, errori di accesso distinti da cancellazione, import ripetibile e retirement separato verificato. Nessuna rimozione automatica delle cards Discord.
- Unico riepilogo persistente con conteggio aperti; eventi live e riconciliazione periodica. Creazione serializzata, record conservato anche se fallisce il setup successivo, permessi controllati alle azioni Discord.
- Pannello ufficiale shadcn/ui (`radix-nova`, neutral), elenco filtrato/paginato di tutti gli stati conservati, dettaglio e apertura Discord in nuova scheda. OAuth proprietario/staff, sessioni limitate, CSRF, CSP, SSE con riautorizzazione e revoca ruolo.
- `/privacy` pubblico e `/privacy` Discord con esclusione/cancellazione. Archivio conversazioni predisposto, `MESSAGE_CONTENT_APPROVED=false`. Risposte/gestione web sempre disabilitate in questa versione, anche attivando lettura.
- Stessa porta 7777 e launcher Pterodactyl `*.js`. Supervisione Node del binario ufficiale cloudflared senza shell o installazione di sistema.
- Avvio automatico da `index.js`, `npm start` e `*.js`: bootstrap con soli moduli standard prima di caricare `bot.js`, dipendenze da lockfile e build con impronte per saltare lavoro invariato. Guida console iniziale in italiano per dominio/ID e istruzioni Cloudflare/OAuth; mai richiesta di segreti tramite stdin. Chiavi mancanti generate una volta in `.runtime/secrets.json` privato e persistente, senza sostituzioni silenziose. Configurazione pubblica in `.runtime/setup.json`. Connector Linux x64/arm64 scaricato da release ufficiale fissata 2026.10.2, SHA256 verificato prima dell'esecuzione.

## Validazione

- **28/28 test passati**, zero skip/failure: SQLite/Enmap reale e riavvio, retirement/VACUUM, cifratura/manomissioni, stati/TTL, cancellazione/esclusione e race edit/delete, import/card/inventario paginato, filtri globali, creazione parziale/concorrenza, 403, riepilogo senza duplicati, OAuth/staff/revoca/CSRF, SSE/disconnessione, configurazione, isolamento/arresto tunnel simulato; bootstrap con aggiornamento/cache/errori, isolamento ambiente npm, persistenza/conflitti/permessi chiavi, checksum e cleanup download, guida/persistenza/retry/EOF senza segreti in console.
- Download reale del binario ufficiale Linux amd64, SHA256 e riuso della cache verificati; `--version` restituisce 2026.10.2. Nessun connector reale o tunnel avviato. I comandi npm del bootstrap sono verificati con esecutore simulato; installazione a freddo e timeout nell'egg HumbleServers restano da collaudare.
- Scenario integrato Discord simulato (`test/service.test.js`): inventario vecchio archiviato → creazione completa e rifiuto duplicato → accesso staff e rifiuto azione non autorizzata → chiusura/riapertura/blocco → riepilogo unico → raccolta disabilitata e approvazione solo simulata, edit/delete → opt-out/cancellazione e riconciliazione/import senza resurrezione. Usa un client SDK simulato in memoria, non emula il protocollo Gateway o i permessi del server Discord reale.
- Lint ESLint e build TypeScript/Vite frontend passati. Runtime locale Node 24.18; runtime supportati documentati in README. `git diff --check` superato.
- Browser con soli dati sintetici: elenco 32 ticket (26 aperti, 3 chiusi, 2 bloccati, 1 eliminato), filtri e URL, dettaglio, pagina privacy anonima, tastiera sui tab, viewport 390px senza overflow, conversazione disabilitata, eliminato senza link Discord, ricerca vuota.
- Errore rete durante cambio filtro: nessuna riga o totale del filtro precedente, errore italiano e Riprova. Ripristinata rete: Riprova carica le 3 richieste chiuse e rimuove l'errore.
- Revisione visuale indipendente delle sette [schermate sintetiche](screenshots/README.md): nessun problema materiale; esito ship, con verifica di recupero poi completata. Il detector di componenti è stato eseguito una volta, senza rilievi, prima degli ultimi aggiustamenti responsive e di errore.
- Server di fixture e relativi wrapper fermati; PID verificati assenti. Schede browser di questa attività chiuse, pagina preesistente preservata. Nessun processo di anteprima lasciato attivo.

## Verifiche esterne ancora necessarie

1. Fornire i segreti Discord/tunnel e completare una volta guida, dominio e callback OAuth; verificare runtime Node, installazione npm/SQLite e timeout dell'egg. Le chiavi locali ora sono generate automaticamente: preservare `.runtime/` e conservarne i segreti separatamente dai backup dati.
2. Creare/configurare una volta il tunnel gestito Cloudflare; download/eseguibilità locale verificati, ma uscita 7844, HTTPS e SSE sul provider restano da collaudare. Nessuna mutazione account effettuata.
3. L'import legacy è automatico al primo avvio; dry run rimane facoltativo. Backup coerente cifrato e controllo conteggi/campioni/permessi consigliati prima del primo aggiornamento. Non sono stati letti ticket o credenziali reali.
4. Confermare regione hosting, fornitore email, backup/scadenza/restore, separazione chiavi e bonifica di vecchi log/esportazioni/record in chiaro prima di attestare cifratura completa nel form.
5. Pubblicare policy e prove demo sintetiche a URL reali; inviare richiesta Discord accurata. Intent non attivato, portale non modificato. Autorizzazione Discord non garantita dai test locali.

Questi punti sono configurazione e collaudo operativo, non capacità già verificate dal codice. Nessuna risposta/gestione web è abilitabile in questa versione senza un successivo lavoro autorizzato.
