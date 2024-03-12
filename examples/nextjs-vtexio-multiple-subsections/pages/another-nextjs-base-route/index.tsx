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
import { generateRandomId } from '../../lib/generate-random-id'

export default function NextJSBaseRoute() {
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
              NextJS App Base Static Route: another-nextjs-base-route
            </PageHeading>
          </Slot>
        </Slot>
      </PageHeader>
      <PageContent>
        <Button
          onClick={() =>
            navigate('/admin/nextjs-base-route', {
              type: 'adminRelativeNavigation',
            })
          }
        >
          Navigate to nextjs-base-route
        </Button>
        <Button onClick={() => navigate(`/${generateRandomId()}`)}>
          Navigate to Internal Dynamic Route
        </Button>
        <Button
          onClick={() =>
            navigate(
              `/admin/nextjs-base-route/not-a-nextjs-route/${generateRandomId()}`,
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
