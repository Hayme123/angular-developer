# Components

Angular components combine a TypeScript class, an HTML template, and SCSS styles. Follow the [TypeScript rules](typescript.md) and check the [Component Pantry index](component-pantry/index.md) before creating visual UI.

## Component selection

If `@ntv360/component-pantry` provides the required component, use it and read only that component's reference file. Prefer its typed `config` input when it reduces repeated bindings. Do not recreate Pantry behavior or appearance unless a concrete requirement is unsupported.

## Component definition

Use standalone components when supported by the project's Angular version and architecture. Keep templates and styles in their standard project files.

```ts
/** Displays and edits a user profile. */
@Component({
  selector: 'app-profile',
  imports: [NtvButtonComponent],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile {
  /** Saves the current profile. */
  public save(): void {
    // ...
  }
}
```

## State and dependency injection

- Prefer `signal()`, `computed()`, and `inject()` where supported by the project's Angular version and existing architecture.
- Match the project's current form strategy. Pantry controls implementing `ControlValueAccessor` can participate in reactive forms.
- Derive state with `computed()` instead of synchronizing it through effects.

## Templates

- Use built-in `@if` and `@for` control flow in supported Angular versions.
- Include a stable `track` expression for `@for`.
- Use a semantic `<button>` or `ntv-button` for button behavior, never a clickable `<span>` or `<i>`.
- Add accessible names and required ARIA attributes.
- Add `data-testid` only to interactive elements and components. Use lowercase hyphenated names with at most five words.
- Keep static inline styles out of templates. Runtime data-driven `[style.*]` bindings are allowed.

```html
@if (user.isAdmin) {
  <admin-dashboard />
} @else {
  <standard-dashboard />
}

@for (item of items(); track item.id) {
  <ntv-card data-testid="user-card">{{ item.name }}</ntv-card>
} @empty {
  <p>No items to display.</p>
}
```

Use `@switch` for mutually exclusive states and include a default when the union is not exhaustively handled.

## Static configuration

Extract reusable labels, icons, actions, messages, and component configuration into typed constants. Keep one-off structural text in the template when extraction would not make it reusable or configurable.

```ts
export const PLAYLIST_ACTIONS = [
  { label: 'Edit', action: 'edit', icon: 'fas fa-edit' },
  { label: 'Clone', action: 'clone', icon: 'fas fa-copy' },
] as const;
```

## Page composition

- Put page features under `features` and split them into child components at section or interaction boundaries.
- Keep page components focused on UI and minimal interaction handlers. Put business logic and API access in the appropriate service or state layer.
- Extract shared types and static configuration into `interfaces` and `constants` when reused or required by feature scaffolding.
- Split by responsibility, not arbitrary line-count limits.

## Core concepts

- **Host element:** the DOM element matching the component selector.
- **View:** the template rendered inside the host.
- **Standalone component:** the default from Angular 19; older projects may require `standalone: true` or an `NgModule`.
- **Component tree:** compose pages from focused components split at responsibility and interaction boundaries.
- **Naming:** follow the project's configured Angular naming convention and the WARP preference for short feature names.
