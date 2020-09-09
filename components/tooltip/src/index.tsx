import React, { ReactElement, PropsWithRef } from 'react'
import {
  useTooltipState,
  Tooltip as ReakitTooltip,
  TooltipReference,
  TooltipProps as ReakitProps,
  TooltipArrow,
} from 'reakit/Tooltip/'
import { Box, SxStyleProp } from 'theme-ui'

function Tooltip(props: TooltipProps) {
  const { sx = {}, children, label, ...tooltipProps } = props
  const tooltip = useTooltipState({ placement: 'bottom' })

  return (
    <>
      <TooltipReference {...tooltip} {...children.props}>
        {(referenceProps) =>
          React.cloneElement(children, { ...referenceProps })
        }
      </TooltipReference>
      <ReakitTooltip {...tooltip} {...tooltipProps}>
        <TooltipArrow {...tooltip} />
        <Box sx={sx}>{label}</Box>
      </ReakitTooltip>
    </>
  )
}

export interface TooltipProps extends Omit<ReakitProps, 'as'> {
  /**
   * ThemeUI sx prop
   * @default {}
   */
  children: ReactElement<PropsWithRef<{}>>
  sx?: SxStyleProp
  label: string
}

export default Tooltip
