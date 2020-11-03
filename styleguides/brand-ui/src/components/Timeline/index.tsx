import React, { PropsWithChildren, ReactNode } from 'react'
import { Box, Flex, SxProps } from 'theme-ui'

/**
 * The timeline displays a list of events in chronological order.
 * @example
 * ```jsx
 * import { Timeline } from `@vtex/brand-ui`
 * const Example = () => (
 *  <Timeline>
 *    <Timeline.Event title="Event 1" />
 *    <Timeline.Event title="Event 2" />
 *  </Timeline>
 * )
 * ```
 */
export function Timeline(props: PropsWithChildren<SxProps>) {
  return <Box {...props} variant="timeline" />
}

/**
 * The default icon setted for all events
 */
const Circle = () => (
  <Box variant="timeline.event.icon.default">
    <Box />
  </Box>
)

export function Event({
  children,
  title,
  icon,
  sx,
}: PropsWithChildren<EventProps>) {
  return (
    <Flex sx={sx}>
      <Box variant="timeline.event.icon">
        {icon ?? <Circle />}
        <Box variant="timeline.event.line" />
      </Box>
      <Box variant="timeline.event">
        <Box variant="timeline.event.title">{title}</Box>
        {children && <Box variant="timeline.event.content">{children}</Box>}
      </Box>
    </Flex>
  )
}

/**
 * Timeline's event
 */
Timeline.Event = Event

export interface EventProps extends SxProps {
  /**
   * Event title
   */
  title: ReactNode
  /**
   * Event icon
   */
  icon?: ReactNode
}
