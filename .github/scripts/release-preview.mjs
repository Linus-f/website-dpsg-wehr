import semanticRelease from 'semantic-release';

async function run() {
  try {
    const branch = process.env.HEAD_REF;
    if (!branch) {
        throw new Error('HEAD_REF environment variable is required');
    }

    console.log(`Running semantic-release dry-run on branch: ${branch}`);

    const result = await semanticRelease({
      dryRun: true,
      branches: [branch], // Treat the current branch as the release branch
      plugins: [
        '@semantic-release/commit-analyzer',
        '@semantic-release/release-notes-generator'
      ]
    }, {
        // Override env to prevent CI detection from disabling the release
        env: {
            ...process.env,
            // "noCi" option in config should handle this, but explicit env override is safer
            // We pretend we are NOT in a PR and NOT in CI to bypass checks
            CI: 'false', 
            GITHUB_ACTIONS: 'false'
        }
    });

    if (result && result.nextRelease) {
      const { version, notes } = result.nextRelease;
      
      // Write to GITHUB_OUTPUT
      const fs = await import('fs');
      if (process.env.GITHUB_OUTPUT) {
          fs.appendFileSync(process.env.GITHUB_OUTPUT, `version=${version}\n`);
          
          const delimiter = `EOF_${Date.now()}`;
          fs.appendFileSync(process.env.GITHUB_OUTPUT, `notes<<${delimiter}\n${notes}\n${delimiter}\n`);
      }
      
      // Also print to stdout for debugging
      console.log('Next Version:', version);
    } else {
      console.log('No release triggered.');
      console.log('::set-output name=version::');
    }
  } catch (err) {
    console.error('The automated release failed with:', err);
    process.exit(1);
  }
}

run();
