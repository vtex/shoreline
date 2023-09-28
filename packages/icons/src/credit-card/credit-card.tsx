import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

export const IconCreditCard = forwardRef<
  SVGSVGElement,
  ComponentPropsWithoutRef<'svg'>
>(function IconCreditCard(props, ref) {
  return (
    <svg
      data-sl-icon
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
        d="M2.625 5.125V14.875H17.375V5.125H2.625ZM1.125 5C1.125 4.24061 1.74061 3.625 2.5 3.625H17.5C18.2594 3.625 18.875 4.24061 18.875 5V15C18.875 15.7594 18.2594 16.375 17.5 16.375H2.5C1.74061 16.375 1.125 15.7594 1.125 15V5Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.3745 13.125C12.3745 12.7108 12.7103 12.375 13.1245 12.375H15.6245C16.0387 12.375 16.3745 12.7108 16.3745 13.125C16.3745 13.5392 16.0387 13.875 15.6245 13.875H13.1245C12.7103 13.875 12.3745 13.5392 12.3745 13.125Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.62451 13.125C8.62451 12.7108 8.9603 12.375 9.37451 12.375H10.6245C11.0387 12.375 11.3745 12.7108 11.3745 13.125C11.3745 13.5392 11.0387 13.875 10.6245 13.875H9.37451C8.9603 13.875 8.62451 13.5392 8.62451 13.125Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.12451 7.56641C1.12451 7.15219 1.4603 6.81641 1.87451 6.81641H18.1245C18.5387 6.81641 18.8745 7.15219 18.8745 7.56641C18.8745 7.98062 18.5387 8.31641 18.1245 8.31641H1.87451C1.4603 8.31641 1.12451 7.98062 1.12451 7.56641Z"
        fill="currentColor"
      />
    </svg>
  )
})
