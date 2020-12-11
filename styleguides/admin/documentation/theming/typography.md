---
path: /theming/typography/
---

# Typography

## Text variant

The [StyleObject](/theming/style-object/) accepts the `text` prop. It is a shortcut for the text variants of the `admin-ui`.
This is preferred over the scales.

```jsx
<h1 className={cn({ text: 'headline' })}>Headline text</h1>
```

| TOKEN       | DESCRIPTION                                                 |
| ----------- | ----------------------------------------------------------- |
| `code`      | `pre` & `code` tags. Use wheather you need monospaced fonts |
| `small`     | for small elements, such as tags, etc.                      |
| `body`      | default text for the most elements, such as `p`             |
| `highlight` | for accent texts                                            |
| `action`    | used on primary actions                                     |
| `subtitle`  | for subtitles                                               |
| `headline`  | for titles & page headers                                   |

## Scales

### fontSizes

`fontSize`

| TOKEN | REM        | PX     |
| ----- | ---------- | ------ |
| `0`   | `0.75rem`  | `12px` |
| `1`   | `0.875rem` | `14px` |
| `2`   | `1rem`     | `16px` |
| `3`   | `1.125rem` | `18px` |
| `4`   | `1.25rem`  | `20px` |

### fontSettings

`fontSettings` (shortcut), `fontVariationSettings`

| TOKEN    | VALUE        |
| -------- | ------------ |
| hairline | `'wght' 30`  |
| thin     | `'wght' 50`  |
| light    | `'wght' 65`  |
| regular  | `'wght' 92`  |
| medium   | `'wght' 120` |
| bold     | `'wght' 170` |
| black    | `'wght' 200` |

### fonts

`fontFamily`

| TOKEN | VALUE                                                                                                                        |
| ----- | ---------------------------------------------------------------------------------------------------------------------------- |
| sans  | `VTEXTrustVF, -apple-system, system-ui, BlinkMacSystemFont, sans-serif`                                                      |
| mono  | `"Dank Mono", "Operator Mono", "Fira Code Retina", "Fira Code", "FiraCode-Retina", "Consolas", "Monaco", "Menlo", monospace` |

### lineHeights

`lineHeight`

| TOKEN     | VALUE   |
| --------- | ------- |
| code      | `1`     |
| small     | `1.125` |
| body      | `1.25`  |
| highlight | `1.25`  |
| action    | `1.5`   |
| subtitle  | `1.5`   |
| headline  | `1.5`   |
