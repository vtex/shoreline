# Shoreline Next

NextJS-Aware Shoreline components.

## Instalation

Next and Shoreline are peer-dependencies:

```bash
pnpm add next @vtex/shoreline
```

Install Shoreline-next:

```bash
pnpm add @vtex/shoreline-next
```

## Usage

### NextTab

Uses [Next's parallel routes](https://nextjs.org/docs/app/building-your-application/routing/parallel-routes) to create accessible Tabs and tab panels that are rendered on the server and controlled by the URL.

First, create a [layout](https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#layouts) using the `NextTab` components:

```jsx
// layout.tsx
import {
  NextTabProvider,
  NextTabList,
  NextTab,
  NextTabPanel,
} from '@vtex/shoreline-page'

export default function Layout(props: Props) {
  return (
    <NextTabProvider>
      <NextTabList>
        <NextTab href="/">Tab 1</NextTab>
        <NextTab href="/tab-2">Tab 2</NextTab>
      </NextTabList>
      <NextTabPanel>{props.tabs}</NextTabPanel>
    </NextTabProvider>
  )
}

interface Props {
  tabs: React.ReactNode;
}
```

Under the `@[parallel-route-name]` folder, create your tabs:

```jsx
// @tabs/page.tsx
export default function Page() {
  return <>Tab content 1</>
}
```

```jsx
// @tabs/tab-2/page.tsx
export default function Page() {
  return <>Tab content 2</>
}
```
