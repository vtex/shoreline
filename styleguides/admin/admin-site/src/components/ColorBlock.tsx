import React from 'react'
import { Box, Set, Text, Flex, BoxProps, useTheme, get } from '@vtex/admin-ui'

interface CardProps extends BoxProps<'div'> {
  /** Color Value */
  color?: string
  /** Semantic color name */
  name?: string
  /** Color accent */
  accent?: string
}

function ColorCard(props: CardProps) {
  const { color, name, accent, ...restProps } = props

  return (
    <Box
      styles={{
        width: 200,
        height: 200,
        borderRadius: 'default',
        bg: 'light.secondary',
      }}
      {...restProps}
    >
      <Flex
        align="center"
        justify="center"
        styles={{
          backgroundColor: color,
          borderRadius: 'default',
          borderBottomRightRadius: '0',
          borderBottomLeftRadius: '0',
          height: 80,
          width: 'full',
          boxShadow: 'subtle',
          marginBottom: 1,
          color: `${accent ?? color}`,
          fontSize: '4',
        }}
      >
        A
      </Flex>
      <Set orientation="vertical" spacing={2} styleOverrides={{ padding: 3 }}>
        <Set spacing={1} orientation="vertical">
          <Text variant="highlight" styleOverrides={{ fontSettings: 'bold' }}>
            Name
          </Text>
          <Text
            variant="body"
            styleOverrides={{
              display: 'block',
            }}
          >
            {name}
          </Text>
        </Set>
        <Set spacing={1} orientation="vertical">
          <Text variant="highlight" styleOverrides={{ fontSettings: 'bold' }}>
            Hex
          </Text>
          <Text
            variant="action"
            styleOverrides={{
              display: 'block',
            }}
          >
            {color}
          </Text>
        </Set>
      </Set>
    </Box>
  )
}

export function MidColors() {
  const theme = useTheme()

  const getColor = (color: string) => get(theme, `colors.${color}`)

  return (
    <Set spacing={2}>
      <ColorCard
        color={getColor('mid.0')}
        name="mid.0"
        accent="light.primary"
      />
      <ColorCard color={getColor('mid.1')} name="mid.1" accent="dark.primary" />
      <ColorCard color={getColor('mid.2')} name="mid.2" accent="dark.primary" />
    </Set>
  )
}

export function LightColors() {
  const theme = useTheme()

  const getColor = (color: string) => get(theme, `colors.${color}`)

  return (
    <Set spacing={2}>
      <ColorCard
        color={getColor('light.primary')}
        name="light.primary"
        accent="dark.primary"
      />
      <ColorCard
        color={getColor('light.secondary')}
        name="light.secondary"
        accent="dark.primary"
      />
    </Set>
  )
}

export function DarkColors() {
  const theme = useTheme()

  const getColor = (color: string) => get(theme, `colors.${color}`)

  return (
    <Set spacing={2}>
      <ColorCard
        color={getColor('dark.primary')}
        name="dark.primary"
        accent="light.primary"
      />
      <ColorCard
        color={getColor('dark.secondary')}
        name="dark.secondary"
        accent="light.primary"
      />
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

  const accessibleColor = color === 'blue' || color === 'red'

  return (
    <Set spacing={4} orientation="vertical">
      <Set spacing={4}>
        <ColorCard
          color={getColor(`${color}.default`)}
          name={`${color}`}
          accent={`${color}.accent`}
        />
        <ColorCard
          color={getColor(`${color}.hover`)}
          name={`${color}.hover`}
          accent={`${color}.accent`}
        />
        <ColorCard
          color={getColor(`${color}.pressed`)}
          name={`${color}.pressed`}
          accent={`${color}.accent`}
        />
        <ColorCard
          color={getColor(`${color}.accent`)}
          name={`${color}.accent`}
          accent={`${color}.secondary.accent`}
        />
      </Set>
      <Set spacing={4}>
        <ColorCard
          color={getColor(`${color}.secondary.default`)}
          name={`${color}.secondary`}
          accent={`${color}.secondary.accent`}
        />
        <ColorCard
          color={getColor(`${color}.secondary.hover`)}
          name={`${color}.secondary.hover`}
          accent={
            accessibleColor ? `${color}.hover` : `${color}.secondary.accent`
          }
        />
        <ColorCard
          color={getColor(`${color}.secondary.pressed`)}
          name={`${color}.secondary.pressed`}
          accent={
            accessibleColor ? `${color}.pressed` : `${color}.secondary.accent`
          }
        />
        <ColorCard
          color={getColor(`${color}.secondary.accent`)}
          name={`${color}.secondary.accent`}
          accent={`${color}.accent`}
        />
      </Set>
    </Set>
  )
}
