---
title: Introduction
path: /typography/introduction/
---

# Introduction

| Typography component                | About                                                                     |
| ----------------------------------- | ------------------------------------------------------------------------- |
| [Anchor](/typography/anchor/)       | `<a />` HTML tag                                                          |
| [Heading](/typography/heading/)     | `h1` to `h6` HTML headings                                                |
| [List](/typography/list/)           | `ul`, `ol` & `li` HTML tags                                               |
| [Paragraph](/typography/paragraph/) | `<p />` HTML tag                                                          |
| [Text](/typography/text/)           | `<span>` or a specific text element, like `<i>`, `<kbd>`, `<strong>`, etc |

## Style

Check the [Typography Theming Documentation](/theming/typography/)

## Customization

Any typography component accept the `csx` property of type [StyleObject](/theming/style-object/). Make sure that you are not breaking the design system consistency while doing that (check [Inline Styles Docs](/theming/inline-styles/) for more details).

Example

```jsx
<Heading csx={{ color: 'blue' }}>Blue primary heading</Heading>
```

## Caveats

### Variable Fonts

A variable font is a specification that can significantly reduce font file sizes and make it possible to animate font characters. We've implemented `VTEX Trust font` using this feature.
[Read more about Variable Fonts](https://web.dev/variable-fonts/)

Most of the browsers have support to variable fonts, but for the remaining browsers who do not, we have a fallback using `sans-serif` font.

[Read more about the Browsers Support](https://caniuse.com/variable-fonts)
