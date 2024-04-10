import type { ReactNode } from 'react'
import React, { Fragment } from 'react'

import allProps from '../../__props__'
import { Divider, Flex, Grid, GridCell, Text } from '@vtex/shoreline'
import styles from './props-of.module.css'

export function PropsOf(props: PropsOfProps) {
  const { name, required = false } = props

  const reference = allProps[name]

  if (!reference) {
    return <></>
  }

  const propsToRender = required
    ? reference.props.filter((p: Record<string, any>) => !p.optional)
    : reference.props.filter((p: Record<string, any>) => p.optional)

  if (propsToRender.length === 0) {
    return <Text>-</Text>
  }

  return (
    <Flex direction="column" className={styles.propsOf}>
      {propsToRender.map((prop: Record<string, any>, index: number) => {
        const type = prop.type
          .split('|')
          .map((t: string) => t.trim().replace(/"/g, ''))
          .filter((t: string) => (prop.optional ? t !== 'undefined' : t))

        const defaultValue =
          String(prop.defaultValue).trim().replace(/'/g, '') ?? 'undefined'

        return (
          <Fragment>
            <div key={prop.name} className={styles.prop}>
              <h4 className="nx-font-semibold nx-tracking-tight nx-text-slate-900 dark:nx-text-slate-100 ">
                {prop.name}
              </h4>
              <p className="nx-mt-1 nx-mb-2 nx-leading-7 nx-text-gray-500">
                {prop.description}
              </p>
              <Grid columns="auto 1fr">
                <GridCell>
                  <Text variant="body">type</Text>
                </GridCell>
                <GridCell>
                  <Flex gap="$space-1">
                    {type.map((t: string) => (
                      <Tag key={t}>{t}</Tag>
                    ))}
                  </Flex>
                </GridCell>
                <GridCell>
                  <Text variant="body">default</Text>
                </GridCell>
                <GridCell>
                  <Tag color="green">{defaultValue}</Tag>
                </GridCell>
              </Grid>
            </div>
            {index < propsToRender.length - 1 && <Divider />}
          </Fragment>
        )
      })}
    </Flex>
  )
}

function Tag(props: TagProps) {
  const { color = 'purple', children } = props

  return (
    <div className={styles.tag} data-color={color}>
      {children ?? 'undefined'}
    </div>
  )
}

interface TagProps {
  color?: 'purple' | 'green'
  children?: ReactNode
}

interface PropsOfProps {
  name: string
  required?: boolean
}
