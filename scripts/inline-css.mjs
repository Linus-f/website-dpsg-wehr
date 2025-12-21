import fs from 'fs';
import path from 'path';

const OUT_DIR = 'out';

// This script inlines the main CSS bundle into the index.html file
// to achieve the 14KB rule and eliminate render-blocking requests.

async function inlineCss() {
    const htmlFile = path.join(OUT_DIR, 'index.html');
    if (!fs.existsSync(htmlFile)) return;

    let content = fs.readFileSync(htmlFile, 'utf8');
    
    // Find all CSS links
    const cssRegex = /<link rel="stylesheet" href="\/_next\/static\/chunks\/([^"]+)"[^>]*>/g;
    let match;
    const matches = [];
    while ((match = cssRegex.exec(content)) !== null) {
        matches.push({ full: match[0], filename: match[1] });
    }

    for (const { full, filename } of matches) {
        const cssPath = path.join(OUT_DIR, '_next/static/chunks', filename);
        if (fs.existsSync(cssPath)) {
            const cssContent = fs.readFileSync(cssPath, 'utf8');
            // Only inline if it's relatively small (e.g., < 100KB)
            // For the 14KB rule, we really want this to be small.
            if (cssContent.length < 100000) {
                console.log(`Inlining ${filename} into index.html`);
                content = content.replace(full, `<style>${cssContent}</style>`);
            }
        }
    }

    fs.writeFileSync(htmlFile, content);
}

inlineCss().catch(console.error);
