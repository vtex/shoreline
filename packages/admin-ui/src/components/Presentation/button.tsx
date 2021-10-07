import React from 'react'
import { tag } from '@vtex/admin-ui-react'

export function Playground() {
  return (
    <tag.button
      csx={{
        margin: 1,
        paddingY: 2,
        paddingX: 4,
        cursor: 'pointer',
        bg: 'action.primary',
        color: 'action.primary',
        ':hover': {
          bg: 'action.primaryHover',
        },
        ':active': {
          bg: 'action.primaryPressed',
        },
      }}
    >
      Button text
    </tag.button>
  )
}
