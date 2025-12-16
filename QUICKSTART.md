# MakerWorld Print Info - Chrome Extension

## 🎯 Übersicht

Diese Chrome Extension zeigt **Druckzeit** und **Gewicht** direkt auf der MakerWorld-Übersichtsseite für jedes Modell
an.

## 📂 Dateien

```
makerworld-extension/
├── manifest.json          # Extension-Konfiguration (Manifest V3)
├── content.js            # Haupt-Script (JSON-Abruf & Anzeige)
├── styles.css            # Styling für die Informationsanzeige
├── README.md             # Ausführliche Dokumentation
├── installation.html     # Visuelle Installationsanleitung
└── QUICKSTART.md         # Diese Datei
```

## 🚀 Schnellstart (3 Schritte)

### 1️⃣ Chrome Extensions öffnen

```
chrome://extensions/
```

### 2️⃣ Entwicklermodus aktivieren

Toggle oben rechts aktivieren

### 3️⃣ Extension laden

"Entpackte Erweiterung laden" → Diesen Ordner auswählen

## ✅ Fertig!

Besuche [makerworld.com](https://makerworld.com) und sieh dir die Modellübersicht an.

## 📊 Was wird angezeigt?

Für jedes Modell:

- ⏱️ **Druckzeit** (z.B. "2h 30m")
- ⚖️ **Gewicht** (z.B. "125.5g")

## 🔧 Technische Details

### API-Endpunkt

```
https://makerworld.com/_next/data/{buildId}/{lang}/models/{id}-{slug}.json
```

### Extrahierte Daten

```javascript
pageProps.design.instances[0].prediction  // Druckzeit in Sekunden
pageProps.design.instances[0].weight      // Gewicht in Gramm
```

### Features

- ✅ Automatische Build-ID-Erkennung
- ✅ Mehrsprachig (de, en, es, fr, etc.)
- ✅ Lazy Loading Support
- ✅ Performance-optimiert (nur sichtbare Cards)
- ✅ Rate-Limiting (200ms zwischen Requests)
- ✅ MutationObserver für dynamische Inhalte

## 🐛 Debugging

Öffne die Console (F12) und suche nach:

```
MakerWorld Print Info Extension geladen
Gefunden: X Design-Cards
Lade Daten von: https://...
Model XXXXX: Zeit=XXXs, Gewicht=XXXg
```

## ⚠️ Bekannte Limitierungen

- Manche Modelle haben keine Instanz-Daten
- Rate-Limiting: Max. 5 Requests pro Sekunde
- Funktioniert nur auf makerworld.com

## 🔄 Updates

Falls MakerWorld die API ändert:

1. Öffne `content.js`
2. Passe die JSON-Pfade an
3. Lade Extension neu

## 📝 Lizenz

Für persönlichen Gebrauch. Respektiere MakerWorlds Terms of Service.

---

**Version:** 1.0.0  
**Datum:** 15.12.2025  
**Status:** ✅ Produktionsbereit

