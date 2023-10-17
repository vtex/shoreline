import type { NextPage } from 'next'
import { useAdmin, useNavigation } from '@vtex/raccoon-next'
import {
  Alert,
  Page,
  PageContent,
  PageHeader,
  PageHeaderTitle,
  PageHeaderTop,
  Button,
} from '@vtex/admin-ui'
import { faker } from '@faker-js/faker'
import { generateRandomId } from '../lib/generate-random-id'

export const ITEMS_PER_PAGE = 5

export const items = Array(ITEMS_PER_PAGE)
  .fill(1)
  .map((_, id) => {
    return {
      id: `${id}`,
      name: faker.commerce.productName(),
      brand: faker.company.buzzNoun(),
      price: faker.commerce.price(),
    }
  })

const Home: NextPage = () => {
  const { account, locale, workspace, token } = useAdmin()
  const { navigate } = useNavigation()

  return (
    <Page>
      <PageHeader>
        <PageHeaderTop>
          <PageHeaderTitle>NextJS App Base Route</PageHeaderTitle>
        </PageHeaderTop>
      </PageHeader>
      <PageContent layout="wide">
        <Alert>
          Hi, you are on {account} with locale {locale}. On workspace{' '}
          {workspace} and token {token.slice(0, 10)}... <br />
          Click on an item below to navigate to a VTEX IO app that shares the
          same base route of this NextJS app.
          <br />
          Click on the buttons below to navigate to the internal routes of this
          NextJS application and to VTEX IO routes.
        </Alert>
        <Button onClick={() => navigate('/nextjs-internal-route')}>
          Navigate to Internal Static Route
        </Button>
        <Button
          onClick={() =>
            navigate(`/nextjs-internal-route/${generateRandomId()}`)
          }
        >
          Navigate to Internal Dynamic Route
        </Button>
        <Button
          onClick={() =>
            navigate(`/admin/rocket/not-a-nextjs-route/${generateRandomId()}`, {
              type: 'adminRelativeNavigation',
            })
          }
        >
          Navigate to VTEX IO Route with same Base Route
        </Button>
      </PageContent>
    </Page>
  )
}

export default Home
