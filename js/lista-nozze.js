(function () {
  function setFeedback(button, feedback, message, isSuccess) {
    const defaultLabel = button.getAttribute('data-default-label') || 'Copia IBAN';
    button.textContent = message;
    feedback.textContent = isSuccess
      ? 'IBAN copiato negli appunti.'
      : 'Copia manualmente l’IBAN selezionato.';
    feedback.classList.add('is-visible');

    window.clearTimeout(button._copyResetTimer);
    button._copyResetTimer = window.setTimeout(function () {
      button.textContent = defaultLabel;
      feedback.textContent = '';
      feedback.classList.remove('is-visible');
    }, 2000);
  }

  function fallbackCopy(text, visibleTarget, button, feedback) {
    const helper = document.createElement('textarea');
    helper.value = text;
    helper.setAttribute('readonly', '');
    helper.style.position = 'absolute';
    helper.style.left = '-9999px';
    document.body.appendChild(helper);
    helper.select();

    try {
      const copied = document.execCommand('copy');
      document.body.removeChild(helper);

      if (copied) {
        setFeedback(button, feedback, 'Copiato! ✓', true);
        return;
      }
    } catch (error) {
      document.body.removeChild(helper);
    }

    if (document.body.contains(helper)) {
      document.body.removeChild(helper);
    }

    if (window.getSelection && document.createRange) {
      const range = document.createRange();
      range.selectNodeContents(visibleTarget);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
    }

    visibleTarget.focus();
    setFeedback(button, feedback, 'Selezionato', false);
  }

  document.addEventListener('DOMContentLoaded', function () {
    const button = document.querySelector('[data-copy-iban]');
    const visibleIban = document.querySelector('[data-iban-value]');
    const feedback = document.querySelector('[data-copy-feedback]');

    if (!button || !visibleIban || !feedback) {
      return;
    }

    button.addEventListener('click', function () {
      const ibanRaw = button.getAttribute('data-iban-raw');
      if (!ibanRaw) {
        return;
      }

      if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
        navigator.clipboard.writeText(ibanRaw).then(function () {
          setFeedback(button, feedback, 'Copiato! ✓', true);
        }).catch(function () {
          fallbackCopy(ibanRaw, visibleIban, button, feedback);
        });
        return;
      }

      fallbackCopy(ibanRaw, visibleIban, button, feedback);
    });
  });
})();
