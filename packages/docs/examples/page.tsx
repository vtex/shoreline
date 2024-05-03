import { Page, PageContent, PageHeader, PageHeading } from '@vtex/shoreline'
import { DecorativeBox } from '../components/decorative-box'

export default function Example() {
  return (
    <Page>
      <PageHeader>
        <PageHeading>Heading</PageHeading>
      </PageHeader>
      <PageContent>
        <DecorativeBox subtle height="200px" />
      </PageContent>
    </Page>
  )
}
