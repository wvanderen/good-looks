# Accessibility Checklist

Use this file as the testing record before calling the MVP portfolio-ready.

## Automated Checks

- [ ] Run axe on home/dashboard.
- [ ] Run axe on ride journal form.
- [ ] Run axe on review/save step.
- [ ] Run axe on saved rides list.
- [ ] Run Lighthouse accessibility audit.
- [ ] Record scores and top findings in README.

## Keyboard Testing

- [ ] Skip link appears and moves focus to main content.
- [ ] Main navigation is reachable and understandable by keyboard.
- [ ] Ride journal fields follow a logical tab order.
- [ ] Radio groups and checkbox groups work with keyboard controls.
- [ ] Date input is usable without a mouse.
- [ ] Submit, edit, review, and save actions are reachable by keyboard.
- [ ] Focus moves to meaningful content after validation errors.
- [ ] Focus moves to meaningful content after save success/failure.
- [ ] No keyboard trap exists in any interactive area.

## Screen Reader Testing

- [ ] Page title and main heading identify the current page.
- [ ] Form fields announce labels and helper text.
- [ ] Fieldsets announce group labels.
- [ ] Validation errors are announced or easy to discover.
- [ ] Weather loading and error states are announced appropriately.
- [ ] Review step reads as structured content, not an unlabeled pile of values.
- [ ] Saved ride entries have useful headings or names.

## Form Semantics

- [ ] Every input has an associated label.
- [ ] Required fields are visibly and programmatically indicated.
- [ ] Error messages identify the field and how to fix it.
- [ ] Numeric fields define expected units, such as miles or minutes.
- [ ] Freeform note fields have character count or sensible limits if needed.
- [ ] Buttons use action-oriented labels.

## Visual and Content Checks

- [ ] Color is not the only way to understand status.
- [ ] Text contrast passes WCAG AA.
- [ ] Layout works at mobile and desktop widths.
- [ ] Text does not overlap or truncate in form controls, buttons, cards, or alerts.
- [ ] Loading states reserve enough space to avoid confusing layout shifts.
- [ ] USWDS styling remains the dominant visual language.

## Manual Findings Log

| Date | Tool/Method | Page/Flow | Finding | Resolution |
| --- | --- | --- | --- | --- |
| TBD | TBD | TBD | TBD | TBD |

## Portfolio Evidence To Capture

- [ ] Screenshot of ride journal form.
- [ ] Screenshot of ride conditions panel.
- [ ] Screenshot of saved ride entry.
- [ ] Screenshot or notes from axe.
- [ ] Lighthouse accessibility score.
- [ ] Short VoiceOver testing note.
