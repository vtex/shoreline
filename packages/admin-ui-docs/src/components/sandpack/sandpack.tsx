import React from 'react'
import { Sandpack as SandpackReact } from '@codesandbox/sandpack-react'

import { createFileMap } from './create-file-map'
import { getRootCode } from './root-code'

export default function Sandpack({
  children,
  dependencies = {},
  adminUiVersion = 'latest',
}: Props) {
  const files = createFileMap(children)

  return (
    <SandpackReact
      template="react"
      files={{
        ...files,
        '/index.js': {
          code: getRootCode(adminUiVersion),
          hidden: true,
        },
      }}
      options={{
        showNavigator: false,
      }}
      customSetup={{
        dependencies: {
          '@vtex/admin-ui': adminUiVersion,
          ...dependencies,
        },
        entry: '/index.js',
      }}
    />
  )
}

interface Props {
  children: JSX.Element
  dependencies: { [key: string]: string }
  adminUiVersion?: string
}

/**
Usage: single file

<Sandpack dependencies={{
  'randomcolor': 'latest'
}}>

```jsx App.js
import { Button } from '@vtex/admin-ui'
import randomColor from 'randomcolor'

export default () => {
  return (
    <div>
      <Button
        className={csx({
          bg: randomColor(),
        })}
      >
        This is a button
      </Button>
    </div>
  )
}
```

</Sandpack>

Usage: multi file

<Sandpack>

```js styles.js readonly
import { style } from '@vtex/admin-ui'

export const container = style({
  colorTheme: 'pink',
})
```

```jsx App.js
import { Button, csx } from '@vtex/admin-ui'
import { container } from '/styles.js'

export default () => {
  return (
    <div className={csx(container)}>
      This is a theme
      <Button>This is a button</Button>
    </div>
  )
}
```

</Sandpack>

 */
