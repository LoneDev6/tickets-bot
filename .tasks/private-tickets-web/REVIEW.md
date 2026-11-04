# Revisione statica del sistema attuale

Base: `16d648446302de9fb95667fdb8b11f0378d943b7`, 2026-11-04. Ambito: flusso completo dei ticket in `index.js`, server, configurazione, dipendenze e logger. Nessun accesso a token, database o server Discord di produzione; nessuna prova dinamica.

Il sistema crea thread privati e usa due copie delle cards Discord per elenco e stato. Il cambiamento proposto sposta elenco e dettaglio sul web, conserva i dati autonomamente e riduce le notifiche a un messaggio riepilogativo. Il carico assunto è quello di una sola guild e un solo processo Node; i volumi reali non sono documentati.

## Da correggere prima della migrazione

### 1. Descrizione lunga: thread creato, ticket non registrato

**Dove:** `index.js:598`, `index.js:620`, `index.js:702`, `index.js:843`.

**Comportamento:** il modal impone una lunghezza minima, senza massimo esplicito, e la descrizione diventa il valore di un campo embed. Il thread viene creato prima dell'invio della card e della registrazione Enmap.

**Caso concreto:** una descrizione di 1025 caratteri supera il limite di 1024 del campo. La costruzione/invio della card fallisce dopo la creazione del thread, prima del salvataggio: l'utente può restare con un ticket incompleto e il bot senza record.

**Correzione minima:** validare prima degli effetti; salvare un record recuperabile appena noto il thread ID; una notifica fallita non deve invalidare il ticket. Nel nuovo flusso conservare la descrizione integrale e non imporre i limiti delle cards al database.

