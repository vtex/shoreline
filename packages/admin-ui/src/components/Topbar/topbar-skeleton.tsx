import React, { Fragment } from 'react'
import { TopbarStart, TopbarCenter, TopbarEnd } from './topbar'
import { Set } from '../Set'
import { Center } from '../Center'
import { Skeleton } from '../Skeleton'

/**
 * Topbar loading Skeleton
 */
export function TopbarSkeleton() {
  return (
    <Fragment>
      <TopbarStart>
        <Set spacing="$l">
          <Center csx={{ padding: '$xs' }}>
            <Skeleton csx={{ size: '1.5rem' }} />
          </Center>
          <Skeleton csx={{ width: '8rem', height: '1rem' }} />
        </Set>
      </TopbarStart>
      <TopbarCenter>
        <Skeleton csx={{ width: '13.75rem', height: '2rem' }} />
      </TopbarCenter>
      <TopbarEnd>
        <Set spacing="$m">
          <Center csx={{ padding: '$xs' }}>
            <Skeleton csx={{ height: '1.25rem', width: '5.563rem' }} />
          </Center>
          <Center csx={{ padding: '$xs' }}>
            <Skeleton csx={{ size: '1.25rem' }} />
          </Center>
          <Center csx={{ padding: '$xs' }}>
            <Skeleton csx={{ size: '1.25rem' }} />
          </Center>
          <Center csx={{ padding: '$xs' }}>
            <Skeleton csx={{ size: '1.5rem' }} />
          </Center>
        </Set>
      </TopbarEnd>
    </Fragment>
  )
}
