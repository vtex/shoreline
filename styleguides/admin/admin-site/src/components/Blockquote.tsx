/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react'
import { css, cx } from 'emotion'
import { useBox, BoxHTMLProps, BoxOptions } from 'reakit'
import { createHook, createComponent } from 'reakit-system'
import { useColor, darken, lighten } from '@vtex/admin-ui'

import TestTube from '../icons/TestTube'

export type BlockquoteOptions = BoxOptions & {
  experimental?: 'true' | 'false'
}

export type BlockquoteHTMLProps = BoxHTMLProps &
  React.BlockquoteHTMLAttributes<any>

export type BlockquoteProps = BlockquoteOptions & BlockquoteHTMLProps

export const useBlockquote = createHook<BlockquoteOptions, BlockquoteHTMLProps>(
  {
    name: 'Blockquote',
    compose: useBox,
    keys: ['experimental'],

    useProps(options, htmlProps) {
      const isExperimental = options.experimental === 'true'
      const warning = useColor('warning.base')
      const backgroundColor = lighten(0.275, warning)
      const borderColor = darken(0.2, backgroundColor)
      const color = useColor('text')

      const blockquote = css`
        color: ${color};
        background-color: ${backgroundColor};
        border-left-color: ${borderColor};
        border-left-width: 8px;
        border-left-style: solid;
        padding: 20px 16px 20px 25px;
        margin: 20px 0;
        line-height: 1.5;
        borderradius: 4px;
        p {
          margin: 0;
        }

        ${isExperimental &&
          css`
            display: flex;

            svg {
              flex: none;
              width: 50px;
              height: 50px;
              margin-right: 20px;
            }
          `}
      `

      return {
        ...htmlProps,
        children: isExperimental ? (
          <>
            <TestTube />
            <div>{htmlProps.children}</div>
          </>
        ) : (
          htmlProps.children
        ),
        className: cx(blockquote, htmlProps.className),
      }
    },
  }
)

const Blockquote = createComponent({
  as: 'blockquote',
  useHook: useBlockquote,
})

export default Blockquote
