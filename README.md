# IDE 2020 - Tutorial Basic

[![Deploy-Page](https://github.com/Johannes-Schiel/ud-basic-webdev-setup/actions/workflows/pages.yml/badge.svg?branch=master)](https://github.com/Johannes-Schiel/ud-basic-webdev-setup/actions/workflows/pages.yml)
[![Unit-Testing](https://github.com/Johannes-Schiel/ud-basic-webdev-setup/actions/workflows/unittest.yml/badge.svg?branch=master)](https://github.com/Johannes-Schiel/ud-basic-webdev-setup/actions/workflows/unittest.yml)
[![CodeQL](https://github.com/Johannes-Schiel/ud-basic-webdev-setup/actions/workflows/codeql-analysis.yml/badge.svg?branch=master)](https://github.com/Johannes-Schiel/ud-basic-webdev-setup/actions/workflows/codeql-analysis.yml)

Bei diesem Repository handelt es sich um meine "Test-/Entwicklungsumgebung" für alle meine YouTube Tutorials. Sie basiert auf Gulp, TypeScript/JS, ES6+ und Sass, gehört zu dem folgenden [YouTube Tutorial](https://www.youtube.com/watch?v=GMakamOBAwA) und wird dort genau erklärt.

## Befehle

`npm run dev` ist der Befehl, der für das Starten der Umgebung erforderlich ist, alles auf einmal baut und auf Änderungen wartet. Hierbei wird ein Liveserver inkl. Browser-Refresh gestartet.

`npm run build` ist der Build-Befehl, hierbei wird alles gebaut und im `dist/` Verzeichnis hinterlegt. Es wird nicht auf Änderungen an Dateien gewartet.

## Typescript

Zur Verwendung von Typescript muss eine in der Gulpfile die Variable `useTypeScript` auf `true` gesetzt werden. Anschließend werden die `.ts` Files in der `src/script` Directory genutzt und nicht mehr die `.js` Files. Es können jedoch beide Arten von Files in der Directory liegen.

## Mitarbeit

Wie bei jedem Programmier-Projekt kommt dieses Projekt auch in die Jahre, gerne kannst du helfen diese Umgebung besser zu gestalten und Änderungen vorschlagen oder Issues schreiben.

Für Fragen oder weitere Informationen schau doch einfach mal auf dem [Discord Server](https://discord.gg/NV2NrXA) vorbei.
