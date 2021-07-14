import React, { createElement } from 'react'
import { tag } from '@vtex/admin-ui'
import RehypeReact from 'rehype-react'
import useLocation from '../../hooks/useLocation'
import constate from 'constate'

function useCollection() {
  const [items, setItems] = React.useState<string[]>([])
  const add = React.useCallback((item: string) => {
    setItems((prevItems) => [...prevItems, item])
  }, [])
  const remove = React.useCallback((item: string) => {
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
  return React.useMemo(() => value, Object.values(value))
})

function useScrollSpy() {
  const { items } = useCollectionContext()
  const [currentId, setCurrentId] = React.useState<string | null>(null)
  const location = useLocation()

  React.useEffect(() => setCurrentId(null), [location.pathname])

  React.useEffect(() => {
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
    p: function Render(props: React.PropsWithChildren<unknown>) {
      return <span {...props} />
    },
    a: function Render(props: React.AnchorHTMLAttributes<unknown>) {
      const [href] = React.useState(
        () => props.href && props.href.replace(/^.*(#.+)$/, '$1')
      )
      const id = href && href.substr(1)
      const { add, remove } = useCollectionContext()
      const currentId = useScrollSpyContext()

      React.useEffect(() => {
        if (!id) return undefined
        add(id)
        return () => remove(id)
      }, [id, add, remove])

      if (href) {
        return (
          <tag.a
            {...props}
            href={href}
            aria-current={currentId === id ? 'page' : undefined}
            csx={{
              color: 'dark.secondary',
              textDecoration: 'none',
              transition: 'all 150ms ease',
              position: 'relative',
              fontFamily: 'sans',
              fontSize: 14,
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

export { renderAst, ScrollSpyProvider, CollectionProvider }
