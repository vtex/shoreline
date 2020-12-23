import React from 'react'
import { Box, Set, Text, Flex, BoxProps, useTheme, get } from '@vtex/admin-ui'

interface CardProps extends BoxProps<'div'> {
  /** Color Value */
  color?: string
  /** Semantic color name */
  name?: string
  /** Color contrast */
  contrast?: string
}

function ColorCard(props: CardProps) {
  const { color, name, contrast, ...restProps } = props

  return (
    <Box
      styles={{
        width: 265,
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
          height: 110,
          width: 'full',
          boxShadow: 'subtle',
          marginBottom: 1,
          color: `${contrast ?? color}`,
          fontSize: '4',
        }}
      >
        A
      </Flex>
      <Flex justify="space-between" styles={{ padding: 3 }}>
        <Set spacing={2} orientation="vertical">
          <Set spacing={1} orientation="vertical">
            <Text variant="highlight" styleOverrides={{ fontSettings: 'bold' }}>
              Color
            </Text>
            <Text
              styleOverrides={{
                display: 'block',
              }}
            >
              {name}
            </Text>
          </Set>
        </Set>

        <Set spacing={1} orientation="vertical" styleOverrides={{ width: 65 }}>
          <Set spacing={1} orientation="vertical">
            <Text variant="highlight" styleOverrides={{ fontSettings: 'bold' }}>
              Hex
            </Text>
            <Text
              styleOverrides={{
                textTransform: 'uppercase',
                display: 'block',
              }}
            >
              {color}
            </Text>
          </Set>
        </Set>
      </Flex>
      {contrast && (
        <Set
          spacing={1}
          orientation="vertical"
          styleOverrides={{ padding: 3, paddingTop: 0 }}
        >
          <Text variant="highlight" styleOverrides={{ fontSettings: 'bold' }}>
            Contrast
          </Text>
          <Flex align="center">
            <Box
              styles={{
                marginRight: 2,
                backgroundColor: `${contrast}`,
                borderRadius: 'default',
                height: 20,
                width: 40,
                boxShadow: 'subtle',
                fontSize: '4',
              }}
            />
            <Text
              styleOverrides={{
                display: 'block',
              }}
            >
              {contrast}
            </Text>
          </Flex>
        </Set>
      )}
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
        contrast="light.primary"
      />
      <ColorCard
        color={getColor('mid.1')}
        name="mid.1"
        contrast="dark.primary"
      />
      <ColorCard
        color={getColor('mid.2')}
        name="mid.2"
        contrast="dark.primary"
      />
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
        contrast="dark.primary"
      />
      <ColorCard
        color={getColor('light.secondary')}
        name="light.secondary"
        contrast="dark.primary"
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
        contrast="light.primary"
      />
      <ColorCard
        color={getColor('dark.secondary')}
        name="dark.secondary"
        contrast="light.primary"
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

  const primarycontrast = color === 'yellow' ? 'dark.primary' : 'light.primary'

  return (
    <Set spacing={4} orientation="vertical">
      <Set spacing={4}>
        <ColorCard
          color={getColor(`${color}.default`)}
          name={`${color}`}
          contrast={primarycontrast}
        />
        <ColorCard
          color={getColor(`${color}.hover`)}
          name={`${color}.hover`}
          contrast={primarycontrast}
        />
        <ColorCard
          color={getColor(`${color}.pressed`)}
          name={`${color}.pressed`}
          contrast={primarycontrast}
        />
      </Set>
      <Set spacing={4}>
        <ColorCard
          color={getColor(`${color}.secondary.default`)}
          name={`${color}.secondary`}
          contrast={accessibleColor ? `${color}` : 'dark.primary'}
        />
        <ColorCard
          color={getColor(`${color}.secondary.hover`)}
          name={`${color}.secondary.hover`}
          contrast={accessibleColor ? `${color}.hover` : 'dark.primary'}
        />
        <ColorCard
          color={getColor(`${color}.secondary.pressed`)}
          name={`${color}.secondary.pressed`}
          contrast={accessibleColor ? `${color}.pressed` : 'dark.primary'}
        />
      </Set>
    </Set>
  )
}
