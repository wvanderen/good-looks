# Good Looks

Good Looks is a portfolio-first civic tech project: an accessible bike ride journal and lightweight trip context tool built with Astro, USWDS, and AWS Amplify. The full title, National Administration of Good Looks, plays on the intentionally government-styled interface while keeping the product itself practical and small.

The project is intentionally small but credible. The MVP centers on a ride journal where a rider can enter an address, capture ride details, see relevant National Weather Service conditions, and save the entry to a lightweight Amplify-backed database. The surrounding documentation site shows how the UI is built, why USWDS patterns were chosen, and how accessibility was tested.

## Portfolio Goal

Use one compact product to demonstrate:

- USWDS implementation in a modern frontend.
- Astro as a documentation and app shell.
- Accessible form design, validation, and keyboard-friendly flows.
- Public API integration with government data.
- AWS Amplify data/auth experience.
- Clear product planning, documentation, and QA artifacts.

## MVP Scope

The first releasable version includes:

- Ride journal entry form.
- Address lookup flow for ride location.
- Weather.gov/National Weather Service conditions surfaced near the journal flow.
- Amplify-backed persistence for saved entries, including edit and delete controls
  for cleaning up demo data.
- USWDS-styled documentation pages for usage guidance and accessibility notes.

## Working Assumptions

- Astro provides the site shell, routing, and documentation pages.
- Interactive ride-journal UI can use hydrated islands where needed.
- USWDS provides layout, form, validation, card, alert, and summary patterns.
- AWS Amplify provides lightweight auth and data persistence.
- External API integrations should be visibly documented because they are part of the portfolio story.

## Planning Files

- [PROJECT_PLAN.md](PROJECT_PLAN.md)
- [BACKLOG.md](BACKLOG.md)
- [ARCHITECTURE.md](ARCHITECTURE.md)
- [A11Y_CHECKLIST.md](A11Y_CHECKLIST.md)

## Accessibility QA Snapshot

Latest recorded pass: 2026-06-16 against built Astro preview at
`http://127.0.0.1:4322/`.

- Lighthouse accessibility score: 95 on the home page.
- axe-core 4.11.4:
  - Home: hint text contrast follow-up was fixed after the recorded run.
  - Journal form: USWDS hint text contrast follow-up was fixed after the recorded run.
  - Journal review/save state: 0 violations after successful lookup and review.
  - Saved rides: 0 violations.
  - Docs: 0 violations after replacing the nested guidance `aside` with a
    non-landmark grid wrapper.
- Keyboard checks passed for skip link, primary navigation, journal fields,
  validation-summary focus, review heading focus, Save/Edit reachability, and
  saved-rides navigation. Save success and failure now move focus to the visible
  result status.
- VoiceOver/AX proxy checks confirmed page titles, headings, navigation names,
  field labels, fieldset names, validation alert, live-region statuses, review
  definition-list structure, and saved ride headings are exposed to assistive
  technology.

Follow-up fixes were closed in `td`: `td-fa9a3c`, `td-dc0209`, and `td-269ce9`.

## Local Setup

Install dependencies:

```sh
npm install
```

The app uses Amplify Gen 2 for the backend. The backend definition lives in
`amplify/` and can be deployed to a personal cloud sandbox once your AWS
credentials are configured locally.

Run the Astro development server:

```sh
npm run dev
```

Start the Amplify sandbox in a second terminal:

```sh
npm run sandbox
```

The sandbox command deploys the local backend definition and writes
`amplify_outputs.json` for your machine. Keep that file local; it is generated
configuration for the active sandbox and is intentionally ignored by git.

Build the production site:

```sh
npm run build
```

The base app imports USWDS CSS globally in `src/layouts/UswdsLayout.astro` and
loads the USWDS JavaScript bundle from the same layout. The home page includes a
sample USWDS button and form input to verify the design system is rendering.

## Amplify Sandbox Workflow

This repository includes the Amplify backend foundation for ride-entry
persistence and deployable public-data lookups:

- `amplify/backend.ts` registers project backend resources.
- `amplify/data/resource.ts` defines the `RideEntry` data model.
- `amplify/functions/addressLookup/` calls the U.S. Census Geocoder from a
  Lambda-backed custom query.
- `amplify/functions/weatherForecast/` calls the National Weather Service from a
  Lambda-backed custom query.
- `npm run sandbox` runs `ampx sandbox` for local cloud deployment.

Before running the sandbox, sign in with AWS credentials that can create
Amplify, AppSync, Lambda, DynamoDB, IAM, and CloudFormation resources in your
target account. The sandbox is intended for development only; tear it down from
the Amplify console or CLI when it is no longer needed.

The static Astro frontend uses `amplify_outputs.json` to call the generated
Amplify Data API. Generate that file locally with the Amplify sandbox workflow,
or let Amplify Hosting generate it during deployment. Do not commit generated
outputs.

The Census Geocoder and National Weather Service integrations do not require
provider API keys or secrets. Keep the NWS User-Agent string in
`amplify/functions/weatherForecast/handler.ts` accurate for the deployed app.

Generated outputs and local secrets are handled intentionally:

- `.env` and `.env.*` remain ignored for local-only secrets.
- `amplify_outputs.json`, `amplifyconfiguration.json`, and `.amplify/` are
  ignored because they are generated by Amplify commands.
- The MVP data API currently uses a short-lived public API key for sandbox
  development. Do not store sensitive ride notes in a shared sandbox; switch to
  user-based authorization before treating saved rides as private data.

## Reference Links

- [Astro islands architecture](https://docs.astro.build/en/concepts/islands/)
- [USWDS developer documentation](https://designsystem.digital.gov/documentation/developers/)
- [AWS Amplify Gen 2 quickstart](https://docs.amplify.aws/react/start/quickstart/)
- [National Weather Service API](https://www.weather.gov/documentation/services-web-api)
