import { useMemo, useCallback } from 'react'
import { useSafeLayoutEffect } from '@vtex/admin-ui-hooks'

const animationTimeout = 300

const entranceTransition = 'transform 0.2s ease, opacity 0.2s ease'
const exitTransition = 'opacity 0.1s ease'

interface Transform {
  property: 'opacity' | 'transform' | 'scale'
  from?: string
  to?: string
}

interface AnimateProps {
  element: HTMLElement
  transforms: Transform[]
  transition: string
  onAnimate?: () => void
}

const animate = (props: AnimateProps) => {
  const { element, transforms, transition, onAnimate } = props

  const fallbackTimeout = setTimeout(() => {
    onAnimate?.()
  }, animationTimeout)

  transforms.forEach(({ property, from = '' }) => {
    element.style.setProperty(property, from)
  })
  element.style.setProperty('transition', '')

  const transitionEndHandler = (ev: TransitionEvent) => {
    if (ev.target !== element) {
      return
    }

    element.style.setProperty('transition', '')

    onAnimate?.()

    element.removeEventListener('transitionend', transitionEndHandler)

    clearTimeout(fallbackTimeout)
  }

  element.addEventListener('transitionend', transitionEndHandler)

  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(() => {
      element.style.setProperty('transition', transition)

      transforms.forEach(({ property, to = '' }) => {
        element.style.setProperty(property, to)
      })
    })
  })
}

export const useAnimatedList = () => {
  const refs = useMemo(() => new Map<string, HTMLElement | null>(), [])
  const positions = useMemo(() => new Map<string, number>(), [])

  useSafeLayoutEffect(() => {
    const animations: Array<{
      element: HTMLElement
      transforms: Transform[]
      transition: string
    }> = []

    Array.from(refs.entries()).forEach(([id, element]) => {
      if (element) {
        const prevTop = positions.get(id)
        const { top, height } = element.getBoundingClientRect()

        if (typeof prevTop === 'number' && prevTop !== top) {
          // Move animation
          animations.push({
            element,
            transition: entranceTransition,
            transforms: [
              {
                property: 'transform',
                from: `translateY(${prevTop - top}px)`,
              },
            ],
          })
        } else if (typeof prevTop !== 'number') {
          // Enter animation
          animations.push({
            element,
            transition: entranceTransition,
            transforms: [
              {
                property: 'transform',
                from: `translateY(${height}px)`,
              },
              {
                property: 'opacity',
                from: '0',
              },
            ],
          })
        }

        positions.set(id, element.getBoundingClientRect().top)
      } else {
        refs.delete(id)
      }
    })

    animations.forEach((animation) => {
      animate(animation)
    })
  })

  const remove = useCallback(
    (id: string, onAnimate: () => void) => {
      const element = refs.get(id)

      if (element) {
        // Removal animation
        animate({
          element,
          transforms: [
            {
              property: 'opacity',
              to: '0',
            },
          ],
          transition: exitTransition,
          onAnimate,
        })
      }
    },
    [refs]
  )

  const itemRef = useCallback(
    (id: string) => (ref: HTMLElement | null) => {
      refs.set(id, ref)
    },
    [refs]
  )

  return {
    itemRef,
    remove,
  }
}
