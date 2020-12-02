import { cn } from '@vtex/admin-ui'
import { useBox, BoxHTMLProps, BoxOptions } from 'reakit'
import { createHook, createComponent } from 'reakit-system'

export type HiddenMediaQueryOptions = BoxOptions & {
  query: string
}

export type HiddenMediaQueryHTMLProps = BoxHTMLProps

export type HiddenMediaQueryProps = HiddenMediaQueryOptions &
  HiddenMediaQueryHTMLProps

export const useHiddenMediaQuery = createHook<
  HiddenMediaQueryOptions,
  HiddenMediaQueryHTMLProps
>({
  name: 'HiddenMediaQuery',
  compose: useBox,
  keys: ['query'],

  useProps(options, htmlProps) {
    const className = cn({
     [`@media (${options.query})`]: {
        display: 'none !important',
      }
    })

    return {
      ...htmlProps,
      className: `${className} ${htmlProps.className}`,
    }
  },
})

const HiddenMediaQuery = createComponent({
  as: 'div',
  useHook: useHiddenMediaQuery,
})

export default HiddenMediaQuery
