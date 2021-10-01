---
path: /foundations/colors/
---

# Colors

Colors are used to reflect a product's style with consistency across all components used on the Admin UI. Each color has some specific function when applied to an element on the screen. The following concepts are part of our efforts to make the user interface harmonious and consistent. We are committed to complying with the [Web Content Accessibility Guidelines AA standard contrast ratios](https://www.w3.org/TR/WCAG/).

Todas as nossas cores existem no formato de tokens no Admin UI, para saber mais sobre como utilizar cada token de cor utilize nossa documentação sobre Design Tokens.

## Primary Color

We use blue.40 for primary actions (which will move the user forward in the flow) like buttons, text links, etc., and interactive elements like element selection, drag states, etc. Elements that are not actionable or interacting must not use this color.

![Blue Palette](../../src/images/blue-palette.png)

### Do

- Use blue.40 for primary actions, links, active and selected states.

![Blue - Do](../../src/images/do-blue-actions-interactions.png)

### Dont's

- Do not use blue.40 for highlighting information. Because using this color for actions may confuse when used on something like highlighting some information or text.

![Blue - Dont](../../src/images/dont-blue-actions-interactions.png)

- Do not use blue.40 for the color of the backgrounds. It can interfere with the visual priorities on the page and draw attention to non-action elements. Generally, buttons should be the only elements with dark backgrounds. Nothing on the page should draw attention away from them.

## Semantic Colors

Semantic colors help users identify status, feedback, and informational elements in the interface. Consistent use of color keeps the cognitive load low and contributes to a unified and engaging user experience.

### Green

- Green color is mainly used for backgrounds in success messages, states (completed, paid, added, etc.), and progress.
- Do not use green color for next buttons.

![Green Palette](../../src/images/green-palette.png)

### Orange:

- Orange color is mainly used for backgrounds in warning messages, actions and in states.
- Use orange.50 for text on white backgrounds.

![Orange Palette](../../src/images/orange-palette.png)

### Red

- Red color is mainly used for backgrounds in error messages, remove, delete and in states (canceled, failed) actions.
- Use red for destructive buttons.

![Red Palette](../../src/images/red-palette.png)

### Blue Light

- Blue Light color is mainly used for backgrounds in information messages, and status.
- Use Blue Light color for highlighting information such as text or numbers.
- Use Blue Light color for line charts.

![Blue Light Palette](../../src/images/blue-light-palette.png)

## Foreground

- Use black color for main text.
- Use grey.50 for secondary texts, which have a lower of importance than main texts, such as captions, subtitles, descriptions, etc.
- Use grey.50 for icons colors.

![Grey Palette](../../src/images/grey-palette.png)

## Background

We have two main color options for background on the Admin UI:

### White:

- Use white color for main pages background.

### Grey:

- Use grey.10 color for highlighting background in specific scenarios like a sidebar component.
- Do not use grey.10 as a border color for inputs and divisions.

## Border

- Use grey.30 color for the main border (cards, lines, dividers, etc.)
- Use blue.30 for focus navigaiton.

## Extended palette

Use extended palette colors for tag component (except pink palette).

### Purple

![Purple Palette](../../src/images/purple-palette.png)

### Cyan

![Cyan Palette](../../src/images/cyan-palette.png)

### Teal

![Teal Palette](../../src/images/teal-palette.png)

### Pink

- The pink color palette represents the colors corresponding to VTEX branding. These colors should only be used in specific cases such as the VTEX logo, illustrations, etc.

![Pink Palette](../../src/images/pink-palette.png)
