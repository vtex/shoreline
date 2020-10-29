import React from 'react'
import { FaGithub } from 'react-icons/fa'
import { VisuallyHidden } from 'reakit'
import { css } from '@emotion/core'
import { usePalette, useLighten } from 'reakit-system-palette/utils'
import { Text } from '@vtex/admin-ui'

import Anchor from './Anchor'

export default function Footer() {
  const foreground = usePalette('foreground')
  const color = useLighten(foreground, 0.35)

  return (
    <footer
      css={css`
        text-align: center;
        color: ${color};
        padding: 3rem 1rem;
        a {
          color: ${color};
          &:hover {
            color: ${foreground};
          }
        }

        p {
          font-size: 0.875em;
          margin: 4px 0;
        }
      `}
    >
      <div
        css={css`
          display: grid;
          grid-auto-flow: column;
          grid-auto-columns: min-content;
          justify-content: center;
          grid-gap: 16px;
          margin-bottom: 20px;
        `}
      >
        <Anchor href="https://github.com/vtex/onda" target="_blank">
          <FaGithub />
          <VisuallyHidden>GitHub</VisuallyHidden>
        </Anchor>
      </div>
      <Text>Copyright © 2020 VTEX</Text>
    </footer>
  )
}
