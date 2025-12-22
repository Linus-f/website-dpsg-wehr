/* eslint-disable no-undef */
import fs from 'fs';
import path from 'path';

const OUT_DIR = 'out';

// This script inlines the main CSS bundle into all HTML files in the out directory
// to achieve the 14KB rule and eliminate render-blocking requests.

function getAllHtmlFiles(dirPath, arrayOfFiles) {
    const files = fs.readdirSync(dirPath);

    arrayOfFiles = arrayOfFiles || [];

    files.forEach(function (file) {
        if (fs.statSync(dirPath + '/' + file).isDirectory()) {
            arrayOfFiles = getAllHtmlFiles(dirPath + '/' + file, arrayOfFiles);
        } else {
            if (file.endsWith('.html')) {
                arrayOfFiles.push(path.join(dirPath, '/', file));
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
        const cssRegex = /<link\s+[^>]*href="(\/_next\/static\/(?:css|chunks)\/[^"]+\.css)"[^>]*>/g;
        let match;
        const matches = [];
        // Helper to parse attributes from a tag string
        const getAttr = (tag, attr) => {
            const re = new RegExp(`${attr}="([^"]*)"`);
            const m = re.exec(tag);
            return m ? m[1] : null;
        };

        // Find all CSS-like links first based on href
        while ((match = cssRegex.exec(content)) !== null) {
            matches.push({ full: match[0], href: match[1] });
        }

        if (matches.length === 0) continue;

        let modified = false;
        for (const { full, href } of matches) {
            const rel = getAttr(full, 'rel');
            const asAttr = getAttr(full, 'as');

            // We only care about stylesheets or preloads of style
            if (rel !== 'stylesheet' && !(rel === 'preload' && asAttr === 'style')) {
                continue;
            }

            const filename = href.replace(/^\/_next\/static\//, '');
            const cssPath = path.join(OUT_DIR, '_next/static', filename);

            if (fs.existsSync(cssPath)) {
                const cssContent = fs.readFileSync(cssPath, 'utf8');
                if (cssContent.length < 100000) {
                    if (rel === 'stylesheet') {
                        console.log(`Inlining ${href} into ${path.relative(OUT_DIR, htmlFile)}`);
                        content = content.replace(full, `<style>${cssContent}</style>`);
                        modified = true;
                    } else if (rel === 'preload') {
                        console.log(
                            `Removing preload ${href} from ${path.relative(OUT_DIR, htmlFile)}`
                        );
                        content = content.replace(full, '');
                        modified = true;
                    }
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
