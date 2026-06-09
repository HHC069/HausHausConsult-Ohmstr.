# HausHoch Consult - Animation Layer fuer bestehende Website

Dieses Repository enthaelt eine nicht-invasive Animationsschicht fuer die bestehende Website von HausHoch Consult.

Wichtig: Die bestehende Website wird nicht nachgebaut und nicht umgestaltet. Farben, Schriften, Inhalte, Bilder, Abstaende und Layout bleiben aus der bestehenden Website. Die Dateien ergaenzen nur Bewegung:

- Scroll-Reveal beim Sichtbarwerden von Elementen
- dezente 3D-Hover-Effekte auf Karten, Buttons, Links und Teaser
- leichte Parallax-Bewegung bei Bildern und Hero-Bereichen
- dezente Scroll-Fortschrittslinie
- Respektiert `prefers-reduced-motion`

## Dateien

- `assets/haushoch-scroll-3d.css`
- `assets/haushoch-scroll-3d.js`
- `IONOS_EINBINDUNG_SNIPPET.html`
- `tools/inject_animations.py`

## Direkte Einbindung in IONOS oder bestehende Website

Wenn die Dateien unter `/assets/` erreichbar sind, diesen Snippet in den Head/Footer der bestehenden Website einbinden:

```html
<link rel="stylesheet" href="assets/haushoch-scroll-3d.css">
<script src="assets/haushoch-scroll-3d.js" defer></script>
```

## Nutzung mit statischem Export und GitHub Pages

1. Bestehende Website als HTML exportieren und in einen Ordner `source` legen.
2. Dieses Repository lokal klonen.
3. Ausfuehren:

```bash
python tools/inject_animations.py --source ./source --output ./dist
```

4. Den Inhalt von `dist` auf GitHub Pages deployen.

## Hinweis

Die aktuelle Datei `index.html` in diesem Repository war leer. Deshalb wurde bewusst keine bestehende Website-Seite ueberschrieben. Fuer die Hauptwebsite muss entweder der Snippet in IONOS gesetzt oder ein echter HTML-Export der bestehenden Website mit dem Inject-Tool verarbeitet werden.
