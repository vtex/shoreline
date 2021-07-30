---
path: /engineering/code-styleguide/
---

# Code Styleguide

> This is a draft page

## Prevent the use of React.FC

The use of `React.FunctionComponent` (or the `React.FC` shorthand) is discouraged to type the component props. If you need to type children explicitly, use `React.ReactNode`. [Some good reasons why](https://github.com/facebook/create-react-app/pull/8177).

```tsx isStatic
// ✅ Good
interface Props {
  title: string
  children?: React.ReactNode
}

function Component(props: Props) {
  // ...
}

// 🚨 Bad
interface Props {
  title: string
}

const Component = React.FC<Props>(props) {
  // ...
}

// 🚨 Bad
interface Props {
  title: string
}

const Component = React.FunctionComponent<Props>(props) {
  // ...
}
```

## Avoid param destructuring

Prefer destructuring on the component's body.

```tsx isStatic
interface Props {
  title: string
  // ...
}

// ✅ Good
function Component(props: Props) {
  const { title } = props
  // ...
}

// 🚨 Bad
function Component({ title }: Props) {
  // ...
}
```

## Avoid inline types

Always prefer creating an interface or type for the component props.

```tsx isStatic
// ✅ Good
interface Props {
  title: string
}

function Component(props: Props) {
  // ...
}

// 🚨 Bad
function Component({ title }: { title: string }) {
  // ...
}
```

## Avoid inline extension

Avoid extending other types within the function param directly. Prefer extending or compose a new type for a cleaner code.

```tsx isStatic
// ✅ Good
interface Props extends SomeTypeA {
  title: string
}

function Component(props: Props) {
  // ...
}

// ✅ Good
type Props = SomeTypeA & SomeTypeB

function Component(props: Props) {
  // ...
}

// 🚨 Bad
function Component(props: Props & SomeTypeA) {
  // ...
}
```

## Avoid too much nesting

A deep directory nesting can cause a lot of plain points, so you must avoid it as much as you can.[Link](https://reactjs.org/docs/faq-structure.html#avoid-too-much-nesting).

## Prefer named exports

Named exports are prefered over default exports.

```tsx isStatic
// ✅ Good
export function Component() {
  // ...
}

// 🚨 Bad
export default function Component() {
  // ...
}
```

## Test files

**All test files must follow the `*.test.(ts|tsx)` pattern, where `*` shaw never be `index`**

```sh isStatic
// ✅ Good
Component
|__ index.tsx
|__ Component.test.tsx

// 🚨 Bad
Component
|__ index.tsx
|__ ComponentTest.tsx

// 🚨 Bad
Component
|__ index.tsx
|__ test.tsx

// 🚨 Bad
Component
|__ index.tsx
|__ index.test.tsx
```

**For compound components, use the `__tests__` directory to store all the test files**

```sh isStatic
// ✅ Good
Component
|__ __tests__
    |__ Component.test.tsx
    |__ ComponentComposite.test.tsx
|__ index.tsx
|__ Component.tsx
|__ ComponentComposite.tsx

// 🚨 Bad
Component
|__ index.tsx
|__ Component.tsx
|__ Component.test.tsx
|__ ComponentComposite.tsx
|__ ComponentComposite.test.tsx
```
