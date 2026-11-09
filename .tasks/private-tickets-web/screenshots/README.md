# Evidenza visuale sintetica

Acquisizioni browser del 2026-11-04, fixture locale `test/ui-fixture.js`, build di produzione shadcn/ui neutral. Nessun ticket o account reale. Non sono una prova di connessione a Discord o di deployment HumbleServers.

## Demo intent del 2026-11-05

Queste quattro immagini sono **illustrazioni sintetiche, non screenshot di Discord reale**. Le prime tre usano `@skyra/discord-components-react` nel file di sviluppo [intent-demo.tsx](../../../web/src/intent-demo.tsx); la quarta proviene dalla fixture locale del pannello con messaggi simulati e un banner aggiunto alla cattura. Il dominio `tickets.example.com` è un esempio e i pulsanti della demo non inviano azioni. Nessuna immagine dimostra che Message Content sia abilitato, che `/tickets-privacy` sia stato pubblicato su Discord o che il bot sia collegato a un server reale.

| File | Mostra |
| --- | --- |
| [intent-demo-panel.jpg](intent-demo-panel.jpg) | Pannello di creazione illustrativo, pulsanti e link privacy finale |
| [intent-demo-privacy.jpg](intent-demo-privacy.jpg) | Risposta illustrativa al comando `/tickets-privacy` |
| [intent-demo-conversation.jpg](intent-demo-conversation.jpg) | Messaggi normali in un thread privato illustrativo, senza mention al bot |
| [intent-demo-dashboard.jpg](intent-demo-dashboard.jpg) | Dashboard reale del progetto, alimentata dalla fixture locale sintetica |

Per riaprire le prime tre viste in sviluppo: `npm --prefix web run dev -- --host 127.0.0.1`, poi `/intent-demo.html?screen=panel`, `?screen=privacy` e `?screen=conversation`. Vite non include `intent-demo.html` nella build di produzione. Per il form Discord servono catture del flusso in un server di prova reale e link pubblici accessibili ai revisori; queste immagini possono accompagnare la descrizione solo se dichiarate esplicitamente come mockup.

| File | Viewport / immagine | Caso |
| --- | --- | --- |
| [desktop-final.jpg](desktop-final.jpg) | 1440×1000 | Elenco e conteggi per tutti gli stati |
| [mobile-final.jpg](mobile-final.jpg) | 390×844 | Filtro chiusi, controlli responsive senza overflow |
| [detail-final.jpg](detail-final.jpg) | 1440px, pagina intera 1039px | Dettaglio e conversazione disabilitata |
| [empty-final.jpg](empty-final.jpg) | 1905×2053 | Ricerca senza risultati |
| [locked-final.jpg](locked-final.jpg) | 1905×2053 | Due ticket bloccati |
| [deleted-final.jpg](deleted-final.jpg) | 1905×2053 | Eliminato, apertura Discord assente |
| [error-final.jpg](error-final.jpg) | 1440×1000 | Offline al cambio filtro, errore e Riprova senza righe obsolete |

Le prime sei catture precedono la correzione limitata alla presentazione degli errori rete, rappresentata nell'ultima. Il recupero dopo Riprova è stato verificato dal vivo: tre righe chiuse e nessun alert. Schermate revisionate indipendentemente senza problemi materiali. I JPEG sono già compressi; nessun originale voluminoso conservato.
