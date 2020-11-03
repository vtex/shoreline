import React, { PropsWithChildren, ReactNode } from 'react'
import { Box, Flex, SxProps } from 'theme-ui'

export function Timeline(props: PropsWithChildren<SxProps>) {
  return <Box {...props} variant="timeline" />
}

export interface EventProps extends SxProps {
  title: ReactNode
  icon?: ReactNode
}

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

Timeline.Event = Event
