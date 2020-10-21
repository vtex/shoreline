import React, { Fragment } from 'react'
import { css, cx } from 'emotion'
import { useBox, BoxHTMLProps, BoxOptions } from 'reakit'
import { createHook, createComponent } from 'reakit-system'
import { useColor, darken, lighten, ThemeColors } from '@vtex/admin-ui'

import Next from '../icons/Next'

export const useBlockquote = createHook<BlockquoteOptions, BlockquoteHTMLProps>(
  {
    name: 'Blockquote',
    compose: useBox,
    keys: ['next', 'palette'],

    useProps(options, htmlProps) {
      const isNext = options.next === 'true'
      const palette = useColor(
        `${options.palette ?? 'warning'}.base` as ThemeColors
      )

      const backgroundColor = lighten(0.32, `${palette}`)
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
        border-radius: 4px;
        p {
          margin: 0;
        }

        ${isNext &&
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
        children: isNext ? (
          <Fragment>
            <Next />
            <div>{htmlProps.children}</div>
          </Fragment>
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

export type BlockquoteOptions = BoxOptions & {
  next?: 'true' | 'false'
  palette?: 'primary' | 'success' | 'danger' | 'warning'
}

export type BlockquoteHTMLProps = BoxHTMLProps &
  React.DetailedHTMLProps<
    React.BlockquoteHTMLAttributes<HTMLElement>,
    HTMLElement
  >

export type BlockquoteProps = BlockquoteOptions & BlockquoteHTMLProps

export default Blockquote
