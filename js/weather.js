/* =========================================================
   Claudia & Jacopo - Widget meteo del giorno del matrimonio
   Mostra le previsioni per Stezzano (BG) e Travagliato (BS)
   quando la data rientra nella finestra affidabile (~16 giorni
   prima), altrimenti un messaggio di attesa elegante.
   ========================================================= */

(function () {
  const WEDDING_DATE = new Date('2027-10-14T00:00:00');
  const FORECAST_WINDOW_DAYS = 16;

  const LOCATIONS = [
    {
      key: 'stezzano',
      name: 'Stezzano (BG)',
      label: 'Cerimonia',
      lat: 45.6403,
      lon: 9.6206
    },
    {
      key: 'travagliato',
      name: 'Travagliato (BS)',
      label: 'Ricevimento',
      lat: 45.5578,
      lon: 10.0783
    }
  ];

  // Mappatura sintetica dei codici meteo WMO usati da Open-Meteo,
  // con icona ed etichetta in italiano.
  const WEATHER_CODES = {
    0: { icon: '☀️', text: 'Cielo sereno' },
    1: { icon: '🌤️', text: 'Prevalentemente sereno' },
    2: { icon: '⛅', text: 'Parzialmente nuvoloso' },
    3: { icon: '☁️', text: 'Nuvoloso' },
    45: { icon: '🌫️', text: 'Nebbia' },
    48: { icon: '🌫️', text: 'Nebbia con brina' },
    51: { icon: '🌦️', text: 'Pioggerella leggera' },
    53: { icon: '🌦️', text: 'Pioggerella' },
    55: { icon: '🌧️', text: 'Pioggerella intensa' },
    61: { icon: '🌦️', text: 'Pioggia leggera' },
    63: { icon: '🌧️', text: 'Pioggia' },
    65: { icon: '🌧️', text: 'Pioggia intensa' },
    71: { icon: '🌨️', text: 'Neve leggera' },
    73: { icon: '🌨️', text: 'Neve' },
    75: { icon: '❄️', text: 'Neve intensa' },
    77: { icon: '🌨️', text: 'Granelli di neve' },
    80: { icon: '🌦️', text: 'Rovesci leggeri' },
    81: { icon: '🌧️', text: 'Rovesci' },
    82: { icon: '⛈️', text: 'Rovesci intensi' },
    95: { icon: '⛈️', text: 'Temporale' },
    96: { icon: '⛈️', text: 'Temporale con grandine' },
    99: { icon: '⛈️', text: 'Temporale con grandine forte' }
  };

  function describeWeatherCode(code) {
    return WEATHER_CODES[code] || { icon: '🍂', text: 'Previsione non disponibile' };
  }

  function formatDateIt(date) {
    return date.toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' });
  }

  function daysUntilWedding() {
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const diffMs = WEDDING_DATE.getTime() - startOfToday.getTime();
    return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  }

  function renderWaitingMessage(container) {
    const availableFrom = new Date(WEDDING_DATE.getTime());
    availableFrom.setDate(availableFrom.getDate() - FORECAST_WINDOW_DAYS);

    container.innerHTML =
      '<div class="weather-waiting">' +
        '<span class="weather-waiting-icon" aria-hidden="true">🍂</span>' +
        '<p>' +
          'Le previsioni meteo diventano affidabili solo a partire da circa due ' +
          'settimane prima dell\u2019evento. Il meteo per Stezzano e Travagliato ' +
          'sar\u00e0 visibile qui a partire dal <strong>' + formatDateIt(availableFrom) + '</strong>.' +
        '</p>' +
      '</div>';
  }

  function renderErrorMessage(container) {
    container.innerHTML =
      '<div class="weather-waiting">' +
        '<span class="weather-waiting-icon" aria-hidden="true">🍂</span>' +
        '<p>Non \u00e8 stato possibile recuperare il meteo in questo momento. Riprovate pi\u00f9 tardi.</p>' +
      '</div>';
  }

  function renderResults(container, results) {
    const grid = document.createElement('div');
    grid.className = 'weather-grid';

    results.forEach(function (result) {
      const card = document.createElement('article');
      card.className = 'weather-card';

      if (!result.data) {
        card.innerHTML =
          '<h3>' + result.location.name + '</h3>' +
          '<p class="weather-card-label">' + result.location.label + '</p>' +
          '<p class="weather-card-error">Meteo non disponibile</p>';
        grid.appendChild(card);
        return;
      }

      const info = describeWeatherCode(result.data.weathercode);
      card.innerHTML =
        '<h3>' + result.location.name + '</h3>' +
        '<p class="weather-card-label">' + result.location.label + '</p>' +
        '<span class="weather-icon" aria-hidden="true">' + info.icon + '</span>' +
        '<p class="weather-condition">' + info.text + '</p>' +
        '<p class="weather-temps">' +
          '<span class="weather-temp-max">' + Math.round(result.data.temperature_2m_max) + '\u00b0</span>' +
          '<span class="weather-temp-min">' + Math.round(result.data.temperature_2m_min) + '\u00b0</span>' +
        '</p>';
      grid.appendChild(card);
    });

    container.innerHTML = '';
    container.appendChild(grid);
  }

  function fetchForecast(location) {
    const targetDate = WEDDING_DATE.toISOString().slice(0, 10);
    const url =
      'https://api.open-meteo.com/v1/forecast?latitude=' + location.lat +
      '&longitude=' + location.lon +
      '&daily=weathercode,temperature_2m_max,temperature_2m_min' +
      '&timezone=Europe%2FRome' +
      '&start_date=' + targetDate +
      '&end_date=' + targetDate;

    return fetch(url)
      .then(function (response) {
        if (!response.ok) throw new Error('Errore risposta API meteo');
        return response.json();
      })
      .then(function (json) {
        if (!json.daily || !json.daily.time || json.daily.time.length === 0) {
          return { location: location, data: null };
        }
        return {
          location: location,
          data: {
            weathercode: json.daily.weathercode[0],
            temperature_2m_max: json.daily.temperature_2m_max[0],
            temperature_2m_min: json.daily.temperature_2m_min[0]
          }
        };
      })
      .catch(function () {
        return { location: location, data: null };
      });
  }

  function init() {
    const container = document.querySelector('[data-weather-widget]');
    if (!container) return;

    const daysLeft = daysUntilWedding();

    if (daysLeft > FORECAST_WINDOW_DAYS) {
      renderWaitingMessage(container);
      return;
    }

    if (daysLeft < 0) {
      renderWaitingMessage(container);
      return;
    }

    Promise.all(LOCATIONS.map(fetchForecast))
      .then(function (results) {
        const anyData = results.some(function (r) { return r.data; });
        if (!anyData) {
          renderErrorMessage(container);
          return;
        }
        renderResults(container, results);
      })
      .catch(function () {
        renderErrorMessage(container);
      });
  }

  document.addEventListener('DOMContentLoaded', init);
})();
