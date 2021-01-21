---
path: /theming/colors/
---

# Colors

Color themes are used to reflect a product's style with consistency across all components used on the application. Each color has some specific function when applied to an element on screen. They can be customized to match the app's style guidelines, reflecting their function.

Our styleguide provides an accessible default palette to get you up and running.

## Accessing colors

#### Example

```jsx
function Example() {
  const { cn } = useSystem()

  return (
    <div
      className={cn({
        size: 96,
        bg: 'blue',
      })}
    />
  )
}
```

## Neutral

The colors that will receive most of the app's content. Neutral colors can be applied as backgrounds of pages and elements and text colors.

### Light

<lightcolors></lightcolors>

### Mid

<midcolors></midcolors>

### Dark

<darkcolors></darkcolors>

## Semantic

### Blue

The blue color is the color used on the interactive elements of an app. It should drive the user's attention to the tasks that should be done using the app.

<semanticcolor color="blue"></semanticcolor>

### Red

Red color is used to give users error feedbacks and inform that they need extreme caution before taking some action.

<semanticcolor color="red"></semanticcolor>

### Yellow

Yellow color is used to inform users that something is not performing as it should or that they need caution before taking some action.

<semanticcolor color="yellow"></semanticcolor>

### Green

Green color is used to give the user a positive perception of an information that's being displayed.

<semanticcolor color="green"></semanticcolor>

### Complementary

<complementarycolors></complementarycolors>
