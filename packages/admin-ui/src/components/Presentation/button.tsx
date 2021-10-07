import React from 'react'
import { tag } from '@vtex/admin-ui-react'

export function Playground() {
  return (
    <tag.button
      csx={{
        bg: 'action.secondary',
        color: 'action.primary',
        ':hover': {
          bg: 'action.primaryHover',
          color: 'action.primaryHover',
        },
        ':active': {
          bg: 'action.primaryPressed',
          color: 'action.primaryPressed',
        },
      }}
    >
      Button text
    </tag.button>
  )
}