**Se ignorato:** importazione incompleta e nuovi ticket orfani continuano a comparire. [Limiti ufficiali degli embed](https://docs.discord.com/developers/resources/message#embed-limits).

### 2. La cancellazione cerca la copia aperti nel canale sbagliato

**Dove:** `index.js:635`, `index.js:636`, `index.js:1251`.

**Comportamento:** `openedMessageId` proviene da `ticketsOpenedNotifyChannel`, ma `threadDelete` lo cerca in `notificationChannel`.

**Caso concreto:** cancellando un ticket con entrambe le cards, il fetch della card aperti fallisce e la card può rimanere come aperta. Il percorso con record Enmap non prosegue nella pulizia legacy del canale aperti.

**Correzione minima:** usare il canale corretto finché esiste il vecchio flusso; nel nuovo, aggiornare un solo conteggio dalla persistenza.

**Se ignorato:** notifiche aperte riferite a thread cancellati.

### 3. Una card mancante impedisce di gestire lo stato del ticket

**Dove:** `index.js:945`, `index.js:1244`, `index.js:1273`.

**Comportamento:** il fetch della card principale precede la gestione dell'errore; il successivo `if (!message)` non intercetta una Promise rifiutata.

**Caso concreto:** cancellando manualmente la card, un successivo aggiornamento o cancellazione del thread interrompe il relativo handler. Nel percorso di cancellazione non si raggiunge neanche la pulizia del record.

**Correzione minima:** registrare prima il cambiamento del ticket e trattare la notifica come effetto secondario riparabile. Intercettare gli errori per ticket, distinguendo messaggio mancante e permessi/rete.

**Se ignorato:** lo stato dipende dalla sopravvivenza di un messaggio accessorio.

### 4. Errori di accesso diventano falsi ticket eliminati

**Dove:** `index.js:1406`, `index.js:1498`.

**Comportamento:** i fetch dei thread usano `.catch(() => null)`; `null` viene interpretato come thread assente. La prima scansione cambia la card in “Deleted”, la seconda può cancellare la copia aperti.

**Caso concreto:** un errore `403` o un problema di rete durante la scansione modifica la rappresentazione di un ticket che esiste ancora.

**Correzione minima:** classificare gli errori e mantenere l'ultimo stato noto quando non si può verificare la risorsa. Non trasferire questa equivalenza al nuovo archivio.

**Se ignorato:** conteggio, elenco e storico possono mostrare cancellazioni inesistenti.

### 5. Qualunque aggiornamento di un chiuso riscrive la sua chiusura

**Dove:** `index.js:1070`, `index.js:1081`, `index.js:974`, `index.js:1004`.

**Comportamento:** il listener imposta sempre `closed` se il nuovo thread è archiviato e `locked` se è bloccato, anche quando quelle proprietà non cambiano. L'handler sostituisce il campo azione con l'ora corrente.

**Caso concreto:** una rinomina o un aggiornamento dei metadati di un thread già chiuso produce una nuova data di chiusura nella card.

**Correzione minima:** confrontare lo stato derivato precedente e successivo. Aggiornare nome e metadati senza riscrivere le transizioni; definire una sola precedenza per lock/archivio.

**Se ignorato:** date e futura scadenza privacy diventano inaffidabili.

### 6. La riapertura può sovrascrivere ingressi più recenti

**Dove:** `index.js:944`, `index.js:959`, `index.js:1059`, `index.js:927`.

**Comportamento:** `handleThreadUpdate` legge una copia profonda del record, aspetta più operazioni e ritardi, poi in riapertura riscrive l'intero oggetto. Nel frattempo altri handler possono salvarne una versione nuova.

**Caso concreto:** dopo lo sblocco/riapertura un operatore entra tramite “Join Ticket” durante le attese del relativo handler. L'ingresso viene salvato, poi la vecchia copia del record può cancellarlo.

**Correzione minima:** serializzare le modifiche per ticket o rileggere il record corrente al momento di applicare una modifica circoscritta; evitare oggetti salvati dopo lunghi `await`.

**Se ignorato:** partecipanti e altri futuri campi web possono scomparire a seconda dell'ordine degli eventi.

## Da correggere nel refactor

### 7. Risposta al modal troppo tardiva e messaggio di successo anticipato

**Dove:** `index.js:533`, `index.js:547`, `index.js:561`, `index.js:569`.

**Comportamento:** invio del messaggio, mutazione Discord e storage precedono il defer dell'interazione; il messaggio “chiuso/bloccato” viene inviato prima della conferma dell'azione.

**Caso concreto:** con una chiamata Discord lenta l'interazione può scadere mentre il lavoro continua; se la mutazione fallisce il messaggio descrive un'azione non riuscita.

**Correzione minima:** defer tempestivo, autorizzazione al submit, operazione e risposta coerente con l'esito; non salvare un record `undefined` per i legacy.

**Se ignorato:** lo staff vede un errore nonostante effetti parziali, oppure una conferma falsa.

### 8. Autorizzazione e riconoscimento dei ticket affidati al contesto UI

**Dove:** `index.js:748`, `index.js:533`, `index.js:908`, `index.js:925`, `index.js:410`, `index.js:443`.

**Comportamento:** il ruolo staff è controllato prima di mostrare il modal lock, non nuovamente al submit. Join non verifica direttamente ruolo, guild/parent attesi e record; close/lock slash controllano solo che il canale esista, non che sia un thread ticket.

**Caso concreto:** un operatore apre il modal e perde il ruolo prima dell'invio; la mutazione procede con i permessi del bot. `/close` in un normale canale può pubblicare la conferma e poi fallire sul metodo thread mancante.

**Correzione minima:** una verifica condivisa all'esecuzione dell'azione, con distinzione staff/proprietario del ticket. Per Join, verificare tipo, guild, parent e soggetto autorizzato.

**Se ignorato:** spostando i controlli sul web si replica un confine di autorizzazione incompleto. Non è dimostrato che le cards attuali siano leggibili da persone non autorizzate: i permessi reali dei canali non sono stati verificati.

### 9. Creazioni concorrenti e limite basato su nome/cache

**Dove:** `index.js:318`, `index.js:576`, `index.js:598`, `index.js:867`.

**Comportamento:** il controllo è separato dalla creazione e conta i thread attraverso nome e cache. Due richieste concorrenti dello stesso utente possono entrambe passare prima della creazione.

**Caso concreto:** due invii ravvicinati del modal possono aprire due ticket; rinominare un thread rimuovendo l'ID ne impedisce il riconoscimento.

**Correzione minima:** controllo per autore persistito e serializzazione per utente nel singolo processo; definire prima se il vincolo voluto sia un aperto assoluto oppure un aperto nelle ultime 48 ore.

**Se ignorato:** il futuro frontend eredita controlli aggirabili. La finestra di 48 ore è esplicita nel codice: non viene classificata da sola come bug.

### 10. Test mancanti e task periodici sovrapponibili

**Dove:** `package.json:8`, `index.js:1`, `index.js:166`, `index.js:187`, `index.js:217`.

**Comportamento:** non esiste una suite; gli intervalli non aspettano che finisca il giro precedente. Ogni ticket aperto richiede almeno un secondo di attesa più le chiamate API.

**Caso concreto:** oltre 300 aperti un giro supera già i cinque minuti senza contare la rete; il successivo può iniziare mentre il primo è attivo. Un singolo fetch non gestito interrompe il giro e salta i ticket successivi.

**Correzione minima:** test per le regole e i guasti individuati; task con un solo giro alla volta e isolamento degli errori. Nel nuovo flusso usare eventi e una riconciliazione limitata, senza portare le scansioni delle cards sul web.

**Se ignorato:** regressioni non rilevate e traffico API crescente. Non è stato accertato che il carico reale arrivi a 300 ticket.

## Semplificazioni utili

### 11. Eliminare il flusso delle cards e i residui dopo la parità

**Dove:** `index.js:69`, `index.js:877`, `index.js:1094`, `index.js:1375`, `index.js:1465`, `package.json:11`, `global.js:8`.

**Comportamento:** scansioni e parser di cards legacy ripetono il riconoscimento dei thread; `editData` non ha chiamanti, c'è un lungo blocco commentato in “My Tickets”, e alcune dipendenze non sono usate dal codice applicativo.

**Caso concreto:** un messaggio con embed e un secondo pulsante link non ha `customId`; l'accesso `customId.split(...)` nei parser legacy può fallire. Una struttura UI non è un formato dati stabile.

**Correzione minima:** importatore validato una tantum, poi eliminare scansioni/duplicazioni, helper non usati e codice commentato. Rimuovere `request` e i pacchetti `fs`/`path` se confermati inutili; usare i moduli nativi. Valutare separatamente gli altri pacchetti moment: non sostituire tutta la gestione date senza motivo. Non rimuovere il launcher `*.js`.

**Se ignorato:** più codice da mantenere e parser fragili anche dopo l'introduzione dei record autonomi. Nessuna stima di righe risparmiate senza un diff reale.

## Limiti e decisioni da non confondere con bug

- “Users In Ticket” registra gli ingressi dal pulsante: il commento in `index.js:273` lo dichiara. Non promettere la lista completa dei membri senza una funzione diversa e i relativi permessi.
- Il codice elimina il record del ticket cancellato e non conserva testo conversazione: è una limitazione rispetto al nuovo storico richiesto, non la prova di una cancellazione accidentale nel vecchio prodotto.
- Enmap non dimostra cifratura a riposo. Non è stato verificato se il disco/backup HumbleServers sia già cifrato; la dichiarazione del form resta da provare.
- Il web server attuale non espone ticket: l'assenza di login non dimostra una fuga di ticket già in produzione. Il login è un requisito della nuova API.
- La revisione non è uno scan di sicurezza esaustivo né un audit legale. Nessun test con Discord, migrazione reale o verifica dell'hosting.

**Verdetto:** prima della migrazione correggere 1–6; includere 7–10 nel refactor e rimuovere 11 solo dopo il confronto dei dati legacy.
