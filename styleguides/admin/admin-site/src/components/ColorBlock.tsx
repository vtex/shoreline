import React from 'react'
import { Box, Set, Text, BoxProps, useTheme, get } from '@vtex/admin-ui'

interface CardProps extends BoxProps<'div'> {
  /** Color Value */
  color?: string
  /** Semantic color name */
  name?: string
}

function ColorCard(props: CardProps) {
  const { color, name, ...restProps } = props

  return (
    <Box
      styles={{
        border: 'default',
        padding: 1,
        width: 164,
      }}
      {...restProps}
    >
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

      <Text
        variant="highlight"
        styleOverrides={{
          display: 'block',
        }}
      >
        {name}
      </Text>
      <Text
        variant="small"
        feedback="secondary"
        styleOverrides={{
          display: 'block',
        }}
      >
        {color}
      </Text>
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

export function ElementaryColors() {
  const theme = useTheme()

  const getColor = (color: string) => get(theme, `colors.${color}`)

  return (
    <Set spacing={2}>
      <ColorCard color={getColor('blue')} name="blue" />
      <ColorCard color={getColor('purple')} name="purple" />
      <ColorCard color={getColor('yellow')} name="yellow" />
      <ColorCard color={getColor('green')} name="green" />
      <ColorCard color={getColor('red')} name="red" />
      <ColorCard color={getColor('black')} name="black" />
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
