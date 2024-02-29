import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import React from 'react'
import NextLink from 'next/link'
import { cx } from '@vtex/shoreline-utils'

export function RelatedComponent(props: RelatedComponent) {
  const { children, title, description, icon, href, ...restProps } = props

  return (
    <NextLink
      href={href}
      className="nextra-card nx-group nx-flex nx-flex-col nx-justify-start nx-overflow-hidden nx-rounded-lg nx-border nx-border-gray-200 nx-text-current nx-no-underline dark:nx-shadow-none hover:nx-shadow-gray-100 dark:hover:nx-shadow-none nx-shadow-gray-100 active:nx-shadow-sm active:nx-shadow-gray-200 nx-transition-all nx-duration-200 hover:nx-border-gray-300 nx-bg-transparent nx-shadow-sm dark:nx-border-neutral-800 hover:nx-bg-slate-50 hover:nx-shadow-md dark:hover:nx-border-neutral-700 dark:hover:nx-bg-neutral-900"
      {...restProps}
    >
      <h3
        className={cx(
          'nx-flex nx-font-semibold nx-items-start nx-gap-2 nx-p-4 nx-text-gray-700 hover:nx-text-gray-900 dark:nx-text-neutral-200 dark:hover:nx-text-neutral-50',
          description && 'nx-pb-0'
        )}
      >
        {icon}
        {title}
      </h3>

      {description && (
        <p className="nx-flex nx-items-start nx-gap-2 nx-pb-4 nx-px-4 nx-text-sm nx-text-gray-600 group-hover:nx-text-gray-600 nx-duration-75 nx-transition-colors dark:nx-text-neutral-400 dark:group-hover:nx-text-neutral-100 nx-flex nx-items-center">
          {description}
        </p>
      )}
    </NextLink>
  )
}

interface RelatedComponent extends ComponentPropsWithoutRef<'a'> {
  children: ReactNode
  title: string
  href: string
  icon: ReactNode
  description?: string
}
