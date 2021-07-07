# Onda component model

## jsx

You can use the `jsx` function to create new components using elements or components as reference. It generates an `OndaJSXComponent` that inherits and enhances the reference types and styles.

### Referencing elements

To reference elements, simply pass its string representation to the function.

```jsx
const BlueSquare = jsx('div')({
  bg: 'blue',
  size: 50,
})

render(<BlueSquare />)
```

#### Aliasing

`jsx` is aliased with any valid `JSX.Element` for faster typing.

```jsx
const BlueSquare = jsx.div({
  bg: 'blue',
  size: 50,
})

render(<BlueSquare />)
```

### Referencing components

The idea is the same as elements. It will inherit the types and behavior of the passed component.

```jsx
import { motion } from 'framer-motion'

const Scale = jsx(motion.div)({
  bg: 'blue',
  size: 50,
})

render(<Scale animate={{ scale: 2 }} transition={{ duration: 0.5 }} />)
```
