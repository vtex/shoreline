import React, { Ref } from 'react'
import { Icon, IconProps } from '@vtex-components/icon'
import { forwardRef } from '@vtex-components/utils'

export const IconActions = forwardRef(
  (props: IconProps, ref: Ref<SVGSVGElement>) => (
    <Icon {...props} ref={ref}>
      <path
        d="M11.25 12.004C11.25 12.418 11.586 12.754 12 12.75C12.414 12.75 12.75 12.414 12.75 12C12.75 11.586 12.414 11.25 12 11.25C11.586 11.252 11.25 11.588 11.25 12.004"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.25 6.00398C11.25 6.41798 11.586 6.75398 12 6.74998C12.414 6.74998 12.75 6.41398 12.75 5.99998C12.75 5.58598 12.414 5.24998 12 5.24998C11.586 5.25198 11.25 5.58798 11.25 6.00398"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.25 18.004C11.25 18.418 11.586 18.754 12 18.75C12.414 18.75 12.75 18.414 12.75 18C12.75 17.586 12.414 17.25 12 17.25C11.586 17.252 11.25 17.588 11.25 18.004"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  )
)
