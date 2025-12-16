// MakerWorld Print Info Extension - Options Script

// Browser-API-Kompatibilität (Chrome & Firefox)
const browserAPI = typeof browser !== 'undefined' ? browser : chrome;

// Lade gespeicherte Einstellungen beim Start
async function loadSettings() {
  try {
    const result = await browserAPI.storage.sync.get(['debugMode']);
    // Standardwert ist true (aktiviert)
    const debugMode = result.debugMode !== undefined ? result.debugMode : true;
    document.getElementById('debugMode').checked = debugMode;
    console.log('Einstellungen geladen:', { debugMode });
  } catch (error) {
    console.error('Fehler beim Laden der Einstellungen:', error);
  }
}

// Speichere Einstellungen
async function saveSettings() {
  try {
    const debugMode = document.getElementById('debugMode').checked;
    
    await browserAPI.storage.sync.set({ debugMode });
    console.log('Einstellungen gespeichert:', { debugMode });
    
    // Zeige Bestätigungs-Nachricht
    const status = document.getElementById('status');
    status.style.display = 'block';
    setTimeout(() => {
      status.style.display = 'none';
    }, 2000);
  } catch (error) {
    console.error('Fehler beim Speichern der Einstellungen:', error);
  }
}

// Event-Listener für Checkbox-Änderungen
document.getElementById('debugMode').addEventListener('change', saveSettings);

// Lade Einstellungen beim Start der Options-Seite
loadSettings();

