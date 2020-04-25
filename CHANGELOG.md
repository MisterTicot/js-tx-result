**tx-result /**
[Readme](https://cosmic.plus/#view:js-tx-result)
• [Contributing](https://cosmic.plus/#view:js-tx-result/CONTRIBUTING)
• [Changelog](https://cosmic.plus/#view:js-tx-result/CHANGELOG)

# Changelog

All notable changes to this project will be documented in this file.

This project adheres to **[Semantic
Versioning](https://semver.org/spec/v2.0.0.html)**. Version syntax is
`{major}.{minor}.{patch}`, where a field bump means:

- **Patch**: The release contains bug fixes.
- **Minor**: The release contains backward-compatible changes.
- **Major**: The release contains compatibility-breaking changes.

**Remember:** Both micro and minor releases are guaranteed to respect
backward-compatibility and can be updated to without risk of breakage. For major
releases, please check this changelog before upgrading.

## 1.3.0 - 2020-04-25

### Changed

- Logic: Improve callback responses handling. (fix a bug, handle more special
  cases)

### Fixed

- Meta: Fix dependencies.

## 1.2.0 - 2020-03-07

### Changed

- Meta: Upgrade to [stellar-sdk] 4.x.

## 1.1.0 - 2019-12-07

### Added

- API: Add `TxResult.forCosmicLink()`. This submits a CosmicLink and returns a
  TxResult for it. This helper handles StellarGuard and CosmicLink/Sep7
  callbacks.

## 1.0.2 - 2019-12-02

### Fixed

- Logic: Fix a case where generating TxResult was failing. (Thanks
  [u/Eth_Man](https://reddit.com/u/Eth_Man))

## 1.0.1 - 2019-11-30

### Fixed

- Messages: Fix typo.

## 1.0.0 - 2019-11-27

Initial release.
