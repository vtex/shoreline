import React from 'react'
import { Page, PageContent, PageHeader, PageHeading } from '@vtex/shoreline'
import { DecorativeBox } from '../components/decorative-box'

export default function Example() {
  return (
    <Page>
      <PageHeader>
        <PageHeading>Heading</PageHeading>
      </PageHeader>
      <PageContent>
        <DecorativeBox height="200px" />
      </PageContent>
    </Page>
  )
}
