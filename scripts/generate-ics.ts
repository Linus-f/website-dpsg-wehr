import { publicEvents } from '../lib/events.public';
import { AppEvent } from '../types';
import * as ics from 'ics';
import * as fs from 'fs';
import * as path from 'path';

// Try to load internal events
let internalEvents: AppEvent[] = [];
const internalEventsPath = path.join(process.cwd(), 'lib', 'events.internal.ts');

if (fs.existsSync(internalEventsPath)) {
    try {
        // Since we are running with tsx, we can require the TS file directly?
        // Or we might need to rely on the fact that we are in a TS environment.
        // Dynamic import might be cleaner.
        // Note: Dynamic import returns a Promise.
        console.log('Found internal events file.');
    } catch (e) {
        console.warn('Failed to load internal events:', e);
    }
}

// Helper to convert AppEvent to ICS attributes
function convertEventToIcsAttribute(event: AppEvent): ics.EventAttributes {
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
        title: event.title,
        start: start,
        calName: 'DPSG Wehr',
        location: 'Wehr',
    };

    if (end) {
        attributes.end = end;
    } else {
        attributes.duration = { days: 1 };
    }

    return attributes as ics.EventAttributes;
}

async function generate() {
    // Dynamic import for internal events to avoid build errors if missing
    try {
        // We use relative path from this script location? 
        // scripts/generate-ics.ts -> ../lib/events.internal.ts
        // tsx handles this
        // @ts-ignore
        const module = await import('../lib/events.internal');
        if (module && module.internalEvents) {
            internalEvents = module.internalEvents;
            console.log(`Loaded ${internalEvents.length} internal events.`);
        }
    } catch (e) {
        // File not found or not loadable, ignore
        console.log('No internal events loaded (file missing or empty).');
    }

    const allEvents = [...publicEvents, ...internalEvents];
    const publicIcsEvents = publicEvents.map(convertEventToIcsAttribute);
    const internalIcsEvents = allEvents.map(convertEventToIcsAttribute);

    const publicFilePath = path.join(process.cwd(), 'public', 'events.ics');
    const internalFilePath = path.join(process.cwd(), 'public', 'internal-events.ics');

    // Generate Public
    if (publicIcsEvents.length > 0) {
        // @ts-ignore
        const { error, value } = ics.createEvents(publicIcsEvents);
        if (error) {
            console.error('Error generating public events:', error);
            process.exit(1);
        }
        if (value) {
            fs.writeFileSync(publicFilePath, value);
            console.log(`Generated ${publicFilePath}`);
        }
    }

    // Generate Internal (All)
    if (internalIcsEvents.length > 0) {
        // @ts-ignore
        const { error, value } = ics.createEvents(internalIcsEvents);
        if (error) {
            console.error('Error generating internal events:', error);
            process.exit(1);
        }
        if (value) {
            fs.writeFileSync(internalFilePath, value);
            console.log(`Generated ${internalFilePath}`);
        }
    }
}

generate();