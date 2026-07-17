# Tailwind CSS in Company Angular Projects

Follow the project's installed Tailwind version. Do not upgrade, replace, or regenerate Tailwind configuration during unrelated feature work.

## Company pattern

Company projects use semantic tokens defined in `tailwind.config.js` and consume utilities through SCSS `@apply`.

```scss
.profile {
  @apply flex items-center gap-4 rounded-xl bg-white p-6;

  &__action {
    @apply text-accent-main;
  }
}
```

- Prefer semantic project tokens over raw palette names.
- Add a semantic token before introducing a new static color.
- Do not hardcode hex colors in templates, SCSS, or TypeScript styling configuration.
- Keep long utility lists out of HTML.
- Use raw CSS only for values Tailwind cannot represent.

For setup or migration work, inspect `package.json`, existing PostCSS configuration, global styles, and `tailwind.config.js` before selecting version-specific commands. Never apply generic Tailwind v4 setup instructions to an existing differently configured project.
