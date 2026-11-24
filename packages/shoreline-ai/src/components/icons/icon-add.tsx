import type { ComponentPropsWithoutRef } from 'react'
import { forwardRef } from '@vtex/shoreline'

/**
 * Material Symbols "add" (outlined, weight 400, a 1.5px stroke), 20px.
 * Source: google/material-design-icons, Apache 2.0.
 * Package-internal: not exported from the barrel.
 */
export const IconAdd = forwardRef<
  SVGSVGElement,
  ComponentPropsWithoutRef<'svg'>
>(function IconAdd(props, ref) {
  return (
    <svg
      data-sl-icon-fill
      width="20"
      height="20"
      viewBox="0 -960 960 960"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      ref={ref}
      aria-hidden
      focusable={false}
      {...props}
    >
      <path
        d="M450-450H200v-60h250v-250h60v250h250v60H510v250h-60v-250Z"
        fill="currentColor"
      />
    </svg>
  )
})
