# MakerWorld Print Info

> 🖨️ Chrome & Firefox Extension, die Druckzeit und Gewicht direkt auf der MakerWorld-Übersichtsseite anzeigt

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Browser](https://img.shields.io/badge/browser-Chrome%20%7C%20Firefox-orange.svg)

## 📋 Features

- ⏱️ **Druckzeit** direkt sichtbar auf den Model-Cards
- ⚖️ **Filament-Gewicht** ohne Detailseite öffnen zu müssen
- 🔄 **Automatische Updates** beim Scrollen (Infinite Scroll Support)
- 🌍 **Multi-Language** - funktioniert mit allen MakerWorld-Sprachen
- 🐛 **Debug-Modus** - optional aktivierbar in den Einstellungen
- 🎨 **Native Integration** - nutzt das bestehende Design von MakerWorld
- ⚡ **Performance-optimiert** - lädt nur sichtbare Cards

## 🚀 Installation

### Chrome / Edge / Brave

1. Lade das Repository herunter oder klone es:
   ```bash
   git clone https://github.com/your-username/makerworld-print-info.git
   ```

2. Öffne Chrome und gehe zu `chrome://extensions/`

3. Aktiviere den **Entwicklermodus** (oben rechts)

4. Klicke auf **"Entpackte Erweiterung laden"**

5. Wähle den `makerworld-extension` Ordner aus

6. ✅ Fertig! Die Extension ist jetzt aktiv

### Firefox

1. Lade das Repository herunter oder klone es:
   ```bash
   git clone https://github.com/your-username/makerworld-print-info.git
   ```

2. Öffne Firefox und gehe zu `about:debugging#/runtime/this-firefox`

3. Klicke auf **"Temporäres Add-on laden"**

4. Wähle die `manifest.json` Datei aus dem `makerworld-extension` Ordner

5. ✅ Fertig! Die Extension ist jetzt aktiv

> **Hinweis:** Für permanente Installation in Firefox muss die Extension signiert werden.

## 🎯 Verwendung

1. Öffne [makerworld.com](https://makerworld.com)

2. Navigiere zu einer beliebigen Übersichtsseite (z.B. "Trending", "Latest", etc.)

3. Die Extension fügt automatisch **Druckzeit** ⏱️ und **Gewicht** ⚖️ zu jedem Model hinzu

4. **Einstellungen**: Rechtsklick auf Extension-Icon → "Optionen"
   - Debug-Modus aktivieren/deaktivieren

## 🛠️ Technische Details

### Funktionsweise

Die Extension:
1. Erkennt Model-Cards auf MakerWorld-Seiten
2. Extrahiert Model-ID und Slug aus den Links
3. Lädt die JSON-Daten von MakerWorld's Next.js API
4. Parsed Druckzeit (`prediction`) und Gewicht (`weight`) aus den Instanzen
5. Fügt die Informationen nahtlos ins bestehende UI ein

### Architektur

```
makerworld-extension/
├── manifest.json      # Extension-Konfiguration
├── content.js         # Haupt-Script (läuft auf makerworld.com)
├── styles.css         # Custom Styles für die Info-Elemente
├── options.html       # Einstellungs-Seite
├── options.js         # Einstellungs-Logik
└── icons/            # Extension Icons
```

### Browser-Kompatibilität

Die Extension verwendet einen Kompatibilitätslayer für die Browser-APIs:

```javascript
const browserAPI = typeof browser !== 'undefined' ? browser : chrome;
```

Dies ermöglicht nahtlose Funktion in:
- ✅ Chrome (Manifest V3)
- ✅ Firefox (Manifest V3, ab Version 109+)
- ✅ Edge (Chromium-basiert)
- ✅ Brave (Chromium-basiert)
- ✅ Opera (Chromium-basiert)

## 🔧 Entwicklung

### Voraussetzungen

- Node.js (optional, für Entwickler-Tools)
- Chrome oder Firefox Browser

### Debug-Modus

1. Öffne die Extension-Optionen (Rechtsklick auf Icon → "Optionen")
2. Aktiviere "Debug-Modus"
3. Öffne die Browser-Konsole (F12)
4. Alle Logs werden mit dem Prefix `[MakerWorld Print Info]` angezeigt

### Logging

Die Extension nutzt ein zentrales Logging-System:

```javascript
log.info('Informations-Nachricht');
log.warn('Warnung');
log.error('Fehler');
```

Logs können zentral über die Einstellungen aktiviert/deaktiviert werden.

## 📝 API-Struktur

Die Extension nutzt die interne Next.js API von MakerWorld:

```
https://makerworld.com/_next/data/{buildId}/{lang}/models/{id}-{slug}.json
```

Beispiel:
```json
{
  "pageProps": {
    "design": {
      "instances": [
        {
          "prediction": 7200,    // Druckzeit in Sekunden
          "weight": 25.5         // Gewicht in Gramm
        }
      ]
    }
  }
}
```

## 🤝 Beitragen

Contributions sind willkommen! 

1. Fork das Repository
2. Erstelle einen Feature-Branch (`git checkout -b feature/AmazingFeature`)
3. Committe deine Änderungen (`git commit -m 'Add some AmazingFeature'`)
4. Push zum Branch (`git push origin feature/AmazingFeature`)
5. Öffne einen Pull Request

## 📜 Lizenz

Dieses Projekt ist unter der MIT-Lizenz lizenziert - siehe [LICENSE](LICENSE) Datei für Details.

## 👨‍💻 Autor

**David Fischer**

- GitHub: [@your-username](https://github.com/your-username)
- Website: [davidfischer.dev](https://davidfischer.dev)

## 🙏 Danksagungen

- MakerWorld für die großartige Plattform
- Die 3D-Druck-Community

## 📸 Screenshots

### Vor der Extension
Standard MakerWorld-Ansicht ohne zusätzliche Informationen.

### Nach der Extension
Jede Model-Card zeigt zusätzlich:
- ⏱️ Druckzeit (z.B. "2h 30m")
- ⚖️ Gewicht (z.B. "25.5g")

---

⭐ Wenn dir diese Extension hilft, gib dem Projekt einen Star!

