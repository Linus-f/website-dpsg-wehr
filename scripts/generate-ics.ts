import * as ics from 'ics';
import * as fs from 'fs';
import * as path from 'path';
import { publicEvents } from '../lib/events.public';
import { internalEvents } from '../lib/events.internal.example'; // We use example here as we don't have the real one
import { AppEvent } from '../types';

// This script generates ICS files from the events defined in the codebase.
// It is run as part of the build process.

function parseDate(dateStr: string): ics.DateArray {
    // Normalize separator to space (handles "YYYY-MM-DDTHH:mm" and "YYYY-MM-DD HH:mm")
    const normalized = dateStr.replace('T', ' ');
    const [datePart, timePart] = normalized.split(' ');
    const [year, month, day] = datePart.split('-').map(Number);

    if (timePart) {
        const [hour, minute] = timePart.split(':').map(Number);
        return [year, month, day, hour, minute];
    }
    return [year, month, day];
}

export function convertEventToIcsAttribute(event: AppEvent): ics.EventAttributes {
    const start = parseDate(event.start);

    const baseAttributes: ics.EventAttributes = {
        start: start,
        title: event.title,
        location: event.location,
        description: event.description,
    };

    if (event.end) {
        baseAttributes.end = parseDate(event.end);
    } else {
        // If it's a date-only event (3 parts), default to 1 day duration
        if (start.length === 3) {
            baseAttributes.duration = { days: 1 };
        }
        // If it has time (5 parts) but no end, default to 1 hour?
        // standard ics behavior often defaults to 1 hour if not specified,
        // or we can leave it to the client.
        // Let's set a default duration of 1 hour for timed events if no end is specified.
        else {
            baseAttributes.duration = { hours: 1 };
        }
    }

    return baseAttributes;
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

    // Determine internal events filename
    const internalIcsToken = process.env.INTERNAL_ICS_TOKEN;
    const internalFilename = internalIcsToken
        ? `internal-events-${internalIcsToken}.ics`
        : 'internal-events.ics';

    // Try to generate internal events if the file exists
    const internalEventsPath = path.join(process.cwd(), 'lib/events.internal.ts');
    if (fs.existsSync(internalEventsPath)) {
        console.log('Found internal events file.');
        // Use a dynamic import with a variable to prevent Vite from trying to resolve it at build time
        const modulePath = '../lib/events.internal';
        import(modulePath)
            .then((m) => {
                generateIcs(m.internalEvents, internalFilename);
            })
            .catch((err) => {
                console.error('Error loading internal events:', err);
            });
    } else {
        console.log('No internal events file found, using example.');
        generateIcs(internalEvents, internalFilename);
    }
}

// Only run if the script is executed directly
const isMain = process.argv[1]?.endsWith('generate-ics.ts');
if (isMain) {
    generateAll();
}
