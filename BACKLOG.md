# Backlog

This file mirrors the intended `td` backlog at a readable level. Use `td list`, `td ready`, and `td show <id>` for day-to-day task execution.

## P0: MVP Backbone

### Scaffold Astro + USWDS

Set up the base app, install USWDS, and verify a USWDS button/form control renders correctly.

Acceptance criteria:

- Astro app runs locally.
- USWDS CSS is loaded globally.
- USWDS JavaScript initialization path is documented if needed.
- A sample USWDS component is visible.

### Create App Information Architecture

Create the initial pages and navigation.

Acceptance criteria:

- Home/dashboard route exists.
- Ride journal route exists.
- Saved rides route exists.
- Documentation route exists.
- Navigation uses accessible labels and current-page state.

### Build Accessible Ride Journal Form

Build the central form flow with USWDS components.

Acceptance criteria:

- Form includes date, address, distance, duration, effort, weather notes, and ride notes.
- Labels, fieldsets, legends, helper text, and error states are correctly associated.
- Required fields have visible and programmatic validation.
- Keyboard-only entry and submission works.

### Add Review and Save Flow

Add a confirmation step before persistence.

Acceptance criteria:

- User can review normalized ride details before saving.
- Edit action returns to the form without losing entered values.
- Confirmation uses headings and focus management that make sense to screen readers.

## P1: Data and Weather

### Choose Address Geocoding Strategy

Select the address lookup approach for MVP.

Acceptance criteria:

- Decision is documented in `ARCHITECTURE.md`.
- Local development fallback exists for manual coordinates.
- API limitations and privacy notes are recorded.

### Integrate NWS Forecast Lookup

Fetch weather data from the National Weather Service API.

Acceptance criteria:

- Coordinates are sent to the NWS points endpoint.
- Forecast URL is extracted and fetched.
- UI shows loading, success, unavailable, and error states.
- NWS source attribution is visible or documented.

### Render Ride Conditions Panel

Summarize weather in a USWDS-friendly panel.

Acceptance criteria:

- Panel shows temperature, wind, precipitation/short forecast where available.
- A simple ride condition label is derived and explained.
- Error and empty states use USWDS alert patterns.

## P1: Amplify

### Configure Amplify Backend

Create the Amplify backend foundation.

Acceptance criteria:

- Amplify project files exist.
- Data model can be deployed to a sandbox.
- Setup steps are documented in README.

### Define RideEntry Data Model

Create the persisted ride-entry schema.

Acceptance criteria:

- Model includes ride date, address label, coordinates, distance, duration, effort, notes, and weather snapshot fields.
- Required and optional fields are explicit.
- Owner/user access rules are documented.

### Connect Journal UI to Persistence

Save and list ride entries through Amplify.

Acceptance criteria:

- Create flow saves an entry.
- Saved rides page lists entries.
- Save failure shows an accessible error alert.
- Loading state is visible and does not shift layout unexpectedly.

## P2: Portfolio Documentation

### Write Ride Journal Usage Guidelines

Document the core UI pattern.

Acceptance criteria:

- Page includes when to use, when not to use, content guidance, validation guidance, and accessibility notes.
- Live or screenshot-backed example is included.
- Code snippet or implementation notes are included.

### Document Architecture and Data Flow

Make the technical story interview-ready.

Acceptance criteria:

- Diagram or step list explains address -> coordinates -> NWS -> saved entry.
- Amplify responsibilities are separated from frontend responsibilities.
- Known tradeoffs are documented.

### Complete Accessibility QA

Run and record the accessibility pass.

Acceptance criteria:

- Keyboard-only flow findings recorded.
- VoiceOver findings recorded.
- axe findings recorded.
- Lighthouse accessibility score recorded.
- Fixes or follow-up tasks are linked.

## P3: Post-MVP Ideas

- Add ride filters by month, distance, effort, or weather condition.
- Add CSV export.
- Add route type and surface fields.
- Add compact dashboard stats.
- Add offline-friendly local draft saving.
- Add visual comparison of rides by weather condition.
- Add route-planning form as a second documented USWDS pattern.
