import {
  Button,
  Page,
  PageContent,
  PageHeader,
  PageHeaderTitle,
  PageHeaderTop,
} from '@vtex/admin-ui'
import { useNavigation } from '@vtex/raccoon-next'
import { useRouter } from 'next/router'
import { items } from '../index'
import { generateRandomId } from '../../lib/generate-random-id'

const getItem = (id: any) => items.find((item) => item.id === id)

export default function PromotionEdit() {
  const router = useRouter()
  const id = router.query.id as string
  const item = getItem(id)
  const { navigate } = useNavigation()

  return (
    <Page>
      <PageHeader onPopNavigation={() => navigate(`/`)}>
        <PageHeaderTop>
          <PageHeaderTitle>
            NextJS App Internal Dynamic Route: {item?.name}
          </PageHeaderTitle>
        </PageHeaderTop>
      </PageHeader>
      <PageContent>
        <Button onClick={() => navigate('/')}>Navigate to base route</Button>
        <Button onClick={() => navigate(`/nextjs-internal-route`)}>
          Navigate to Internal Static Route
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
