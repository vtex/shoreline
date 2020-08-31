# RFC Template Header

Inpiration: https://github.com/reactjs/rfcs/blob/master/README.md

- Start Date: 2020-08-31
- PR: (leave this empty)
- Issue: (leave this empty)

# Summary

A `Header` is the top of a web page that contains your company name and logos. It also can contains the navigation menu and the locale switcher.

# Basic example [optional]

```jsx
import { Header } from '@vtex/brand-ui'

<Header>
  <Header.Brand />
  <Header.LeftLinks>
    <Header.LeftLinks.Link to="/" name="Status" />
    <Header.LeftLinks.Link to="/" name="History" />
  </Header.LeftLinks>
  <Header.SearchBar />
  <Header.RightLinks>
    <Header.RightLinks.Link to="/" name="CONTACT" />
    <Header.RightLinks.Link to="/" name="Help Center" />
  </Header.RightLinks>
  <LocaleSwitcher />
<Header>
```

# Detailed design

| prop                   | type      | description                                        | default | required |
| ---------------------- | --------- | -------------------------------------------------- | ------- | -------- |
| Header.Brand           | ReactNode | Element with the VTEX logo                         | -       | ✔️       |
| Header.LeftLinks       | ReactNode | Element that represents the site navigation menu.  | -       | ✔️       |
| Header.LeftLinks.Link  | ReactNode | Element that contains a navigation menu item.      | -       | ✔️       |
| Header.SearchBar       | ReactNode | Element that contains the site search bar          | -       | 🚫       |
| Header.RightLinks      | ReactNode | Element that represents the website support menu   | -       | 🚫       |
| Header.RightLinks.Link | ReactNode | Element that contains a site support menu item     | -       | 🚫       |
| LocaleSwitcher         | ReactNode | Element responsible for changing the site language | -       | ✔️       |
| to                     | String    | Link to be loaded                                  | -       | ✔️       |
| name                   | String    | Reference to the link to be loaded                 | -       | ✔️       |

# Drawbacks

WIP

# Adoption strategy

- This is a new feature, no breaking changes to any packages in `onda`.

# Education

- As with any DS component, it must be documented.
