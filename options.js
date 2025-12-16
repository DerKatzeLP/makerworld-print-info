// MakerWorld Print Info Extension - Options Script

// Browser-API-Kompatibilität (Chrome & Firefox)
const browserAPI = typeof browser !== 'undefined' ? browser : chrome;

// Übersetzungen für die Options-Seite
const translations = {
    en: {
        title: 'MakerWorld Print Info',
        subtitle: 'Settings for the Browser Extension',
        debugMode: 'Enable Debug Mode',
        debugModeDesc: 'Shows detailed developer information in the browser console (F12). Helpful for troubleshooting and tracking what the extension is doing.',
        showPrintTime: 'Show Print Time',
        showPrintTimeDesc: 'Display or hide the estimated print time for the model.',
        showWeight: 'Show Weight',
        showWeightDesc: 'Display or hide the estimated weight for the model.',
        unitLabel: 'Choose weight unit:',
        unitG: 'Grams (g)',
        unitOz: 'Ounces (oz)',
        unitDesc: 'Select the unit for weight display.',
        languageLabel: 'Choose language:',
        languageDesc: 'Select the language for information display.',
        hint: 'Note:',
        hintText: 'Changes are saved automatically and applied immediately. You don\'t need to reload the page.',
        saved: '✓ Settings saved!'
    },
    de: {
        title: 'MakerWorld Print Info',
        subtitle: 'Einstellungen für die Browser Extension',
        debugMode: 'Debug-Modus aktivieren',
        debugModeDesc: 'Zeigt detaillierte Entwickler-Informationen in der Browser-Konsole an (F12). Hilfreich für Fehleranalyse und zum Nachvollziehen, was die Extension gerade macht.',
        showPrintTime: 'Druckzeit anzeigen',
        showPrintTimeDesc: 'Blendet die geschätzte Druckzeit für das Modell ein oder aus.',
        showWeight: 'Gewicht anzeigen',
        showWeightDesc: 'Blendet das geschätzte Gewicht für das Modell ein oder aus.',
        unitLabel: 'Gewichtseinheit wählen:',
        unitG: 'Gramm (g)',
        unitOz: 'Unzen (oz)',
        unitDesc: 'Wähle die Einheit für die Gewichtsanzeige.',
        languageLabel: 'Sprache wählen:',
        languageDesc: 'Wähle die Sprache für die Anzeige der Informationen.',
        hint: '💡 Hinweis:',
        hintText: 'Änderungen werden automatisch gespeichert und sofort angewendet. Du musst die Seite nicht neu laden.',
        saved: '✓ Einstellungen gespeichert!'
    },
    es: {
        title: 'MakerWorld Print Info',
        subtitle: 'Configuración para la extensión del navegador',
        debugMode: 'Activar modo de depuración',
        debugModeDesc: 'Muestra información detallada del desarrollador en la consola del navegador (F12). Útil para solucionar problemas y rastrear lo que hace la extensión.',
        showPrintTime: 'Mostrar tiempo de impresión',
        showPrintTimeDesc: 'Muestra u oculta el tiempo de impresión estimado del modelo.',
        showWeight: 'Mostrar peso',
        showWeightDesc: 'Muestra u oculta el peso estimado del modelo.',
        unitLabel: 'Elegir unidad de peso:',
        unitG: 'Gramos (g)',
        unitOz: 'Onzas (oz)',
        unitDesc: 'Selecciona la unidad para mostrar el peso.',
        languageLabel: 'Elegir idioma:',
        languageDesc: 'Selecciona el idioma para mostrar la información.',
        hint: '💡 Nota:',
        hintText: 'Los cambios se guardan automáticamente y se aplican de inmediato. No necesitas recargar la página.',
        saved: '✓ ¡Configuración guardada!'
    },
    fr: {
        title: 'MakerWorld Print Info',
        subtitle: 'Paramètres pour l\'extension du navigateur',
        debugMode: 'Activer le mode débogage',
        debugModeDesc: 'Affiche des informations détaillées dans la console du navigateur (F12). Utile pour le dépannage et le suivi de ce que fait l\'extension.',
        showPrintTime: 'Afficher le temps d\'impression',
        showPrintTimeDesc: 'Affiche ou masque le temps d\'impression estimé du modèle.',
        showWeight: 'Afficher le poids',
        showWeightDesc: 'Affiche ou masque le poids estimé du modèle.',
        unitLabel: 'Choisir l\'unité de poids:',
        unitG: 'Grammes (g)',
        unitOz: 'Onces (oz)',
        unitDesc: 'Sélectionnez l\'unité pour l\'affichage du poids.',
        languageLabel: 'Choisir la langue:',
        languageDesc: 'Sélectionnez la langue pour l\'affichage des informations.',
        hint: '💡 Remarque:',
        hintText: 'Les modifications sont enregistrées automatiquement et appliquées immédiatement. Vous n\'avez pas besoin de recharger la page.',
        saved: '✓ Paramètres enregistrés!'
    },
    it: {
        title: 'MakerWorld Print Info',
        subtitle: 'Impostazioni per l\'estensione del browser',
        debugMode: 'Attiva modalità debug',
        debugModeDesc: 'Mostra informazioni dettagliate nella console del browser (F12). Utile per la risoluzione dei problemi e per monitorare ciò che fa l\'estensione.',
        showPrintTime: 'Mostra tempo di stampa',
        showPrintTimeDesc: 'Mostra o nasconde il tempo di stampa stimato del modello.',
        showWeight: 'Mostra peso',
        showWeightDesc: 'Mostra o nasconde il peso stimato del modello.',
        unitLabel: 'Scegli unità di peso:',
        unitG: 'Grammi (g)',
        unitOz: 'Once (oz)',
        unitDesc: 'Seleziona l\'unità per la visualizzazione del peso.',
        languageLabel: 'Scegli lingua:',
        languageDesc: 'Seleziona la lingua per la visualizzazione delle informazioni.',
        hint: '💡 Nota:',
        hintText: 'Le modifiche vengono salvate automaticamente e applicate immediatamente. Non è necessario ricaricare la pagina.',
        saved: '✓ Impostazioni salvate!'
    },
    ja: {
        title: 'MakerWorld Print Info',
        subtitle: 'ブラウザ拡張機能の設定',
        debugMode: 'デバッグモードを有効にする',
        debugModeDesc: 'ブラウザコンソール（F12）に詳細な開発者情報を表示します。トラブルシューティングと拡張機能の動作追跡に役立ちます。',
        showPrintTime: '印刷時間を表示',
        showPrintTimeDesc: 'モデルの推定印刷時間を表示または非表示にします。',
        showWeight: '重量を表示',
        showWeightDesc: 'モデルの推定重量を表示または非表示にします。',
        unitLabel: '重量単位を選択:',
        unitG: 'グラム (g)',
        unitOz: 'オンス (oz)',
        unitDesc: '重量表示の単位を選択します。',
        languageLabel: '言語を選択:',
        languageDesc: '情報表示の言語を選択します。',
        hint: '💡 注意:',
        hintText: '変更は自動的に保存され、すぐに適用されます。ページを再読み込みする必要はありません。',
        saved: '✓ 設定が保存されました！'
    },
    ko: {
        title: 'MakerWorld Print Info',
        subtitle: '브라우저 확장 프로그램 설정',
        debugMode: '디버그 모드 활성화',
        debugModeDesc: '브라우저 콘솔(F12)에 자세한 개발자 정보를 표시합니다. 문제 해결 및 확장 프로그램의 작동 추적에 유용합니다.',
        showPrintTime: '인쇄 시간 표시',
        showPrintTimeDesc: '모델의 예상 인쇄 시간을 표시하거나 숨깁니다.',
        showWeight: '무게 표시',
        showWeightDesc: '모델의 예상 무게를 표시하거나 숨깁니다.',
        unitLabel: '무게 단위 선택:',
        unitG: '그램 (g)',
        unitOz: '온스 (oz)',
        unitDesc: '무게 표시 단위를 선택합니다.',
        languageLabel: '언어 선택:',
        languageDesc: '정보 표시 언어를 선택합니다.',
        hint: '💡 참고:',
        hintText: '변경 사항은 자동으로 저장되고 즉시 적용됩니다. 페이지를 새로 고칠 필요가 없습니다.',
        saved: '✓ 설정이 저장되었습니다!'
    },
    pt: {
        title: 'MakerWorld Print Info',
        subtitle: 'Configurações para a extensão do navegador',
        debugMode: 'Ativar modo de depuração',
        debugModeDesc: 'Mostra informações detalhadas no console do navegador (F12). Útil para solução de problemas e rastreamento do que a extensão está fazendo.',
        showPrintTime: 'Mostrar tempo de impressão',
        showPrintTimeDesc: 'Exibe ou oculta o tempo de impressão estimado do modelo.',
        showWeight: 'Mostrar peso',
        showWeightDesc: 'Exibe ou oculta o peso estimado do modelo.',
        unitLabel: 'Escolher unidade de peso:',
        unitG: 'Gramas (g)',
        unitOz: 'Onças (oz)',
        unitDesc: 'Selecione a unidade para exibição de peso.',
        languageLabel: 'Escolher idioma:',
        languageDesc: 'Selecione o idioma para exibição de informações.',
        hint: '💡 Nota:',
        hintText: 'As alterações são salvas automaticamente e aplicadas imediatamente. Você não precisa recarregar a página.',
        saved: '✓ Configurações salvas!'
    },
    ru: {
        title: 'MakerWorld Print Info',
        subtitle: 'Настройки расширения браузера',
        debugMode: 'Включить режим отладки',
        debugModeDesc: 'Показывает подробную информацию разработчика в консоли браузера (F12). Полезно для устранения неполадок и отслеживания работы расширения.',
        showPrintTime: 'Показать время печати',
        showPrintTimeDesc: 'Отображает или скрывает расчетное время печати модели.',
        showWeight: 'Показать вес',
        showWeightDesc: 'Отображает или скрывает расчетный вес модели.',
        unitLabel: 'Выбрать единицу веса:',
        unitG: 'Граммы (г)',
        unitOz: 'Унции (oz)',
        unitDesc: 'Выберите единицу измерения веса.',
        languageLabel: 'Выбрать язык:',
        languageDesc: 'Выберите язык для отображения информации.',
        hint: '💡 Примечание:',
        hintText: 'Изменения сохраняются автоматически и применяются немедленно. Вам не нужно перезагружать страницу.',
        saved: '✓ Настройки сохранены!'
    },
    zh: {
        title: 'MakerWorld Print Info',
        subtitle: '浏览器扩展设置',
        debugMode: '启用调试模式',
        debugModeDesc: '在浏览器控制台（F12）中显示详细的开发者信息。有助于故障排除和跟踪扩展正在执行的操作。',
        showPrintTime: '显示打印时间',
        showPrintTimeDesc: '显示或隐藏模型的估计打印时间。',
        showWeight: '显示重量',
        showWeightDesc: '显示或隐藏模型的估计重量。',
        unitLabel: '选择重量单位：',
        unitG: '克 (g)',
        unitOz: '盎司 (oz)',
        unitDesc: '选择重量显示单位。',
        languageLabel: '选择语言：',
        languageDesc: '选择信息显示的语言。',
        hint: '💡 提示：',
        hintText: '更改会自动保存并立即应用。您无需重新加载页面。',
        saved: '✓ 设置已保存！'
    }
};

