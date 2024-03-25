import {
  Button,
  Page,
  PageHeader,
  PageHeading,
  PageContent,
  Slot,
} from '@vtex/shoreline-components'
import { useNavigation } from '@vtex/raccoon-next'
import { generateRandomId } from '../../lib/generate-random-id'

export default function NextJSBaseRoute() {
  const { navigate } = useNavigation()

  return (
    <Page>
      <PageHeader>
        <Slot name="top">
          <Slot name="left">
            <PageHeading>
              NextJS App Base Static Route: another-nextjs-base-route
            </PageHeading>
          </Slot>
        </Slot>
      </PageHeader>
      <PageContent>
        <Button
          onClick={() =>
            // Must be an admin relative navigation type since the base route is different
            navigate('/admin/nextjs-base-route', {
              type: 'adminRelativeNavigation',
            })
          }
        >
          Navigate to nextjs-base-route
        </Button>
        <Button
          onClick={() =>
            navigate(`/another-nextjs-base-route/${generateRandomId()}`)
          }
        >
          Navigate to internal dynamic route
        </Button>
        <Button
          onClick={() =>
            navigate(
              // Must be an admin relative navigation type since the base route is different
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
