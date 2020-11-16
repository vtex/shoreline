---
path: /theming/colors/
---

# Colors

Color themes are used to reflect a product's style with consistency across all components used on the application. Each color has some specific function when applied to an element on screen. They can be customized to match the app's style guidelines, reflecting their function.

Our styleguide provides an accessible default palette to get you up and running.

## Accessing colors

#### Example

```jsx
import { cn } from '@vtex/admin-ui'

function Example() {
  return (
    <div
      className={cn({
        size: 96,
        bg: 'primary.base',
      })}
    />
  )
}
```

## Complete color set

### Backgrounds

The colors that will receive most of the app's content. Base colors can only be applied as backgrounds of pages and elements.

<backgroundcolors></backgroundcolors>

### Text

<textcolors></textcolors>

### Complementary

<complementarycolors></complementarycolors>

### Primary

The action-primary color is the color used on the interactive elements of an app. It should drive the user's attention to the tasks that should be done using the app. 

<semanticcolor color="primary"></semanticcolor>

### Secondary

The action-secondary color is used on the less important interactions of an app. It should be visually less prominent in comparison with the action-primary color. 

<semanticcolor color="secondary"></semanticcolor>

### Danger

Danger color is used to give users error feedbacks and inform that they need extreme caution before taking some action.

<semanticcolor color="danger"></semanticcolor>

#### Washed

<semanticcolor color="danger.washed"></semanticcolor>

### Warning

Warning color is used to inform users that something is not performing as it should or that they need caution before taking some action.

<semanticcolor color="warning"></semanticcolor>

#### Washed

<semanticcolor color="warning.washed"></semanticcolor>

### Success

Success color is used to give the user a positive perception of an information that's being displayed. 

<semanticcolor color="success"></semanticcolor>

#### Washed

<semanticcolor color="success.washed"></semanticcolor>

### Elementary 

<elementarycolors></elementarycolors>


