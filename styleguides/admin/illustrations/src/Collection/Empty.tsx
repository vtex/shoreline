import React from 'react'
import { Illustration, IllustrationProps } from '../Illustration'

export function CollectionEmpty(props: IllustrationProps) {
  const {
    width = 191,
    height = 102,
    viewBox = '0 0 191 102',
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
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M49.6702 44.35C41.1389 51.5231 28.3882 51.0955 20.3599 43.0674C11.88 34.5877 11.88 20.8394 20.3599 12.3598C28.8397 3.88008 42.5883 3.88008 51.0681 12.3598C59.0967 20.3882 59.524 33.1394 52.3499 41.6705L61.445 50.7655C62.185 51.5054 62.185 52.7051 61.445 53.445C60.7051 54.185 59.5054 54.185 58.7654 53.445L49.6702 44.35ZM23.0395 15.0393C30.0394 8.03951 41.3886 8.03951 48.3885 15.0393C55.3307 21.9814 55.388 33.2012 48.5603 40.2138C48.4962 40.2632 48.4345 40.3173 48.3758 40.3761C48.3171 40.4348 48.263 40.4964 48.2136 40.5604C41.2008 47.3872 29.9814 47.3297 23.0395 40.3879C16.0395 33.3881 16.0395 22.0391 23.0395 15.0393Z"
          fill="#B6C3E1"
        />
      </g>
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M35.4985 20.8468C35.9609 20.8468 36.3357 21.2216 36.3357 21.684L36.3357 34.3132C36.3357 34.7756 35.9609 35.1505 35.4985 35.1505C35.0362 35.1505 34.6613 34.7756 34.6613 34.3132L34.6613 21.684C34.6613 21.2216 35.0362 20.8468 35.4985 20.8468Z"
        fill="#B6C3E1"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M42.6504 27.9986C42.6504 28.461 42.2755 28.8358 41.8132 28.8358H29.1839C28.7215 28.8358 28.3467 28.461 28.3467 27.9986C28.3467 27.5362 28.7215 27.1614 29.1839 27.1614H41.8132C42.2755 27.1614 42.6504 27.5362 42.6504 27.9986Z"
        fill="#B6C3E1"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M35.4985 20.8468C35.9609 20.8468 36.3357 21.2216 36.3357 21.684L36.3357 34.3132C36.3357 34.7756 35.9609 35.1505 35.4985 35.1505C35.0362 35.1505 34.6613 34.7756 34.6613 34.3132L34.6613 21.684C34.6613 21.2216 35.0362 20.8468 35.4985 20.8468Z"
        stroke="#B6C3E1"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M42.6504 27.9986C42.6504 28.461 42.2755 28.8358 41.8132 28.8358H29.1839C28.7215 28.8358 28.3467 28.461 28.3467 27.9986C28.3467 27.5362 28.7215 27.1614 29.1839 27.1614H41.8132C42.2755 27.1614 42.6504 27.5362 42.6504 27.9986Z"
        stroke="#B6C3E1"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
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
