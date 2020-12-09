---
path: /button/
---

# Button

Buttons trigger an action, or allow the user to advance a state. They are where the user interacts with the screen.
This component handles all `Button` variations of the Design System. It renders a `<button>` element by default.

## UX Writing: Tone and Voice

Keep in mind the Authority we want to transmit with our voice. Buttons are where the action takes place. We're always sure where we want to direct our users to, so they accomplish their goals. There's no space for ambiguity in the actions we guide them to take, we convey decisiveness.

## Behavior

```jsx
<Button>Admin UI Button</Button>
```

## Installation

```sh isStatic
yarn add @vtex/admin-ui
```

```jsx isStatic
import { Button } from '@vtex/admin-ui'
```

Learn more in [Get started](/docs/get-started/).

## Variations

### Primary

This type of button only uses text to convey its action.
This option should be used for the most important action of the page.

#### ✅ Do's:

- Use this on topbars and confirmation modals.
- Use it only once per page/modal.

#### 🚫 Dont's:

- Avoid using more than 2 words.
- Buttons should be in all caps.
- Prefer imperative verbs.
- No punctuation.

#### Example

```jsx
<Set orientation="vertical">
  <Button variant="primary">Primary Action</Button>
  <Button variant="danger">Dangerous Primary Action</Button>
</Set>
```

### Secondary

This option should be used for optional actions.

#### ✅ Do's:

- Use this option for topbars, tables, lists, and forms.
- Buttons should be in all caps.
- Prefer imperative verbs.
- Non-urgent actions

#### 🚫 Dont's:

- Avoid using more than 2 words.
- No punctuation.

#### Example

```jsx
<Set orientation="vertical">
  <Button variant="secondary">Secondary Action</Button>
  <Button variant="danger-secondary">Dangerous Secondary Action</Button>
</Set>
```

### Tertiary

This option should be used for optional/tertiary actions.

#### ✅ Do's:

- Non-urgent, tertiary actions
- Prefer imperative verbs.

#### 🚫 Dont's:

- Avoid using more than 3 words.
- No punctuation.

```jsx
<Set orientation="vertical">
  <Button variant="tertiary">Tertiary Action</Button>
  <Button variant="danger-tertiary">Dangerous Tertiary Action</Button>
</Set>
```

### Adaptative

Adapts to the context that is inserted.

#### ✅ Do's:

- Non-urgent, tertiary actions
- Close, dismiss, or collapse actions.
- Prefer imperative verbs.

#### 🚫 Dont's:

- Avoid using more than 3 words.
- No punctuation.

```jsx
<Set orientation="vertical">
  <Box
    styles={{
      color: 'text.primary',
      bg: 'background',
      padding: 4,
    }}
  >
    <Button variant="adaptative-dark" icon={<IconClose />} />
  </Box>
  <Box
    styles={{
      color: 'background',
      bg: 'text.primary',
      padding: 4,
    }}
  >
    <Button variant="adaptative-light" icon={<IconClose />} />
  </Box>
</Set>
```

### Sizes

The button comes in two sizes: `regular` (default) and `small`.

```jsx
<Set orientation="vertical">
  <Button>Regular Button</Button>
  <Button size="small">Small Button</Button>
</Set>
```

### Icon

This type of button replaces text with an icon. The action needs to be clear enough to be represented with just an icon. It is the lowest type of button in the hierarchy.

#### ✅ Do's:

- Tight spaces such as modals, sidebars, or cards.
- Non-urgent, tertiary actions
- Add descriptions in the alt tag to improve accessibility.
- Be consistent with what action it represents, pay attention to the icon's use on other screens,

```jsx
<Button icon={<IconFavorite title="Favorite" />} />
```

### Icon + Text

This type of button combines an icon and an action. It embodies more complex actions, and therefore require an additional copy, but at the same time aren't urgent, or the page's primary focus.

#### ✅ Do's:

- If there's a need to be more specific and detail the action.
- Prefer imperative verbs.
- Non-urgent, tertiary actions

#### 🚫 Dont's:

- Avoid using more than 3 words.
- No punctuation.

```jsx
<Set orientation="vertical">
  <Button icon={<IconFavorite />} iconPosition="start" mr="20px">
    Icon start
  </Button>
  <Button icon={<IconCaret direction="down" />} iconPosition="end">
    Icon end
  </Button>
</Set>
```

## Props

<propdetails heading="Button" component="Button"></propdetails>
