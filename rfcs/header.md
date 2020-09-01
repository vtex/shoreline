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
  <LocaleSwitcher />
<Header>
```

# Detailed design

| prop                   | type        | description                                          | default | required |
| ---------------------- | ----------- | ---------------------------------------------------- | ------- | -------- |
| Header.Brand           | ReactNode   | Element with the VTEX logo                           | -       | ✔️       |
| Header.LeftLinks       | ReactNode   | Element that represents the site navigation menu.    | -       | ✔️       |
| Header.LeftLinks.Link  | ReactNode   | Element that contains a navigation menu item.        | -       | ✔️       |
| Header.SearchBar       | ReactNode   | Element that contains the site search bar            | -       | 🚫       |
| Header.RightLinks      | ReactNode   | Element that represents the website support menu     | -       | 🚫       |
| Header.RightLinks.Link | ReactNode   | Element that contains a site support menu item       | -       | 🚫       |
| LocaleSwitcher         | ReactNode   | Element responsible for changing the site's language | -       | ✔️       |
| sx                     | SxStyleProp | Theme-ui style prop                                  | -       | 🚫       |

# Adoption strategy

- This is a new feature, no breaking changes to any packages in `onda`.

# Education

- As with any DS component, it must be documented.