// Funktion zum Aktualisieren der UI-Sprache
function updateUILanguage(lang) {
    const t = translations[lang] || translations.en;

    document.querySelector('h1').textContent = t.title;
    document.querySelector('.subtitle').textContent = t.subtitle;

    document.querySelector('label[for="debugMode"]').childNodes[2].textContent = t.debugMode;
    document.querySelectorAll('.description')[0].textContent = t.debugModeDesc;

    document.querySelector('label[for="showPrintTime"]').childNodes[2].textContent = t.showPrintTime;
    document.querySelectorAll('.description')[1].textContent = t.showPrintTimeDesc;

    document.querySelector('label[for="showWeight"]').childNodes[2].textContent = t.showWeight;
    document.querySelectorAll('.description')[2].textContent = t.showWeightDesc;

    document.querySelector('label[for="unit"]').textContent = t.unitLabel;
    document.getElementById('unit').options[0].textContent = t.unitG;
    document.getElementById('unit').options[1].textContent = t.unitOz;
    document.querySelectorAll('.description')[3].textContent = t.unitDesc;

    document.querySelector('label[for="language"]').textContent = t.languageLabel;
    document.querySelectorAll('.description')[4].textContent = t.languageDesc;

    document.querySelector('.hint strong').textContent = t.hint;
    document.querySelector('.hint').childNodes[2].textContent = ' ' + t.hintText;

    document.getElementById('status').textContent = t.saved;

    // HTML lang Attribut aktualisieren
    document.documentElement.lang = lang;
}

