/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Fragment, Ref } from 'react'
import { Icon, IconProps } from '@vtex-components/icon'
import { forwardRef } from '@vtex-components/utils'

interface Props extends IconProps {
  /**
   * Whenever is on
   * @default false
   */
  on?: boolean
}

export const IconNotifications = forwardRef(
  (props: Props, ref: Ref<SVGSVGElement>) => {
    const { on = false, ...iconProps } = props

    return (
      <Icon {...iconProps} ref={ref}>
        <path
          d="M12.905 5.65676H12.907M12.907 5.65676H11.094C8.592 5.65676 6.563 7.68476 6.563 10.1878V12.9848C6.563 13.5148 6.352 14.0238 5.977 14.3988L5.336 15.0398C4.961 15.4148 4.75 15.9238 4.75 16.4538C4.75 17.4978 5.596 18.3438 6.64 18.3438H17.361C18.405 18.3438 19.251 17.4978 19.251 16.4538C19.251 15.9238 19.04 15.4148 18.665 15.0398L18.024 14.3988C17.649 14.0238 17.438 13.5148 17.438 12.9848V10.1881C17.438 7.68506 15.409 5.65676 12.907 5.65676Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9.70801 18.3438V18.7088C9.70801 19.9738 10.734 20.9998 12 20.9998V20.9998C13.266 20.9998 14.292 19.9738 14.292 18.7078V18.3428"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M13.833 5.751V4.833C13.833 3.821 13.013 3 12 3V3C10.987 3 10.167 3.821 10.167 4.833V5.751"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {on && (
          <Fragment>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              fillOpacity="1"
              d="M17.5 6C18.881 6 20 7.119 20 8.5C20 9.881 18.881 11 17.5 11C16.119 11 15 9.881 15 8.5C15 7.119 16.12 6 17.5 6"
              sx={{
                fill: 'emphasis',
              }}
            />
            <path
              d="M17.5 6C18.881 6 20 7.119 20 8.5C20 9.881 18.881 11 17.5 11C16.119 11 15 9.881 15 8.5C15 7.119 16.12 6 17.5 6"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              sx={{
                stroke: 'emphasis',
              }}
            />
          </Fragment>
        )}
      </Icon>
    )
  }
)
