# TypeScript Standards

Apply these rules to all Angular and server-side TypeScript.

## Types

- Enable `strict: true`.
- Do not use `any` or the broad `object` type. Define an interface/type, or use `unknown` at an untrusted boundary and narrow it.
- Keep variables on one primitive type whenever possible.
- Add explicit return types to functions and methods.
- Let TypeScript infer primitive variable types from initialized values; add an explicit type when no useful initial value exists.
- Initialize fields unless `undefined` or `null` is an intentional state represented by the type.

```ts
interface Person {
  firstName: string;
  lastName: string;
  age: number;
}

public getPerson(id: string): Person | undefined {
  return this.people.find((person) => person.id === id);
}
```

## Declarations and naming

- Prefer `const`; use `let` only when reassignment is required. Never use `var`.
- Use descriptive `camelCase` names for variables, decorated fields, functions, and methods.
- Use `Id`, not `ID`, inside camel-case names: `userId`, `dealerIds`.
- Name injected services explicitly without underscore prefixes: `dealerService`, not `_dealer`.
- Declare `public`, `private`, or `protected` on class members.

## Constructors

Use an object parameter when a constructor has several values or positional arguments would be unclear.

```ts
export class Person {
  public constructor(
    public readonly data: { firstName: string; lastName: string; age: number },
  ) {}
}
```

## Control flow

- Use truthiness for simple non-empty checks: `if (items.length)`.
- Omit braces only for a single, obvious statement.
- Prefer guard clauses over `else` blocks when the first branch can return.
- Do not compress multi-step branches merely to reduce line count.

```ts
if (!dealer) return;

this.selectDealer(dealer);
this.loadDetails(dealer.id);
```

## Class organization

Use this order:

1. Angular-decorated members
2. Public members
3. Private members
4. Protected members
5. Constructor
6. Public methods
7. Private methods
8. Protected methods

Sort related members consistently. Keep a new method beside the behavior it supports when that is clearer than strict alphabetical ordering.

## Errors and logging

- Do not leave routine `console.log` calls in production code.
- Use `console.error` when local error reporting is necessary.
- Prefer the project's centralized API error handling when available.
