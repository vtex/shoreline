import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'
import { Tab, style } from '@vtex/shoreline'
import Link from 'next/link'

/**
 * This component uses Next's Parallel Routes to allow tabs to change the browser URL
 * @see https://nextjs.org/docs/app/building-your-application/routing/parallel-routes
 * @example
 * function Layout(props: { tabs: React.ReactNode }) {
 *
 *  return (
 *    <NextTabProvider>
 *      <NextTabList>
 *        <NextTab href="/">Features</NextTab>
 *        <NextTab href="/new">New</NextTab>
 *      </NextTabList>
 *      <NextTabPanel>{props.tabs}</NextTabPanel>
 *    </NextTabProvider>
 *  )
 * }
 */
export const NextTab = forwardRef<HTMLAnchorElement, NextTabProps>(
  function NextTab(props, ref) {
    const { children, style: customStyle, ...linkProps } = props
    const id = props.href.toString()

    return (
      <Tab id={id} asChild>
        <Link
          style={style({ textDecoration: 'none', ...customStyle })}
          ref={ref}
          {...linkProps}
        >
          {children}
        </Link>
      </Tab>
    )
  }
)

export type NextTabProps = ComponentPropsWithoutRef<typeof Link>
