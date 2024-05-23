import type { SVGProps } from 'react'
import { forwardRef } from 'react'

export interface IconProps extends SVGProps<SVGSVGElement> {
  /**
   * Symbol id from element to render. Take a look at `/static/icons.svg`.
   *
   * Example: <Icon name="Bell" />
   */
  name: string
  /**
   * SVG sisze.
   * @default '20px'
   */
  size?: number
}

/**
 * <Icon name="bell" size="small | normal" />
 */
const Icon = forwardRef<SVGSVGElement, IconProps>(function Icon(props, ref) {
  const { name, size = '20px', ...rest } = props
  return (
    <svg data-sl-icon ref={ref} width={size} height={size} {...rest}>
      <use href={`/icons.svg#${name}`} />
    </svg>
  )
})

export default Icon
