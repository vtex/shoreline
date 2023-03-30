import React from 'react'

import type { IllustrationProps } from './Illustration'
import { Illustration } from './Illustration'

export function CollectionError(props: IllustrationProps) {
  const {
    width = 160,
    height = 161,
    viewBox = '0 0 160 161',
    ...illustrationProps
  } = props

  return (
    <Illustration
      width={width}
      height={height}
      viewBox={viewBox}
      {...illustrationProps}
    >
      <g clipPath="url(#clip0_8970_392336)">
        <path
          d="M6 34.5C6 32.2909 7.79086 30.5 10 30.5H102C104.209 30.5 106 32.2909 106 34.5V126.5C106 128.709 104.209 130.5 102 130.5H10C7.79086 130.5 6 128.709 6 126.5V34.5Z"
          fill="white"
        />
        <rect
          x="18"
          y="42.5"
          width="48"
          height="6"
          rx="3"
          fill="#CC3D3D"
          fillOpacity="0.4"
        />
        <rect
          x="18"
          y="56.5"
          width="52"
          height="6"
          rx="3"
          fill="#CC3D3D"
          fillOpacity="0.4"
        />
        <rect
          x="18"
          y="70.5"
          width="48"
          height="6"
          rx="3"
          fill="#CC3D3D"
          fillOpacity="0.3"
        />
        <rect
          x="18"
          y="84.5"
          width="52"
          height="6"
          rx="3"
          fill="#CC3D3D"
          fillOpacity="0.3"
        />
        <rect
          x="18"
          y="98.5"
          width="43"
          height="6"
          rx="3"
          fill="#CC3D3D"
          fillOpacity="0.2"
        />
        <rect
          x="18"
          y="112.5"
          width="48"
          height="6"
          rx="3"
          fill="#CC3D3D"
          fillOpacity="0.2"
        />
        <circle
          cx="111.284"
          cy="74.2157"
          r="25.2843"
          transform="rotate(-90 111.284 74.2157)"
          fill="white"
          stroke="#CC3D3D"
          strokeWidth="6"
        />
        <rect
          x="127.513"
          y="94.2559"
          width="6"
          height="29.4511"
          rx="3"
          transform="rotate(-45 127.513 94.2559)"
          fill="#CC3D3D"
        />
        <path
          d="M109.61 77.3372L109.207 64.5315C109.189 63.9671 109.642 63.5 110.206 63.5H112.007C112.572 63.5 113.025 63.9685 113.006 64.5336L112.576 77.3372H109.61ZM111.122 84.5C110.483 84.5 109.969 84.2965 109.581 83.8895C109.194 83.4632 109 82.9496 109 82.3488C109 81.7674 109.194 81.2636 109.581 80.8372C109.969 80.4109 110.483 80.1977 111.122 80.1977C111.762 80.1977 112.275 80.4109 112.663 80.8372C113.07 81.2636 113.273 81.7674 113.273 82.3488C113.273 82.9496 113.07 83.4632 112.663 83.8895C112.275 84.2965 111.762 84.5 111.122 84.5Z"
          fill="#CC3D3D"
          stroke="#CC3D3D"
        />
      </g>
      <defs>
        <clipPath id="clip0_8970_392336">
          <rect
            width="160"
            height="160"
            fill="white"
            transform="translate(0 0.5)"
          />
        </clipPath>
      </defs>
    </Illustration>
  )
}
