import React, { Fragment } from 'react'
import { useBox, BoxHTMLProps, BoxOptions } from 'reakit'
import { createHook, createComponent } from 'reakit-system'
import { cn } from '@vtex/admin-ui'

import Experimental from '../icons/Experimental'

export const useBlockquote = createHook<BlockquoteOptions, BlockquoteHTMLProps>(
  {
    name: 'Blockquote',
    compose: useBox,
    keys: ['experimental', 'palette'],

    useProps(options, htmlProps) {
      const isExperimental = options.experimental === 'true'
      const palette = options.palette ?? 'yellow'

      const experimentalStyles = isExperimental
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
        children: isExperimental ? (
          <Fragment>
            <Experimental />
            <div>{htmlProps.children}</div>
          </Fragment>
        ) : (
          htmlProps.children
        ),
        className: cn({
          color: 'dark.primary',
          backgroundColor: `${palette}.secondary'`,
          borderLeftColor: `${palette}`,
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
          ...experimentalStyles,
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
  experimental?: 'true' | 'false'
  palette?: 'blue' | 'green' | 'red' | 'yellow'
}

export type BlockquoteHTMLProps = BoxHTMLProps &
  React.DetailedHTMLProps<
    React.BlockquoteHTMLAttributes<HTMLElement>,
    HTMLElement
  >

export type BlockquoteProps = BlockquoteOptions & BlockquoteHTMLProps

export default Blockquote
