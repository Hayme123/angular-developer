# BFF MVC Architecture

Use this structure only when the repository has an Angular SSR Backend-for-Frontend layer.

```text
src/server/
├── config/        # Runtime and security configuration
├── routes/        # Endpoint declarations
├── controllers/   # HTTP parsing and responses
├── services/      # Business logic and backend/database access
├── middleware/    # Express middleware
└── types/         # API, domain, and database types
```

## Request flow

```text
Route → Controller → Service → backend API/database
```

Do not skip layers or mix their responsibilities.

### Routes

- Define endpoints and bind controller methods.
- Contain no business logic or data access.
- Use plural route filenames such as `resources.routes.ts`.

### Controllers

- Parse and validate request input.
- Call services.
- Choose HTTP status codes and response shapes.
- Catch and format expected errors.
- Contain no business logic or direct data access.

### Services

- Implement business rules and validation.
- Call backend APIs or database clients.
- Map persistence records to domain/API types.
- Contain no Express `Request` or `Response` concerns.

## Error responses

Keep the repository's established error schema. The standard WARP shape is:

```ts
interface ErrorResponse {
  error: string;
  errorDescription: string;
}
```

Use `400` for invalid input, `404` for missing resources, `201` for creation, and `500` only for unexpected server failures. Do not expose stack traces or sensitive upstream details.

## Imports and exports

- Group Node, third-party, and local imports consistently with nearby server files.
- Include `.js` on local server imports when required by ESM output.
- Maintain directory barrels only when the repository already uses them.

## Adding a resource

1. Add API/database types.
2. Add a focused service.
3. Add a controller.
4. Add routes.
5. Register routes before any generic proxy.
6. Add independent service/controller/route tests at the smallest useful level.

See [bff-implementation-example.md](bff-implementation-example.md) for a typed example.
