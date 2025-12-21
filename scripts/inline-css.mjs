/* eslint-disable no-undef */
import fs from 'fs';
import path from 'path';

const OUT_DIR = 'out';

// This script inlines the main CSS bundle into all HTML files in the out directory
// to achieve the 14KB rule and eliminate render-blocking requests.

function getAllHtmlFiles(dirPath, arrayOfFiles) {
    const files = fs.readdirSync(dirPath);

    arrayOfFiles = arrayOfFiles || [];

    files.forEach(function(file) {
        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            arrayOfFiles = getAllHtmlFiles(dirPath + "/" + file, arrayOfFiles);
        } else {
            if (file.endsWith(".html")) {
                arrayOfFiles.push(path.join(dirPath, "/", file));
            }
        }
    });

    return arrayOfFiles;
}

async function inlineCss() {
    if (!fs.existsSync(OUT_DIR)) {
        console.error(`Directory ${OUT_DIR} does not exist. Run build first.`);
        return;
    }

    const htmlFiles = getAllHtmlFiles(OUT_DIR);
    console.log(`Found ${htmlFiles.length} HTML files to process.`);

    for (const htmlFile of htmlFiles) {
        let content = fs.readFileSync(htmlFile, 'utf8');
        
        // Find all CSS links that point to Next.js static assets
        // Supporting both /_next/static/css/ and /_next/static/chunks/
        const cssRegex = /<link [^>]*rel="stylesheet" [^>]*href="(\/_next\/static\/(?:css|chunks)\/[^"]+\.css)"[^>]*>/g;
        let match;
        const matches = [];
        while ((match = cssRegex.exec(content)) !== null) {
            matches.push({ full: match[0], href: match[1] });
        }

        if (matches.length === 0) continue;

        let modified = false;
        for (const { full, href } of matches) {
            // href is something like /_next/static/chunks/86711316ae5d5551.css
            // We need to map it to the file system path
            const filename = href.replace(/^\/_next\/static\//, '');
            const cssPath = path.join(OUT_DIR, '_next/static', filename);
            
            if (fs.existsSync(cssPath)) {
                const cssContent = fs.readFileSync(cssPath, 'utf8');
                // Only inline if it's relatively small (e.g., < 100KB)
                if (cssContent.length < 100000) {
                    console.log(`Inlining ${href} into ${path.relative(OUT_DIR, htmlFile)}`);
                    content = content.replace(full, `<style>${cssContent}</style>`);
                    
                    // Also remove preloads for this CSS
                    const escapedHref = href.replace(/\//g, '\\/').replace(/\./g, '\\.');
                    const preloadRegex = new RegExp(`<link [^>]*rel="preload" [^>]*as="style" [^>]*href="${escapedHref}"[^>]*>`, 'g');
                    content = content.replace(preloadRegex, '');

                    // Remove Next.js Hint Load hints from scripts
                    // They can look like :HL["/path.css","style"] or :HL[\"/path.css\",\"style\"]
                    // WARNING: Removing these can break the syntax of the hydration scripts (e.g. leaving double commas)
                    // causing "Connection closed" errors. Disabling for now.
                    /*
                    const hints = [
                        `:HL["${href}","style"]`,
                        `:HL[\\"${href}\\",\\"style\\"]`,
                        `:HL[\\\\\\"${href}\\\\\\",\\\\\\"style\\\\\\"]`
                    ];
                    hints.forEach(hint => {
                        content = content.split(hint).join('');
                    });
                    */
                    
                    modified = true;
                } else {
                    console.log(`Skipping ${href} (too large: ${cssContent.length} bytes)`);
                }
            } else {
                console.warn(`Could not find CSS file: ${cssPath}`);
            }
        }

        if (modified) {
            fs.writeFileSync(htmlFile, content);
        }
    }
}

inlineCss().catch(console.error);
