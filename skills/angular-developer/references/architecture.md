# WARP Architecture

Inspect the current repository before changing structure. Existing implementation wins over generic examples.

## Application structure

```text
src/
├── app/
│   ├── core/       # Singleton services, guards, interceptors, models
│   ├── features/   # Route-driven business features
│   ├── layout/     # Authenticated and public layout shells
│   └── shared/     # Reusable UI, directives, and pipes
└── server/         # SSR/BFF routes, controllers, services, middleware, config, types
```

- Put app-wide infrastructure in `core`.
- Put reusable presentation in `shared`.
- Put business screens in `features`.
- Put route grouping and application shells in `layout`.
- Do not add NgModules to standalone WARP applications.
- Do not add placeholder architecture for speculative features.

## Features and routing

1. Create a feature under `src/app/features/<feature>/`.
2. Register routes in the appropriate `layout/*/routes.ts`.
3. Prefer lazy loading for route-driven features when it matches nearby routes.
4. Use guards from `core/guards` for authenticated or guest access.
5. Export through existing barrels only when the repository uses them.

## Imports

Order imports with blank lines between Angular, third-party/NTV, and local groups. Preserve section comments when the repository uses them.

```ts
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { NtvButtonComponent } from '@ntv360/component-pantry';

import { AuthService } from '@core';
import { DashboardComponent } from '@features/dashboard';
```

Use configured aliases such as `@core`, `@features`, `@shared`, and `@layouts` instead of deep relative paths. Server-side local imports must include `.js` when required by the runtime.

## SSR and zoneless operation

- Guard `window`, `document`, storage, and other browser-only APIs with `isPlatformBrowser()` or the repository's existing abstraction.
- Preserve `provideZonelessChangeDetection()` when the project uses zoneless change detection.
- Prefer `signal()`, `computed()`, and `inject()` over constructor-managed component state.
- Keep backend URLs, credentials, security policy, and server validation out of browser bundles.

## BFF

Use the BFF flow when present:

```text
Browser → Angular SSR server/BFF → backend API
```

Read [bff-architecture.md](bff-architecture.md) before adding server routes, controllers, or services. Use [bff-implementation-example.md](bff-implementation-example.md) only when a complete example is needed. For middleware and CSP work, read [security-headers.md](security-headers.md).
