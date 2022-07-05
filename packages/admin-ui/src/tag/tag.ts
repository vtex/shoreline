import type { ComponentPropsWithRef } from 'react'
import { createComponent, createHook, useElement } from '@vtex/admin-ui-react'
import { baseline, variants } from './tag.style'
import type { VariantProps } from '@vtex/admin-ui-core'

export const useTag = createHook<'div', TagOptions>((props) => {
  const { variant = 'gray', size = 'normal', label, ...htmlProps } = props

  return {
    ...htmlProps,
    baseStyle: {
      ...baseline,
      ...variants({
        variant,
        size,
      }),
    },
    children: label,
  }
})

/**
 * Tags represent a status, or a common denominator. They make sections and entities quickly identifiable and searchable.
 *
 * @example
 * <Tag
 *   label="Here goes your label!"
 *   variant="red"
 * />
 */
export const Tag = createComponent<'div', TagOptions>((props) => {
  const tagProps = useTag(props)

  return useElement('div', tagProps)
})

export type TagOptions = VariantProps<typeof variants> & {
  /**
   * Tag Label
   */
  label: string
}

export type TagProps = ComponentPropsWithRef<typeof Tag> & TagOptions
