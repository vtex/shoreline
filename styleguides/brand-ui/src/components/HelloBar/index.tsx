import React, { PropsWithChildren, ReactNode } from 'react'
import { Flex, SxProps, Text, Box } from 'theme-ui'
import { IconProps } from '@vtex-components/icon'

import { IconCaret } from '../../icons'
import { Button } from '../Button'

const HelloBar = ({
  icon,
  variant = 'primary',
  action: { label, onClick },
  children,
}: HelloBarProps) => {
  const buttonVariant = variant === 'secondary' ? 'primary' : 'tertiary'
  const paletteVariant = `helloBar.${variant}`

  return (
    <Flex variant={paletteVariant} onClick={onClick}>
      <Flex variant="helloBar.content">
        {icon?.({ size: 18, sx: { variant: 'helloBar.icon' } })}
        <Text>{children}</Text>
      </Flex>
      <Button
        sx={{ display: ['none', 'none', 'block'] }}
        variant={buttonVariant}
        size="small"
      >
        {label}
      </Button>
      <Box variant="helloBar.actionIcon">
        <IconCaret direction="right" />
      </Box>
    </Flex>
  )
}

interface HelloBarProps extends PropsWithChildren<SxProps> {
  /**
   * Palette variation
   * @default primary
   */
  variant?: 'primary' | 'secondary' | 'tertiary'
  icon?: (props: IconProps) => ReactNode
  action: {
    label: string
    onClick?: () => void
  }
}

export { HelloBar, HelloBarProps }
