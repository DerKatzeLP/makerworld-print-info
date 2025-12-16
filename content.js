// MakerWorld Print Info Extension - Content Script

// Browser-API-Kompatibilität (Chrome & Firefox)
const browserAPI = typeof browser !== 'undefined' ? browser : chrome;

// Zentrale Logging-Konfiguration
const DEBUG = {
  enabled: false, // Standardwert, wird durch User-Einstellung überschrieben
  prefix: '[MakerWorld Print Info]'
};

// Zentrale Log-Funktionen
const log = {
  info: (...args) => {
    if (DEBUG.enabled) console.log(DEBUG.prefix, ...args);
  },
  warn: (...args) => {
    if (DEBUG.enabled) console.warn(DEBUG.prefix, ...args);
  },
  error: (...args) => {
    if (DEBUG.enabled) console.error(DEBUG.prefix, ...args);
  }
};

// Lade Debug-Einstellung aus Storage
async function loadDebugSetting() {
  try {
    const result = await browserAPI.storage.sync.get(['debugMode']);
    DEBUG.enabled = result.debugMode !== undefined ? result.debugMode : true;
    log.info('Debug-Modus:', DEBUG.enabled ? 'aktiviert' : 'deaktiviert');
  } catch (error) {
    console.error('Fehler beim Laden der Debug-Einstellung:', error);
  }
}

log.info('Extension geladen');

// Funktion zum Formatieren der Druckzeit (in Sekunden)
function formatPrintTime(seconds) {
  if (!seconds || seconds === 0) return 'N/A';

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  } else {
    return `${minutes}m`;
  }
}

// Funktion zum Formatieren des Gewichts (in Gramm)
function formatWeight(grams) {
  if (!grams || grams === 0) return 'N/A';
  return `${parseFloat(grams).toFixed(1)}g`;
}

// Funktion zum Extrahieren der Model-ID und Slug aus dem Link
function extractModelInfo(designCard) {
  const link = designCard.querySelector('a[href*="/models/"]');
  if (!link) return null;

  const href = link.getAttribute('href');
  // Format: /de/models/1884855-christmas-maze-puzzle-gift
  const match = href.match(/\/models\/(\d+)-([^?]+)/);

  if (match) {
    return {
      id: match[1],
      slug: match[2].split('?')[0] // Entferne Query-Parameter
    };
  }

  return null;
}

