import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

export const IconShareNetwork = forwardRef<
  SVGSVGElement,
  ComponentPropsWithoutRef<'svg'>
>(function IconShareNetwork(props, ref) {
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
        d="M12 4.375C12 3.4085 12.7835 2.625 13.75 2.625C14.7165 2.625 15.5 3.4085 15.5 4.375C15.5 5.3415 14.7165 6.125 13.75 6.125C13.1467 6.125 12.6147 5.81973 12.3001 5.35523C12.2935 5.34374 12.2866 5.33236 12.2794 5.3211C12.2719 5.30941 12.2641 5.29799 12.256 5.28685C12.0936 5.0213 12 4.70908 12 4.375ZM13.75 7.625C12.8747 7.625 12.0801 7.27894 11.4958 6.71616L8.06625 8.92002C8.18526 9.25792 8.25 9.6214 8.25 10C8.25 10.3786 8.18526 10.7421 8.06625 11.08L11.4958 13.2838C12.0801 12.7211 12.8747 12.375 13.75 12.375C15.5449 12.375 17 13.8301 17 15.625C17 17.4199 15.5449 18.875 13.75 18.875C11.9551 18.875 10.5 17.4199 10.5 15.625C10.5 15.2464 10.5647 14.8829 10.6837 14.545L7.25421 12.3412C6.66987 12.9039 5.87535 13.25 5 13.25C3.20507 13.25 1.75 11.7949 1.75 10C1.75 8.20507 3.20507 6.75 5 6.75C5.87535 6.75 6.66987 7.09606 7.25421 7.65884L10.6837 5.45498C10.5647 5.11708 10.5 4.7536 10.5 4.375C10.5 2.58007 11.9551 1.125 13.75 1.125C15.5449 1.125 17 2.58007 17 4.375C17 6.16993 15.5449 7.625 13.75 7.625ZM6.49395 10.9119C6.48591 10.923 6.47812 10.9344 6.47061 10.9461C6.46337 10.9574 6.45648 10.9687 6.44992 10.9802C6.13528 11.4447 5.60329 11.75 5 11.75C4.0335 11.75 3.25 10.9665 3.25 10C3.25 9.0335 4.0335 8.25 5 8.25C5.60329 8.25 6.13528 8.55527 6.44992 9.01978C6.45648 9.03126 6.46337 9.04264 6.47061 9.0539C6.47812 9.06559 6.48591 9.07701 6.49395 9.08814C6.65638 9.35369 6.75 9.66591 6.75 10C6.75 10.3341 6.65638 10.6463 6.49395 10.9119ZM12.256 14.7131C12.0936 14.9787 12 15.2909 12 15.625C12 16.5915 12.7835 17.375 13.75 17.375C14.7165 17.375 15.5 16.5915 15.5 15.625C15.5 14.6585 14.7165 13.875 13.75 13.875C13.1467 13.875 12.6147 14.1803 12.3001 14.6448C12.2935 14.6563 12.2866 14.6676 12.2794 14.6789C12.2719 14.6906 12.2641 14.702 12.256 14.7131Z"
        fill="currentColor"
      />
    </svg>
  )
})
