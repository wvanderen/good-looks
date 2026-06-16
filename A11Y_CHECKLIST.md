# Accessibility Checklist

Use this file as the testing record before calling the MVP portfolio-ready.

## Automated Checks

- [x] Run axe on home/dashboard.
- [x] Run axe on ride journal form.
- [x] Run axe on review/save step.
- [x] Run axe on saved rides list.
- [x] Run Lighthouse accessibility audit.
- [x] Record scores and top findings in README.

## Keyboard Testing

- [x] Skip link appears and moves focus to main content.
- [x] Main navigation is reachable and understandable by keyboard.
- [x] Ride journal fields follow a logical tab order.
- [x] Radio groups and checkbox groups work with keyboard controls.
- [x] Date input is usable without a mouse.
- [x] Submit, edit, review, and save actions are reachable by keyboard.
- [x] Focus moves to meaningful content after validation errors.
- [ ] Focus moves to meaningful content after save success/failure.
- [x] No keyboard trap exists in any interactive area.

## Screen Reader Testing

- [x] Page title and main heading identify the current page.
- [x] Form fields announce labels and helper text.
- [x] Fieldsets announce group labels.
- [x] Validation errors are announced or easy to discover.
- [x] Weather loading and error states are announced appropriately.
- [x] Review step reads as structured content, not an unlabeled pile of values.
- [x] Saved ride entries have useful headings or names.

## Form Semantics

- [x] Every input has an associated label.
- [x] Required fields are visibly and programmatically indicated.
- [x] Error messages identify the field and how to fix it.
- [x] Numeric fields define expected units, such as miles or minutes.
- [ ] Freeform note fields have character count or sensible limits if needed.
- [x] Buttons use action-oriented labels.

## Visual and Content Checks

- [x] Color is not the only way to understand status.
- [ ] Text contrast passes WCAG AA.
- [ ] Layout works at mobile and desktop widths.
- [ ] Text does not overlap or truncate in form controls, buttons, cards, or alerts.
- [x] Loading states reserve enough space to avoid confusing layout shifts.
- [x] USWDS styling remains the dominant visual language.

## QA Run Summary

- Date: 2026-06-16
- Built output tested at `http://127.0.0.1:4322/` with `npm run build` followed by `npm run preview -- --host 127.0.0.1 --port 4321`; Astro selected port 4322 because 4321 was occupied.
- Automated tools:
  - axe-core 4.11.4 via `@axe-core/cli` against home, journal, saved rides, and docs.
  - axe-core 4.11.4 injected into the populated journal review state.
  - Lighthouse accessibility audit against home.
- Manual tools:
  - Disposable headless Chrome-for-Testing with real Tab/Shift+Tab/Enter key events.
  - Chrome accessibility tree inspection as a VoiceOver/AX proxy for names, roles, headings, field groups, live regions, and review structure.
- Follow-up tasks filed:
  - `td-fa9a3c`: Fix USWDS hint text color contrast.
  - `td-dc0209`: Fix docs sidenav complementary landmark nesting.
  - `td-269ce9`: Move focus to save result status after journal save.

## Manual Findings Log

| Date | Tool/Method | Page/Flow | Finding | Resolution |
| --- | --- | --- | --- | --- |
| 2026-06-16 | axe-core 4.11.4 CLI | Home | `color-contrast` serious violation on `#sample-control-hint`. | Follow-up filed as `td-fa9a3c`. |
| 2026-06-16 | axe-core 4.11.4 CLI | Journal form | `color-contrast` serious violations on `form > .usa-hint`, `#weather-notes-hint`, and `#ride-notes-hint`. | Follow-up filed as `td-fa9a3c`. |
| 2026-06-16 | axe-core 4.11.4 injected | Journal review/save step | 0 violations after successful address/weather lookup and review transition. | No follow-up. |
| 2026-06-16 | axe-core 4.11.4 CLI | Saved rides | 0 violations on initial saved-rides page. | No follow-up. |
| 2026-06-16 | axe-core 4.11.4 CLI | Docs | `landmark-complementary-is-top-level` moderate violation on nested `aside`. | Follow-up filed as `td-dc0209`. |
| 2026-06-16 | Lighthouse | Home | Accessibility score: 95. Top failing audit: color contrast for sample hint text. | Follow-up filed as `td-fa9a3c`. |
| 2026-06-16 | Keyboard | Home | First Tab lands on skip link; Enter scrolls to main content and next control. Primary nav, in-page CTA, sample input, and button are reachable in order. | Passed. |
| 2026-06-16 | Keyboard | Journal form | Tab order proceeds through skip link, brand/nav, date input, address fields, distance/duration, effort radio group, notes fields, and Continue. Native date input exposes Chrome date-picker controls. | Passed. |
| 2026-06-16 | Keyboard | Journal validation | Submitting empty form moves focus to `#journal-validation-summary`; each invalid field receives `aria-invalid` and an error reference in `aria-describedby`. | Passed. |
| 2026-06-16 | Keyboard | Journal review/edit/save | Successful lookup moves focus to `#journal-review-heading`; Save ride entry and Edit details are next in Tab order; Edit returns focus to `#journal-form-heading`. Save result is a live region, but focus does not move to the result. | Follow-up filed as `td-269ce9`. |
| 2026-06-16 | Keyboard | Saved rides | Skip link, brand/nav, and Add ride are reachable; saved entries have no unexpected focus traps. | Passed. |
| 2026-06-16 | VoiceOver/AX proxy | All pages | Page titles, primary headings, primary navigation name, form labels, fieldset names, validation alert, live-region statuses, review definition list, and saved ride headings are exposed in the accessibility tree. | Passed with note: run a final human VoiceOver smoke test before public release. |

## Portfolio Evidence To Capture

- [ ] Screenshot of ride journal form.
- [ ] Screenshot of ride conditions panel.
- [ ] Screenshot of saved ride entry.
- [x] Screenshot or notes from axe.
- [x] Lighthouse accessibility score.
- [x] Short VoiceOver testing note.
