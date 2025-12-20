# Website der DPSG Wehr
[![statichost.eu status](https://builder.statichost.eu/dpsg-wehr/status.svg)](https://builder.statichost.eu/dpsg-wehr/)

Hier findet ihr den Quellcode zu unserer Homepage. Die Website wurde mit [Next.js](https://nextjs.org) entwickelt und wird komplett statisch generiert. Die fertig generierte Website liegt in einem anderen [Repository](https://github.com/Linus-f/website-dpsg-wehr-static).

## Entwicklung

### Tools verwalten mit mise

Dieses Projekt verwendet [mise](https://mise.jdx.sh/) zur Verwaltung von Entwicklungs-Tools (Node.js, pnpm). Wenn mise installiert ist, werden die richtigen Versionen automatisch beim Öffnen des Verzeichnisses aktiviert (oder können mise `mise install` installiert werden).

Die Nutzung von mise muss ggf. mit `mise trust` erlaubt werden.

## Generieren der Website
Zum generieren der Website werden [git](https://git-scm.com/) und [pnpm](https://pnpm.io/installation) benötigt. Sie kann mit den folgenden Befehlen erstellt werden.

```bash
# Repository klonen
git clone https://github.com/Linus-f/website-dpsg-wehr.git

# In Ordnder wechseln
cd website-dpsg-wehr

# Abhängigkeiten installieren
pnpm install

# Website generieren
pnpm export
```

Die generierte Website wird im Ordner `out` gespeichert. Zur Entwicklung kann ein lokaler server gestartet werden: 

```bash
pnpm dev
```

Die Website ist dann unter [http://localhost:3000](http://localhost:3000) verfügbar. Falls einige Bilder nicht geladen werden können, müssen die optimierten Versionen erst mit `pnpm export` generiert werden.


