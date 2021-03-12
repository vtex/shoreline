import React, { useState, createElement } from 'react'
import { useSystem } from '@vtex/admin-ui'
import RehypeReact from 'rehype-react'

const { Compiler: renderAst } = new RehypeReact({
  createElement,
  components: {
    p: function Render(props: React.PropsWithChildren<unknown>) {
      return <span {...props} />
    },
    a: function Render(props: React.AnchorHTMLAttributes<unknown>) {
      const [href] = useState(() => props.href?.replace(/^.*(#.+)$/, '$1'))
      const { cn } = useSystem()

      if (href) {
        return (
          <a
            {...props}
            href={href}
            // aria-current={currentId === id ? 'page' : undefined}
            className={cn({
              themeKey: 'components.tocLink',
            })}
          >
            {props.children}
          </a>
        )
      }

      return <a {...props}>{props.children}</a>
    },
  },
})

export { renderAst }
