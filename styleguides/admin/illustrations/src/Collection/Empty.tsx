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
        x="27"
        y="46"
        width="142.769"
        height="16"
        rx="2"
        fill="#DAE3F5"
      />
      <rect
        opacity="0.6"
        x="27"
        y="66"
        width="150.154"
        height="16"
        rx="2"
        fill="#DAE3F5"
      />
      <rect
        opacity="0.4"
        x="27"
        y="86"
        width="135.385"
        height="16"
        rx="2"
        fill="#DAE3F5"
      />
      <rect x="27" y="18" width="164" height="24" rx="2" fill="#DAE3F5" />
      <g filter="url(#filter0_d)">
        <circle
          cx="36"
          cy="28"
          r="20.25"
          fill="white"
          stroke="#B6C3E1"
          stroke-width="3.5"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M36.2427 21.0909C36.7051 21.0909 37.0799 21.4658 37.0799 21.9281L37.0799 34.5574C37.0799 35.0198 36.7051 35.3946 36.2427 35.3946C35.7803 35.3946 35.4055 35.0198 35.4055 34.5574L35.4055 21.9281C35.4055 21.4658 35.7803 21.0909 36.2427 21.0909Z"
          fill="#B6C3E1"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M43.3945 28.2428C43.3945 28.7051 43.0197 29.08 42.5573 29.08H29.928C29.4657 29.08 29.0908 28.7051 29.0908 28.2428C29.0908 27.7804 29.4657 27.4056 29.928 27.4056H42.5573C43.0197 27.4056 43.3945 27.7804 43.3945 28.2428Z"
          fill="#B6C3E1"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M36.2427 21.0909C36.7051 21.0909 37.0799 21.4658 37.0799 21.9281L37.0799 34.5574C37.0799 35.0198 36.7051 35.3946 36.2427 35.3946C35.7803 35.3946 35.4055 35.0198 35.4055 34.5574L35.4055 21.9281C35.4055 21.4658 35.7803 21.0909 36.2427 21.0909Z"
          stroke="#B6C3E1"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M43.3945 28.2428C43.3945 28.7051 43.0197 29.08 42.5573 29.08H29.928C29.4657 29.08 29.0908 28.7051 29.0908 28.2428C29.0908 27.7804 29.4657 27.4056 29.928 27.4056H42.5573C43.0197 27.4056 43.3945 27.7804 43.3945 28.2428Z"
          stroke="#B6C3E1"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
      <defs>
        <filter
          id="filter0_d"
          x="0"
          y="0"
          width="72"
          height="72"
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
