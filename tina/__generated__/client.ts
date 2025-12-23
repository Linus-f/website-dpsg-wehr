import { createClient } from 'tinacms/dist/client';
import { queries } from './types';
export const client = createClient({
    cacheDir: '/Users/linus/code/website-dpsg-wehr/tina/__generated__/.cache/1766527422422',
    url: 'http://localhost:4001/graphql',
    token: 'undefined',
    queries,
});
export default client;
