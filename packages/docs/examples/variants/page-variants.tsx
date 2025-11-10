import {
  Page,
  PageContent,
  PageHeader,
  PageHeading,
  Stack,
  Text,
} from '@vtex/shoreline'

export default function Example() {
  return (
    <Stack fluid>
      <Text variant="emphasis">Narrow Layout</Text>
      <Page>
        <PageHeader>
          <PageHeading>Narrow Page</PageHeading>
        </PageHeader>
        <PageContent layout="narrow">
          <div
            style={{
              padding: '1rem',
              background: '#f5f5f5',
              borderRadius: '4px',
            }}
          >
            Content with narrow layout
          </div>
        </PageContent>
      </Page>

      <Text variant="emphasis">Standard Layout</Text>
      <Page>
        <PageHeader>
          <PageHeading>Standard Page</PageHeading>
        </PageHeader>
        <PageContent layout="standard">
          <div
            style={{
              padding: '1rem',
              background: '#f5f5f5',
              borderRadius: '4px',
            }}
          >
            Content with standard layout
          </div>
        </PageContent>
      </Page>

      <Text variant="emphasis">Wide Layout</Text>
      <Page>
        <PageHeader>
          <PageHeading>Wide Page</PageHeading>
        </PageHeader>
        <PageContent layout="wide">
          <div
            style={{
              padding: '1rem',
              background: '#f5f5f5',
              borderRadius: '4px',
            }}
          >
            Content with wide layout
          </div>
        </PageContent>
      </Page>
    </Stack>
  )
}
