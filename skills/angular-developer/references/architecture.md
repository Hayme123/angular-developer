# WARP Architecture Standards

Follow the existing project structure. For WARP applications, use:

```text
src/
├── app/
│   ├── core/       # Infrastructure, guards, services, models, constants
│   ├── features/   # Business features and pages
│   ├── layout/     # Authenticated and public layout shells
│   └── shared/     # Reusable components, directives, and pipes
└── server/         # BFF middleware, configuration, services, and types
```

## Features

1. Add a feature under `src/app/features/<feature>/`.
2. Register its routes in the appropriate `layout/*/routes.ts`.
3. Follow the project's page scaffolding, including sibling `constants`, `interfaces`, and optional `components` directories when needed.
4. Export through an existing barrel only when the project uses that pattern.

## Imports

Order imports with blank lines between groups:

1. Angular
2. Third-party packages, including `@ntv360/component-pantry`
3. Local aliases

Use configured aliases such as `@core`, `@features`, `@shared`, and `@layouts` instead of long relative paths. Include `.js` extensions in server imports when required by the runtime.

## SSR and BFF

For projects using the BFF pattern:

```text
Browser → Angular SSR server/BFF → backend API
```

- Keep backend URLs and sensitive server concerns out of browser bundles.
- Centralize server-side security and validation.
- Use SSR-safe authentication services and route guards.
- Guard browser-only APIs with `isPlatformBrowser()` or an equivalent existing abstraction.
