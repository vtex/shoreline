import React, { PropsWithChildren } from 'react'
import { Box } from 'theme-ui'

import { IconGlobe } from '../../icons'

export const LocaleSwitcher = (
  props: PropsWithChildren<LocaleSwitcherProps>
) => {
  const { children, options, onChange } = props

  return (
    <Box variant="localeSwitcher">
      <IconGlobe size={24} />
    </Box>
  )
}

interface LocaleSwitcherProps {
  options: Array<{
    label: string
    onClick: () => void
  }>
  onChange: (locale: string) => void
}