// Funktion zum Laden der JSON-Daten
async function fetchModelData(id, slug) {
  try {
    // Bestimme die aktuelle Sprache aus der URL
    const currentPath = window.location.pathname;
    const langMatch = currentPath.match(/^\/(de|en|es|fr|it|ja|ko|pt|ru|zh)/);
    const lang = langMatch ? langMatch[1] : 'en';

    // Build ID aus dem HTML extrahieren (steht in den Next.js Script-Tags)
    const scripts = document.querySelectorAll('script[src*="/_next/static/"]');
    let buildId = 'fHNBgzCWV97HgVXtXAsw5'; // Fallback Build-ID

    for (const script of scripts) {
      const src = script.getAttribute('src');
      const match = src.match(/\/_next\/static\/([^\/]+)\//);
      if (match && match[1] !== 'chunks') {
        buildId = match[1];
        break;
      }
    }

    const url = `https://makerworld.com/_next/data/${buildId}/${lang}/models/${id}-${slug}.json`;
    log.info('Lade Daten von:', url);

    const response = await fetch(url);
    if (!response.ok) {
      log.error('Fehler beim Laden der Daten:', response.status);
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    log.error('Fehler beim Abrufen der Model-Daten:', error);
    return null;
  }
}

// Funktion zum Hinzufügen der Print-Info zum Design-Card
function addPrintInfo(designCard, printTime, weight) {
  // Prüfen, ob bereits Info hinzugefügt wurde
  if (designCard.querySelector('.makerworld-print-info')) {
    return;
  }

  // Finde den Container für die Stats
  const statsContainer = designCard.querySelector('.MuiStack-root.mw-css-firouo');
  if (!statsContainer) {
    log.warn('Stats-Container nicht gefunden');
    return;
  }

  // Erstelle neues Info-Element
  const printInfoDiv = document.createElement('div');
  printInfoDiv.className = 'makerworld-print-info mw-css-1i27l4i';
  printInfoDiv.innerHTML = `
    <div class="mw-css-1rkzspq" title="Druckzeit">
      <svg width="1em" height="1em" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2ZM8 3C10.7614 3 13 5.23858 13 8C13 10.7614 10.7614 13 8 13C5.23858 13 3 10.7614 3 8C3 5.23858 5.23858 3 8 3ZM8.5 5V8.29289L10.3536 10.1464L9.64645 10.8536L7.5 8.70711V5H8.5Z" fill="currentColor"/>
      </svg>
      <span>${formatPrintTime(printTime)}</span>
    </div>
    <div class="mw-css-1rkzspq" title="Gewicht">
      <svg width="1em" height="1em" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M8 1C6.34315 1 5 2.34315 5 4V5H3C2.44772 5 2 5.44772 2 6V13C2 13.5523 2.44772 14 3 14H13C13.5523 14 14 13.5523 14 13V6C14 5.44772 13.5523 5 13 5H11V4C11 2.34315 9.65685 1 8 1ZM10 5V4C10 2.89543 9.10457 2 8 2C6.89543 2 6 2.89543 6 4V5H10ZM3 6H13V13H3V6Z" fill="currentColor"/>
      </svg>
      <span>${formatWeight(weight)}</span>
    </div>
  `;

  // Füge die Info zum Container hinzu
  statsContainer.appendChild(printInfoDiv);
}

// Funktion zum Verarbeiten einer Design-Card
async function processDesignCard(designCard) {
  // Prüfen, ob bereits verarbeitet
  if (designCard.dataset.processedPrintInfo === 'true') {
    return;
  }

  designCard.dataset.processedPrintInfo = 'true';

  const modelInfo = extractModelInfo(designCard);
  if (!modelInfo) {
    log.warn('Konnte Model-Info nicht extrahieren');
    return;
  }

  // Lade Model-Daten
  const data = await fetchModelData(modelInfo.id, modelInfo.slug);
  if (!data || !data.pageProps || !data.pageProps.design) {
    log.warn('Keine gültigen Daten gefunden für Model:', modelInfo.id);
    return;
  }

  // Extrahiere Druckzeit und Gewicht
  const instances = data.pageProps.design.instances;
  if (!instances || instances.length === 0) {
    log.warn('Keine Instanzen gefunden für Model:', modelInfo.id);
    return;
  }

  const printTime = instances[0].prediction;
  const weight = instances[0].weight;

  log.info(`Model ${modelInfo.id}: Zeit=${printTime}s, Gewicht=${weight}g`);

  // Füge die Info zur Card hinzu
  addPrintInfo(designCard, printTime, weight);
}

// Funktion zum Verarbeiten aller Design-Cards
async function processAllDesignCards() {
  const designCards = document.querySelectorAll('.js-design-card');
  log.info(`Gefunden: ${designCards.length} Design-Cards`);

  // Verarbeite Cards mit Verzögerung, um Rate-Limiting zu vermeiden
  for (let i = 0; i < designCards.length; i++) {
    const card = designCards[i];

    // Verarbeite nur sichtbare Cards (Performance-Optimierung)
    const rect = card.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight + 500 && rect.bottom > -500;

    if (isVisible) {
      await processDesignCard(card);
      // Kleine Verzögerung zwischen Requests
      await new Promise(resolve => setTimeout(resolve, 200));
    }
  }
}

// Initialisierung
async function init() {
  await loadDebugSetting();
  log.info('Initialisiere Extension...');

  // Verarbeite bereits vorhandene Cards
  processAllDesignCards();

  // Beobachte neue Cards (für unendliches Scrollen)
  const observer = new MutationObserver((mutations) => {
    let hasNewCards = false;

    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          if (node.classList && node.classList.contains('js-design-card')) {
            hasNewCards = true;
          } else if (node.querySelectorAll) {
            const cards = node.querySelectorAll('.js-design-card');
            if (cards.length > 0) {
              hasNewCards = true;
            }
          }
        }
      });
    });

    if (hasNewCards) {
      log.info('Neue Cards erkannt, verarbeite...');
      processAllDesignCards();
    }
  });

  // Beobachte das Hauptcontainer-Element
  const mainContent = document.querySelector('main') || document.body;
  observer.observe(mainContent, {
    childList: true,
    subtree: true
  });

  // Verarbeite Cards beim Scrollen (für Lazy Loading)
  let scrollTimeout;
  window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      processAllDesignCards();
    }, 500);
  });
}

// Storage-Änderungen beobachten
browserAPI.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === 'sync' && changes.debugMode) {
    DEBUG.enabled = changes.debugMode.newValue;
    log.info('Debug-Modus geändert:', DEBUG.enabled ? 'aktiviert' : 'deaktiviert');
  }
});

// Starte nach dem DOM-Load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