// Lade gespeicherte Einstellungen beim Start
async function loadSettings() {
    try {
        const result = await browserAPI.storage.sync.get([
            'debugMode',
            'showPrintTime',
            'showWeight',
            'unit',
            'language'
        ]);
        // Standardwerte
        const debugMode = result.debugMode !== undefined ? result.debugMode : false;
        const showPrintTime = result.showPrintTime !== undefined ? result.showPrintTime : true;
        const showWeight = result.showWeight !== undefined ? result.showWeight : true;
        const unit = result.unit || 'g';
        const language = result.language || 'en';

        // UI-Sprache aktualisieren
        updateUILanguage(language);

        document.getElementById('debugMode').checked = debugMode;
        document.getElementById('showPrintTime').checked = showPrintTime;
        document.getElementById('showWeight').checked = showWeight;
        document.getElementById('unit').value = unit;
        document.getElementById('language').value = language;
        console.log('Einstellungen geladen:', {debugMode, showPrintTime, showWeight, unit, language});
    } catch (error) {
        console.error('Fehler beim Laden der Einstellungen:', error);
    }
}

// Speichere Einstellungen
async function saveSettings() {
    try {
        const debugMode = document.getElementById('debugMode').checked;
        const showPrintTime = document.getElementById('showPrintTime').checked;
        const showWeight = document.getElementById('showWeight').checked;
        const unit = document.getElementById('unit').value;
        const language = document.getElementById('language').value;

        // UI-Sprache aktualisieren, wenn Sprache geändert wurde
        updateUILanguage(language);

        await browserAPI.storage.sync.set({debugMode, showPrintTime, showWeight, unit, language});
        console.log('Einstellungen gespeichert:', {debugMode, showPrintTime, showWeight, unit, language});

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

// Event-Listener für Checkbox- und Dropdown-Änderungen
['debugMode', 'showPrintTime', 'showWeight', 'unit', 'language'].forEach(id => {
    document.getElementById(id).addEventListener('change', saveSettings);
});

// Lade Einstellungen beim Start der Options-Seite
loadSettings();
