import type { ComponentPropsWithoutRef } from 'react'
import { forwardRef } from 'react'

export const IconXCircleFill = forwardRef<
  SVGSVGElement,
  ComponentPropsWithoutRef<'svg'>
>(function IconXCircleFill(props, ref) {
  return (
    <svg
      data-sl-icon-fill
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      ref={ref}
      aria-hidden
      focusable={false}
      {...props}
    >
      <path
        d="M10 1.875C8.39303 1.875 6.82214 2.35152 5.486 3.24431C4.14985 4.1371 3.10844 5.40605 2.49348 6.8907C1.87852 8.37535 1.71762 10.009 2.03112 11.5851C2.34463 13.1612 3.11846 14.6089 4.25476 15.7452C5.39106 16.8815 6.8388 17.6554 8.4149 17.9689C9.99099 18.2824 11.6247 18.1215 13.1093 17.5065C14.594 16.8916 15.8629 15.8502 16.7557 14.514C17.6485 13.1779 18.125 11.607 18.125 10C18.1225 7.84588 17.2657 5.7807 15.7425 4.25751C14.2193 2.73431 12.1541 1.87749 10 1.875ZM12.9419 12.0581C13 12.1161 13.0462 12.185 13.0776 12.2609C13.1091 12.3367 13.1254 12.418 13.1254 12.5001C13.1255 12.5823 13.1093 12.6636 13.0779 12.7395C13.0465 12.8153 13.0004 12.8843 12.9424 12.9424C12.8843 13.0004 12.8154 13.0465 12.7395 13.0779C12.6636 13.1093 12.5823 13.1254 12.5001 13.1254C12.418 13.1254 12.3367 13.1091 12.2609 13.0776C12.185 13.0462 12.1161 13 12.0581 12.9419L10 10.8838L7.9419 12.9419C7.82466 13.0589 7.66577 13.1246 7.50014 13.1245C7.33451 13.1244 7.1757 13.0585 7.05858 12.9414C6.94146 12.8243 6.87563 12.6655 6.87554 12.4999C6.87545 12.3342 6.94112 12.1753 7.05811 12.0581L9.11621 10L7.05811 7.94189C6.94112 7.82465 6.87545 7.66576 6.87554 7.50014C6.87563 7.33451 6.94146 7.17569 7.05858 7.05858C7.1757 6.94146 7.33451 6.87563 7.50014 6.87554C7.66577 6.87545 7.82466 6.94111 7.9419 7.05811L10 9.11621L12.0581 7.05811C12.1754 6.94111 12.3342 6.87545 12.4999 6.87554C12.6655 6.87563 12.8243 6.94146 12.9414 7.05858C13.0585 7.17569 13.1244 7.33451 13.1245 7.50014C13.1246 7.66576 13.0589 7.82465 12.9419 7.94189L10.8838 10L12.9419 12.0581Z"
        fill="currentColor"
      />
    </svg>
  )
})