import {
  Button,
  Page,
  PageHeader,
  PageHeading,
  PageContent,
  Slot,
  Bleed,
  IconButton,
} from '@vtex/shoreline-components'
import { IconArrowLeft } from '@vtex/shoreline-icons'
import { useNavigation } from '@vtex/raccoon-next'
import { useRouter } from 'next/router'
import { generateRandomId } from '../../lib/generate-random-id'
import { items } from '../../lib/items'

const getItem = (id: any) => items.find((item) => item.id === id)

export default function PromotionEdit() {
  const router = useRouter()
  const id = router.query.id as string
  const item = getItem(id)
  const { navigate } = useNavigation()

  return (
    <Page>
      <PageHeader>
        <Slot name="top">
          <Slot name="left">
            <Bleed top="$space-2" bottom="$space-2">
              <IconButton
                label="Return"
                asChild
                variant="tertiary"
                size="large"
                onClick={() => navigate('/')}
              >
                <IconArrowLeft />
              </IconButton>
            </Bleed>
            <PageHeading>
              NextJS App Internal Dynamic Route: {item?.name}
            </PageHeading>
          </Slot>
        </Slot>
      </PageHeader>
      <PageContent>
        <Button onClick={() => navigate('/')}>Navigate to base route</Button>
        <Button onClick={() => navigate(`/nextjs-internal-route`)}>
          Navigate to Internal Static Route
        </Button>
        <Button
          onClick={() =>
            navigate(
              `/admin/vtex-render/not-a-nextjs-route/${generateRandomId()}`,
              {
                type: 'adminRelativeNavigation',
              }
            )
          }
        >
          Navigate to VTEX IO Route with same Base Route
        </Button>
      </PageContent>
    </Page>
  )
}
