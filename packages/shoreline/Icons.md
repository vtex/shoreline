## Problems

- Adicionar um ícone é bem difícil

```jsx
import { IconBell, IconClose, IconShip, IconStore } from "@vtex/shoreline";

<IconClose />;
<IconBell />;
<IconShip />;
<IconStore />;
```

```jsx
import { Icon } from '@vtex/shoreline'

<Icon name="close" />
<Icon name="bell" />
<Icon name="ship" />
<Icon name="store" />
```

## Solution

You can set a new icon with the shape:

```ts
interface IconDef {
  id: string;
  keywords?: string[];
  size?: "small" | "normal";
  weight?: "outline" | "fill";
}
```

```ts
const bell = {
  id: "bell",
  keywords: ["notification", "alert"],
  size: "small",
  weight: "outline",
};
```

```html
<defs>
  <symbol id="bell-small" viewBox="0 0 16 16">
    ...
  <symbol>
  ...
</defs>
```
