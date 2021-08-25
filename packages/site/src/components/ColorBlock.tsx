import React from 'react'
import type { SetProps } from '@vtex/admin-ui'
import { Set, Text, Flex, useSystem, get } from '@vtex/admin-ui'

interface CardProps extends SetProps {
  /** Color Value */
  color?: string
  /** Semantic color name */
  name?: string
  /** Color contrast */
  contrast?: string
}

function ColorCard(props: Omit<CardProps, 'ref'>) {
  const { color, name, contrast, ...restProps } = props

  return (
    <Set
      csx={{
        width: 265,
        borderRadius: 'default',
      }}
      spacing={2}
      {...restProps}
    >
      <Flex
        align="center"
        justify="center"
        csx={{
          backgroundColor: color,
          borderRadius: 'default',
          height: 48,
          width: 48,
          boxShadow: 'subtle',
          color: `${contrast ?? color}`,
          fontSize: '4',
        }}
      >
        T
      </Flex>

      <Set spacing={1} orientation="vertical">
        <Text
          csx={{
            display: 'block',
            fontSettings: 'bold',
          }}
        >
          {name}
        </Text>
        <Text
          csx={{
            textTransform: 'uppercase',
            display: 'block',
          }}
        >
          {color}
        </Text>
      </Set>
    </Set>
  )
}

export function MidColors() {
  const { theme } = useSystem()

  const getColor = (color: string) => get(theme, `colors.${color}`)

  return (
    <Set spacing={2}>
      <ColorCard
        color={getColor('mid.primary')}
        name="mid.primary"
        contrast="light.primary"
      />
      <ColorCard
        color={getColor('mid.secondary')}
        name="mid.secondary"
        contrast="dark.primary"
      />
      <ColorCard
        color={getColor('mid.tertiary')}
        name="mid.tertiary"
        contrast="dark.primary"
      />
    </Set>
  )
}

export function LightColors() {
  const { theme } = useSystem()

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
  const { theme } = useSystem()

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
  const { theme } = useSystem()

  const getColor = (color: string) => get(theme, `colors.${color}`)

  return (
    <Set spacing={2}>
      <ColorCard color={getColor('focus')} name="focus" />
    </Set>
  )
}

export function SemanticColor(props: { color: string }) {
  const { color } = props

  const { theme } = useSystem()

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
