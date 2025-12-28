## [1.17.3](https://github.com/Linus-f/website-dpsg-wehr/compare/v1.17.2...v1.17.3) (2025-12-28)

### Bug Fixes

- **tina:** use absolute URLs for preview router to prevent mixed content errors ([722dfb8](https://github.com/Linus-f/website-dpsg-wehr/commit/722dfb814da17f30a0b0404d58a8415a1ad5bcf1))

## [1.17.2](https://github.com/Linus-f/website-dpsg-wehr/compare/v1.17.1...v1.17.2) (2025-12-27)

### Bug Fixes

- add NEXT_PUBLIC_GITHUB_TOKEN to docker build env ([6a01a15](https://github.com/Linus-f/website-dpsg-wehr/commit/6a01a15396935d6bd671ef36c5b0127414196457))

## [1.17.1](https://github.com/Linus-f/website-dpsg-wehr/compare/v1.17.0...v1.17.1) (2025-12-26)

### Bug Fixes

- **calendar:** fix typescript error, linting issues and add unit tests ([b5a7637](https://github.com/Linus-f/website-dpsg-wehr/commit/b5a763762f9adbc4656d0f4dee60bacc57764c5a))

# [1.17.0](https://github.com/Linus-f/website-dpsg-wehr/compare/v1.16.9...v1.17.0) (2025-12-26)

### Features

- **calendar:** implement utc conversion for berlin time events ([d98816d](https://github.com/Linus-f/website-dpsg-wehr/commit/d98816d8af1d3c62b6fc965ae29d062fb1875184))

## [1.16.9](https://github.com/Linus-f/website-dpsg-wehr/compare/v1.16.8...v1.16.9) (2025-12-26)

### Bug Fixes

- **vps:** use HOST_PROJECT_PATH for generator volume mount ([68b5f0c](https://github.com/Linus-f/website-dpsg-wehr/commit/68b5f0ca2ee14f7d073faf970c43e581cac58967))

## [1.16.8](https://github.com/Linus-f/website-dpsg-wehr/compare/v1.16.7...v1.16.8) (2025-12-26)

### Bug Fixes

- **calendar:** remove invalid timezone property from ics attributes ([bb0489b](https://github.com/Linus-f/website-dpsg-wehr/commit/bb0489b8705b813a9e0b661c09e9b43c8e3817d4))

## [1.16.7](https://github.com/Linus-f/website-dpsg-wehr/compare/v1.16.6...v1.16.7) (2025-12-26)

### Bug Fixes

- **vps:** add generator service to compose for reliable ics generation ([76fea53](https://github.com/Linus-f/website-dpsg-wehr/commit/76fea53b157d0fc401ff90197313a64a9bdc2437))

## [1.16.6](https://github.com/Linus-f/website-dpsg-wehr/compare/v1.16.5...v1.16.6) (2025-12-26)

### Bug Fixes

- **calendar:** set event timezone to Europe/Berlin ([13758ac](https://github.com/Linus-f/website-dpsg-wehr/commit/13758acf98bac0455d55222a7ccd4138afbb9a17))

## [1.16.5](https://github.com/Linus-f/website-dpsg-wehr/compare/v1.16.4...v1.16.5) (2025-12-26)

### Bug Fixes

- **vps:** use 'docker compose run' for ics generation to fix volume paths ([fbefa0b](https://github.com/Linus-f/website-dpsg-wehr/commit/fbefa0b38806a7b21a28cb6cce3a3018e00c2a83))

## [1.16.4](https://github.com/Linus-f/website-dpsg-wehr/compare/v1.16.3...v1.16.4) (2025-12-26)

### Bug Fixes

- **vps:** fix pnpm install in generator container ([039b54b](https://github.com/Linus-f/website-dpsg-wehr/commit/039b54bfd909766b00a4f7686b7608648e323390))

## [1.16.3](https://github.com/Linus-f/website-dpsg-wehr/compare/v1.16.2...v1.16.3) (2025-12-26)

### Bug Fixes

- **calendar:** use local time for ics events to prevent timezone shifts ([bc82017](https://github.com/Linus-f/website-dpsg-wehr/commit/bc82017a783632eb14d9a840ff0ab24c58fec962))

## [1.16.2](https://github.com/Linus-f/website-dpsg-wehr/compare/v1.16.1...v1.16.2) (2025-12-26)

### Bug Fixes

- **vps:** remove nginx.conf mount to fix startup error ([20cb781](https://github.com/Linus-f/website-dpsg-wehr/commit/20cb7814b6d9a8e072c41a7bd6bf7a905d6caa8d))

## [1.16.1](https://github.com/Linus-f/website-dpsg-wehr/compare/v1.16.0...v1.16.1) (2025-12-26)

### Bug Fixes

- **vps:** pass INTERNAL_ICS_TOKEN to ics generator container ([abd90db](https://github.com/Linus-f/website-dpsg-wehr/commit/abd90dbd65a37b4e2b18c8cc6169b832bd1c0d03))

# [1.16.0](https://github.com/Linus-f/website-dpsg-wehr/compare/v1.15.0...v1.16.0) (2025-12-26)

### Features

- **vps:** serve generated ics files from root url via nginx alias ([34eddbf](https://github.com/Linus-f/website-dpsg-wehr/commit/34eddbfb13f603bf7bc6b8fe46e8ac6be3770bb0))

# [1.15.0](https://github.com/Linus-f/website-dpsg-wehr/compare/v1.14.0...v1.15.0) (2025-12-26)

### Features

- **vps:** generate internal calendar on deploy using local secrets ([1b8943e](https://github.com/Linus-f/website-dpsg-wehr/commit/1b8943e18a1a605a4f11bfd2437a64af8a9518a7))

# [1.14.0](https://github.com/Linus-f/website-dpsg-wehr/compare/v1.13.2...v1.14.0) (2025-12-26)

### Features

- **vps:** support dedicated GHCR_PAT for docker login ([b64f960](https://github.com/Linus-f/website-dpsg-wehr/commit/b64f960946aa1b83c436b0dbaf076a3755bdd41b))

## [1.13.2](https://github.com/Linus-f/website-dpsg-wehr/compare/v1.13.1...v1.13.2) (2025-12-26)

### Bug Fixes

- **vps:** make deploy script compatible with host and container execution ([b137d68](https://github.com/Linus-f/website-dpsg-wehr/commit/b137d681ecb0c3d53f131d0876d0a9aefa714592))

## [1.13.1](https://github.com/Linus-f/website-dpsg-wehr/compare/v1.13.0...v1.13.1) (2025-12-26)

### Bug Fixes

- **vps:** enhance deploy script with error handling and logging ([5c698a3](https://github.com/Linus-f/website-dpsg-wehr/commit/5c698a3ef67a1105981a53146152215ab3d4a1b7))

# [1.13.0](https://github.com/Linus-f/website-dpsg-wehr/compare/v1.12.0...v1.13.0) (2025-12-26)

### Features

- **ci:** trigger vps deployment after docker build completes ([60d9473](https://github.com/Linus-f/website-dpsg-wehr/commit/60d9473ae0b4642270b8f713cc079298a860ef36))

# [1.12.0](https://github.com/Linus-f/website-dpsg-wehr/compare/v1.11.0...v1.12.0) (2025-12-26)

### Features

- **ci:** switch to pre-built docker images for vps deployment ([9d8ddaf](https://github.com/Linus-f/website-dpsg-wehr/commit/9d8ddaf5c9776302fe4877c300b4b768f660b2cd))

# [1.11.0](https://github.com/Linus-f/website-dpsg-wehr/compare/v1.10.0...v1.11.0) (2025-12-26)

### Bug Fixes

- **tina:** revert tina-lock.json to production schema ([418becb](https://github.com/Linus-f/website-dpsg-wehr/commit/418becb7bb423793cdf1566fd46329923e26b07d))

### Features

- **scripts:** add check-schema script to compare local and remote tina-lock.json ([8a72417](https://github.com/Linus-f/website-dpsg-wehr/commit/8a72417498aaeb90b8bc344ec676a6cdb5076882))

# [1.10.0](https://github.com/Linus-f/website-dpsg-wehr/compare/v1.9.3...v1.10.0) (2025-12-26)

### Features

- **calendar:** implement secure internal calendar and subscription helper page ([4623aff](https://github.com/Linus-f/website-dpsg-wehr/commit/4623affff927519c3866dba2b8e626400c2a94d3))

## [1.9.3](https://github.com/Linus-f/website-dpsg-wehr/compare/v1.9.2...v1.9.3) (2025-12-26)

### Bug Fixes

- **build:** remove tina search to resolve build issues ([e906a63](https://github.com/Linus-f/website-dpsg-wehr/commit/e906a639d39fe21863749c7a2e7ff298adcdc869))

## [1.9.2](https://github.com/Linus-f/website-dpsg-wehr/compare/v1.9.1...v1.9.2) (2025-12-25)

### Bug Fixes

- **docker:** install build tools for better-sqlite3 native compilation ([5ccce9a](https://github.com/Linus-f/website-dpsg-wehr/commit/5ccce9a123ea3945a293ae656a06fda8cc992200))

## [1.9.1](https://github.com/Linus-f/website-dpsg-wehr/compare/v1.9.0...v1.9.1) (2025-12-25)

### Bug Fixes

- **tina:** manually sync tina-lock.json with schema changes ([dc49660](https://github.com/Linus-f/website-dpsg-wehr/commit/dc49660706992c7ada0a4329b175849d4eb106ef))

# [1.9.0](https://github.com/Linus-f/website-dpsg-wehr/compare/v1.8.0...v1.9.0) (2025-12-25)

### Bug Fixes

- **ics:** resolve typescript type error in event attribute generation ([9e5f638](https://github.com/Linus-f/website-dpsg-wehr/commit/9e5f638b3c9241beb6ae5a1e3c2ee87a375bb7d5))

### Features

- **calendar:** support secure internal ics generation via token ([c87827d](https://github.com/Linus-f/website-dpsg-wehr/commit/c87827d4a960f30dcf1797f12ea4cb2ecf4db4e7)), closes [#58](https://github.com/Linus-f/website-dpsg-wehr/issues/58)
- **calendar:** support time, location and description in events ([abe7322](https://github.com/Linus-f/website-dpsg-wehr/commit/abe732299e552aab9664d0fa41b585434f8ba468))

# [1.8.0](https://github.com/Linus-f/website-dpsg-wehr/compare/v1.7.18...v1.8.0) (2025-12-24)

### Features

- **tina:** configure search in tinacms dashboard ([97f70ab](https://github.com/Linus-f/website-dpsg-wehr/commit/97f70abf83b64b444b27b0900e716ea3b8cc1917))

## [1.7.18](https://github.com/Linus-f/website-dpsg-wehr/compare/v1.7.17...v1.7.18) (2025-12-24)

### Bug Fixes

- **tina:** enable local media store for dev, allow pdfs/files in git store, use media picker for downloads ([7006c70](https://github.com/Linus-f/website-dpsg-wehr/commit/7006c70df278ff40a0d0d058b906aecc0e98cb50))

## [1.7.17](https://github.com/Linus-f/website-dpsg-wehr/compare/v1.7.16...v1.7.17) (2025-12-24)

## [1.7.16](https://github.com/Linus-f/website-dpsg-wehr/compare/v1.7.15...v1.7.16) (2025-12-24)

### Bug Fixes

- **media:** provide multiple thumbnail sizes in GitMediaStore ([4583e94](https://github.com/Linus-f/website-dpsg-wehr/commit/4583e94eeff2dfb45b1946e4cabfbcd1c25dd138))

## [1.7.15](https://github.com/Linus-f/website-dpsg-wehr/compare/v1.7.14...v1.7.15) (2025-12-24)

### Bug Fixes

- **media:** implement parse method in GitMediaStore ([26fb602](https://github.com/Linus-f/website-dpsg-wehr/commit/26fb6021cdb569adbd53a6769b1e5eb16c0a4706))
- **media:** restore GitHub raw URLs for previews and thumbnails ([e21fad3](https://github.com/Linus-f/website-dpsg-wehr/commit/e21fad3c147e6149cffcf429f9052f510ae649c1))

## [1.7.14](https://github.com/Linus-f/website-dpsg-wehr/compare/v1.7.13...v1.7.14) (2025-12-24)

### Bug Fixes

- **media:** use local paths for thumbnails in GitMediaStore list ([1291b25](https://github.com/Linus-f/website-dpsg-wehr/commit/1291b254f15fc169619507febc51450bded02142))

## [1.7.13](https://github.com/Linus-f/website-dpsg-wehr/compare/v1.7.12...v1.7.13) (2025-12-24)

### Bug Fixes

- **media:** use local paths for image previews in GitMediaStore ([eaf8884](https://github.com/Linus-f/website-dpsg-wehr/commit/eaf88847a5dceca998b3735c21ab94f43ef0e200))

## [1.7.12](https://github.com/Linus-f/website-dpsg-wehr/compare/v1.7.11...v1.7.12) (2025-12-24)

### Bug Fixes

- **components:** sanitize src in TinaContentClient ([574bbc7](https://github.com/Linus-f/website-dpsg-wehr/commit/574bbc7a7e8af6c14ca407ea5679114c48c03f1f)), closes [#31](https://github.com/Linus-f/website-dpsg-wehr/issues/31)

## [1.7.11](https://github.com/Linus-f/website-dpsg-wehr/compare/v1.7.10...v1.7.11) (2025-12-24)

### Bug Fixes

- **media:** implement previewSrc and filter non-image files in GitMediaStore ([0829839](https://github.com/Linus-f/website-dpsg-wehr/commit/082983911e6e09613b23388c98b01342fc05d94b))

## [1.7.10](https://github.com/Linus-f/website-dpsg-wehr/compare/v1.7.9...v1.7.10) (2025-12-24)

### Bug Fixes

- **media:** handle missing src in image components and update CSP ([9aeaf39](https://github.com/Linus-f/website-dpsg-wehr/commit/9aeaf39191dd49b5c2bf73049f4f38f23432116a))

## [1.7.9](https://github.com/Linus-f/website-dpsg-wehr/compare/v1.7.8...v1.7.9) (2025-12-24)

### Bug Fixes

- enforce absolute paths for media src and clean up IDs ([c9852ab](https://github.com/Linus-f/website-dpsg-wehr/commit/c9852ab72b9adcb8cd646b4b38191c0b793aeac1))

## [1.7.8](https://github.com/Linus-f/website-dpsg-wehr/compare/v1.7.7...v1.7.8) (2025-12-24)

### Bug Fixes

- bake auth into docker image to prevent recurring 403 errors ([90e670e](https://github.com/Linus-f/website-dpsg-wehr/commit/90e670e0370b7987cbe01c5330a8704860c08771))

## [1.7.7](https://github.com/Linus-f/website-dpsg-wehr/compare/v1.7.6...v1.7.7) (2025-12-24)

### Bug Fixes

- implement instant image previews and resolve build errors ([cb3248a](https://github.com/Linus-f/website-dpsg-wehr/commit/cb3248a9a00681833370a2062e9cdf26a3b6cd33))

## [1.7.6](https://github.com/Linus-f/website-dpsg-wehr/compare/v1.7.5...v1.7.6) (2025-12-24)

### Bug Fixes

- resolve media manager crash and enable image previews ([b809450](https://github.com/Linus-f/website-dpsg-wehr/commit/b809450c70efbb715c1e4af5c37cdef1e492ff99))

## [1.7.5](https://github.com/Linus-f/website-dpsg-wehr/compare/v1.7.4...v1.7.5) (2025-12-24)

### Bug Fixes

- resolve typescript build errors and folder navigation ([6e950aa](https://github.com/Linus-f/website-dpsg-wehr/commit/6e950aa020a0e25d42e656120472f2dc8481670b))

## [1.7.4](https://github.com/Linus-f/website-dpsg-wehr/compare/v1.7.3...v1.7.4) (2025-12-24)

### Bug Fixes

- enable folder navigation in media manager ([23bd2be](https://github.com/Linus-f/website-dpsg-wehr/commit/23bd2bed9b75aa478f7855515fde5ce8f020c2e9))

## [1.7.3](https://github.com/Linus-f/website-dpsg-wehr/compare/v1.7.2...v1.7.3) (2025-12-24)

### Bug Fixes

- use robust directory mount for auth and resolve Nginx 500 error ([1d1531e](https://github.com/Linus-f/website-dpsg-wehr/commit/1d1531ea44e77e0c1ea18f883198a4a4af1ce93e))

## [1.7.2](https://github.com/Linus-f/website-dpsg-wehr/compare/v1.7.1...v1.7.2) (2025-12-24)

### Bug Fixes

- secure admin assets and resolve redirect loop ([0633e0b](https://github.com/Linus-f/website-dpsg-wehr/commit/0633e0b1b8ba50f3f28417347f4dfb31fdb61f23))

## [1.7.1](https://github.com/Linus-f/website-dpsg-wehr/compare/v1.7.0...v1.7.1) (2025-12-23)

### Bug Fixes

- resolve git ownership issues and improve error handling in deploy script ([3ff0e73](https://github.com/Linus-f/website-dpsg-wehr/commit/3ff0e73c7b8a39f27186ea0ff2d99d79b6431d63))

# [1.7.0](https://github.com/Linus-f/website-dpsg-wehr/compare/v1.6.0...v1.7.0) (2025-12-23)

### Bug Fixes

- update CSP to allow GitHub API connections ([d09070b](https://github.com/Linus-f/website-dpsg-wehr/commit/d09070b169a516a77a65aa49a6b244758c21a8b5))

### Features

- display project version in footer ([785aa3c](https://github.com/Linus-f/website-dpsg-wehr/commit/785aa3c280690506ee5de0ea89497c881a1aab64))

# [1.6.0](https://github.com/Linus-f/website-dpsg-wehr/compare/v1.5.1...v1.6.0) (2025-12-23)

### Bug Fixes

- adjust vitest config for 0.34.6 type compatibility ([d87a2c4](https://github.com/Linus-f/website-dpsg-wehr/commit/d87a2c4ea55f34454c2531a15b09e4dd1396adea))
- **build:** add [@ts-expect-error](https://github.com/ts-expect-error) to vitest config to resolve vite 4 type mismatch ([f78dc43](https://github.com/Linus-f/website-dpsg-wehr/commit/f78dc439f0e9b03eb93ea7277c2438398957002d))
- **deps:** pin vite to v4.5.5+ to ensure tinacms build compatibility while maintaining security ([104e294](https://github.com/Linus-f/website-dpsg-wehr/commit/104e294a8ecf97146a43fee4ac26a3155f600031))
- **docker:** ensure build failures stop the process and fix file copying ([1d95735](https://github.com/Linus-f/website-dpsg-wehr/commit/1d95735ba84cf83bc58066a5225228fdc939e875))
- **docker:** fix syntax error and improve Tina URL mapping ([6bc63e5](https://github.com/Linus-f/website-dpsg-wehr/commit/6bc63e5be8f074b00fb4a9b23560262f48fe15c7))
- **docker:** use build:ci to ensure tinacms local build during docker build ([34d9a23](https://github.com/Linus-f/website-dpsg-wehr/commit/34d9a234c9beb722d4da346aaf8a3c282989a496))
- **docker:** use cloud build with secrets to avoid credential validation errors on VPS ([1697f73](https://github.com/Linus-f/website-dpsg-wehr/commit/1697f73abad11e4b37485c64b48144bd9aaa37c9))
- downgrade vitest to ^0.34.6 for Vite 4 compatibility ([3fa0b09](https://github.com/Linus-f/website-dpsg-wehr/commit/3fa0b09fc119b17af16e32d041c4e58ba0e7747a))
- **tina:** ensure clientID is not null to prevent URL construction errors during local build ([1d38032](https://github.com/Linus-f/website-dpsg-wehr/commit/1d380328a7a341ddb89df9c6fd93ad52e42afb32))
- **tina:** ensure loadCustomStore returns the Class constructor, not an instance, to resolve TypeScript error ([8d03aa5](https://github.com/Linus-f/website-dpsg-wehr/commit/8d03aa56bc06c358663567878af989d2a6851419))
- **tina:** fix unauthorized build error by adding --skip-cloud-checks to build:ci ([3cca28c](https://github.com/Linus-f/website-dpsg-wehr/commit/3cca28c940c06c6c6596e699174d9d64f313dce4))
- **tina:** update GitMediaStore to match new Media interface and fix TypeScript errors ([e43ad46](https://github.com/Linus-f/website-dpsg-wehr/commit/e43ad46e36eb3c33775bb8ad647602b5f6bc799b))
- **tina:** use absolute URL for local contentApiUrlOverride to fix Node.js fetch error during SSG build ([4767a36](https://github.com/Linus-f/website-dpsg-wehr/commit/4767a36bc79d28300f7991bf31c76273529cf14f))
- **tina:** use undefined for local credentials to fix local build errors ([b470d2e](https://github.com/Linus-f/website-dpsg-wehr/commit/b470d2ef6641e91a241f3580645d2b87152ed85b))

### Features

- configure docker build to inject github token for media store ([e9fbb7e](https://github.com/Linus-f/website-dpsg-wehr/commit/e9fbb7ec840c58664e42ebbf333b8c0420c7b6ab))
- **tina:** implement custom Git media store and secure admin with basic auth ([e09344b](https://github.com/Linus-f/website-dpsg-wehr/commit/e09344b655531e0a4c9a24689dcceeda195421f8))

## [1.5.1](https://github.com/Linus-f/website-dpsg-wehr/compare/v1.5.0...v1.5.1) (2025-12-23)

### Bug Fixes

- **docker:** resolve build failures by setting TINA_PUBLIC_IS_LOCAL and fixing image cache mount ([cdcb9b1](https://github.com/Linus-f/website-dpsg-wehr/commit/cdcb9b1efdfa62a80a2f1ddef36a7f69340a160e))
- **webhook:** use alpine base to provide shell and apk for dependencies ([2ae7eab](https://github.com/Linus-f/website-dpsg-wehr/commit/2ae7eab94ddad6ef47efc2b84409073a9146e40c))

# [1.5.0](https://github.com/Linus-f/website-dpsg-wehr/compare/v1.4.1...v1.5.0) (2025-12-23)

### Bug Fixes

- convert Tina Cloud Media URLs to local paths to enable image optimization ([b2ba9f8](https://github.com/Linus-f/website-dpsg-wehr/commit/b2ba9f8c24df55b6f5b5c6a9897dfa15e33741e2))

### Features

- implement Docker-based webhook deployment strategy ([e992568](https://github.com/Linus-f/website-dpsg-wehr/commit/e9925681fc1061892d73855a9eac3bdc9443ffc6))

## [1.4.1](https://github.com/Linus-f/website-dpsg-wehr/compare/v1.4.0...v1.4.1) (2025-12-23)

### Bug Fixes

- **ci:** use --local flag for tinacms build in CI to skip cloud credential check ([a816b1c](https://github.com/Linus-f/website-dpsg-wehr/commit/a816b1ca6b17943d8ec5a89fe4375c76dcfcee9d))
- remove git lfs for images and add tinacms build to ci script ([1b68c5c](https://github.com/Linus-f/website-dpsg-wehr/commit/1b68c5c2c5e84b43a825f77634524ef8b19dd5df))

# [1.4.0](https://github.com/Linus-f/website-dpsg-wehr/compare/v1.3.0...v1.4.0) (2025-12-23)

### Bug Fixes

- **ci:** add TinaCMS secrets to tests workflow ([01f476b](https://github.com/Linus-f/website-dpsg-wehr/commit/01f476b32a9ec975d22ffe775be680287e55c943))
- **ci:** add TinaCMS secrets to tests workflow ([be93738](https://github.com/Linus-f/website-dpsg-wehr/commit/be93738b110a365ee2f94785bfa1a0ee54d8838c))
- **ci:** aggressively disable Tina Cloud validation by nulling credentials and unsetting env vars ([008a50c](https://github.com/Linus-f/website-dpsg-wehr/commit/008a50c4c19f5ec3e92f6aee7b30a67dc114c8ae))
- **ci:** aggressively disable Tina Cloud validation by nulling credentials and unsetting env vars ([83be005](https://github.com/Linus-f/website-dpsg-wehr/commit/83be005f60bba25f8f1926b5da49de7f6728a77c))
- **ci:** disable contentApiUrlOverride and nullify credentials in local mode to avoid fetch errors ([0a00748](https://github.com/Linus-f/website-dpsg-wehr/commit/0a0074813a916c63414548d7f2b77d6c4a3c3983))
- **ci:** force purely local Tina build in CI to resolve branch indexing errors ([05f22da](https://github.com/Linus-f/website-dpsg-wehr/commit/05f22daed1c0b2f83571a7bbae7d5b9e4e35ffbe))
- **ci:** force purely local Tina build in CI to resolve branch indexing errors ([0726d92](https://github.com/Linus-f/website-dpsg-wehr/commit/0726d92df2f1264ac39f30b56303e563095e2af3))
- **ci:** handle local mode credentials in tina config to bypass cloud validation ([ff1f1e4](https://github.com/Linus-f/website-dpsg-wehr/commit/ff1f1e4b25350b4756ffcc1eb75e16236f838b72))
- **ci:** handle local mode credentials in tina config to bypass cloud validation ([5256624](https://github.com/Linus-f/website-dpsg-wehr/commit/5256624aadbe7d4ecc509a4ef835b332b511726f))
- **ci:** make clientId and token truly optional in tina config to support purely local builds ([2dd69d1](https://github.com/Linus-f/website-dpsg-wehr/commit/2dd69d103d32c5231ce0ab5927f75fb5be8f7c61))
- **ci:** make clientId and token truly optional in tina config to support purely local builds ([46bc11f](https://github.com/Linus-f/website-dpsg-wehr/commit/46bc11fe6a71007e57c3294ab96de805cd6163f8))
- **ci:** strictly exclude cloud config in local mode to avoid 401/404 errors ([c0ccb2a](https://github.com/Linus-f/website-dpsg-wehr/commit/c0ccb2a9c4cec9100a328982fb708077be51b189))
- **ci:** strictly exclude cloud config in local mode to avoid 401/404 errors ([ee835e7](https://github.com/Linus-f/website-dpsg-wehr/commit/ee835e73a23918a3f0cf90021a011355805ec711))
- **ci:** use dummy contentApiUrlOverride in local mode to bypass cloud URL validation ([688b046](https://github.com/Linus-f/website-dpsg-wehr/commit/688b04656f94df96fb4355ba88a0b8168c21b577))
- **ci:** use dummy contentApiUrlOverride in local mode to bypass cloud URL validation ([1892be4](https://github.com/Linus-f/website-dpsg-wehr/commit/1892be4b6e865675a545f7e2d6efda948e153a76))
- **ci:** use local mode for TinaCMS in test workflows to avoid 403 errors ([4ff0028](https://github.com/Linus-f/website-dpsg-wehr/commit/4ff0028a8262767025f2d0737737d887c3a3b8d9))
- **ci:** use local mode for TinaCMS in test workflows to avoid 403 errors ([6fd50d1](https://github.com/Linus-f/website-dpsg-wehr/commit/6fd50d1cabe176528b5abb0606094e3bf5f50b45))
- **ci:** use standard tinacms build with real secrets in CI ([b4f6613](https://github.com/Linus-f/website-dpsg-wehr/commit/b4f66138501bc62c338d4554f051586691ff0f4e))
- **ci:** use standard tinacms build with real secrets in CI ([f93815e](https://github.com/Linus-f/website-dpsg-wehr/commit/f93815e09882dd2cc47059b29ae78ae37c2e891c))
- **ci:** use tinacms build --local for tests to avoid cloud dependency ([65dcec1](https://github.com/Linus-f/website-dpsg-wehr/commit/65dcec152b840bd58007c1cb7ec63c449061aecf))
- **ci:** use tinacms build --local for tests to avoid cloud dependency ([f1c62e9](https://github.com/Linus-f/website-dpsg-wehr/commit/f1c62e95d62a5176ed587ea1846492e503fc4bbb))
- enable tina live preview with router config and homepage integration ([808f7e2](https://github.com/Linus-f/website-dpsg-wehr/commit/808f7e252b6da4eb559f25ad5b89a0b780bfa23e))
- enable tina live preview with router config and homepage integration ([ddcf407](https://github.com/Linus-f/website-dpsg-wehr/commit/ddcf407e4a254ff2ef956dfe615b22bd04b7c73f))
- resolve syntax error and add social preview E2E test ([e7fc6dc](https://github.com/Linus-f/website-dpsg-wehr/commit/e7fc6dceff659b39b1aa1e8e1249f611c4b1eda0))
- resolve syntax error and add social preview E2E test ([b42f445](https://github.com/Linus-f/website-dpsg-wehr/commit/b42f445a9ec51f2806421f442289f560f6200b47))
- **types:** resolve Icon type mismatch in Navbar component ([2726d43](https://github.com/Linus-f/website-dpsg-wehr/commit/2726d439f5c3186cde42910f5654ed93e72d91d9))
- **types:** resolve type mismatch in Footer component and suppress linting ([7113717](https://github.com/Linus-f/website-dpsg-wehr/commit/71137176a0e3815037b987cb255532020b48b208))
- **types:** verified fix for Navbar type mismatch using 'any' cast ([f2dbccc](https://github.com/Linus-f/website-dpsg-wehr/commit/f2dbccc9bb07e5dd64c4ec40136b17816dbd686d))
- use optimized webp images for social previews and add image dimensions ([fe55443](https://github.com/Linus-f/website-dpsg-wehr/commit/fe554434388bcddb255cbeeaf166dc76e7a04864))
- use optimized webp images for social previews and add image dimensions ([fd87c60](https://github.com/Linus-f/website-dpsg-wehr/commit/fd87c6004d49ac6deb35cd762e9f09a76536259f))

### Features

- implement site-wide search with fuzzy highlighting and UI improvements ([d14e96a](https://github.com/Linus-f/website-dpsg-wehr/commit/d14e96a6a242803f492d42e3079b8f7c0a207a72))
- implement site-wide search with fuzzy highlighting and UI improvements ([44b81d4](https://github.com/Linus-f/website-dpsg-wehr/commit/44b81d4a63dfe49decd26cd97c6acd20a2bf9844))
- integrate Prettier, Husky, and lint-staged ([0ae9e0d](https://github.com/Linus-f/website-dpsg-wehr/commit/0ae9e0da5319a582d8d735fcda8b44019222cb8a)), closes [#53](https://github.com/Linus-f/website-dpsg-wehr/issues/53)
- integrate Prettier, Husky, and lint-staged ([aee867b](https://github.com/Linus-f/website-dpsg-wehr/commit/aee867beb1fba9c72e6753c6375fb445e860d79b)), closes [#53](https://github.com/Linus-f/website-dpsg-wehr/issues/53)
- Integrate TinaCMS for visual editing ([d273cf5](https://github.com/Linus-f/website-dpsg-wehr/commit/d273cf5491f466e403e0a28ebb386e0adc746da8))
- Integrate TinaCMS for visual editing ([008235f](https://github.com/Linus-f/website-dpsg-wehr/commit/008235f6b1855c089e274b11b52b0d52bdf00f83))
- integrate TinaCMS with Tina Cloud production setup ([2a090d3](https://github.com/Linus-f/website-dpsg-wehr/commit/2a090d343ad467e799ac2949615c190952508afc))
- integrate TinaCMS with Tina Cloud production setup ([895df74](https://github.com/Linus-f/website-dpsg-wehr/commit/895df740e6fb4567ee8cce7b3827fd76dad988dc))

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
