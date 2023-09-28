import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

export const IconChatText = forwardRef<
  SVGSVGElement,
  ComponentPropsWithoutRef<'svg'>
>(function IconChatText(props, ref) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      ref={ref}
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.25 5.125V17.2231L5.54855 15.2079L5.55995 15.1981C5.80773 14.9895 6.1212 14.8751 6.4451 14.875H16.75V5.125H3.25ZM2.15273 4.02773C2.41059 3.76987 2.76033 3.625 3.125 3.625H16.875C17.2397 3.625 17.5894 3.76987 17.8473 4.02773C18.1051 4.28559 18.25 4.63533 18.25 5V15C18.25 15.3647 18.1051 15.7144 17.8473 15.9723C17.5894 16.2301 17.2397 16.375 16.875 16.375H6.49271L4.02177 18.5413L4.01016 18.5513C3.80989 18.7197 3.5657 18.8276 3.30627 18.8621C3.04683 18.8966 2.78295 18.8563 2.54561 18.746C2.30826 18.6358 2.10732 18.46 1.96639 18.2395C1.82546 18.019 1.75039 17.7628 1.75 17.5011L1.75 5C1.75 4.63533 1.89487 4.28559 2.15273 4.02773ZM6.75 8.75C6.75 8.33579 7.08579 8 7.5 8H12.5C12.9142 8 13.25 8.33579 13.25 8.75C13.25 9.16421 12.9142 9.5 12.5 9.5H7.5C7.08579 9.5 6.75 9.16421 6.75 8.75ZM6.75 11.25C6.75 10.8358 7.08579 10.5 7.5 10.5H12.5C12.9142 10.5 13.25 10.8358 13.25 11.25C13.25 11.6642 12.9142 12 12.5 12H7.5C7.08579 12 6.75 11.6642 6.75 11.25Z"
        fill="currentColor"
      />
    </svg>
  )
})
