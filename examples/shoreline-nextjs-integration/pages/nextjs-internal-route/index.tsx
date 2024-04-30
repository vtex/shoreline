import {
  Button,
  Page,
  PageHeader,
  PageHeading,
  PageContent,
  Bleed,
  IconButton,
  PageHeaderRow,
  Flex,
} from '@vtex/shoreline'
import { IconArrowLeft } from '@vtex/shoreline-icons'
import { useNavigation } from '@vtex/raccoon-next'
import { generateRandomId } from '../../lib/generate-random-id'

export default function NextJSInternalRoute() {
  const { navigate } = useNavigation()

  return (
    <Page>
      <PageHeader>
        <PageHeaderRow>
          <Flex>
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
            <PageHeading>NextJS App Internal Static Route</PageHeading>
          </Flex>
        </PageHeaderRow>
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
