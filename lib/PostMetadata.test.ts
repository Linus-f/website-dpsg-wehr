import { describe, it, expect, vi, beforeEach } from 'vitest';
import getPostMetadata from './PostMetadata';
import fs from 'fs';
import matter from 'gray-matter';

// Setup mocking
vi.mock('fs', () => ({
    default: {
        readdirSync: vi.fn(),
        readFileSync: vi.fn(),
    }
}));

vi.mock('gray-matter');
vi.mock('image-size', () => ({
    default: vi.fn(() => ({ width: 100, height: 100}))
}));

describe('getPostMetadata', () => {
    beforeEach(() => {
        // Clear mocks to avoid leaking state
        vi.clearAllMocks();
    });

    it('should return metadata for posts in the directory', () => {
        vi.mocked(fs.readdirSync).mockReturnValue([
            {name: 'first-post', isDirectory: () => true }
        ] as any);

        vi.mocked(fs.readFileSync).mockReturnValue('mocked file content');

        vi.mocked(matter).mockReturnValue({
            data: {
                title: 'First Post',
                date: '2023-01-01',
                image: 'test.jpg'
            }
        } as any);

        const result = getPostMetadata();

        expect(result).toHaveLength(1);
        expect(result[0].title).toBe('First Post');
        expect(result[0].slug).toBe('first-post');
    })
});