import React from 'react'
import { Illustration, IllustrationProps } from '../Illustration'

export function CollectionError(props: IllustrationProps) {
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
        <circle cx="35.6364" cy="27.8182" r="19.6364" fill="white" />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M49.6702 44.35C41.1389 51.5231 28.3882 51.0955 20.3599 43.0674C11.88 34.5877 11.88 20.8394 20.3599 12.3598C28.8397 3.88008 42.5883 3.88008 51.0681 12.3598C59.0967 20.3882 59.524 33.1394 52.3499 41.6705L61.445 50.7655C62.185 51.5054 62.185 52.7051 61.445 53.445C60.7051 54.185 59.5054 54.185 58.7654 53.445L49.6702 44.35ZM23.0395 15.0393C30.0394 8.03951 41.3886 8.03951 48.3885 15.0393C55.3307 21.9814 55.388 33.2012 48.5603 40.2138C48.4962 40.2632 48.4345 40.3173 48.3758 40.3761C48.3171 40.4348 48.263 40.4964 48.2136 40.5604C41.2008 47.3872 29.9814 47.3297 23.0395 40.3879C16.0395 33.3881 16.0395 22.0391 23.0395 15.0393Z"
          fill="#B6C3E1"
        />
        <path
          d="M37.5156 27.7273V20.4578C37.5156 19.6531 36.8436 19 36.0156 19C35.1876 19 34.5156 19.6531 34.5156 20.4578V27.7273C34.5156 28.532 35.1876 29.1851 36.0156 29.1851C36.8436 29.1851 37.5156 28.532 37.5156 27.7273Z"
          fill="#B6C3E1"
        />
        <path
          d="M34 34.0621C33.994 32.9814 34.898 32.1126 35.998 32.1126C37.1 32.1126 38 32.9795 38 34.0563C38 35.1292 37.104 36 36 36C34.898 36 34.004 35.1331 34 34.0621Z"
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
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
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
