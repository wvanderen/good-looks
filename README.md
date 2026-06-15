# Ride Conditions

Ride Conditions is a portfolio-first civic tech project: an accessible bike ride journal and lightweight trip context tool built with Astro, USWDS, and AWS Amplify.

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
- Amplify-backed persistence for saved entries.
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

## Local Setup

Install dependencies:

```sh
npm install
```

Run the Astro development server:

```sh
npm run dev
```

Build the production site:

```sh
npm run build
```

The base app imports USWDS CSS globally in `src/layouts/UswdsLayout.astro` and
loads the USWDS JavaScript bundle from the same layout. The home page includes a
sample USWDS button and form input to verify the design system is rendering.

## Reference Links

- [Astro islands architecture](https://docs.astro.build/en/concepts/islands/)
- [USWDS developer documentation](https://designsystem.digital.gov/documentation/developers/)
- [AWS Amplify Gen 2 quickstart](https://docs.amplify.aws/react/start/quickstart/)
- [National Weather Service API](https://www.weather.gov/documentation/services-web-api)
