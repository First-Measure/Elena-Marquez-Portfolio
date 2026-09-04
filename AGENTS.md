# First Measure Portfolio Development Guide

## Purpose

This repository is a lightweight technical foundation for independent client portfolios. Preserve its framework-free HTML, CSS, and JavaScript architecture unless a documented requirement makes a change necessary.

The starter is not a visual template. Each client portfolio must derive its visual identity, hierarchy, composition, and evidence presentation from that client's profession, audience, approved content, and strongest proof. Follow `portfolio-starter-IMPLEMENTATION-RULES.md` for design-independence requirements.

## Working rules

- Preserve approved client content, evidence, positioning, and palette unless the user explicitly authorizes a change.
- Do not introduce a framework, build system, component library, or additional production dependency merely for convenience.
- Prefer semantic HTML, resilient CSS, and small progressive-enhancement scripts.
- Maintain keyboard access, visible focus, meaningful accessible names, reduced-motion support, and responsive behavior.
- Treat client-side gates as presentation conveniences, never as protection for confidential content.
- Do not weaken, skip, or broadly suppress a validation rule just to make a check pass. Fix the defect or document the narrow exception.
- Keep tests based on stable behavior and semantics, not exact copy, colors, spacing, screenshots, or client-specific visual styling.

## Required validation

After implementation work, run:

```sh
npm run validate
```

This is the single automated quality gate. It checks HTML structure plus the rendered site at widths 1440, 1024, 768, 430, 390, and 360 pixels. A change is not technically complete while this command fails.

### Automated gates

- Valid HTML structure and unique IDs
- Successful page, stylesheet, script, document, and other local-asset responses
- Valid internal links and fragment targets
- No uncaught JavaScript errors or unexpected browser console errors
- Automated accessibility checks
- Keyboard-operable desktop and mobile navigation
- Correct mobile-menu state, focus, outside-click, navigation, and Escape behavior
- No horizontal document overflow at the required viewport widths
- Basic page and interaction smoke tests

`mailto:`, `tel:`, and external HTTP(S) destinations are outside the deterministic link gate. A deliberately absent starter asset must be marked explicitly with `data-validation-optional`; do not use that marker for a production asset.

### Human review gates

Automation does not approve portfolio strategy, content accuracy, evidence quality, confidentiality, visual identity, typography, hierarchy, composition, pacing, image choices, or overall design coherence. These require human judgment.

Before approval or deployment, conduct the report-only process in `QA-REVIEW.md`. Keep technical defects, possible regressions, and design judgments distinct. Passing `npm run validate` is necessary but does not replace that review or client approval.

## Definition of done

1. The implementation follows the approved client direction and the design-independence rules.
2. `npm run validate` passes without broad exclusions.
3. A comprehensive pre-approval review uses `QA-REVIEW.md` and records substantiated findings only.
4. Human reviewers approve strategy, content, evidence, visual design, and any flagged judgment calls.

