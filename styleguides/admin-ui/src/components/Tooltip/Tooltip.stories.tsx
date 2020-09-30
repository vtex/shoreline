import React from 'react'
import { Story, Meta } from '@storybook/react'

import { Tooltip, TooltipProps } from './index'
import { Button } from '../Button'
import { IconAddChannel } from '../../icons'
import { Box } from '../Box'
import { Text } from '../Text'

export default {
  title: 'beta/Tooltip',
  component: Tooltip,
} as Meta

export const SimpleUsage: Story<TooltipProps> = () => (
  <Tooltip label="Tooltip Label" placement="right">
    <Button icon={<IconAddChannel />} variant="text" />
  </Tooltip>
)

export const ComplexUsage: Story<TooltipProps> = () => {
  function Tag() {
    return (
      <Box my="2">
        <Text
          variant="small"
          sx={{ borderRadius: '16px' }}
          p="1"
          c="success.active"
          bg="success.washed.0"
        >
          Ready for Handling
        </Text>
      </Box>
    )
  }

  return (
    <Box display="flex" w="full">
      <Tooltip
        label={
          <Box display="flex" direction="col">
            <Text variant="small" c="muted.2">
              Previous Order:
            </Text>
            <Text variant="small" mb="1">
              1020391283 (21031-213)
            </Text>
            <Tag />
            <Text variant="small" mt="3">
              João da Silva
            </Text>
            <Text variant="small">49,00 BRL</Text>
          </Box>
        }
      >
        <Button icon={<IconAddChannel />} variant="text" />
      </Tooltip>
    </Box>
  )
}
