## [1.1.2](https://github.com/Linus-f/website-dpsg-wehr/compare/v1.1.1...v1.1.2) (2025-12-21)


### Bug Fixes

* **ci:** run docker action after sucessful release ([5a367dc](https://github.com/Linus-f/website-dpsg-wehr/commit/5a367dc309ccb58ae5e55e10d5b6ea5c5d17c41c))

## [1.1.1](https://github.com/Linus-f/website-dpsg-wehr/compare/v1.1.0...v1.1.1) (2025-12-21)


### Bug Fixes

* **ci:** ensure 'latest' tag is updated on version releases ([8dbebd2](https://github.com/Linus-f/website-dpsg-wehr/commit/8dbebd22b9e6b8c3e489249dd1e0a8edccb4945c))

# [1.1.0](https://github.com/Linus-f/website-dpsg-wehr/compare/v1.0.0...v1.1.0) (2025-12-21)


### Bug Fixes

* **ci:** aggressively delete GITHUB_ env vars in release script ([e57c419](https://github.com/Linus-f/website-dpsg-wehr/commit/e57c419dcc25ecd075ecacccfd646a9d9ec28938))
* **ci:** checkout head ref to match semantic-release branch config ([b309995](https://github.com/Linus-f/website-dpsg-wehr/commit/b309995eff94ccdd3bad8f90d020cfd8d8d5c0c8))
* **ci:** grant contents:write permission for semantic-release verification ([72ad765](https://github.com/Linus-f/website-dpsg-wehr/commit/72ad765b6e68993fe2f4eb98329f5627c4c7847a))
* **ci:** unset GITHUB_ env vars to force semantic-release dry-run in PR ([69df09b](https://github.com/Linus-f/website-dpsg-wehr/commit/69df09b301050481a5683ebdde15c1b359f541de))
* **ci:** upgrade node to v22 for semantic-release compatibility ([dae961f](https://github.com/Linus-f/website-dpsg-wehr/commit/dae961f06750f31237463b214c2079285fa969a2))
* **ci:** use manual semantic-release execution for PR preview ([9016a0c](https://github.com/Linus-f/website-dpsg-wehr/commit/9016a0cb6e4d0d457e855c6d6a6d474b948c86c9))
* resolve all linting errors and update GEMINI.md policy ([d6af80a](https://github.com/Linus-f/website-dpsg-wehr/commit/d6af80a02ed7db50de536c9fe28cf26b4939075d))
* resolve theme toggle first-click bug and add pointer cursor ([3bcb651](https://github.com/Linus-f/website-dpsg-wehr/commit/3bcb651c7b55a3a2faf0fd41cd27dc792a86e0c2))


### Features

* **ci:** implement robust release preview script using semantic-release API ([df593fc](https://github.com/Linus-f/website-dpsg-wehr/commit/df593fc9e6a3ff480a0e64c00031bc252b4532b7))
* implement dual-calendar subscription (public & internal) ([#58](https://github.com/Linus-f/website-dpsg-wehr/issues/58)) ([4cf2b94](https://github.com/Linus-f/website-dpsg-wehr/commit/4cf2b941a22c53a73cadc57ddcb2118bc90d4dd8))

# 1.0.0 (2025-12-20)


### Bug Fixes

* address hydration mismatch and prevent Dark Reader interference ([8d8a2a2](https://github.com/Linus-f/website-dpsg-wehr/commit/8d8a2a2aedc8fa8f45ab77a3818658a09cc74ea7))
* enforce dark mode background to resolve [#49](https://github.com/Linus-f/website-dpsg-wehr/issues/49) and update GEMINI.md ([db5923d](https://github.com/Linus-f/website-dpsg-wehr/commit/db5923d8fea7b1d7d2b6816e02e9b166a7abe79f))
* lowercase repository name for ghcr compatibility ([858415a](https://github.com/Linus-f/website-dpsg-wehr/commit/858415a048bee6129b75fe7c51e55fe5bd8ac444))
* reorder pnpm setup before node setup to enable caching ([41dac60](https://github.com/Linus-f/website-dpsg-wehr/commit/41dac6077a510f0bca1733dd31d1c7ed4ce5ec98))


### Features

* implement automatic versioning with Semantic Release ([af8c309](https://github.com/Linus-f/website-dpsg-wehr/commit/af8c3090968f2a2c641ad6d1a7044a6e6c407559))
