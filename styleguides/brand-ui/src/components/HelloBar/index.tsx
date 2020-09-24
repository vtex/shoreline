import React, { PropsWithChildren, ReactNode } from 'react'
import { Flex, SxProps, Text } from 'theme-ui'
import { IconProps } from '@vtex-components/icon'

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
    <Flex variant={paletteVariant}>
      <Flex>
        {icon?.({ size: 18, sx: { variant: 'helloBar.icon' } })}
        <Text>{children}</Text>
      </Flex>
      <Button variant={buttonVariant} size="small" onClick={onClick}>
        {label}
      </Button>
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
