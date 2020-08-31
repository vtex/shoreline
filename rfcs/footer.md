# RFC Brand Footer

- Start Date: 2020-08-31
- PR: (leave this empty)
- Issue: (leave this empty)

# Summary

`Footer` is an area at the bottom of the page which contains data in commom to other pages. This information may contain page numbers, sections of links, copyrights, etc.

# Basic example

```jsx
import { Footer } from '@vtex/brand-ui'

const links = [
  {
    name: 'Terms and Policies',
    href: '#',
  },
  {
    name: 'Sitemap',
    href: '#',
  },
]

const footerSections = [
  {
    sectionName: 'Product',
    links: [
      {
        name: 'Platform Overview',
        href: '#',
      },
      {
        name: 'Marketplace',
        href: '#',
      },
    ],
  },
  {
    sectionName: 'Partners',
    links: [
      {
        name: 'Become a Partner',
        href: '#',
      },
    ],
  },
]

<Footer links={links} sections={footerSections} />
```

# Detailed design

| prop     | type        | description             | default | required |
| -------- | ----------- | ----------------------- | -------- | ------ |
| links | Link[] | Array of link objects that will be displayed on the footer | `[]` | 🚫 |
| sections | Section[] | Array of section objects that will be displayed on the footer | `[]` | 🚫 |

Link: ```{ name: string, href: string }```
Section: ```{ name: string, links: Link[] }```

# Drawbacks

The array of links and sections may get a little big, but the developer can create them in a sepparated file and import them into the main file.

# Adoption strategy 

- This is a new feature, no breaking changes to any packages in `onda`.

# Education 

- As with any DS component, it must be documented.
