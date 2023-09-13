import {
  theme,
  csx,
  cx,
  dataAttr,
  focusVisible,
  style,
} from '@vtex/admin-ui-core'
import { get } from '@vtex/admin-ui-util'

export const imageTheme = csx({
  size: '2.75rem',
  minSize: '2.75rem',
  verticalAlign: 'middle',
  borderRadius: '$base',
  outlineColor: get(theme, 'bg.primary', 'bg.primary'),
  outlineWidth: '0.125rem',
  outlineStyle: 'solid',

  [dataAttr('image-preview', 'true')]: focusVisible('main'),
})

export const imageSkeletonTheme = cx(imageTheme, csx({ animation: '' }))

export const imagePreviewTheme = csx({
  [dataAttr('size', 'small')]: { size: 56, minSize: 56 },
  [dataAttr('size', 'regular')]: { size: 156, minSize: 156 },
  [dataAttr('size', 'large')]: { size: 256, minSize: 256 },
})

export const imagePreviewTooltipStyle = (delay: number) =>
  style({
    '--image-preview-transform-transition': `transform 100ms ease-in ${delay}ms`,
    '--image-preview-opacity-transition': `opacity 100ms ease-in ${delay}ms`,
  })

export const imagePreviewTooltipTheme = csx({
  display: 'flex',
  outline: 'none',
  paddingY: '$space-2',
  paddingX: '$space-2',
  transition: 'var(--image-preview-opacity-transition)',
  willChange: 'opacity',
  opacity: 0,
  boxShadow: '$overlay.center',
  borderRadius: '$base',
  background: '$primary',
  zIndex: '$z-9',
  img: {
    borderRadius: '$base',
    willChange: 'transform',
    transformOrigin: 'right center',
    transition: 'var(--image-preview-transform-transition)',
    transform: 'scale(0.6)',
  },
  '&[data-enter]': {
    opacity: 1,
    img: {
      transform: 'scale(1)',
    },
  },
})

export const textContainerTheme = csx({
  minHeight: '4rem',
  [dataAttr('name-column', 'true')]: { rowGap: '0.125rem' },
  [dataAttr('name-column', 'false')]: { rowGap: '0' },
})

export const textTheme = csx({ alignSelf: 'flex-end' })

export const textDescriptionTheme = csx({
  [dataAttr('overflow', 'true')]: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },

  [dataAttr({ overflow: true, type: 'ellipsis' })]: {
    textOverflow: 'ellipsis',
  },
  [dataAttr({ overflow: true, type: 'auto' })]: { textOverflow: 'auto' },
})
