---
path: /foundations/colors/
---

# Colors

Colors are used to reflect a product's style with consistency across all components used on the Admin UI. Each color has some specific function when applied to an element on the screen. The following concepts are part of our efforts to make the user interface harmonious and consistent. We are committed to complying with the [Web Content Accessibility Guidelines AA standard contrast ratios](https://www.w3.org/TR/WCAG/).

Todas as nossas cores existem no formato de tokens no Admin UI, para saber mais sobre como utilizar cada token de cor utilize nossa documentação sobre Design Tokens.

## Tones

The usage of the colors in our system reflect the product’s tone of voice with consistency across all components used on the applications. We make available a spectrum of tones which are leveraged across the entire component suite.

### Main

<div style="width: 100px; backgroundColor: hsla(222, 63%, 43%, 1); height: 5px"></div>

The principal interactive element on the screen. It should drive the user’s attention to the tasks that should be done using the application.

### Critical

<div style="width: 100px; backgroundColor: hsla(0, 58%, 52%, 1); height: 5px"></div>

Inform to the user that that something went wrong or that they need extreme caution before taking some action.

### Warning

<div style="width: 100px; backgroundColor: hsla(30, 100%, 45%, 1); height: 5px"></div>

It informs to the user that something is not working as it expected or that they need some caution before taking some action.

### Positive

<div style="width: 100px; backgroundColor: hsla(123, 41%, 37%, 1); height: 5px"></div>

positive tone description

### Neutral

<div style="width: 100px; backgroundColor: hsla(0, 0%, 45%, 1); height: 5px"></div>

Information that do not need emphasis. Already actioned in the past.

### Info

<div style="width: 100px; backgroundColor: hsla(206, 63%, 44%, 1); height: 5px"></div>

info tone description

## Semantic

|          | Main                                   | Critical                                       | Warning                                       | Positive                                             | Neutral                                    | Info                                       |
| -------- | -------------------------------------- | ---------------------------------------------- | --------------------------------------------- | ---------------------------------------------------- | ------------------------------------------ | ------------------------------------------ |
| actions  | <tone bg="main" desc="primary"></tone> | <tone bg="critical" desc="destructive"></tone> |                                               |                                                      |                                            |                                            |
| messages |                                        | <tone bg="critical" desc="error"></tone>       | <tone bg="warning" desc="warning"></tone>     | <tone bg="positive" desc="success"></tone>           |                                            | <tone bg="info" desc="information"></tone> |
| status   |                                        | <tone bg="critical" desc="removed"></tone>     | <tone bg="warning" desc="pending"></tone>     | <tone bg="positive" desc="added or complete"></tone> | <tone bg="neutral" desc="default"></tone>  |                                            |
| priority |                                        | <tone bg="critical" desc="major"></tone>       | <tone bg="warning" desc="medium"></tone>      |                                                      | <tone bg="neutral" desc="trivial"></tone>  | <tone bg="info" desc="minor"></tone>       |
| payments |                                        | <tone bg="critical" desc="cancelled"></tone>   | <tone bg="warning" desc="in progress"></tone> | <tone bg="positive" desc="completed"></tone>         | <tone bg="neutral" desc="archived"></tone> |                                            |

<br></br>

## Palettes

### Blue

We use blue40 for primary actions (which will move the user forward in the flow) like buttons, text links, etc., and interactive elements like element selection, drag states, etc. Elements that are not actionable or interacting must not use this color.

![Blue Palette](../../src/images/blue-palette.png)

### Do

- Use blue40 for primary actions, links, active and selected states.

![Blue - Do](../../src/images/do-blue-actions-interactions.png)

### Dont's

- Do not use blue40 for highlighting information. Because using this color for actions may confuse when used on something like highlighting some information or text.

![Blue - Dont](../../src/images/dont-blue-actions-interactions.png)

- Do not use blue40 for the color of the backgrounds. It can interfere with the visual priorities on the page and draw attention to non-action elements. Generally, buttons should be the only elements with dark backgrounds. Nothing on the page should draw attention away from them.

### Green

- Green color is mainly used for backgrounds in success messages, states (completed, paid, added, etc.), and progress.
- Do not use green color for next buttons.

![Green Palette](../../src/images/green-palette.png)

### Orange:

- Orange color is mainly used for backgrounds in warning messages, actions and in states.
- Use orange50 for text on white backgrounds.

![Orange Palette](../../src/images/orange-palette.png)

### Red

- Red color is mainly used for backgrounds in error messages, remove, delete and in states (canceled, failed) actions.
- Use red for destructive buttons.

![Red Palette](../../src/images/red-palette.png)

### Light Blue

- Light Blue color is mainly used for backgrounds in information messages, and status.
- Use Light Blue color for highlighting information such as text or numbers.
- Use Light Blue color for line charts.

![Blue Light Palette](../../src/images/blue-light-palette.png)

### Grey

- Use black color for main text.
- Use grey50 for secondary texts, which have a lower of importance than main texts, such as captions, subtitles, descriptions, etc.
- Use grey50 for icons colors.
- Use white color for main pages background.
- Use grey10 color for highlighting background in specific scenarios like a sidebar component.
- Do not use grey10 as a border color for inputs and divisions.
- Use grey30 color for the main border (cards, lines, dividers, etc.)
- Use blue30 for focus navigaiton.

![Grey Palette](../../src/images/grey-palette.png)

### Purple

![Purple Palette](../../src/images/purple-palette.png)

### Cyan

![Cyan Palette](../../src/images/cyan-palette.png)

### Teal

![Teal Palette](../../src/images/teal-palette.png)

### Pink

- The pink color palette represents the colors corresponding to VTEX branding. These colors should only be used in specific cases such as the VTEX logo, illustrations, etc.

![Pink Palette](../../src/images/pink-palette.png)
