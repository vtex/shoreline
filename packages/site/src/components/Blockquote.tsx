import type React from 'react'
import type { BoxHTMLProps, BoxOptions } from 'reakit'
import { useBox } from 'reakit'
import { createHook, createComponent } from 'reakit-system'
import { useSystem } from '@vtex/admin-ui'

export const useBlockquote = createHook<BlockquoteOptions, BlockquoteHTMLProps>(
  {
    name: 'Blockquote',
    compose: useBox,
    keys: ['palette'],

    useProps(options, htmlProps) {
      const palette = options.palette ?? 'yellow'
      const { cn } = useSystem()

      return {
        ...htmlProps,
        children: htmlProps.children,
        className: cn({
          color: 'dark.primary',
          backgroundColor: `${palette}.secondary`,
          paddingY: 1,
          paddingX: 2,
          marginY: 3,
          borderRadius: 'default',
          p: {
            margin: 0,
          },
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
