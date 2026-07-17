# Component Styling

## SCSS and BEM

- Use external `.scss` component styles.
- Give each component one short, feature-based BEM block where possible.
- Name classes with `block__element--modifier`.
- Keep SCSS nesting to three levels or fewer.
- Keep static styles out of templates and component metadata. Runtime data-driven `[style.*]` bindings are allowed.

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
- Apply Tailwind utilities from SCSS with `@apply` instead of filling templates with utility classes.
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
