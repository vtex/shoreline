import type { ComponentPropsWithoutRef } from 'react'
import { forwardRef } from 'react'

export const IconMegaphoneFill = forwardRef<
  SVGSVGElement,
  ComponentPropsWithoutRef<'svg'>
>(function IconMegaphoneFill(props, ref) {
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
        d="M5 5.62503H8.10938C8.33672 5.61174 12.2984 5.33284 16.0711 2.16878C16.2533 2.01577 16.4753 1.91793 16.7112 1.88676C16.9471 1.85558 17.1869 1.89236 17.4026 1.99278C17.6183 2.09319 17.8008 2.25307 17.9288 2.45364C18.0567 2.6542 18.1248 2.88712 18.125 3.12503V15.625C18.125 15.863 18.057 16.096 17.9291 16.2967C17.8012 16.4974 17.6187 16.6574 17.4029 16.7579C17.1872 16.8584 16.9473 16.8953 16.7114 16.8641C16.4755 16.833 16.2533 16.7351 16.0711 16.5821C13.1203 14.1071 10.0555 13.3977 8.75 13.1992V15.6774C8.75026 15.8833 8.69962 16.0862 8.60258 16.2679C8.50553 16.4496 8.36509 16.6045 8.19375 16.7188L7.33438 17.2914C7.16827 17.4023 6.97802 17.4718 6.77955 17.494C6.58109 17.5162 6.38019 17.4906 6.19367 17.4192C6.00716 17.3478 5.84046 17.2328 5.70754 17.0837C5.57462 16.9347 5.47934 16.756 5.42969 16.5625L4.51016 13.0969C3.55958 12.9801 2.68971 12.5041 2.07894 11.7664C1.46818 11.0287 1.16281 10.0852 1.22546 9.12957C1.28811 8.1739 1.71404 7.27841 2.41589 6.62677C3.11774 5.97512 4.04231 5.61671 5 5.62503ZM6.64063 16.2414V16.25L7.5 15.6774V13.125H5.8125L6.64063 16.2414ZM5 11.875H7.5V6.87503H5C4.33696 6.87503 3.70108 7.13842 3.23223 7.60726C2.76339 8.0761 2.5 8.71198 2.5 9.37503C2.5 10.0381 2.76339 10.674 3.23223 11.1428C3.70108 11.6116 4.33696 11.875 5 11.875Z"
        fill="currentColor"
      />
    </svg>
  )
})
