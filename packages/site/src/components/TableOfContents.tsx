import React, { useEffect, useState } from 'react'
import { tag } from '@vtex/admin-ui'

function getIds(items: any[]) {
  return items.reduce((acc, item) => {
    if (item.url) {
      // url has a # as first character, remove it to get the raw CSS-id
      acc.push(item.url.slice(1))
    }

    if (item.items) {
      acc.push(...getIds(item.items))
    }

    return acc
  }, [])
}

function useActiveId(itemIds: string[]) {
  const [activeId, setActiveId] = useState(`test`)

  useEffect(() => {
    if (!document) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: `0% 0% -80% 0%` }
    )

    itemIds.forEach((id) => {
      if (document?.getElementById(id)) {
        observer.observe(document?.getElementById(id) as Element)
      }
    })

    return () => {
      itemIds.forEach((id) => {
        if (document?.getElementById(id)) {
          observer.unobserve(document?.getElementById(id) as Element)
        }
      })
    }
  }, [itemIds])

  return activeId
}

function renderItems(items: any[], activeId: string) {
  const isActive = (item: any) => activeId === item.url.slice(1)

  return (
    <tag.ul
      csx={{
        listStyle: 'none',
        borderLeftColor: 'nestedContent',
        borderLeftWidth: 1,
        borderLeftStyle: 'solid',
        ':first-child': {
          borderLeft: 'none',
        },
      }}
    >
      {items.map((item) => {
        return (
          <tag.li
            csx={{
              display: 'flex',
              flexDirection: 'column',
              paddingLeft: 2,
              lineHeight: 1.5,
            }}
            key={item.url}
          >
            <tag.a
              href={item.url}
              csx={{
                color: isActive(item) ? '$primary' : '$secondary',
                fontSettings: isActive(item) ? 'medium' : 'regular',
                transform: isActive(item) ? 'scale(1.1)' : 'scale(1.0)',
                transformOrigin: 'left bottom',
                transition: 'snap',
                fontSize: 14,
                textDecoration: 'none',
                position: 'relative',
                fontFamily: 'sans',
                ':hover': {
                  color: '$action.main.tertiaryHover',
                },
              }}
            >
              {item.title}
            </tag.a>
            {item.items && renderItems(item.items, activeId)}
          </tag.li>
        )
      })}
    </tag.ul>
  )
}

export function TableOfContents(props: Props) {
  const { items } = props
  const idList = getIds(items)
  const activeId = useActiveId(idList)

  return (
    <tag.aside
      csx={{
        display: ['none', 'none', 'none', 'initial'],
        nav: {
          listStyle: 'none',
          margin: 0,
          border: 'none',
        },
      }}
    >
      {renderItems(items, activeId)}
    </tag.aside>
  )
}

interface Props {
  items: any[]
}
