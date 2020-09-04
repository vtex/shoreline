# RFC Template Header

Inspiration: https://github.com/reactjs/rfcs/blob/master/README.md

- Start Date: 2020-08-31
- PR: (leave this empty)
- Issue: (leave this empty)

# Summary

A `Header` is the top of a web page that contain your company name and logos. It also can contains the navigation menu and the locale switcher.

# Basic example [optional]

```jsx
import { Header } from '@vtex/brand-ui'

<Header>
  <Header.Brand />
  <Header.LeftLinks>
    <Link to="/">Status</Link>
    <Link>History</Link>
  </Header.LeftLinks>
  <Input type="search" />
  <Header.RightLinks>
    <Link to="/">CONTACT</Link>
    <Link to="/">Help Center</Link>
  </Header.RightLinks>
  <ActionButton><LocaleSwitcher /></ActionButton>
<Header>
```

# Detailed design

| prop | type        | description         | default | required |
| ---- | ----------- | ------------------- | ------- | -------- |
| sx   | SxStyleProp | Theme-ui style prop | -       | 🚫       |

The Header has four composites: `Brand`, `LeftLinks`, `RightLinks`, `ActionButton`.

## Brand

Element with the VTEX logo

## LeftLinks

| prop     | type        | description                                    | default | required |
| -------- | ----------- | ---------------------------------------------- | ------- | -------- |
| children | ReactNode   | Element that represents a navigation menu item | -       | ✔️       |
| sx       | SxStyleProp | Theme-ui style prop                            | -       | 🚫       |

## RightLinks [Optional]

| prop     | type        | description                                 | default | required |
| -------- | ----------- | ------------------------------------------- | ------- | -------- |
| children | ReactNode   | Element that represents a support menu item | -       | ✔️       |
| sx       | SxStyleProp | Theme-ui style prop                         | -       | 🚫       |

## ActionButton [Optional]

| prop     | type        | description                         | default | required |
| -------- | ----------- | ----------------------------------- | ------- | -------- |
| children | ReactNode   | Element responsible for some action | -       | ✔️       |
| sx       | SxStyleProp | Theme-ui style prop                 | -       | 🚫       |

# Adoption strategy

- This is a new feature, no breaking changes to any packages in `onda`.

# Education

- As with any DS component, it must be documented.
