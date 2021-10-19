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
        borderRadius: 'default',
        boxShadow: 'block',
        bg: 'muted',
      }}
    >
      <tag.div
        csx={{
          backgroundColor: colorValue,
          borderTopLeftRadius: 'default',
          borderTopRightRadius: 'default',
          height: 80,
        }}
      />

      <Flex
        csx={{
          paddingY: 4,
          justifyContent: 'space-around',
        }}
      >
        <Flex direction="column">
          <Text
            csx={{
              display: 'block',
              fontSettings: 'medium',
            }}
          >
            Name
          </Text>
          <Text
            csx={{
              display: 'block',
            }}
          >
            {name}
          </Text>
        </Flex>
        <Flex direction="column">
          <Text
            csx={{
              display: 'block',
              fontSettings: 'medium',
            }}
          >
            {isHex(colorValue) ? 'HEX' : 'HSLA'}
          </Text>
          <Text
            csx={{
              display: 'block',
            }}
          >
            {hslaToString(colorValue)}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  )
}

interface ColorCardProps {
  /** Color Value */
  color?: string
  /** Semantic color name */
  name?: string
}

function hslaToString(hsla: string) {
  if (isHex(hsla)) return hsla

  return hsla.substr(5).split(')')[0]
}

function isHex(color: string) {
  return color?.includes('#')
}
