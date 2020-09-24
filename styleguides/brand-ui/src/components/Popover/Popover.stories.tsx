import React from 'react'
import { Story, Meta } from '@storybook/react'
import { Grid, Flex, Box, Link } from 'theme-ui'

import { Button } from '../Button'
import { Popover, PopoverProps } from './index'

export default {
  title: 'beta/Popover',
  component: Popover,
} as Meta

const Template: Story<PopoverProps> = ({ children, ...args }) => (
  <Popover
    {...args}
    disclosure={
      <Button size="small" sx={{ marginTop: 8, marginLeft: 10 }}>
        Click
      </Button>
    }
  >
    <Popover.Content>{children}</Popover.Content>
  </Popover>
)

export const SimpleUsage = Template.bind({})
SimpleUsage.args = {
  placement: 'top',
  variant: 'regular',
  children: 'Lorem ipsum dolor sit amet',
  visible: true,
  showClose: true,
}

export const WithBar = () => (
  <>
    <Popover
      visible
      disclosure={
        <Button size="small" sx={{ marginTop: 11, marginLeft: 10 }}>
          Click
        </Button>
      }
    >
      <Grid
        sx={{
          width: '100%',
          height: '100%',
          gridTemplateColumns: '0.6rem 10fr',
          gap: 0,
        }}
      >
        <Flex
          sx={{
            height: '100%',
            maxWidth: '0.6rem',
            borderTopLeftRadius: 3,
            borderBottomLeftRadius: 3,
            background: '#FFB100',
          }}
        />
        <Popover.Content sx={{ paddingX: 4 }}>
          Lorem ipsum
          <Box sx={{ marginTop: 2, padding: 3, bg: '#F6F7F8' }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
            tincidunt enim vel massa condimentum, elementum dictum erat
            accumsan.
          </Box>
          <Box sx={{ paddingY: 3 }}>
            <Link
              href="http://localhost:6007/?path=/story/beta-popover--with-bar"
              sx={{ color: 'primary.base' }}
            >
              Action Link
            </Link>
          </Box>
        </Popover.Content>
      </Grid>
    </Popover>
    <Popover
      visible
      disclosure={
        <Button size="small" sx={{ marginTop: 11, marginLeft: '22rem' }}>
          Click
        </Button>
      }
    >
      <Grid
        sx={{
          width: '100%',
          height: '100%',
          gridTemplateColumns: '0.6rem 10fr',
          gap: 0,
        }}
      >
        <Flex
          sx={{
            height: '100%',
            maxWidth: '0.6rem',
            borderTopLeftRadius: 3,
            borderBottomLeftRadius: 3,
            background: '#80BE80',
          }}
        />
        <Popover.Content sx={{ paddingX: 4 }}>
          Lorem ipsum
          <Box sx={{ marginTop: 2, padding: 3, bg: '#F6F7F8' }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
            tincidunt enim vel massa condimentum, elementum dictum erat
            accumsan.
          </Box>
          <Box sx={{ paddingY: 3 }}>
            <Link
              href="http://localhost:6007/?path=/story/beta-popover--with-bar"
              sx={{ color: 'primary.base' }}
            >
              Action Link
            </Link>
          </Box>
        </Popover.Content>
      </Grid>
    </Popover>
    <Popover
      visible
      disclosure={
        <Button size="small" sx={{ marginTop: 11, marginLeft: '22rem' }}>
          Click
        </Button>
      }
    >
      <Grid
        sx={{
          width: '100%',
          height: '100%',
          gridTemplateColumns: '0.6rem 10fr',
          gap: 0,
        }}
      >
        <Flex
          sx={{
            height: '100%',
            maxWidth: '0.6rem',
            borderTopLeftRadius: 3,
            borderBottomLeftRadius: 3,
            background: '#E76850',
          }}
        />
        <Popover.Content sx={{ paddingX: 4 }}>
          Lorem ipsum
          <Box sx={{ marginTop: 2, padding: 3, bg: '#F6F7F8' }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
            tincidunt enim vel massa condimentum, elementum dictum erat
            accumsan.
          </Box>
          <Box sx={{ paddingY: 3 }}>
            <Link
              href="http://localhost:6007/?path=/story/beta-popover--with-bar"
              sx={{ color: 'primary.base' }}
            >
              Action Link
            </Link>
          </Box>
        </Popover.Content>
      </Grid>
    </Popover>
  </>
)

export const WithBarSmall = () => (
  <>
    <Popover
      visible
      showClose
      sx={{ width: '18rem' }}
      variant="small"
      disclosure={
        <Button size="small" sx={{ marginTop: 9, marginLeft: 10 }}>
          Click
        </Button>
      }
    >
      <Grid
        sx={{
          width: '100%',
          height: '100%',
          gridTemplateRows: '10fr 0.3rem',
          gap: 0,
        }}
      >
        <Popover.Content sx={{ paddingX: 4 }}>
          Lorem ipsum dolor sit amet
          <Box sx={{ paddingY: 3 }}>
            <Link
              href="http://localhost:6007/?path=/story/beta-popover--with-bar"
              sx={{ color: 'primary.base' }}
            >
              Action Link
            </Link>
          </Box>
        </Popover.Content>
        <Flex
          sx={{
            width: '100%',
            maxHeight: '0.3rem',
            borderBottomLeftRadius: 3,
            borderBottomRightRadius: 3,
            background: '#FFB100',
          }}
        />
      </Grid>
    </Popover>
    <Popover
      visible
      showClose
      sx={{ width: '18rem' }}
      variant="small"
      disclosure={
        <Button size="small" sx={{ marginTop: 9, marginLeft: 11 }}>
          Click
        </Button>
      }
    >
      <Grid
        sx={{
          width: '100%',
          height: '100%',
          gridTemplateRows: '10fr 0.3rem',
          gap: 0,
        }}
      >
        <Popover.Content sx={{ paddingX: 4 }}>
          Lorem ipsum dolor sit amet
          <Box sx={{ paddingY: 3 }}>
            <Link
              href="http://localhost:6007/?path=/story/beta-popover--with-bar"
              sx={{ color: 'primary.base' }}
            >
              Action Link
            </Link>
          </Box>
        </Popover.Content>
        <Flex
          sx={{
            width: '100%',
            maxHeight: '0.3rem',
            borderBottomLeftRadius: 3,
            borderBottomRightRadius: 3,
            background: '#80BE80',
          }}
        />
      </Grid>
    </Popover>
    <Popover
      visible
      showClose
      sx={{ width: '18rem' }}
      variant="small"
      disclosure={
        <Button size="small" sx={{ marginTop: 9, marginLeft: 11 }}>
          Click
        </Button>
      }
    >
      <Grid
        sx={{
          width: '100%',
          height: '100%',
          gridTemplateRows: '10fr 0.3rem',
          gap: 0,
        }}
      >
        <Popover.Content sx={{ paddingX: 4 }}>
          Lorem ipsum dolor sit amet
          <Box sx={{ paddingY: 3 }}>
            <Link
              href="http://localhost:6007/?path=/story/beta-popover--with-bar"
              sx={{ color: 'primary.base' }}
            >
              Action Link
            </Link>
          </Box>
        </Popover.Content>
        <Flex
          sx={{
            width: '100%',
            maxHeight: '0.3rem',
            borderBottomLeftRadius: 3,
            borderBottomRightRadius: 3,
            background: '#E76850',
          }}
        />
      </Grid>
    </Popover>
  </>
)
