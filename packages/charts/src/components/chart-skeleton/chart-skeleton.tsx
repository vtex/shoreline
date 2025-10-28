import { Flex, Skeleton, Spinner } from '@vtex/shoreline'
import { forwardRef } from 'react'
import type { ComponentPropsWithoutRef } from 'react'
import '../../theme/components/chartSkeleton.css'

/**
 * Chart skeleton used while loading data.
 */
export const ChartSkeleton = forwardRef<HTMLDivElement, ChartSkeletonProps>(
  function ChartSkeleton(props, ref) {
    const { height, width, numLines = 6, numColumns = 7, style } = props

    return (
      <Flex
        data-sl-chart-skeleton-container
        direction="column"
        gap={0}
        style={{
          height: height,
          width: width,
          ...style,
        }}
        ref={ref}
      >
        <Spinner data-sl-chart-skeleton-spinner />

        <Flex data-sl-inner-flex direction="column" justify="space-between">
          {Array.from({ length: numLines - 1 }).map((_, index) => (
            <ChartSkeletonLine key={index} />
          ))}
          {numLines <= 0 ? null : <ChartSkeletonLine isXAxisLine />}
        </Flex>

        <Flex data-ls-chart-skeleton-chart-flex justify="space-between">
          {Array.from({ length: numColumns }).map((_, index) => (
            <ChartSkeletonXAxisBox key={index} />
          ))}
        </Flex>
      </Flex>
    )
  }
)

export type ChartSkeletonProps = {
  height?: string | number
  width?: string | number
  /**
   * How many vertical lines there should be.
   */
  numLines?: number
  /**
   * How many categories there are under the X axis.
   */
  numColumns?: number
} & ComponentPropsWithoutRef<'div'>

/**
 * One of the `numLines` lines in the chart. Composed of the line itself and the skeleton of the
 * Y axis number to it's left.
 */
function ChartSkeletonLine(props: { isXAxisLine?: boolean }) {
  const { isXAxisLine } = props

  return (
    <Flex
      align="center"
      gap={0}
      style={{
        paddingBottom: isXAxisLine ? '2px' : 'var(--sl-space-0)',
      }}
    >
      <Skeleton
        data-sl-chart-skeleton-line-box
        width={'16px'}
        height={'16px'}
      />

      <div
        data-sl-chart-skeleton-line
        style={{
          backgroundColor: isXAxisLine
            ? 'var(--sl-color-gray-5)'
            : 'var(--sl-color-gray-3)',
        }}
      />
    </Flex>
  )
}

/**
 * Represent a value in the Y axis.
 */
function ChartSkeletonXAxisBox() {
  return (
    <Skeleton data-sl-chart-skeleton-axis-box width={'85px'} height={'16px'} />
  )
}
