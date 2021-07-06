import React, { useState, createElement } from 'react'
import { tag } from '@vtex/admin-ui'
import RehypeReact from 'rehype-react'

const { Compiler: renderAst } = new RehypeReact({
  createElement,
  components: {
    p: function Render(props: React.PropsWithChildren<unknown>) {
      return <span {...props} />
    },
    a: function Render(props: React.AnchorHTMLAttributes<unknown>) {
      const [href] = useState(() => props.href?.replace(/^.*(#.+)$/, '$1'))

      if (href) {
        return (
          <tag.a
            {...props}
            href={href}
            csx={{
              color: 'dark.secondary',
              textDecoration: 'none',
              transition: 'all 150ms ease',
              position: 'relative',
              ':hover': {
                color: 'dark.primary',
              },
              "&[aria-current='page']": {
                color: 'dark.primary',
                fontSettings: 'bold',
              },
            }}
          >
            {props.children}
          </tag.a>
        )
      }

      return <a {...props}>{props.children}</a>
    },
  },
})

export { renderAst }
