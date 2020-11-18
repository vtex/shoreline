import React, { Fragment } from 'react'
import { useBox, BoxHTMLProps, BoxOptions } from 'reakit'
import { createHook, createComponent } from 'reakit-system'
import { cn } from '@vtex/admin-ui'

import Next from '../icons/Next'

export const useBlockquote = createHook<BlockquoteOptions, BlockquoteHTMLProps>(
  {
    name: 'Blockquote',
    compose: useBox,
    keys: ['next', 'palette'],

    useProps(options, htmlProps) {
      const isNext = options.next === 'true'
      const palette = options.palette ?? 'warning'

      const nextStyles = isNext
        ? {
            display: 'flex',
            svg: {
              flex: 'none',
              width: 50,
              height: 50,
              marginRight: 5,
            },
          }
        : {}

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
        className: cn({
          color: 'text.primary',
          backgroundColor: `${
            palette === 'primary' ? 'secondary.base' : `${palette}.washed.base`
          }`,
          borderLeftColor: `${palette}.base`,
          borderLeftWidth: 8,
          borderLeftStyle: 'solid',
          paddingY: 5,
          paddingX: 6,
          marginY: 5,
          lineHeight: '1.5',
          borderRadius: 'default',
          p: {
            margin: 0,
          },
          ...nextStyles,
        }),
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
