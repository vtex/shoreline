import {
  Page,
  PageContent,
  PageHeader,
  PageHeaderRow,
  PageHeading,
  Button,
  Text,
} from '@vtex/shoreline'

export function DefaultPage() {
  return (
    <Page>
      <PageHeader>
        <PageHeading>Products</PageHeading>
      </PageHeader>
      <PageContent>
        <Text variant="body">This is the page content</Text>
      </PageContent>
    </Page>
  )
}

export function PageWithButton() {
  return (
    <Page>
      <PageHeader>
        <PageHeaderRow>
          <PageHeading>Products</PageHeading>
          <Button variant="primary">Add Product</Button>
        </PageHeaderRow>
      </PageHeader>
      <PageContent>
        <Text variant="body">This is the page content</Text>
      </PageContent>
    </Page>
  )
}

export function PageNarrow() {
  return (
    <Page>
      <PageHeader>
        <PageHeading>Settings</PageHeading>
      </PageHeader>
      <PageContent layout="narrow">
        <Text variant="body">This page has a narrow content layout</Text>
      </PageContent>
    </Page>
  )
}

export function PageWide() {
  return (
    <Page>
      <PageHeader>
        <PageHeading>Dashboard</PageHeading>
      </PageHeader>
      <PageContent layout="wide">
        <Text variant="body">This page has a wide content layout</Text>
      </PageContent>
    </Page>
  )
}
