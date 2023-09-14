import {
  Page,
  PageContent,
  PageHeader,
  PageHeaderTitle,
  PageHeaderTop,
} from '@vtex/admin-ui'
import { useNavigation } from '@vtex/raccoon-next'
import { useRouter } from 'next/router'
import { items } from './index'

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
          <PageHeaderTitle>{item?.name}</PageHeaderTitle>
        </PageHeaderTop>
      </PageHeader>
      <PageContent>
        Brand: {item?.brand}
        <br />
        id: {item?.id}
      </PageContent>
    </Page>
  )
}
