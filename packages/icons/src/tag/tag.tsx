import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

export const IconTag = forwardRef<
  SVGSVGElement,
  ComponentPropsWithoutRef<'svg'>
>(function IconTag(props, ref) {
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
        d="M2.375 3.125C2.375 2.71079 2.71079 2.375 3.125 2.375H10.3664C10.7306 2.37517 11.0802 2.51981 11.3378 2.77719L19.0975 10.5369C19.3552 10.7947 19.5001 11.1445 19.5001 11.509C19.5001 11.8735 19.3554 12.2231 19.0977 12.4809L12.4835 19.0974C12.2257 19.3551 11.8758 19.5001 11.5113 19.5001C11.1468 19.5001 10.7972 19.3554 10.5394 19.0977L2.77756 11.3382C2.52019 11.0806 2.37517 10.7309 2.375 10.3668L2.375 3.125ZM3.875 3.875V10.3143L11.5113 17.9483L17.9483 11.509L10.3143 3.875H3.875Z"
        fill="currentColor"
      />
      <path
        d="M6.5625 7.34375C6.99397 7.34375 7.34375 6.99397 7.34375 6.5625C7.34375 6.13103 6.99397 5.78125 6.5625 5.78125C6.13103 5.78125 5.78125 6.13103 5.78125 6.5625C5.78125 6.99397 6.13103 7.34375 6.5625 7.34375Z"
        fill="currentColor"
      />
    </svg>
  )
})
