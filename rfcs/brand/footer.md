# RFC Brand Footer

- 📅 Start Date: 2020-08-31
- 🏆 Champion: @lucasmedeiros

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

The footer has some composites: `LinkGroups` are the section of the footer which contains all the groups of links in the main section, composed by `Group` and `Link` components. The `Extra` component contains the extra information and links that will be displayed. The `SocialMedia` are the links for VTEX's social media and the `ExtraLinks` are the links located at the bottom of the footer.

## LinkGroups

| prop     | type      | description                 | required |
| -------- | --------- | --------------------------- | -------- |
| children | ReactNode | content shown on the groups | 🚫       |

## Group

| prop     | type      | description                     | required |
| -------- | --------- | ------------------------------- | -------- |
| title    | String    | link group title                | ✔️       |
| children | ReactNode | content shown on the link group | 🚫       |

## Link

| prop     | type      | description                          | required |
| -------- | --------- | ------------------------------------ | -------- |
| href     | String    | the URL of the page the link goes to | ✔️       |
| children | ReactNode | elements inside the link             | 🚫       |

## Extra

| prop     | type      | description                                     | required |
| -------- | --------- | ----------------------------------------------- | -------- |
| children | ReactNode | elements inside the extra section of the footer | 🚫       |

## ExtraLinks

| prop     | type      | description                        | required |
| -------- | --------- | ---------------------------------- | -------- |
| children | ReactNode | content (links) in the extra links | 🚫       |

# Drawbacks

The links and groups may get a little big, but the developer can create an array with them in a separate file and import them into the main file.

# Adoption strategy

- This is a new feature, no breaking changes to any packages in `onda`.

# Education

- As with any DS component, it must be documented.
