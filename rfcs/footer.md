# RFC Brand Footer

- Start Date: 2020-08-31
- PR: (leave this empty)
- Issue: (leave this empty)

# Summary

`Footer` is an area at the bottom of the page which contains data in common to other pages. This information may contain page numbers, sections of links, social media links, etc.

# Basic example

```jsx
import { Footer } from '@vtex/brand-ui'

<Footer>
  <Footer.LinkGroups>
    <Footer.Group title='Product'>
      <Footer.Link href='#'>Platform Overview</Footer.Link>
      <Footer.Link href='#'>Marketplace</Footer.Link>
    </Footer.Group>
  </Footer.LinkGroups>
  <Footer.Extra>
    <Footer.SocialMedia />
    <Footer.ExtraLinks>
      <Footer.Link href='#'>Terms and Policies</Footer.Link>
    </Footer.ExtraLinks>
  </Footer.Extra>
<Footer>
```

# Detailed design

| prop     | type        | description             | default | required |
| -------- | ----------- | ----------------------- | -------- | ------ |
| children | ReactNode | elements that will be shown on the footer | - | ✔️ |

# Drawbacks

The links and groups may get a little big, but the developer can create an array with them in a separate file and import them into the main file.

# Adoption strategy 

- This is a new feature, no breaking changes to any packages in `onda`.

# Education 

- As with any DS component, it must be documented.
