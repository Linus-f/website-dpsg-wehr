import { describe, it, expect } from 'vitest';
import { formatPostDate } from './date';

describe('formatPostDate', () => {
    it('formats a date string correctly in German', () => {
        const input = '2023-12-24';
        const result = formatPostDate(input);

        expect(result).toBe('24. Dezember 2023')
    })
})