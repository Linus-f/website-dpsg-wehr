import * as ics from 'ics';
import * as fs from 'fs';
import * as path from 'path';
import { publicEvents } from '../lib/events.public';
import { internalEvents } from '../lib/events.internal.example'; // We use example here as we don't have the real one

// This script generates ICS files from the events defined in the codebase.
// It is run as part of the build process.

export interface AppEvent {
    title: string;
    start: string; // YYYY-MM-DD
    end?: string;  // YYYY-MM-DD
}

export function convertEventToIcsAttribute(event: AppEvent): ics.EventAttributes {
    const startParts = event.start.split('-').map(Number);
    // @ts-ignore
    const start: ics.DateArray = [startParts[0], startParts[1], startParts[2]];
    
    let end: ics.DateArray | undefined = undefined;
    if (event.end) {
        const endParts = event.end.split('-').map(Number);
        // @ts-ignore
        end = [endParts[0], endParts[1], endParts[2]];
    }

    const attributes: any = {
        start: start,
        title: event.title,
    };

    if (end) {
        attributes.end = end;
    } else {
        attributes.duration = { days: 1 };
    }

    return attributes as ics.EventAttributes;
}

function generateIcs(events: AppEvent[], filename: string) {
    const icsEvents = events.map(convertEventToIcsAttribute);
    
    const { error, value } = ics.createEvents(icsEvents);
    
    if (error) {
        console.error(`Error generating ICS for ${filename}:`, error);
        return;
    }
    
    if (value) {
        const filePath = path.join(process.cwd(), 'public', filename);
        fs.writeFileSync(filePath, value);
        console.log(`Generated ${filePath}`);
    }
}

export function generateAll() {
    // Ensure the directory exists
    const publicDir = path.join(process.cwd(), 'public');
    if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir, { recursive: true });
    }

    // Generate public events
    generateIcs(publicEvents, 'events.ics');

    // Try to generate internal events if the file exists
    const internalEventsPath = path.join(process.cwd(), 'lib/events.internal.ts');
    if (fs.existsSync(internalEventsPath)) {
        console.log('Found internal events file.');
        // Use a dynamic import with a variable to prevent Vite from trying to resolve it at build time
        const modulePath = '../lib/events.internal';
        import(modulePath).then(m => {
            generateIcs(m.internalEvents, 'internal-events.ics');
        }).catch(err => {
            console.error('Error loading internal events:', err);
        });
    } else {
        console.log('No internal events file found, using example.');
        generateIcs(internalEvents, 'internal-events.ics');
    }
}

// Only run if the script is executed directly
const isMain = process.argv[1]?.endsWith('generate-ics.ts');
if (isMain) {
    generateAll();
}
