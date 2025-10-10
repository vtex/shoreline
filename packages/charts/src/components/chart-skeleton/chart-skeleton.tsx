import { Flex, Skeleton, Spinner } from '@vtex/shoreline'
import { forwardRef } from 'react'
import type { ComponentPropsWithoutRef } from 'react'
import '../../theme/components/chartSkeleton.css'

export const ChartSkeleton = forwardRef<HTMLDivElement, ChartSkeletonProps>(
  function ChartSkeleton(props, ref) {
    const { height = '300px', width = '100%', style } = props

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
        <Flex
          direction="column"
          justify="space-between"
          style={{ height: '100%', width: '100%' }}
        >
          {Array.from({ length: 5 }).map((_, index) => (
            <ChartSkeletonLine key={index} />
          ))}
          <ChartSkeletonLine isXAxisLine />
        </Flex>
        <Flex justify="space-between" style={{ paddingLeft: '40px' }}>
          {Array.from({ length: 7 }).map((_, index) => (
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
} & ComponentPropsWithoutRef<'div'>

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
        width={'36px'}
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

function ChartSkeletonXAxisBox() {
  return (
    <Skeleton data-sl-chart-skeleton-axis-box width={'85px'} height={'16px'} />
  )
}
