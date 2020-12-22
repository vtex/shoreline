import { cn } from '@vtex/admin-ui'
import { createHook, createComponent } from 'reakit-system'

import { useAnchor, AnchorOptions, AnchorProps } from './Anchor'

export type SkipToContentOptions = AnchorOptions
export type SkipToContentHTMLProps = AnchorProps
export type SkipToContentProps = SkipToContentOptions & SkipToContentHTMLProps

export const useSkipToContent = createHook<
  SkipToContentOptions,
  SkipToContentHTMLProps
>({
  name: 'SkipToContent',
  compose: useAnchor,

  useProps(_, htmlProps) {
    return {
      tabIndex: 0,
      children: '',
      href: '#main',
      ...htmlProps,
      className: cn({
        left: '-999px',
        position: 'absolute',
        top: 'auto',
        width: 1,
        height: 1,
        overflow: 'hidden',
        zIndex: -999,
        ':focus, :active': {
          bg: 'light.primary',
          left: 'auto',
          top: 'auto',
          height: 'auto',
          width: 'max-content',
          overflow: 'auto',
          padding: '1em',
          margin: '1em',
          textAlign: 'center',
          zIndex: 999,
        },
      }),
    }
  },
})

const SkipToContent = createComponent({
  as: 'a',
  useHook: useSkipToContent,
})

export default SkipToContent
