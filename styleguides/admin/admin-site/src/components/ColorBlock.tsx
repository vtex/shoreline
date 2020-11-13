import React from 'react'
import {
  Box,
  ThemeProvider,
  Set,
  BoxProps,
  useTheme,
  get,
} from '@vtex/admin-ui'

import Heading from './Heading'

interface CardProps extends BoxProps {
  /** Color Value */
  color?: string
  /** Semantic color name */
  name?: string
}

interface SetProps {
  /** Spacing between palettes */
  spacing?: number
}

function ColorCard(props: CardProps) {
  const { color, name, ...restProps } = props

  return (
    <Box border="default" padding={1} width={164} {...restProps}>
      <Box
        styles={{
          backgroundColor: color,
          borderRadius: 'default',
          height: 72,
          width: 'full',
          boxShadow: 'subtle',
          marginBottom: 1,
        }}
      />

      <Box text="highlight">{name}</Box>
      <Box text="small" styles={{ color: 'text.secondary' }}>
        {color}
      </Box>
    </Box>
  )
}

export function BackgroundColors() {
  const theme = useTheme()

  const getColor = (color: string) => get(theme, `colors.${color}`)

  return (
    <Set spacing={2}>
      <ColorCard color={getColor('background')} name="background" />
      <ColorCard color={getColor('muted.0')} name="muted.0" />
      <ColorCard color={getColor('muted.1')} name="muted.1" />
      <ColorCard color={getColor('muted.2')} name="muted.2" />
      <ColorCard color={getColor('muted.3')} name="muted.3" />
    </Set>
  )
}

export function TextColors() {
  const theme = useTheme()

  const getColor = (color: string) => get(theme, `colors.${color}`)

  return (
    <Set spacing={2}>
      <ColorCard color={getColor('text.primary')} name="text.primary" />
      <ColorCard color={getColor('text.secondary')} name="text.secondary" />
    </Set>
  )
}

export function ComplementaryColors() {
  const theme = useTheme()

  const getColor = (color: string) => get(theme, `colors.${color}`)

  return (
    <Set spacing={2}>
      <ColorCard color={getColor('focus')} name="focus" />
      <ColorCard color={getColor('brand')} name="brand" />
    </Set>
  )
}

export function SemanticColor(props: { color: string }) {
  const { color } = props

  const theme = useTheme()

  const getColor = (c: string) => get(theme, `colors.${c}`)

  return (
    <Set spacing={2}>
      <ColorCard color={getColor(`${color}.base`)} name={`${color}.base`} />
      <ColorCard color={getColor(`${color}.hover`)} name={`${color}.hover`} />
      <ColorCard
        color={getColor(`${color}.pressed`)}
        name={`${color}.pressed`}
      />
      <ColorCard color={getColor(`${color}.accent`)} name={`${color}.accent`} />
    </Set>
  )
}

export function PaletteBlock(props: SetProps) {
  const theme = useTheme()

  const getColor = (color: string) => get(theme, `colors.${color}`)

  return (
    <ThemeProvider>
      <Set
        orientation="vertical"
        spacing={6}
        {...props}
        styleOverrides={{ marginTop: 6 }}
      >
        <Box>
          <Heading element="h2">Basic</Heading>
          <Set
            spacing={2}
            styleOverrides={{
              flexWrap: 'wrap',
            }}
          >
            <ColorCard color="#DAE3F5" name="blue" />
            <ColorCard color="#F4EFFF" name="purple" />
            <ColorCard color="#FDE6C0" name="yellow" />
            <ColorCard color="#D6EFE5" name="green" />
            <ColorCard color="#FEE3E3" name="red" />
            <ColorCard color={getColor('text.primary')} name="black" />
          </Set>
        </Box>
      </Set>
    </ThemeProvider>
  )
}
