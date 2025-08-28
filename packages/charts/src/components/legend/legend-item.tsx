import { IconCheckSmall } from '@vtex/shoreline'
import {
  useRef,
  useState,
  useMemo,
  useCallback,
  type ComponentPropsWithoutRef,
} from 'react'
import { getHoverColor } from '../../utils/legend'
import type { LegendItemType } from './legend'

export function LegendItem({
  serie,
  onClick,
  state,
  color,
  index,
  ...otherProps
}: LegendItemProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [hover, setHover] = useState<boolean>(false)

  const border = useMemo(() => {
    if (state !== 'off') return 'none'
    if (hover) {
      return 'var(--sl-border-base-strong-hover)'
    }
    return 'var(--sl-border-base-strong)'
  }, [state, hover])

  const backgroundColor = useMemo(() => {
    if (state === 'off') return 'transparent'
    if (!hover) return color
    return getHoverColor(color)
  }, [state, hover, color])

  const handleClick = useCallback(
    (_e: React.MouseEvent) => {
      onClick(String(serie))
    },
    [serie, onClick]
  )

  return (
    <div
      data-sl-chart-legend-container
      onClick={handleClick}
      onMouseDown={(e) => e.preventDefault()}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      {...otherProps}
    >
      <button
        ref={buttonRef}
        data-sl-chart-legend-button
        style={{
          backgroundColor: backgroundColor,
          border: border,
        }}
      >
        {state === 'checked' && <IconCheckSmall data-sl-chart-legend-check />}
      </button>
      <span data-sl-chart-legend-text>{serie}</span>
    </div>
  )
}

export type LegendItemOptions = {
  serie: string
  onClick: (name: string) => void
  state?: LegendItemType['state']
  color: string
  index: number
}

export type LegendItemProps = LegendItemOptions &
  Omit<ComponentPropsWithoutRef<'div'>, 'onClick'>
