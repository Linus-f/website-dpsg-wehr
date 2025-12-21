import { describe, it, expect } from 'vitest';
import { convertEventToIcsAttribute } from './generate-ics';

describe('ICS Generation', () => {
    it('correctly converts a single day event', () => {
        const event = {
            title: 'Test Event',
            start: '2025-12-24',
        };

        const result = convertEventToIcsAttribute(event);

        expect(result.start).toEqual([2025, 12, 24]);

        if ('duration' in result && result.duration) {
            expect(result.duration.days).toBe(1);
        } else {
            throw new Error('Expected duration to be present');
        }
    });

    it('correctly converts a multi-day event', () => {
        const event = {
            title: 'SIF',
            start: '2025-11-21',
            end: '2025-11-24',
        };

        const result = convertEventToIcsAttribute(event);

        expect(result.start).toEqual([2025, 11, 21]);

        if ('end' in result) {
            expect(result.end).toEqual([2025, 11, 24]);
        } else {
            throw new Error('Expected end date to be present');
        }
    });
});