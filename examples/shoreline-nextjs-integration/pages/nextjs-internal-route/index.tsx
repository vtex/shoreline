import {
  Button,
  Page,
  PageContent,
  PageHeader,
  PageHeaderTitle,
  PageHeaderTop,
} from '@vtex/admin-ui'
import { useNavigation } from '@vtex/raccoon-next'
import { generateRandomId } from '../../lib/generate-random-id'

export default function NextJSInternalRoute() {
  const { navigate } = useNavigation()

  return (
    <Page>
      <PageHeader onPopNavigation={() => navigate('/')}>
        <PageHeaderTop>
          <PageHeaderTitle>NextJS App Internal Static Route</PageHeaderTitle>
        </PageHeaderTop>
      </PageHeader>
      <PageContent>
        <Button onClick={() => navigate('/')}>Navigate to base route</Button>
        <Button
          onClick={() =>
            navigate(`/nextjs-internal-route/${generateRandomId()}`)
          }
        >
          Navigate to Internal Dynamic Route
        </Button>
        <Button
          onClick={() => navigate(`/not-a-nextjs-route/${generateRandomId()}`)}
        >
          Navigate to VTEX IO Route with same Base Route
        </Button>
      </PageContent>
    </Page>
  )
}
