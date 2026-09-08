/* =========================================================
   Claudia & Jacopo — RSVP flow
   ========================================================= */

(function () {
  const SEARCH_ENDPOINT = 'data/guests.json';
  const SUBMIT_ENDPOINT = 'https://api.web3forms.com/submit';
  // TODO: inserisci qui la tua Access Key Web3Forms (https://web3forms.com/)
  const ACCESS_KEY = '83a19377-c81f-4e87-bce2-25b083d2c10d';

  document.addEventListener('DOMContentLoaded', function () {
    const searchForm = document.querySelector('[data-search-form]');
    const rsvpForm = document.querySelector('[data-rsvp-form]');
    const searchStep = document.querySelector('[data-step-search]');
    const detailsStep = document.querySelector('[data-step-details]');
    const successStep = document.querySelector('[data-step-success]');
    const searchStatus = document.querySelector('[data-search-status]');
    const submitStatus = document.querySelector('[data-submit-status]');
    const greeting = document.querySelector('[data-guest-greeting]');
    const searchSubmit = document.querySelector('[data-search-submit]');
    const rsvpSubmit = document.querySelector('[data-rsvp-submit]');
    const allergyToggle = document.querySelector('[data-allergy-toggle]');
    const allergyField = document.querySelector('[data-allergy-field]');
    const allergyInput = document.getElementById('dettaglio-allergia');
    const successMessage = document.querySelector('[data-success-message]');
    const hiddenNomeInput = rsvpForm.querySelector('[data-hidden-nome]');
    const hiddenCognomeInput = rsvpForm.querySelector('[data-hidden-cognome]');
    const resetRsvpButton = document.querySelector('[data-reset-rsvp]');

    if (!searchForm || !rsvpForm || !searchStep || !detailsStep || !successStep) {
      return;
    }

    let guestsPromise = null;
    let selectedGuest = null;

    function normalizeValue(value) {
      return String(value || '')
        .trim()
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/\s+/g, ' ');
    }

    function escapeHtml(value) {
      return String(value || '').replace(/[&<>"']/g, function (char) {
        return {
          '&': '&amp;',
          '<': '&lt;',
          '>': '&gt;',
          '"': '&quot;',
          "'": '&#39;'
        }[char];
      });
    }

    function getGuests() {
      if (!guestsPromise) {
        guestsPromise = fetch(SEARCH_ENDPOINT)
          .then(function (response) {
            if (!response.ok) {
              throw new Error('Impossibile caricare la lista degli invitati.');
            }
            return response.json();
          })
          .catch(function (error) {
            guestsPromise = null;
            throw error;
          });
      }
      return guestsPromise;
    }

    function setStatus(element, message, type) {
      if (!element) return;

      if (!message) {
        element.hidden = true;
        element.textContent = '';
        element.className = 'status-box';
        return;
      }

      element.hidden = false;
      element.textContent = message;
      element.className = 'status-box' + (type ? ' is-' + type : '');
    }

    function setFieldError(fieldName, message) {
      const field = document.getElementById(fieldName);
      const error = document.querySelector('[data-error-for="' + fieldName + '"]');

      if (field) {
        field.setAttribute('aria-invalid', message ? 'true' : 'false');
      }

      if (error) {
        error.textContent = message || '';
      }
    }

    function setPresenceError(message) {
      const group = rsvpForm.querySelector('[data-presence-group]');
      const error = rsvpForm.querySelector('[data-error-for="presenza"]');

      if (group) {
        group.setAttribute('aria-invalid', message ? 'true' : 'false');
      }

      Array.prototype.forEach.call(
        rsvpForm.querySelectorAll('input[name="presenza"]'),
        function (input) {
          input.setAttribute('aria-invalid', message ? 'true' : 'false');
        }
      );

      if (error) {
        error.textContent = message || '';
      }
    }

    function clearSearchValidation() {
      setFieldError('search-name', '');
      setFieldError('search-surname', '');
    }

    function validateSearchForm() {
      const nameValue = searchForm.nome.value.trim();
      const surnameValue = searchForm.cognome.value.trim();
      let isValid = true;

      clearSearchValidation();

      if (!nameValue) {
        setFieldError('search-name', 'Inserisci il tuo nome.');
        isValid = false;
      }

      if (!surnameValue) {
        setFieldError('search-surname', 'Inserisci il tuo cognome.');
        isValid = false;
      }

      return isValid;
    }

    function clearRsvpValidation() {
      setPresenceError('');
      setFieldError('dettaglio-allergia', '');
    }

    function validateRsvpForm() {
      const presenceInput = rsvpForm.querySelector('input[name="presenza"]:checked');
      const allergyChecked = allergyToggle.checked;
      const allergyValue = allergyInput.value.trim();
      let isValid = true;

      clearRsvpValidation();

      if (!presenceInput) {
        setPresenceError('Seleziona una risposta sulla tua presenza.');
        isValid = false;
      }

      if (allergyChecked && !allergyValue) {
        setFieldError('dettaglio-allergia', 'Specifica l\'allergia o l\'intolleranza.');
        isValid = false;
      }

      return isValid;
    }

    function toggleAllergyField(forceFocus) {
      const shouldShow = allergyToggle.checked;
      allergyField.hidden = !shouldShow;
      allergyInput.required = shouldShow;

      if (!shouldShow) {
        allergyInput.value = '';
        setFieldError('dettaglio-allergia', '');
        allergyInput.setAttribute('aria-invalid', 'false');
      } else if (forceFocus) {
        allergyInput.focus();
      }
    }

    function buildGreeting(guest) {
      return 'Ciao ' + guest.nome + ' ' + guest.cognome + '! Siamo felici di sapere se potrai essere con noi.';
    }

    searchForm.addEventListener('submit', function (event) {
      event.preventDefault();
      setStatus(searchStatus, '', '');

      if (!validateSearchForm()) {
        setStatus(searchStatus, 'Compila entrambi i campi per iniziare la ricerca.', 'error');
        return;
      }

      const rawName = searchForm.nome.value.trim();
      const rawSurname = searchForm.cognome.value.trim();
      const normalizedName = normalizeValue(rawName);
      const normalizedSurname = normalizeValue(rawSurname);

      searchSubmit.disabled = true;
      searchSubmit.textContent = 'Ricerca in corso...';
      setStatus(searchStatus, 'Sto cercando il tuo invito...', 'loading');

      getGuests()
        .then(function (guests) {
          const match = Array.isArray(guests)
            ? guests.find(function (guest) {
                return (
                  normalizeValue(guest.nome) === normalizedName &&
                  normalizeValue(guest.cognome) === normalizedSurname
                );
              })
            : null;

          if (!match) {
            selectedGuest = null;
            setStatus(
              searchStatus,
              'Non abbiamo trovato una corrispondenza. Controlla l\'ortografia di nome e cognome oppure contatta direttamente gli sposi.',
              'error'
            );
            return;
          }

          selectedGuest = {
            nome: String(match.nome || '').trim(),
            cognome: String(match.cognome || '').trim()
          };

          if (hiddenNomeInput) hiddenNomeInput.value = selectedGuest.nome;
          if (hiddenCognomeInput) hiddenCognomeInput.value = selectedGuest.cognome;

          greeting.textContent = buildGreeting(selectedGuest);
          searchStep.hidden = true;
          detailsStep.hidden = false;
          setStatus(
            submitStatus,
            'Invito trovato per ' + selectedGuest.nome + ' ' + selectedGuest.cognome + '. Completa la conferma qui sotto.',
            'success'
          );

          detailsStep.scrollIntoView({ behavior: 'smooth', block: 'start' });
        })
        .catch(function () {
          selectedGuest = null;
          setStatus(
            searchStatus,
            'Si è verificato un problema nel caricamento degli invitati. Riprova tra poco oppure contatta direttamente gli sposi.',
            'error'
          );
        })
        .finally(function () {
          searchSubmit.disabled = false;
          searchSubmit.textContent = 'Cerca';
        });
    });

    allergyToggle.addEventListener('change', function () {
      toggleAllergyField(true);
    });

    Array.prototype.forEach.call(
      rsvpForm.querySelectorAll('input[name="presenza"]'),
      function (input) {
        input.addEventListener('change', function () {
          setPresenceError('');
        });
      }
    );

    rsvpForm.addEventListener('submit', function (event) {
      event.preventDefault();

      if (!selectedGuest) {
        setStatus(
          submitStatus,
          'Per favore cerca prima il tuo nome e cognome nel passo precedente.',
          'error'
        );
        searchStep.hidden = false;
        detailsStep.hidden = true;
        searchStep.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }

      if (!validateRsvpForm()) {
        setStatus(submitStatus, 'Controlla i campi evidenziati prima di inviare.', 'error');
        return;
      }

      // Assicura che i campi nascosti nome/cognome siano allineati all'invitato trovato
      // prima di raccogliere il FormData (Web3Forms: docs.web3forms.com/getting-started/installation).
      if (hiddenNomeInput) hiddenNomeInput.value = selectedGuest.nome;
      if (hiddenCognomeInput) hiddenCognomeInput.value = selectedGuest.cognome;

      const formData = new FormData(rsvpForm);
      formData.append('access_key', ACCESS_KEY);

      rsvpSubmit.disabled = true;
      rsvpSubmit.textContent = 'Invio in corso...';
      setStatus(submitStatus, 'Sto inviando la tua conferma...', 'loading');

      fetch(SUBMIT_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: formData
      })
        .then(function (response) {
          return response.json().catch(function () {
            return {};
          }).then(function (data) {
            return {
              ok: response.ok,
              data: data
            };
          });
        })
        .then(function (result) {
          if (!result.ok || !result.data || result.data.success !== true) {
            throw new Error('submit-failed');
          }

          successMessage.innerHTML =
            'Grazie ' +
            escapeHtml(selectedGuest.nome) +
            ' ' +
            escapeHtml(selectedGuest.cognome) +
            '! La tua risposta è stata inviata con successo.';
          detailsStep.hidden = true;
          successStep.hidden = false;
          successStep.scrollIntoView({ behavior: 'smooth', block: 'start' });
        })
        .catch(function () {
          setStatus(
            submitStatus,
            'Non siamo riusciti a inviare la conferma. Riprova tra qualche istante: i dati inseriti sono ancora qui.',
            'error'
          );
          rsvpSubmit.disabled = false;
          rsvpSubmit.textContent = 'Invia conferma';
        });
    });

    function resetRsvpFlow() {
      selectedGuest = null;

      searchForm.reset();
      rsvpForm.reset();

      clearSearchValidation();
      clearRsvpValidation();
      setStatus(searchStatus, '', '');
      setStatus(submitStatus, '', '');

      if (hiddenNomeInput) hiddenNomeInput.value = '';
      if (hiddenCognomeInput) hiddenCognomeInput.value = '';
      if (greeting) greeting.textContent = '';

      toggleAllergyField(false);

      rsvpSubmit.disabled = false;
      rsvpSubmit.textContent = 'Invia conferma';
      searchSubmit.disabled = false;
      searchSubmit.textContent = 'Cerca';

      successStep.hidden = true;
      detailsStep.hidden = true;
      searchStep.hidden = false;

      searchStep.scrollIntoView({ behavior: 'smooth', block: 'start' });

      const nameField = document.getElementById('search-name');
      if (nameField) {
        nameField.focus({ preventScroll: true });
      }
    }

    if (resetRsvpButton) {
      resetRsvpButton.addEventListener('click', resetRsvpFlow);
    }

    toggleAllergyField(false);
  });
})();
