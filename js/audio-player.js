/* =========================================================
   Claudia & Jacopo - Gestione musica di sottofondo
   Persistente tra le pagine tramite un tag <audio> ricreato
   ad ogni caricamento, con stato (playing/paused, currentTime)
   salvato in sessionStorage cosi' la riproduzione continua
   in modo coerente navigando tra le pagine del sito.
   ========================================================= */

(function () {
  const AUDIO_SRC = 'assets/audio/song.mp3';
  const STORAGE_KEY = 'cj-music-state';

  function readState() {
    try {
      return JSON.parse(sessionStorage.getItem(STORAGE_KEY)) || { playing: false, time: 0 };
    } catch (e) {
      return { playing: false, time: 0 };
    }
  }

  function writeState(state) {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      /* ignora storage non disponibile */
    }
  }

  function initMusicPlayer(options) {
    options = options || {};
    const autoplayIntent = !!options.autoplayIntent;

    const audio = new Audio(AUDIO_SRC);
    audio.loop = true;
    audio.volume = 0.6;

    const state = readState();

    // Il tempo salvato va applicato solo quando ci sono dati sufficienti
    // (readyState >= HAVE_CURRENT_DATA/'loadeddata'): se lo si imposta
    // troppo presto (subito dopo la creazione, prima che il browser abbia
    // dati sufficienti) molti browser lo ignorano silenziosamente e la
    // riproduzione riparte da 0 ad ogni ricarica della pagina, anche se lo
    // stato salvato era corretto.
    function restoreTime() {
      if (!state.time) return;
      if (audio.readyState >= 2) {
        audio.currentTime = state.time;
      } else {
        audio.addEventListener('loadeddata', function onData() {
          audio.currentTime = state.time;
          audio.removeEventListener('loadeddata', onData);
        });
      }
    }
    restoreTime();

    const toggleBtn = document.querySelector('[data-music-toggle]');

    function setButtonState(isPlaying) {
      if (!toggleBtn) return;
      toggleBtn.setAttribute('data-playing', isPlaying ? 'true' : 'false');
      toggleBtn.setAttribute(
        'aria-label',
        isPlaying ? 'Metti in pausa la musica' : 'Riproduci la musica'
      );
    }

    function play() {
      audio.play().then(function () {
        writeState({ playing: true, time: audio.currentTime });
        setButtonState(true);
      }).catch(function () {
        /* autoplay bloccato dal browser: rimane in pausa finche' l'utente non clicca */
        setButtonState(false);
      });
    }

    function pause() {
      audio.pause();
      writeState({ playing: false, time: audio.currentTime });
      setButtonState(false);
    }

    if (toggleBtn) {
      toggleBtn.addEventListener('click', function () {
        if (audio.paused) {
          play();
        } else {
          pause();
        }
      });
    }

    setInterval(function () {
      if (!audio.paused) {
        writeState({ playing: true, time: audio.currentTime });
      }
    }, 2000);

    window.addEventListener('beforeunload', function () {
      writeState({ playing: !audio.paused, time: audio.currentTime });
    });

    if (state.playing || autoplayIntent) {
      play();
    } else {
      setButtonState(false);
    }

    return { play: play, pause: pause, audio: audio };
  }

  window.CJMusicPlayer = { init: initMusicPlayer };
})();