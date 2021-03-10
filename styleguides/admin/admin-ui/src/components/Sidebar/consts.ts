import { Transition } from 'framer-motion'

export const SCALES = {
  MAX_SIDEBAR_WIDTH: '16rem',
  COLLAPSIBLE_AREA_WIDTH: '12.5rem',
  FIXED_AREA_WIDTH: '3.5rem',
  COLLAPSED_BACKDROP_WIDTH: '0.625rem',
}

export const transition: Transition = {
  type: 'spring',
  damping: 50,
  stiffness: 700,
}
