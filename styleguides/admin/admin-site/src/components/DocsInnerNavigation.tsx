import React, {
  useState,
  useCallback,
  createElement,
  useMemo,
  useEffect,
} from 'react'
import { cn, VisuallyHidden } from '@vtex/admin-ui'
import RehypeReact from 'rehype-react'
import { unstable_useId as useId } from 'reakit'
import constate from 'constate'

import useLocation from '../hooks/useLocation'

type Props = {
  readmeUrl: string
  sourceUrl: string
  title: string
  tableOfContentsAst: object
}

function useCollection() {
  const [items, setItems] = useState<string[]>([])
  const add = useCallback((item: string) => {
    setItems((prevItems) => [...prevItems, item])
  }, [])

  const remove = useCallback((item: string) => {
    setItems((prevItems) => {
      const idx = prevItems.indexOf(item)

      return [...prevItems.slice(0, idx), ...prevItems.slice(idx + 1)]
    })
  }, [])

  return {
    items,
    add,
    remove,
  }
}

const [CollectionProvider, useCollectionContext] = constate(() => {
  const value = useCollection()

  return useMemo(() => value, [value])
})

function useScrollSpy() {
  const { items } = useCollectionContext()
  const [currentId, setCurrentId] = useState<string | null>(null)
  const location = useLocation()

  useEffect(() => setCurrentId(null), [location.pathname])

  useEffect(() => {
    if (!items.length) return undefined

    const elements = document.querySelectorAll<HTMLElement>(
      items.map((item) => `[id="${item}"]`).join(',')
    )

    const elementsArray = Array.from(elements)

    const handleScroll = () => {
      elementsArray.forEach((element) => {
        if (element.offsetTop <= window.scrollY + 100) {
          setCurrentId(element.id)
        }
      })
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [items])

  return currentId
}

const [ScrollSpyProvider, useScrollSpyContext] = constate(useScrollSpy)

const { Compiler: renderAst } = new RehypeReact({
  createElement,
  components: {
    p: function Render(props: React.PropsWithChildren<{}>) {
      return <span {...props} />
    },
    a: function Render(props: React.AnchorHTMLAttributes<unknown>) {
      const [href] = useState(
        () => props.href && props.href.replace(/^.*(#.+)$/, '$1')
      )

      const id = href?.substr(1)
      const { add, remove } = useCollectionContext()
      const currentId = useScrollSpyContext()

      useEffect(() => {
        if (!id) return undefined
        add(id)

        return () => remove(id)
      }, [id, add, remove])

      if (href) {
        return (
          <a
            {...props}
            href={href}
            aria-current={currentId === id ? 'page' : undefined}
            className={cn({
              color: 'text',
              fontSize: 2,
              textDecoration: 'none',
              transition: 'all 150ms ease',
              position: 'relative',
              paddingY: 2,
              ':hover': {
                color: 'emphasis',
              },
              "&[aria-current='page']": {
                color: 'emphasis',
                '::before': {
                  content: "' '",
                  height: '80%',
                  width: 2,
                  position: 'absolute',
                  bg: 'emphasis',
                  left: -4,
                },
              },
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

export default function DocsInnerNavigation(props: Props) {
  const { title, tableOfContentsAst } = props

  const { id } = useId()

  return (
    <CollectionProvider>
      <ScrollSpyProvider>
        <aside
          className={cn({
            fontSize: '0.875em',
            bg: 'background',
            color: 'primary.base',
            borderColor: 'muted.3',
            nav: {
              listStyle: 'none',
              margin: 0,
              padding: 0,
              li: {
                display: 'flex',
                flexDirection: 'column',
              },
              ul: {
                listStyle: 'none',
                paddingLeft: 4,
                borderLeftColor: 'muted.3',
                borderLeftStyle: 'solid',
                borderLeftWidth: 1,
              },
            },
          })}
          key={title}
        >
          <VisuallyHidden id={id}>{title} Sections</VisuallyHidden>
          <nav aria-labelledby={id}>{renderAst(tableOfContentsAst)}</nav>
        </aside>
      </ScrollSpyProvider>
    </CollectionProvider>
  )
}
