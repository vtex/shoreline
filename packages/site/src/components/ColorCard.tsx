import React from 'react'
import { tag, Text, Flex, get, theme } from '@vtex/admin-ui'

export function ColorCard(props: ColorCardProps) {
  const { color, name } = props

  const colorValue = get(theme, `colors.${color}`, '')

  return (
    <Flex
      direction="column"
      csx={{
        maxWidth: 250,
        border: 'default',
        borderRadius: '8px',
        boxShadow: 'block',
        bg: '$secondary',
        transition: 'all .2s ease-in-out',
        ':hover': {
          transform: 'scale(1.05)',
        },
      }}
    >
      <tag.div
        csx={{
          backgroundColor: colorValue,
          borderTopLeftRadius: '8px',
          borderTopRightRadius: '8px',
          height: 80,
        }}
      />

      <Flex
        csx={{
          paddingY: 4,
          justifyContent: 'space-around',
        }}
      >
        <CardLabel title="Name" value={name} />
        <CardLabel
          title={isHex(colorValue) ? 'HEX' : 'HSLA'}
          value={isHex(colorValue) ? colorValue : hslaToString(colorValue)}
        />
      </Flex>
    </Flex>
  )
}

function CardLabel(props: CardLabel) {
  const { title, value } = props

  return (
    <Flex direction="column">
      <Text
        csx={{
          display: 'block',
          fontSettings: 'medium',
        }}
      >
        {title}
      </Text>
      <Text
        csx={{
          display: 'block',
        }}
      >
        {value}
      </Text>
    </Flex>
  )
}

interface CardLabel {
  title: string
  value: string
}
interface ColorCardProps {
  /** Color Value */
  color: string
  /** Semantic color name */
  name: string
}

function hslaToString(hsla: string) {
  return hsla.substr(5).split(')')[0]
}

function isHex(color: string) {
  return color?.includes('#')
}
