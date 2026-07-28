# HTTP Security Headers

Inspect existing middleware and deployment behavior before changing headers. Security policy must match the application's real resource and browser-feature requirements.

## Baseline

Configure these headers in server middleware or the hosting platform:

- `Strict-Transport-Security: max-age=31536000; includeSubDomains` for production HTTPS
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: SAMEORIGIN` unless framing requirements demand a CSP-based policy
- `Referrer-Policy: strict-origin-when-cross-origin`
- A least-privilege `Permissions-Policy`
- A tested `Content-Security-Policy`

Disable framework disclosure:

```ts
app.disable('x-powered-by');
```

## Content Security Policy

Start restrictive and allow only sources the application uses. Avoid copying a broad whitelist.

```text
default-src 'self';
script-src 'self';
style-src 'self';
img-src 'self' data:;
font-src 'self' data:;
connect-src 'self';
frame-ancestors 'self';
base-uri 'self';
form-action 'self'
```

- Avoid `'unsafe-eval'` in production.
- Prefer nonces or hashes over `'unsafe-inline'` for scripts.
- Add API, WebSocket, font, image, and CDN origins individually.
- Keep CSP source lists in typed server configuration.
- Never weaken CSP merely to silence browser violations; identify the required source first.

## Middleware order

Register security headers before application routes and proxy middleware. Keep origin validation, body limits, authentication, and rate limiting near the trust boundary.

Do not add Helmet or rate-limiting dependencies when the existing platform or middleware already provides equivalent controls.

## Verification

Before deployment:

1. Run the application with the production policy.
2. Verify fonts, images, scripts, API calls, and WebSockets.
3. Check browser CSP violations.
4. Inspect response headers with `curl -I <url>`.
5. Confirm HSTS is sent only over production HTTPS.
6. Review wildcard sources and disabled browser permissions.
7. Test framing and authentication flows.

For CSP reporting, send reports to a rate-limited endpoint and use the project's centralized security logger. Do not log sensitive request bodies directly.

References: [OWASP Secure Headers](https://owasp.org/www-project-secure-headers/) and [MDN HTTP headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers).
