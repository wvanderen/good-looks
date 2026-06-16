# Project Plan: Good Looks

## Product Brief

Good Looks is a USWDS-forward ride journal for cyclists who think weather matters. A rider records a ride, enters the ride location as an address, and gets public weather context from weather.gov/National Weather Service data. The product should feel like a polished civic-service interface: plainspoken, accessible, structured, and trustworthy.

This is portfolio-first. The project should make it easy to say: "I built an accessible Astro and USWDS app, integrated public government weather data, persisted user-owned ride entries with AWS Amplify, and documented the component patterns and accessibility checks."

## Audience

- Primary: hiring managers or reviewers for public-sector, civic tech, or accessibility-minded frontend roles.
- Secondary: cyclists who want a simple ride log with weather context.

## MVP Definition of Done

- Astro app scaffolded with USWDS styles and scripts wired in.
- Ride journal page supports creating a ride entry with accessible form controls.
- Address input resolves to coordinates through a geocoding path.
- Coordinates are used to fetch NWS forecast metadata and weather conditions.
- Saved ride entries persist through AWS Amplify data.
- One documentation page explains the ride journal pattern, usage guidance, and accessibility considerations.
- README includes setup, architecture, data flow, and testing notes.
- Accessibility checklist is completed with automated and manual results.
- `td` contains the active backlog so work can proceed issue by issue.

## Non-Goals for MVP

- Turn-by-turn route planning.
- Complex maps or GPX import.
- Social sharing.
- Native mobile app.
- Full weather-history correctness for past rides.
- Highly custom visual design outside USWDS.

## Milestones

### Milestone 1: Foundation

Goal: prove the stack and establish the portfolio shell.

Deliverables:

- Astro project created.
- USWDS installed and visible in the app.
- Basic information architecture:
  - Home/dashboard.
  - Ride journal.
  - Saved rides.
  - Documentation.
- README setup instructions started.

### Milestone 2: Accessible Ride Journal MVP

Goal: create the core product flow.

Deliverables:

- Journal form with date, address, distance, duration, effort, conditions notes, and freeform ride notes.
- USWDS form validation for required fields and invalid numeric values.
- Review/confirm step before saving.
- Keyboard-only flow verified.

### Milestone 3: Weather + Address Integration

Goal: make the project meaningfully civic-data-fluent.

Deliverables:

- Address-to-coordinate integration.
- NWS points lookup and forecast fetch.
- Ride conditions panel showing temperature, wind, precipitation/short forecast, and a simple ride condition label.
- Loading, empty, and error states using USWDS alerts.
- API behavior documented.

### Milestone 4: Amplify Persistence

Goal: add the AWS/AWS Amplify proof point.

Deliverables:

- Amplify backend configured for ride entries.
- Data model for RideEntry.
- Owner-aware access if auth is included in MVP.
- Create/list saved rides from the app.
- Local development notes for Amplify sandbox/deployment.

### Milestone 5: Documentation + Accessibility Pass

Goal: make the portfolio value visible.

Deliverables:

- Usage-guidelines page for the Ride Journal component.
- Architecture notes with data flow.
- Accessibility checklist completed.
- Lighthouse and axe results recorded.
- VoiceOver/manual keyboard findings recorded.

## Recommended Build Order

1. Scaffold Astro and USWDS.
2. Build static ride journal form with validation states.
3. Add local in-memory saved entries to shape the UI.
4. Add address and NWS integration.
5. Add Amplify persistence.
6. Write docs and complete accessibility QA.

## Risk Register

| Risk | Mitigation |
| --- | --- |
| Amplify setup takes longer than expected | Build localStorage fallback first, then swap to Amplify once the UI contract is stable. |
| Address geocoding requires key/account | Pick a geocoder early and document the decision; keep manual latitude/longitude as a development fallback. |
| Weather data does not map cleanly to historical ride dates | For MVP, present current/near-term conditions for the entered address and document this limitation. |
| USWDS styling fights custom app needs | Prefer USWDS components and utility classes before custom CSS. |
| Scope expands into route planning | Keep route planning as post-MVP; journal is the MVP center. |

## Success Story

The project succeeds when a reviewer can open the repo or deployed site and quickly see:

- A real civic-data product idea.
- An accessible form-heavy workflow.
- Government design-system fluency.
- AWS Amplify experience.
- Clear documentation that reads like professional product work, not just code notes.
