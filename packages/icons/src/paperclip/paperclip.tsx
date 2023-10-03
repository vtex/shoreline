import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

export const IconPaperclip = forwardRef<
  SVGSVGElement,
  ComponentPropsWithoutRef<'svg'>
>(function IconPaperclip(props, ref) {
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
        d="M11.4516 2.70174C12.0611 2.0922 12.8879 1.74976 13.7499 1.74976C14.6119 1.74976 15.4386 2.0922 16.0482 2.70174C16.6577 3.31129 17.0002 4.13801 17.0002 5.00004C17.0002 5.86115 16.6585 6.68704 16.0501 7.2964L8.29322 15.1603L8.28191 15.1715C7.90511 15.5376 7.39938 15.7408 6.87402 15.7371C6.34866 15.7333 5.84587 15.5231 5.47429 15.1516C5.10272 14.7802 4.89221 14.2775 4.88825 13.7522C4.8843 13.2268 5.08722 12.721 5.45316 12.344L5.45662 12.3405L11.9652 5.72409C12.2557 5.4288 12.7306 5.4249 13.0258 5.71537C13.3211 6.00585 13.325 6.48071 13.0346 6.776L6.52807 13.3903C6.43745 13.4844 6.38723 13.6102 6.38821 13.7409C6.3892 13.8722 6.44183 13.9979 6.53472 14.0908C6.62761 14.1836 6.75331 14.2362 6.88465 14.2371C7.01393 14.238 7.13846 14.1888 7.23217 14.1L14.9839 6.24133L14.9875 6.23768C15.3158 5.90944 15.5002 5.46425 15.5002 5.00004C15.5002 4.53584 15.3158 4.09064 14.9875 3.7624C14.6593 3.43416 14.2141 3.24976 13.7499 3.24976C13.2865 3.24976 12.842 3.43353 12.5139 3.76072L4.75796 11.6245C4.75783 11.6246 4.75809 11.6243 4.75796 11.6245C4.20316 12.1886 3.89329 12.9494 3.89651 13.7407C3.89973 14.5321 4.21555 15.2902 4.77516 15.8498C5.33478 16.4094 6.09286 16.7252 6.88427 16.7284C7.67482 16.7316 8.43465 16.4227 8.99862 15.8688L15.4074 9.46932C15.7006 9.17664 16.1754 9.17699 16.4681 9.4701C16.7608 9.76321 16.7604 10.2381 16.4673 10.5308L10.0525 16.9362C9.20623 17.7688 8.06528 18.2332 6.87816 18.2284C5.69105 18.2236 4.55393 17.7499 3.7145 16.9104C2.87508 16.071 2.40136 14.9339 2.39652 13.7468C2.39169 12.5597 2.85614 11.4187 3.6887 10.5725L11.4479 2.70541L11.4516 2.70174Z"
        fill="currentColor"
      />
    </svg>
  )
})