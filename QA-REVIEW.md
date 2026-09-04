# First Measure Portfolio — Comprehensive Site Review

Use this protocol for a pre-approval website review. It is a report-only process: do not modify files, write fixes, commit changes, open a pull request, or deploy anything during the review.

Treat approved content and design direction as intentional unless there is evidence of a defect or regression. Inspect the rendered site at widths 1440, 1024, 768, 430, 390, and 360 pixels; do not rely on source inspection alone.

## Review areas

### Responsive layout

Check horizontal overflow, clipping, overlap, unintended wrapping, restrictive heights, grid and flex behavior, incomplete rows, gutters, shared alignment, whitespace, natural panel expansion, section transitions, fixed-header anchors, navigation, mobile-menu behavior, long content, media and code overflow, footer links, and touch targets. Distinguish natural content-driven height differences from defects.

### Visual cohesion

Evaluate the whole composition: hierarchy, typography, spacing rhythm, pacing, alignment, density, repeated patterns, container overuse, surface transitions, accent frequency, relative section importance, and whether the form used to present evidence serves that evidence. Classify technically valid but questionable choices as **Design Judgment**, not defects.

### Design independence

Determine whether the portfolio depends too heavily on First Measure business-site patterns, Portfolio-Starter patterns, another First Measure portfolio, or generic professional-portfolio conventions. Evaluate composition, section grammar, hierarchy, typography treatment, evidence presentation, grid behavior, and interaction patterns—not color difference alone.

Apply the originality check from `portfolio-starter-IMPLEMENTATION-RULES.md`: if colors, candidate name, and copy were removed, would the structure and composition remain distinctive to this portfolio?

### Content and evidence

Do not rewrite approved content. Review whether the strongest evidence has appropriate prominence; evidence is shown where useful; project narratives are clear; metric qualifiers remain visible; individual and team contributions are distinguishable; samples are identified; limitations retain context; and interview-useful evidence is easy to find.

Do not invent missing evidence. Classify an apparently absent approved element as **Possible Regression — Human Context Required** or **Content/Asset Gap**.

### Accessibility and interaction

Check semantic structure, heading hierarchy, keyboard navigation, visible focus, navigation labels and states, appropriate ARIA, meaningful alternative text, contrast, reduced motion, Escape behavior, link/button semantics, touch targets, focus order, zoom behavior, and screen-reader clarity.

### Technical health

Confirm the automated results and inspect for HTML/CSS/JavaScript errors, console warnings, broken links or anchors, missing assets, bad paths, failed document downloads, conflicting rules, excessive overrides, fragile positioning, dead rules, and implementation choices likely to cause responsive regressions. Do not recommend refactoring solely for stylistic preference.

### Regression review

Look for intended content or behavior that may have been removed, overridden, hidden, or altered. Compilation and rendering alone do not prove intent. When evidence is inconclusive, report **Possible Regression — Human Context Required** and do not redesign around the uncertainty.

## Finding format

For every substantiated finding, provide:

- **Severity:** Critical / High / Medium / Low
- **Classification:** Technical Defect / Responsive Defect / Accessibility / Content-Evidence / Possible Regression / Design Judgment
- **Location:** Page, section, component, selector, file, or code location
- **Viewport:** Affected viewport(s), when applicable
- **Observed:** What actually happens
- **Cause:** Likely implementation cause
- **Recommended direction:** What should be corrected and why

Do not manufacture findings. State when an area was tested and no issue was substantiated.

## Final report structure

A. Technical defects requiring correction
B. Responsive/mobile issues
C. Accessibility issues
D. Content/evidence gaps or possible regressions
E. Design/visual judgments requiring human decision
F. Items tested with no substantiated issue

Finish with one status:

- Ready for human review
- Ready after technical corrections
- Significant correction required

Then identify the three to five highest-priority findings, if any. Stop after the report.
