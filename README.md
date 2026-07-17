# James Andrew Labtic — Angular Developer

A Pi package maintained by **James Andrew Labtic** for company-standard Angular development.

It combines Angular framework guidance with:

- `@ntv360/component-pantry` component references
- WARP architecture
- Company TypeScript, SCSS, BEM, Tailwind, testing, and documentation rules
- Local Angular documentation helper scripts

## Install from private GitHub

Use SSH so Pi can access the private repository through your configured GitHub SSH key:

```bash
pi install git:git@github.com:Hayme123/angular-developer.git
```

For a project-local installation:

```bash
pi install -l git:git@github.com:Hayme123/angular-developer.git
```

HTTPS also works when Git is already authenticated with GitHub:

```bash
pi install git:https://github.com/Hayme123/angular-developer.git
```

## Install from this local folder

```powershell
pi install C:\Users\Labtic\angular-developer
```

Project-local:

```powershell
pi install -l C:\Users\Labtic\angular-developer
```

Pi loads the skill from `skills/angular-developer`.

## Update

```bash
pi update git:git@github.com:Hayme123/angular-developer.git
```

## Validate

```bash
npm run check:standards
npm run sync
```

`npm run sync` refreshes upstream Angular guidance and reapplies the maintained company content from `overlays/angular-developer`.
