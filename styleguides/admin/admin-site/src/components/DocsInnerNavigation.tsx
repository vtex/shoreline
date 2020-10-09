/** @jsx jsx */
import { jsx, useColor, Button, Theme, Box } from '@vtex/admin-ui'
import * as React from 'react'
import RehypeReact from 'rehype-react'
import { Button as ReakitButton, unstable_useId as useId } from 'reakit'
import { css } from 'emotion'
import constate from 'constate'
import { FaEdit, FaGithub } from 'react-icons/fa'

import useLocation from '../hooks/useLocation'
import track from '../utils/track'
import Spacer from './Spacer'

type Props = {
  readmeUrl: string
  sourceUrl: string
  title: string
  tableOfContentsAst: object
}

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

  return React.useMemo(() => value, [value])
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
  createElement: React.createElement,
  components: {
    p: function Render(props: React.PropsWithChildren<{}>) {
      return <span {...props} />
    },
    a: function Render(props: React.AnchorHTMLAttributes<any>) {
      const [href] = React.useState(
        () => props.href && props.href.replace(/^.*(#.+)$/, '$1')
      )

      const id = href?.substr(1)
      const { add, remove } = useCollectionContext()
      const currentId = useScrollSpyContext()

      React.useEffect(() => {
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
          >
            {props.children}
          </a>
        )
      }

      return <a {...props}>{props.children}</a>
    },
  },
})

export default function DocsInnerNavigation({
  sourceUrl,
  readmeUrl,
  title,
  tableOfContentsAst,
}: Props) {
  const { id } = useId()

  return (
    <CollectionProvider>
      <ScrollSpyProvider>
        <Box
          sx={{
            fontSize: '0.875em',
            bg: 'background',
            color: 'primary.base',
            borderColor: 'muted.3',
            '> *': {
              marginBottom: 4,
            },
            '> nav': {
              listStyle: 'none',
              margin: 0,
              padding: 0,
              '> li': {
                padding: '0.25em 0',
              },
              '> ul': {
                margin: '4px 0 0 1px',
                paddingLeft: 3,
                borderLeft: (theme: Theme) =>
                  `1px solid ${theme.colors.muted[3]}`,
              },
              '> a': {
                color: 'inherit',
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'underline',
                },
                "&[aria-current='page']": {
                  fontWeight: 'bold',
                },
              },
            },
          }}
          key={title}
        >
          <a
            href={sourceUrl}
            sx={{ textDecoration: 'none', ':hover': { bg: 'primary.base' } }}
          >
            <Button m="4" variant="subtle" icon={<FaGithub />}>
              View on Github
            </Button>
          </a>
          <a href={readmeUrl} sx={{ textDecoration: 'none' }}>
            <Button m="4" variant="subtle" icon={<FaEdit />}>
              Edit this page
            </Button>
          </a>
          <div hidden id={id}>
            {title} sections
          </div>
          <nav aria-labelledby={id}>{renderAst(tableOfContentsAst)}</nav>
        </Box>
      </ScrollSpyProvider>
    </CollectionProvider>
  )
}
