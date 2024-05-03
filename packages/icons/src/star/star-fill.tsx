import type { ComponentPropsWithoutRef } from 'react'
import { forwardRef } from 'react'

export const IconStarFill = forwardRef<
  SVGSVGElement,
  ComponentPropsWithoutRef<'svg'>
>(function IconStarFill(props, ref) {
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
        d="M18.3203 8.93578L14.7969 12.0108L15.8524 16.5889C15.9082 16.8282 15.8923 17.0787 15.8065 17.309C15.7208 17.5394 15.5691 17.7393 15.3703 17.8839C15.1716 18.0284 14.9346 18.1112 14.6891 18.1218C14.4436 18.1324 14.2004 18.0704 13.9899 17.9436L9.99689 15.5217L6.01252 17.9436C5.80202 18.0704 5.55881 18.1324 5.31328 18.1218C5.06775 18.1112 4.83079 18.0284 4.63204 17.8839C4.4333 17.7393 4.28157 17.5394 4.19584 17.309C4.1101 17.0787 4.09416 16.8282 4.15002 16.5889L5.20392 12.0155L1.6797 8.93578C1.49331 8.77502 1.35852 8.5628 1.29225 8.32574C1.22598 8.08868 1.23117 7.83733 1.30718 7.60321C1.38319 7.36909 1.52663 7.16262 1.71952 7.0097C1.9124 6.85678 2.14614 6.76421 2.39142 6.74359L7.03674 6.34125L8.85002 2.01625C8.94471 1.78931 9.10443 1.59546 9.30907 1.45911C9.51371 1.32276 9.75411 1.25 10 1.25C10.2459 1.25 10.4863 1.32276 10.691 1.45911C10.8956 1.59546 11.0553 1.78931 11.15 2.01625L12.9688 6.34125L17.6125 6.74359C17.8578 6.76421 18.0915 6.85678 18.2844 7.0097C18.4773 7.16262 18.6207 7.36909 18.6968 7.60321C18.7728 7.83733 18.778 8.08868 18.7117 8.32574C18.6454 8.5628 18.5106 8.77502 18.3242 8.93578H18.3203Z"
        fill="currentColor"
      />
    </svg>
  )
})
