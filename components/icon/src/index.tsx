/** @jsx jsx */
import { jsx, SxStyleProp } from 'theme-ui'
import { Ref } from 'react'
import { forwardRef } from '@vtex-components/utils'

/**
 * Elementary accessible component to display svg icons.
 * It renders a svg element.
 * @example decorative only
 * <Icon>
 *  <path.../>
 * </Icon>
 *
 * @example grant a11y for standalone usage
 * <Icon title="Meaningful name">
 *  <path.../>
 * </Icon>
 */
export const Icon = forwardRef((props: IconProps, ref: Ref<SVGSVGElement>) => {
  const {
    size = 24,
    title,
    sx = {},
    viewBox = '0 0 24 24',
    children,
    fill = 'none',
    ...svgJSXProps
  } = props

  return (
    <svg
      sx={{
        minWidth: size,
        minHeight: size,
        width: size,
        height: size,
        ...sx,
      }}
      ref={ref}
      viewBox={viewBox}
      fill={fill}
      {...svgJSXProps}
    >
      {title && <title>{title}</title>}
      {children}
    </svg>
  )
})

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number
  title?: string
  sx?: SxStyleProp
}
