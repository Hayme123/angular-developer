# Component Styling

Inspect existing screens and theme configuration first. Preserve the repository's typography, spacing, radius, elevation, and color language instead of introducing a second visual system.

- Use `@ntv360/component-pantry` before building custom UI primitives.
- Reuse semantic tokens from `tailwind.config.js`.
- Keep status colors on existing `success`, `warning`, `danger`, and `info` tokens.
- Preserve the application's established font; do not change fonts per page or component.
- Keep UI copy direct, professional, helpful, and concise.
- Prefer clear hierarchy and moderate elevation over decorative density.

## SCSS and BEM

- Use external `.scss` component styles.
- Give each component one short, feature-based BEM block where possible.
- Name classes with `block__element--modifier`.
- Keep SCSS nesting to three levels or fewer.
- Keep static styles out of ordinary application templates and component metadata. Documented Component Pantry examples may use inline styles; runtime data-driven `[style.*]` bindings are also allowed.

```scss
.dealers {
  &__header { @apply flex items-center justify-between; }
  &__item { @apply rounded-xl bg-white; }
  &__item--selected { @apply border-accent-main; }
}
```

## Tailwind

- Preserve the project's installed Tailwind version and configuration; do not migrate versions during unrelated work.
- Use semantic tokens from `tailwind.config.js` in company projects.
- Prefer Tailwind utilities through SCSS `@apply` for new complex or repeated styling. Match nearby template utility usage instead of broad refactoring when a repository already uses inline Tailwind classes.
- Use `@apply` for supported layout, spacing, sizing, radius, and color values.
- Use raw CSS only when Tailwind cannot express the required value.
- Do not hardcode hex colors in component HTML, SCSS, or TypeScript styling configuration. Add or reuse a semantic token first.

## Component Pantry styling

- Use Pantry inputs such as `variant`, `size`, and `config` before writing overrides.
- Never use `::ng-deep` to change a Pantry component's colors. Use its semantic variant and Tailwind tokens.
- Use `::ng-deep` only for an unavoidable structural override that the component API cannot express, such as minimum width or padding.

## View encapsulation

Keep Angular's default `ViewEncapsulation.Emulated` unless the project has a documented reason to use another mode.

- Use `:host` for the component host.
- Use `:host-context()` only when a parent context genuinely controls presentation.
- Do not set `ViewEncapsulation.None` merely to make an override easier.
- Do not use template `<style>` elements.

## Bootstrap grid

Every `.col-*` must be a direct grid child of `.row`, including nested grids:

```html
<div class="container">
  <div class="row">
    <div class="col-lg-12">
      <div class="row">
        <div class="col-lg-8">...</div>
        <div class="col-lg-4">...</div>
      </div>
    </div>
  </div>
</div>
```

## Responsive layouts

Use the project's established breakpoints. For WARP page layouts, verify behavior around 1200px and 768px unless the project defines different breakpoints.
