import type { ComponentPropsWithoutRef, Ref } from 'react'
import React, { forwardRef } from 'react'

import {
  tooltipTriggerContainerTheme,
  tooltipTriggerTheme,
  tooltipTriggerWrapperTheme,
} from './tooltip.style'
import { Center } from '../center'
import { cx } from '@vtex/admin-ui-core'

export const TooltipTrigger = forwardRef(
  (props: TooltipTriggerProps, ref: Ref<HTMLButtonElement>) => {
    const {
      bleedX = false,
      bleedY = false,
      type = 'button',
      className = '',
      ...buttonProps
    } = props

    return (
      <button
        ref={ref}
        type={type}
        className={cx(tooltipTriggerWrapperTheme, className)}
        data-bleed-x={bleedX}
        data-bleed-y={bleedY}
        {...buttonProps}
      >
        <Center className={tooltipTriggerTheme}>
          <Center className={tooltipTriggerContainerTheme}>
            <IconQuestionMark />
          </Center>
        </Center>
      </button>
    )
  }
)

function IconQuestionMark() {
  return (
    <svg
      width={6}
      height={8}
      viewBox="0 0 6 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 7.74999C2.85166 7.74999 2.70666 7.70601 2.58332 7.62359C2.45999 7.54118 2.36386 7.42405 2.30709 7.287C2.25032 7.14996 2.23547 6.99916 2.26441 6.85367C2.29335 6.70819 2.36478 6.57455 2.46967 6.46966C2.57456 6.36477 2.7082 6.29334 2.85368 6.2644C2.99917 6.23546 3.14997 6.25032 3.28701 6.30708C3.42406 6.36385 3.54119 6.45998 3.6236 6.58331C3.70601 6.70665 3.75 6.85166 3.75 6.99999C3.75 7.1989 3.67098 7.38967 3.53033 7.53032C3.38968 7.67097 3.19891 7.74999 3 7.74999ZM3.5 4.69374V4.74999C3.5 4.8826 3.44732 5.00978 3.35355 5.10355C3.25979 5.19731 3.13261 5.24999 3 5.24999C2.86739 5.24999 2.74021 5.19731 2.64645 5.10355C2.55268 5.00978 2.5 4.8826 2.5 4.74999V4.24999C2.5 4.11738 2.55268 3.99021 2.64645 3.89644C2.74021 3.80267 2.86739 3.74999 3 3.74999C3.24723 3.74999 3.4889 3.67668 3.69446 3.53933C3.90002 3.40198 4.06024 3.20675 4.15485 2.97835C4.24946 2.74994 4.27421 2.49861 4.22598 2.25613C4.17775 2.01365 4.0587 1.79092 3.88388 1.61611C3.70907 1.44129 3.48634 1.32224 3.24386 1.27401C3.00139 1.22578 2.75005 1.25053 2.52165 1.34514C2.29324 1.43975 2.09801 1.59997 1.96066 1.80553C1.82331 2.01109 1.75 2.25277 1.75 2.49999C1.75 2.6326 1.69732 2.75978 1.60355 2.85355C1.50979 2.94731 1.38261 2.99999 1.25 2.99999C1.11739 2.99999 0.990215 2.94731 0.896447 2.85355C0.802679 2.75978 0.75 2.6326 0.75 2.49999C0.750002 2.07643 0.869559 1.66148 1.09492 1.30285C1.32028 0.944222 1.6423 0.656488 2.02392 0.472744C2.40555 0.288999 2.83129 0.216705 3.25218 0.264178C3.67307 0.311651 4.07201 0.476962 4.40312 0.741098C4.73424 1.00523 4.98407 1.35747 5.12388 1.75728C5.2637 2.1571 5.28782 2.58826 5.19347 3.00118C5.09913 3.4141 4.89014 3.792 4.59056 4.09142C4.29098 4.39084 3.91297 4.59962 3.5 4.69374Z"
        fill="currentColor"
      />
    </svg>
  )
}

interface TooltipTriggerProps extends ComponentPropsWithoutRef<'button'> {
  /**
   * Vertical bleed
   */
  bleedY?: boolean
  /**
   * Horizontal bleed
   */
  bleedX?: boolean
}
