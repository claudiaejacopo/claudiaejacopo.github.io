# claudiaejacopo.github.io

Sito del matrimonio di Claudia & Jacopo — 14 Ottobre 2027.
Sito statico (HTML/CSS/JS puro, nessun build step), pubblicato su GitHub Pages.

## Struttura

- `index.html` — lettera d'invito animata + homepage (con countdown, musica di sottofondo, riepilogo evento)
- `dettagli.html` — orari e location (cerimonia, ricevimento, taglio torta) con link Google Maps
- `rsvp.html` — form di conferma presenza in 2 passaggi (ricerca invitato + conferma/note/preferenze alimentari), invio tramite [Web3Forms](https://web3forms.com/)
- `lista-nozze.html` — testo, immagini e IBAN copiabile
- `css/`, `js/` — stili e script condivisi
- `data/guests.json` — elenco invitati usato dalla ricerca RSVP

## Da personalizzare prima della pubblicazione definitiva

1. **Musica**: sostituire il file segnaposto in `assets/audio/song.mp3` (vedi `assets/audio/LEGGIMI.txt`).
2. **Lista invitati**: popolare `data/guests.json` con nome/cognome reali (campo `risposto` è solo indicativo/manuale, non blocca il form).
3. **Lista nozze**: sostituire testo e immagini segnaposto in `lista-nozze.html` / `assets/img/`, e aggiornare IBAN e intestatario reali.
4. **RSVP**: verificare l'access key Web3Forms in `js/rsvp.js` e il funzionamento dell'invio email.

## Sviluppo locale

Bastano file statici: aprire `index.html` direttamente o servire la cartella con un semplice server locale, es. `python -m http.server 8080`.
