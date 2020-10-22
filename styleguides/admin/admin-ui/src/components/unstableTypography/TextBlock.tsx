import React, { PropsWithChildren } from 'react'

import { useHeadingLevel, HeadingLevelProvider } from './context'

export function TextBlock(props: PropsWithChildren<{}>) {
  const prevLevel = useHeadingLevel()
  const level = prevLevel === 6 ? prevLevel : prevLevel + 1

  return (
    <HeadingLevelProvider level={level}>{props.children}</HeadingLevelProvider>
  )
}
