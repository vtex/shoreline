import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

export const IconCube = forwardRef<
  SVGSVGElement,
  ComponentPropsWithoutRef<'svg'>
>(function IconCube(props, ref) {
  return (
    <svg
      data-sl-icon
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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.89678 5.64931C2.09565 5.28596 2.55142 5.15263 2.91477 5.3515L10 9.22941L17.0852 5.3515C17.4486 5.15263 17.9043 5.28596 18.1032 5.64931C18.3021 6.01266 18.1687 6.46843 17.8054 6.6673L10.3601 10.7423C10.1357 10.8651 9.86427 10.8651 9.63991 10.7423L2.1946 6.6673C1.83125 6.46843 1.69791 6.01266 1.89678 5.64931Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 2.64397L3.25 6.3396V13.6605L10 17.3561L16.75 13.6605V6.3396L10 2.64397ZM9.34 1.29522C9.54236 1.1845 9.76933 1.12646 10 1.12646C10.2307 1.12646 10.4576 1.1845 10.66 1.29522L17.535 5.05928C17.7509 5.17745 17.9313 5.35149 18.057 5.56307C18.1828 5.7747 18.2494 6.01622 18.25 6.26241L18.25 6.26411L18.25 13.736L18.25 13.7377C18.2494 13.9839 18.1828 14.2254 18.057 14.437C17.9313 14.6486 17.7511 14.8225 17.5352 14.9407L10.6602 18.7048C10.4578 18.8155 10.2307 18.8736 10 18.8736C9.76933 18.8736 9.54236 18.8156 9.34 18.7049L2.465 14.9408C2.24911 14.8226 2.06871 14.6486 1.94298 14.437C1.81721 14.2254 1.75056 13.9839 1.75 13.7377L1.75 13.736V6.26411L1.75 6.26241C1.75056 6.01622 1.81721 5.7747 1.94298 5.56307C2.06871 5.35149 2.24893 5.17755 2.46482 5.05938L9.34 1.29522Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 9.33521C10.4142 9.33521 10.75 9.67099 10.75 10.0852V18.125C10.75 18.5393 10.4142 18.875 10 18.875C9.58579 18.875 9.25 18.5393 9.25 18.125V10.0852C9.25 9.67099 9.58579 9.33521 10 9.33521Z"
        fill="currentColor"
      />
    </svg>
  )
})