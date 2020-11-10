import React from 'react'
import { FaGithub } from 'react-icons/fa'
import { Text, cn, VisuallyHidden } from '@vtex/admin-ui'

import Anchor from './Anchor'

export default function Footer() {
  return (
    <footer
      className={cn({
        textAlign: 'center',
        color: 'text',
        padding: '3rem 1rem',
        a: {
          color: 'text',
          ':hover': {
            color: 'muted.0',
          },
        },
        p: {
          fontSize: 0,
          margin: '4px 0px',
        },
      })}
    >
      <nav
        className={cn({
          display: 'grid',
          gridAutoFlow: 'column',
          gridAutoColumns: 'min-content',
          justifyContent: 'center',
          gridGap: '16px',
          marginBottom: '20px',
        })}
      >
        <Anchor href="https://github.com/vtex/onda" target="_blank">
          <FaGithub />
          <VisuallyHidden>GitHub</VisuallyHidden>
        </Anchor>
      </nav>
      <Text>Copyright © 2020 VTEX</Text>
    </footer>
  )
}
