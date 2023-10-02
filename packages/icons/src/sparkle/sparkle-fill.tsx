import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

export const IconSparkleFill = forwardRef<
  SVGSVGElement,
  ComponentPropsWithoutRef<'svg'>
>(function IconSparkleFill(props, ref) {
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
        d="M16.25 11.25C16.2516 11.5048 16.1742 11.7539 16.0284 11.9629C15.8826 12.1719 15.6756 12.3306 15.4359 12.4172L11.4008 13.9016L9.91641 17.9336C9.82851 18.1724 9.66947 18.3785 9.46075 18.5241C9.25204 18.6697 9.00369 18.7477 8.74922 18.7477C8.49475 18.7477 8.2464 18.6697 8.03769 18.5241C7.82898 18.3785 7.66994 18.1724 7.58203 17.9336L6.09375 13.9062L2.06094 12.4219C1.82213 12.334 1.61604 12.1749 1.47046 11.9662C1.32488 11.7575 1.24683 11.5092 1.24683 11.2547C1.24683 11.0002 1.32488 10.7519 1.47046 10.5432C1.61604 10.3344 1.82213 10.1754 2.06094 10.0875L6.0961 8.60313L7.58047 4.57109C7.66837 4.33229 7.82741 4.12619 8.03613 3.98061C8.24484 3.83504 8.49319 3.75698 8.74766 3.75698C9.00213 3.75698 9.25047 3.83504 9.45919 3.98061C9.6679 4.12619 9.82694 4.33229 9.91485 4.57109L11.3992 8.60625L15.4313 10.0906C15.6706 10.176 15.8777 10.3331 16.0242 10.5407C16.1708 10.7482 16.2496 10.9959 16.25 11.25ZM11.875 3.75H13.125V5C13.125 5.16576 13.1908 5.32473 13.3081 5.44194C13.4253 5.55915 13.5842 5.625 13.75 5.625C13.9158 5.625 14.0747 5.55915 14.1919 5.44194C14.3092 5.32473 14.375 5.16576 14.375 5V3.75H15.625C15.7908 3.75 15.9497 3.68415 16.0669 3.56694C16.1842 3.44973 16.25 3.29076 16.25 3.125C16.25 2.95924 16.1842 2.80027 16.0669 2.68306C15.9497 2.56585 15.7908 2.5 15.625 2.5H14.375V1.25C14.375 1.08424 14.3092 0.925268 14.1919 0.808058C14.0747 0.690848 13.9158 0.625 13.75 0.625C13.5842 0.625 13.4253 0.690848 13.3081 0.808058C13.1908 0.925268 13.125 1.08424 13.125 1.25V2.5H11.875C11.7092 2.5 11.5503 2.56585 11.4331 2.68306C11.3158 2.80027 11.25 2.95924 11.25 3.125C11.25 3.29076 11.3158 3.44973 11.4331 3.56694C11.5503 3.68415 11.7092 3.75 11.875 3.75ZM18.75 6.25H18.125V5.625C18.125 5.45924 18.0592 5.30027 17.9419 5.18306C17.8247 5.06585 17.6658 5 17.5 5C17.3342 5 17.1753 5.06585 17.0581 5.18306C16.9408 5.30027 16.875 5.45924 16.875 5.625V6.25H16.25C16.0842 6.25 15.9253 6.31585 15.8081 6.43306C15.6908 6.55027 15.625 6.70924 15.625 6.875C15.625 7.04076 15.6908 7.19973 15.8081 7.31694C15.9253 7.43415 16.0842 7.5 16.25 7.5H16.875V8.125C16.875 8.29076 16.9408 8.44973 17.0581 8.56694C17.1753 8.68415 17.3342 8.75 17.5 8.75C17.6658 8.75 17.8247 8.68415 17.9419 8.56694C18.0592 8.44973 18.125 8.29076 18.125 8.125V7.5H18.75C18.9158 7.5 19.0747 7.43415 19.1919 7.31694C19.3092 7.19973 19.375 7.04076 19.375 6.875C19.375 6.70924 19.3092 6.55027 19.1919 6.43306C19.0747 6.31585 18.9158 6.25 18.75 6.25Z"
        fill="currentColor"
      />
    </svg>
  )
})
