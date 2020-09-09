import React, { ReactNode, PropsWithChildren, Ref } from 'react'
import {
  Box,
  Text,
  Link as ThemeUILink,
  Flex,
  LinkProps,
  SxStyleProp,
} from 'theme-ui'
import { forwardRef } from '@vtex-components/utils'
import { mergeSx } from '@vtex-components/theme'

import IconFacebook from './icons/IconFacebook'
import IconInstagram from './icons/IconInstagram'
import IconYouTube from './icons/IconYouTube'

const socialMediaLinks = [
  {
    name: 'Facebook',
    to: 'https://www.facebook.com/vtexcommerce',
    icon: <IconFacebook />,
  },
  {
    name: 'Instagram',
    to: 'https://www.instagram.com/vtexcommerce/',
    icon: <IconInstagram />,
  },
  {
    name: 'YouTube',
    to: 'https://www.youtube.com/user/VTEXTV/',
    icon: <IconYouTube />,
  },
]

const LinkGroups = ({ children }: PropsWithChildren<{}>) => (
  <Flex
    sx={{
      maxWidth: '70rem',
      margin: '0 auto',
      paddingTop: [7, 7, 7, 9],
      paddingX: [4, 5, 5],
      flexDirection: ['column', 'column', 'column', 'row'],
      justifyContent: 'space-between',
      alignItems: 'start',
    }}
  >
    <img
      src="https://vtex.com/wp-content/themes/VTEXTheme/assets/imgs/base/logo-vtex.svg"
      alt="VTEX - Accelerate Commerce Transformation"
      title="VTEX - Accelerate Commerce Transformation"
    />
    <Flex
      sx={{
        flexDirection: ['column', 'row'],
        marginTop: [6, 6, 6, 0],
        justifyContent: 'space-between',
        width: ['100%', '100%', '100%', 'auto'],
      }}
    >
      {children}
    </Flex>
  </Flex>
)

const Group = ({ title, children }: PropsWithChildren<{ title: string }>) => (
  <Box
    sx={{
      marginRight: [0, 0, 0, 7],
      marginBottom: [2, 3],
    }}
  >
    <Text
      as="p"
      sx={{
        color: 'white',
        fontSize: 3,
        lineHeight: 'action',
        fontStyle: 'normal',
        fontWeight: 'normal',
        marginBottom: 4,
      }}
    >
      {title}
    </Text>
    <Box
      sx={{
        width: '100%',
        display: ['flex', 'block'],
        justifyContent: 'space-between',
        flexWrap: 'wrap',
      }}
    >
      {children}
    </Box>
  </Box>
)

const Link = forwardRef((props: LinkProps, ref: Ref<HTMLAnchorElement>) => {
  const { sx = {}, children, href, ...restProps } = props

  const mergedSx = mergeSx<SxStyleProp>(
    {
      fontSize: 3,
      textDecoration: 'none',
      color: 'muted.2',
      '&:hover': {
        color: 'primary.contrast',
      },
    },
    sx
  )

  return (
    <ThemeUILink sx={mergedSx} href={href} ref={ref} {...restProps}>
      {children}
    </ThemeUILink>
  )
})

const SocialMedia = () => (
  <Flex>
    {socialMediaLinks.map((socialMediaLink) => (
      <SocialMediaIcon
        aria-label={socialMediaLink.name}
        key={socialMediaLink.to}
        href={socialMediaLink.to}
        icon={socialMediaLink.icon}
      />
    ))}
  </Flex>
)

const SocialMediaIcon = forwardRef(
  (props: LinkProps & { icon: ReactNode }, ref: Ref<HTMLAnchorElement>) => {
    const { 'aria-label': ariaLabel, icon, href, ...restProps } = props

    return (
      <ThemeUILink
        aria-label={ariaLabel}
        sx={{
          width: '2.5rem',
          height: '2.5rem',
          marginRight: 4,
          bg: '#111C2D',
          padding: '0.6rem',
          borderRadius: '100%',
          border: '1px solid #222C44',
          transition: 'all 0.1s ease-in-out',
          '&:hover': {
            bg: '#222C44',
            color: 'primary.contrast',
          },
          color: 'muted.2',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        href={href}
        ref={ref}
        {...restProps}
      >
        {icon}
      </ThemeUILink>
    )
  }
)

const Extra = ({ children }: PropsWithChildren<{}>) => (
  <Box
    sx={{
      borderTop: '1px solid #222C44',
    }}
  >
    <Flex
      sx={{
        maxWidth: '70rem',
        margin: '0 auto',
        flexDirection: ['column', 'column', 'row'],
        justifyContent: 'space-between',
        alignItems: ['start', 'start', 'center'],
        paddingY: 6,
        paddingX: 5,
      }}
    >
      {children}
    </Flex>
  </Box>
)

const ExtraLinks = ({ children }: PropsWithChildren<{}>) => (
  <Flex
    sx={{
      marginTop: [6, 6, 0],
    }}
  >
    {children}
  </Flex>
)

const Footer = ({ children }: PropsWithChildren<{}>) => (
  <Box
    as="footer"
    sx={{
      width: '100%',
      bg: 'secondary.base',
      color: 'background',
    }}
  >
    {children}
  </Box>
)

Footer.LinkGroups = LinkGroups
Footer.Link = Link
Footer.Group = Group
Footer.Extra = Extra
Footer.SocialMedia = SocialMedia
Footer.ExtraLinks = ExtraLinks

export default Footer
