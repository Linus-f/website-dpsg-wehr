import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

// Helper to parse .env
function loadEnv() {
    const envPath = path.resolve(process.cwd(), '.env');
    if (fs.existsSync(envPath)) {
        const envConfig = fs.readFileSync(envPath, 'utf-8');
        envConfig.split('\n').forEach((line) => {
            const match = line.match(/^\s*([\w_]+)\s*=\s*(.*)?\s*$/);
            if (match) {
                const key = match[1];
                let value = match[2] || '';
                if (value.length > 0 && value.startsWith("'") && value.endsWith("'")) {
                    value = value.slice(1, -1);
                }
                if (value.length > 0 && value.startsWith('"') && value.endsWith('"')) {
                    value = value.slice(1, -1);
                }
                process.env[key] = value;
            }
        });
    }
}

loadEnv();

let owner = process.env.NEXT_PUBLIC_REPO_OWNER;
let repo = process.env.NEXT_PUBLIC_REPO_NAME;
const branch = process.env.NEXT_PUBLIC_REPO_BRANCH || 'main';
const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;

// Fallback to git config if env vars are missing
if (!owner || !repo) {
    try {
        const remoteUrl = execSync('git config --get remote.origin.url').toString().trim();
        const gitMatch = remoteUrl.match(/github\.com[:/]([^/]+)\/([^/.]+)(?:\.git)?$/);
        if (gitMatch) {
            owner = owner || gitMatch[1];
            repo = repo || gitMatch[2];
        }
    } catch (e) {
        // Ignore git error
    }
}

if (!owner || !repo) {
    console.error('Error: Could not determine repo owner and name.');
    process.exit(1);
}

console.log(`Fetching tina/tina-lock.json from GitHub for ${owner}/${repo} on branch ${branch}...`);

async function fetchRemoteLockFile() {
    const url = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/tina/tina-lock.json`;

    try {
        const headers: Record<string, string> = {};
        if (token) {
            headers['Authorization'] = `token ${token}`;
        }

        const response = await fetch(url, { headers });

        if (!response.ok) {
            console.error(`HTTP error! status: ${response.status}`);
            return;
        }

        const remoteLock = await response.json();
        const remoteMedia = remoteLock.schema?.config?.media;

        console.log('\n--- Remote tina-lock.json ---');
        console.log('Version:', remoteLock.schema?.version);
        console.log('Media Config:', JSON.stringify(remoteMedia, null, 2));

        // Compare with local
        const localLockPath = path.resolve(process.cwd(), 'tina/tina-lock.json');
        if (fs.existsSync(localLockPath)) {
            const localLock = JSON.parse(fs.readFileSync(localLockPath, 'utf-8'));
            const localMedia = localLock.schema?.config?.media;

            console.log('\n--- Local tina-lock.json ---');
            console.log('Version:', localLock.schema?.version);
            console.log('Media Config:', JSON.stringify(localMedia, null, 2));

            if (JSON.stringify(remoteMedia) !== JSON.stringify(localMedia)) {
                console.error('\n⚠️  MISMATCH DETECTED: Media configuration differs!');
                console.error('Remote expects:', JSON.stringify(remoteMedia));
                console.error('Local has:   ', JSON.stringify(localMedia));
                console.error(
                    '\nThis will cause a "Schema Mismatch" error during build on Tina Cloud or VPS.'
                );
                console.error(
                    'Ensure you commit and push your local tina-lock.json if the change is intentional.'
                );
            } else {
                console.log('\n✅  Media configuration matches.');
            }
        } else {
            console.log('\nLocal tina-lock.json not found.');
        }
    } catch (error) {
        console.error('Error fetching tina-lock.json from GitHub:', error);
    }
}

fetchRemoteLockFile();
