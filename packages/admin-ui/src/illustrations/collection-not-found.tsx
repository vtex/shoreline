import React from 'react'

import type { IllustrationProps } from './illustration'
import { Illustration } from './illustration'

export function CollectionNotFound(props: IllustrationProps) {
  const {
    width = 193,
    height = 97,
    viewBox = '0 0 193 97',
    ...illustrationProps
  } = props

  return (
    <Illustration
      width={width}
      height={height}
      viewBox={viewBox}
      {...illustrationProps}
    >
      <rect
        opacity="0.8"
        x="29"
        y="41"
        width="142.769"
        height="16"
        rx="2"
        fill="#DAE3F5"
      />
      <rect
        opacity="0.6"
        x="29"
        y="61"
        width="150.154"
        height="16"
        rx="2"
        fill="#DAE3F5"
      />
      <rect
        opacity="0.4"
        x="29"
        y="81"
        width="135.385"
        height="16"
        rx="2"
        fill="#DAE3F5"
      />
      <rect x="29" y="21" width="163.692" height="16" rx="2" fill="#DAE3F5" />
      <g filter="url(#filter0_d)">
        <circle cx="35.8182" cy="27.8182" r="19.6364" fill="white" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M49.6702 44.35C41.1389 51.5231 28.3882 51.0955 20.3599 43.0674C11.88 34.5877 11.88 20.8394 20.3599 12.3598C28.8397 3.88008 42.5883 3.88008 51.0681 12.3598C59.0967 20.3882 59.524 33.1394 52.3499 41.6705L61.445 50.7655C62.185 51.5054 62.185 52.7051 61.445 53.445C60.7051 54.185 59.5054 54.185 58.7654 53.445L49.6702 44.35ZM23.0395 15.0393C30.0394 8.03951 41.3886 8.03951 48.3885 15.0393C55.3307 21.9814 55.388 33.2012 48.5603 40.2138C48.4962 40.2632 48.4345 40.3173 48.3758 40.3761C48.3171 40.4348 48.263 40.4964 48.2136 40.5604C41.2008 47.3872 29.9814 47.3297 23.0395 40.3879C16.0395 33.3881 16.0395 22.0391 23.0395 15.0393Z"
          fill="#B6C3E1"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M35.9339 32.7129C36.7353 32.75 37.3653 33.3423 37.3653 34.083C37.3653 34.8401 36.6896 35.4546 35.8572 35.4546C35.0249 35.4546 34.3492 34.8401 34.3492 34.0949C34.341 33.3512 34.9841 32.7426 35.7919 32.7129L35.8556 32.7114L35.9339 32.7129ZM35.8066 34.9366C35.8229 34.938 35.8393 34.938 35.8556 34.938L35.8066 34.9366Z"
          fill="#B6C3E1"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M31.4546 24.1469C31.4546 21.9527 33.4115 20.1819 35.819 20.1819C38.2291 20.1819 40.1819 21.958 40.1819 24.1498C40.1819 25.8778 38.9421 26.7878 38.0876 27.3103L38.086 27.3112C37.3703 27.7474 37.0402 28.0889 37.0402 28.6709V29.0267C37.0402 29.6409 36.4927 30.1388 35.8174 30.1388C35.1421 30.1388 34.5946 29.6409 34.5946 29.0267V28.6709C34.5946 26.9195 35.8484 25.9977 36.7239 25.464C37.076 25.2486 37.3256 25.0598 37.4913 24.8567C37.6369 24.6783 37.7363 24.4672 37.7363 24.1498C37.7363 23.1863 36.8784 22.4061 35.819 22.4061C34.7572 22.4061 33.9001 23.1856 33.9001 24.1469C33.9001 24.7611 33.3527 25.259 32.6774 25.259C32.002 25.259 31.4546 24.7611 31.4546 24.1469Z"
          fill="#B6C3E1"
        />
      </g>
      <defs>
        <filter
          id="filter0_d"
          x="0"
          y="0"
          width="76"
          height="76"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy="8" />
          <feGaussianBlur stdDeviation="7" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.714028 0 0 0 0 0.765932 0 0 0 0 0.883333 0 0 0 0.6 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow"
            result="shape"
          />
        </filter>
      </defs>
    </Illustration>
  )
}