/** @jsx jsx */
import { jsx } from 'theme-ui'
import React, { Ref } from 'react'
import { Story, Meta } from '@storybook/react'

import { Icon, IconAddChannel, IconCaret, IconProps } from '../../icons'
import { Tooltip, TooltipProps } from './index'
import { Button } from '../Button'
import { Box } from '../Box'
import { Text } from '../Text'

export default {
  title: 'beta/Tooltip',
  component: Tooltip,
} as Meta

export const StringLabel: Story<TooltipProps> = () => (
  <Tooltip label="Tooltip Label" placement="right">
    <Button icon={<IconAddChannel />} variant="text" />
  </Tooltip>
)

export const ReactNodeLabel: Story<TooltipProps> = () => {
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
        <Button icon={<IconCaret direction="left" />} variant="text" />
      </Tooltip>
    </Box>
  )
}

export const CustomComponent = () => {
  const CustomIcon = React.forwardRef(
    (props: IconProps, ref: Ref<SVGSVGElement>) => {
      const {
        viewBox = '0 0 12 12',
        width = 24,
        height = 24,
        ...restProps
      } = props

      return (
        <Icon
          ref={ref}
          width={width}
          height={height}
          viewBox={viewBox}
          fill="none"
          {...restProps}
        >
          <circle cx="6" cy="6" r="6" fill="#D7DADF" />
          <path
            d="M6.00016 6.90246V6.72246C6.00016 6.13221 6.36466 5.81271 6.73066 5.56746C7.08766 5.32746 7.44541 5.01396 7.44541 4.43571C7.44541 3.63771 6.79891 2.99121 6.00091 2.99121C5.20291 2.99121 4.55566 3.63621 4.55566 4.43421"
            stroke="white"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M5.99925 8.93981C5.92725 8.93981 5.86875 8.99831 5.8695 9.07031C5.8695 9.14231 5.928 9.20081 6 9.20081C6.072 9.20081 6.1305 9.14231 6.1305 9.07031C6.1305 8.99756 6.072 8.93981 5.99925 8.93981"
            stroke="white"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Icon>
      )
    }
  )

  return (
    <Tooltip label="My Custom icon">
      <CustomIcon />
    </Tooltip>
  )
}
