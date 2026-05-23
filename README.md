# MPE Ohmstraße 63 | HausHoch Consult

Statische GitHub-Pages-Landingpage für die Marktpreiseinschätzung Ohmstraße 63, Frankfurt am Main.

## Launch

1. Inhalt dieses Ordners in die Root des GitHub-Repositories kopieren.
2. Repository -> Settings -> Pages.
3. Source: Deploy from a branch.
4. Branch: `main`, Folder: `/root`.
5. Speichern und GitHub Pages URL öffnen.

## Zugang

Die Seite enthält ein clientseitiges Passwort-Overlay.

Passwort: `haushochconsult`

Hinweis: GitHub Pages bietet bei statischen öffentlichen Repositories keinen echten serverseitigen Passwortschutz. Für echte Zugriffskontrolle Repository privat halten oder Cloudflare Access / Netlify Password Protection nutzen.

## Dateien

- `index.html`: finale Landingpage
- `index.inline.html`: Vorschau-/Sicherheitsversion mit eingebetteten Assets
- `assets/`: Bilder, Logo, Team, Grundrisse, Abschlussbild
- `.nojekyll`: deaktiviert Jekyll-Verarbeitung
- `robots.txt`: blockiert Indexierung
- `404.html`: Fallback auf Landingpage
