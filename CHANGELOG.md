# Changelog

All notable changes to the **Line Height Calculator** VS Code extension will be documented in this file.

## [1.0.1] - 2026-03-13

### Added
- **Design-proven multiplier system** based on professional typography research:
  - `<14px` → `1.6` (optimal for small text, captions)
  - `14-18px` → `1.5` (optimal for body text, WCAG 2.1 compliant)
  - `19-24px` → `1.4` (optimal for lead text, subheadings)
  - `25-32px` → `1.3` (optimal for medium headings H3-H4)
  - `33-48px` → `1.2` (optimal for large headings H1-H2)
  - `>48px` → `1.1` (optimal for giant hero headlines)
- **Enhanced hover information** with optimal value, description, and alternatives table
- **Improved autocomplete** with optimal values prominently displayed (✨ icon)
- Support for exact pixel value suggestions
- Tight/loose alternatives for flexibility
- Extension icon for Marketplace listing

### Changed
- Updated multiplier logic to reflect real-world design practices
- Improved unit conversion accuracy for `rem`, `em`, and `pt`
- Enhanced QuickPick interface with clearer labels
- Optimized sorting (optimal values appear first)

### Fixed
- Fixed issue with `font-size` detection in nested selectors
- Corrected parsing of decimal values (e.g., `13.5px`)
- Resolved hover provider conflicts with other extensions

---

## [1.0.0] - 2026-03-13

### Added
- **Initial release** of Line Height Calculator
- Hover information for `font-size` values
- Autocomplete suggestions for `line-height` property
- Basic multiplier system:
  - `<16px` → 1.5 (small text)
  - `16-30px` → 1.4 (body text)
  - `30-50px` → 1.3 (headings)
  - `>50px` → 1.2 (large headings)
- Support for CSS, SCSS, and LESS files
- Commands for inserting optimal heading/text values
- Keyboard shortcut `Ctrl+Alt+L` (Windows/Linux) / `Cmd+Alt+L` (macOS)
- Configuration settings for default multipliers
