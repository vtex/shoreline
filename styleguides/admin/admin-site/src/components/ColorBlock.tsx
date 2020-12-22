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

export function MidColors() {
  const theme = useTheme()

  const getColor = (color: string) => get(theme, `colors.${color}`)

  return (
    <Set spacing={2}>
      <ColorCard color={getColor('mid.0')} name="mid.0" />
      <ColorCard color={getColor('mid.1')} name="mid.1" />
      <ColorCard color={getColor('mid.2')} name="mid.2" />
    </Set>
  )
}

export function LightColors() {
  const theme = useTheme()

  const getColor = (color: string) => get(theme, `colors.${color}`)

  return (
    <Set spacing={2}>
      <ColorCard color={getColor('light.primary')} name="light.primary" />
      <ColorCard color={getColor('light.secondary')} name="light.secondary" />
    </Set>
  )
}

export function DarkColors() {
  const theme = useTheme()

  const getColor = (color: string) => get(theme, `colors.${color}`)

  return (
    <Set spacing={2}>
      <ColorCard color={getColor('dark.primary')} name="dark.primary" />
      <ColorCard color={getColor('dark.secondary')} name="dark.secondary" />
    </Set>
  )
}

export function ComplementaryColors() {
  const theme = useTheme()

  const getColor = (color: string) => get(theme, `colors.${color}`)

  return (
    <Set spacing={2}>
      <ColorCard color={getColor('focus')} name="focus" />
    </Set>
  )
}

export function SemanticColor(props: { color: string }) {
  const { color } = props

  const theme = useTheme()

  const getColor = (c: string) => get(theme, `colors.${c}`)

  return (
    <Set spacing={2}>
      <ColorCard color={getColor(`${color}.default`)} name={`${color}`} />
      <ColorCard color={getColor(`${color}.hover`)} name={`${color}.hover`} />
      <ColorCard
        color={getColor(`${color}.pressed`)}
        name={`${color}.pressed`}
      />
      <ColorCard color={getColor(`${color}.accent`)} name={`${color}.accent`} />
    </Set>
  )
}
