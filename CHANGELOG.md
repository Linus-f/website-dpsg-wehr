# [1.3.0](https://github.com/Linus-f/website-dpsg-wehr/compare/v1.2.5...v1.3.0) (2025-12-21)

### Bug Fixes

- address security finding by using proper regex escaping ([11eb742](https://github.com/Linus-f/website-dpsg-wehr/commit/11eb74252ab1ee2ed069d415c189a106f27b2635))
- **ci:** avoid vite resolution error for gitignored internal events ([379453e](https://github.com/Linus-f/website-dpsg-wehr/commit/379453ec8f5c849d91267f07196763d117aa4cb7))
- **ci:** enable git lfs for tests ([e5677e1](https://github.com/Linus-f/website-dpsg-wehr/commit/e5677e142286858bded9b8d7325e2ec44a3ef361))
- **ci:** ensure images are optimized and loaded before testing ([150deaf](https://github.com/Linus-f/website-dpsg-wehr/commit/150deaf05ac6989c210b9141d677de4154eeea28))
- correct malformed SVG path data in SVGSymbols ([679ed34](https://github.com/Linus-f/website-dpsg-wehr/commit/679ed34b91a99eb3ce328bbd6d7c24d25afe2b9e))
- disable removal of Next.js hydration hints to prevent runtime errors ([cd7151b](https://github.com/Linus-f/website-dpsg-wehr/commit/cd7151b2c6660132ada54ba98973085d3665649e))
- improve container healthcheck and nginx routing ([9c04348](https://github.com/Linus-f/website-dpsg-wehr/commit/9c043488ad0660432f50c573836550cf5fdff316))
- improve css inlining and bfcache headers ([4511405](https://github.com/Linus-f/website-dpsg-wehr/commit/45114056d67911b6713d4374881e10e21ad3d9ad))
- optimize Cache-Control headers for bfcache support ([327204a](https://github.com/Linus-f/website-dpsg-wehr/commit/327204a3f541adec0ed7e235179d192275437144))
- restore correct lilie SVG path data ([8a98a2c](https://github.com/Linus-f/website-dpsg-wehr/commit/8a98a2c91be03d325d4fdc3ad7713b164e301a36))
- **security:** resolve CodeQL vulnerabilities ([ad54401](https://github.com/Linus-f/website-dpsg-wehr/commit/ad5440116f2332105770fab8d9c795ff78029598))

### Features

- customize metadata and finalize test suite ([3b21997](https://github.com/Linus-f/website-dpsg-wehr/commit/3b219970049c8cc29edc0c1faff37151d4dbeb5e))
- implement automated testing suite with Vitest and Playwright ([3d5daf7](https://github.com/Linus-f/website-dpsg-wehr/commit/3d5daf78c841ff1be196fa9a61da2cde78ebb5d7))
- migrate content to dynamic routes with automated SEO ([4c6827e](https://github.com/Linus-f/website-dpsg-wehr/commit/4c6827e49b0aeae66dbd9a298340acf57430ee15))

### Performance Improvements

- **ci:** add caching for browsers and build artifacts ([ee7f115](https://github.com/Linus-f/website-dpsg-wehr/commit/ee7f115d9310221258a0ece50277033e8adc8d58))
- eliminate render-blocking CSS and reduce HTML size via SVG symbols ([cf9bd30](https://github.com/Linus-f/website-dpsg-wehr/commit/cf9bd3033f5e9f39f0b857330fa642bfcfdaefad))

## [1.2.5](https://github.com/Linus-f/website-dpsg-wehr/compare/v1.2.4...v1.2.5) (2025-12-21)

### Bug Fixes

- address security finding by using proper regex escaping ([f6a4b43](https://github.com/Linus-f/website-dpsg-wehr/commit/f6a4b43f356c01034c49ec6459c458b3adf99803))
- correct malformed SVG path data in SVGSymbols ([578acfc](https://github.com/Linus-f/website-dpsg-wehr/commit/578acfc8fc84218e90eb563ccfa0b02275b6fde1))
- disable removal of Next.js hydration hints to prevent runtime errors ([07a0aac](https://github.com/Linus-f/website-dpsg-wehr/commit/07a0aacf80056c382e05d3f165b39cd0196725ef))
- improve container healthcheck and nginx routing ([2153a52](https://github.com/Linus-f/website-dpsg-wehr/commit/2153a525edacd0cab6f861340eae5c8351dadc12))
- optimize Cache-Control headers for bfcache support ([f679111](https://github.com/Linus-f/website-dpsg-wehr/commit/f679111ff60cdb166283fc20f5fba9b3d4d3161c))
- restore correct lilie SVG path data ([c54754e](https://github.com/Linus-f/website-dpsg-wehr/commit/c54754e1c4e08afbe565f4c681e4ab5e48934716))

### Performance Improvements

- eliminate render-blocking CSS and reduce HTML size via SVG symbols ([ef47f8a](https://github.com/Linus-f/website-dpsg-wehr/commit/ef47f8a9960cb24dbe8cb82cc213600d1f8e8c28))

## [1.2.4](https://github.com/Linus-f/website-dpsg-wehr/compare/v1.2.3...v1.2.4) (2025-12-21)

### Bug Fixes

- add setup-buildx-action to support GHA cache backend ([e33358a](https://github.com/Linus-f/website-dpsg-wehr/commit/e33358a8891d8dfafa032359881087363920de1f))
- ensure back-merge fetches latest main after release ([9334f9a](https://github.com/Linus-f/website-dpsg-wehr/commit/9334f9a1f663acc1bb5c32aa1c8136af37c09e13))
- restore original icon appearances and fix Lilie rendering ([82c1a48](https://github.com/Linus-f/website-dpsg-wehr/commit/82c1a48526e3afa5e97906914d00b65334881fbe))

### Performance Improvements

- optimize critical path and refactor layout for 14kb target ([1800a33](https://github.com/Linus-f/website-dpsg-wehr/commit/1800a3344aeae725b3477e389dcb52a5820a8d2c))
- optimize docker build and image caching ([cb3c8d1](https://github.com/Linus-f/website-dpsg-wehr/commit/cb3c8d14327f9e965d2c702f927651bcf1359862))

## [1.2.3](https://github.com/Linus-f/website-dpsg-wehr/compare/v1.2.2...v1.2.3) (2025-12-21)

### Bug Fixes

- restore original icon appearances and fix Lilie rendering ([cc4cad8](https://github.com/Linus-f/website-dpsg-wehr/commit/cc4cad8ab275d18ab010a3db113afa42e2584a88))

### Performance Improvements

- optimize critical path and refactor layout for 14kb target ([9f35449](https://github.com/Linus-f/website-dpsg-wehr/commit/9f3544980eec19f464f5083cc85514c4c3a5f446))
- optimize docker build and image caching ([d860e79](https://github.com/Linus-f/website-dpsg-wehr/commit/d860e79cf47c08743d6283748849fcd24d87faa8))

## [1.2.2](https://github.com/Linus-f/website-dpsg-wehr/compare/v1.2.1...v1.2.2) (2025-12-21)

### Bug Fixes

- center main layout and allow prose content to fill container width ([e6f9223](https://github.com/Linus-f/website-dpsg-wehr/commit/e6f9223d902bd08de7a0d68f19b8c225bc945e0b))

### Performance Improvements

- lazy load heavy components and target modern browsers ([9afff96](https://github.com/Linus-f/website-dpsg-wehr/commit/9afff962d1397e9d05d9776f55c8d58b4a24e0bf))

## [1.2.1](https://github.com/Linus-f/website-dpsg-wehr/compare/v1.2.0...v1.2.1) (2025-12-21)

### Bug Fixes

- repair lint script and resolve linting errors ([c9e8041](https://github.com/Linus-f/website-dpsg-wehr/commit/c9e80410541164391090c667ae5d8d6408d8b35e))

### Performance Improvements

- optimize critical path and refactor layout for 14kb target ([5bc1332](https://github.com/Linus-f/website-dpsg-wehr/commit/5bc13324aa0529ff40a26938f40ba1f94a3c63dd))

# [1.2.0](https://github.com/Linus-f/website-dpsg-wehr/compare/v1.1.3...v1.2.0) (2025-12-21)

### Features

- optimize performance, accessibility, and security ([27ac0f1](https://github.com/Linus-f/website-dpsg-wehr/commit/27ac0f184a2e1b45b26088743582ff1bfed6716a))

## [1.1.3](https://github.com/Linus-f/website-dpsg-wehr/compare/v1.1.2...v1.1.3) (2025-12-21)

### Bug Fixes

- remove ics download for now ([2d21d78](https://github.com/Linus-f/website-dpsg-wehr/commit/2d21d78e4f8d8fa32d9c28feba80c3f010c84da2))

## [1.1.2](https://github.com/Linus-f/website-dpsg-wehr/compare/v1.1.1...v1.1.2) (2025-12-21)

### Bug Fixes

- **ci:** run docker action after sucessful release ([5a367dc](https://github.com/Linus-f/website-dpsg-wehr/commit/5a367dc309ccb58ae5e55e10d5b6ea5c5d17c41c))

## [1.1.1](https://github.com/Linus-f/website-dpsg-wehr/compare/v1.1.0...v1.1.1) (2025-12-21)

### Bug Fixes

- **ci:** ensure 'latest' tag is updated on version releases ([8dbebd2](https://github.com/Linus-f/website-dpsg-wehr/commit/8dbebd22b9e6b8c3e489249dd1e0a8edccb4945c))

# [1.1.0](https://github.com/Linus-f/website-dpsg-wehr/compare/v1.0.0...v1.1.0) (2025-12-21)

### Bug Fixes

- **ci:** aggressively delete GITHUB\_ env vars in release script ([e57c419](https://github.com/Linus-f/website-dpsg-wehr/commit/e57c419dcc25ecd075ecacccfd646a9d9ec28938))
- **ci:** checkout head ref to match semantic-release branch config ([b309995](https://github.com/Linus-f/website-dpsg-wehr/commit/b309995eff94ccdd3bad8f90d020cfd8d8d5c0c8))
- **ci:** grant contents:write permission for semantic-release verification ([72ad765](https://github.com/Linus-f/website-dpsg-wehr/commit/72ad765b6e68993fe2f4eb98329f5627c4c7847a))
- **ci:** unset GITHUB\_ env vars to force semantic-release dry-run in PR ([69df09b](https://github.com/Linus-f/website-dpsg-wehr/commit/69df09b301050481a5683ebdde15c1b359f541de))
- **ci:** upgrade node to v22 for semantic-release compatibility ([dae961f](https://github.com/Linus-f/website-dpsg-wehr/commit/dae961f06750f31237463b214c2079285fa969a2))
- **ci:** use manual semantic-release execution for PR preview ([9016a0c](https://github.com/Linus-f/website-dpsg-wehr/commit/9016a0cb6e4d0d457e855c6d6a6d474b948c86c9))
- resolve all linting errors and update GEMINI.md policy ([d6af80a](https://github.com/Linus-f/website-dpsg-wehr/commit/d6af80a02ed7db50de536c9fe28cf26b4939075d))
- resolve theme toggle first-click bug and add pointer cursor ([3bcb651](https://github.com/Linus-f/website-dpsg-wehr/commit/3bcb651c7b55a3a2faf0fd41cd27dc792a86e0c2))

### Features

- **ci:** implement robust release preview script using semantic-release API ([df593fc](https://github.com/Linus-f/website-dpsg-wehr/commit/df593fc9e6a3ff480a0e64c00031bc252b4532b7))
- implement dual-calendar subscription (public & internal) ([#58](https://github.com/Linus-f/website-dpsg-wehr/issues/58)) ([4cf2b94](https://github.com/Linus-f/website-dpsg-wehr/commit/4cf2b941a22c53a73cadc57ddcb2118bc90d4dd8))

# 1.0.0 (2025-12-20)

### Bug Fixes

- address hydration mismatch and prevent Dark Reader interference ([8d8a2a2](https://github.com/Linus-f/website-dpsg-wehr/commit/8d8a2a2aedc8fa8f45ab77a3818658a09cc74ea7))
- enforce dark mode background to resolve [#49](https://github.com/Linus-f/website-dpsg-wehr/issues/49) and update GEMINI.md ([db5923d](https://github.com/Linus-f/website-dpsg-wehr/commit/db5923d8fea7b1d7d2b6816e02e9b166a7abe79f))
- lowercase repository name for ghcr compatibility ([858415a](https://github.com/Linus-f/website-dpsg-wehr/commit/858415a048bee6129b75fe7c51e55fe5bd8ac444))
- reorder pnpm setup before node setup to enable caching ([41dac60](https://github.com/Linus-f/website-dpsg-wehr/commit/41dac6077a510f0bca1733dd31d1c7ed4ce5ec98))

### Features

- implement automatic versioning with Semantic Release ([af8c309](https://github.com/Linus-f/website-dpsg-wehr/commit/af8c3090968f2a2c641ad6d1a7044a6e6c407559))
