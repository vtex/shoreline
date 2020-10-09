import React, { Ref } from 'react'
import { Icon, IconProps } from '@vtex-components/icon'
import { forwardRef } from '@vtex-components/utils'

export const IconKeys = forwardRef(
  (props: IconProps, ref: Ref<SVGSVGElement>) => (
    <Icon {...props} ref={ref}>
      <path
        d="M8.294 10.7051C8.294 10.5421 8.162 10.4111 8 10.4111C7.837 10.4121 7.706 10.5441 7.706 10.7061C7.706 10.8691 7.838 11.0001 8 11.0001C8.162 11.0001 8.294 10.8681 8.294 10.7051"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 10.411V5.5C8 4.119 9.119 3 10.5 3V3C11.881 3 13 4.119 13 5.5V6.072"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.1621 15.183C10.9691 15.741 11.9451 16.072 13.0001 16.072C13.6621 16.072 14.2901 15.937 14.8681 15.703L17.8771 18.708C18.0651 18.895 18.3191 19 18.5831 19H20.0001C20.5521 19 21.0001 18.552 21.0001 18V16.588C21.0001 16.322 20.8941 16.068 20.7061 15.88L17.6621 12.84C17.8721 12.289 18.0001 11.697 18.0001 11.072C18.0001 8.31102 15.7611 6.07202 13.0001 6.07202C12.2161 6.07202 11.4841 6.26802 10.8241 6.59002"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.00375 15.2681C5.44675 15.0251 4.92075 14.6861 4.46475 14.2301C2.51175 12.2771 2.51175 9.11209 4.46475 7.15909C6.41775 5.20609 9.58275 5.20609 11.5358 7.15909C13.4888 9.11209 13.4888 12.2771 11.5358 14.2301C11.0818 14.6841 10.5577 15.0211 10.0037 15.2641L10.0068 19.5011C10.0068 19.7671 9.90175 20.0211 9.71375 20.2091L8.71575 21.2071C8.32475 21.5981 7.69175 21.5981 7.30175 21.2071L6.29975 20.2051C6.11275 20.0181 6.00675 19.7641 6.00675 19.4991L6.00375 15.2681Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  )
)
