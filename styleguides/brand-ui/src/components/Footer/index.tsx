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
import { mergeSx, get } from '@vtex-components/theme'

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
      paddingTop: (theme) => [
        get(theme, 'space.16'),
        get(theme, 'space.16'),
        get(theme, 'space.17'),
      ],
      paddingBottom: (theme) => [get(theme, 'space.6'), get(theme, 'space.16')],
      paddingX: (theme) => [
        get(theme, 'space.12'),
        get(theme, 'space.14'),
        get(theme, 'space.14'),
        get(theme, 'space.0'),
      ],
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
        marginTop: (theme) => [
          get(theme, 'space.14'),
          get(theme, 'space.15'),
          get(theme, 'space.15'),
          get(theme, 'space.0'),
        ],
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
      marginRight: (theme) => [0, 0, get(theme, 'space.15')],
      marginBottom: (theme) => get(theme, 'space.8'),
    }}
  >
    <Text
      as="p"
      sx={{
        color: 'white',
        fontSize: (theme) => get(theme, 'fontSizes.3'),
        lineHeight: 'action',
        fontStyle: 'normal',
        fontWeight: 'normal',
        marginBottom: (theme) => get(theme, 'space.6'),
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
      fontSize: 16,
      textDecoration: 'none',
      color: 'muted.1',
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
          marginRight: (theme) => get(theme, 'space.6'),
          bg: '#111C2D',
          padding: (theme) => get(theme, 'space.4'),
          borderRadius: '100%',
          border: '1px solid #222C44',
          transition: 'all 0.1s ease-in-out',
          '&:hover': {
            bg: '#222C44',
            color: 'primary.contrast',
          },
          color: 'muted.1',
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
        paddingY: (theme) => get(theme, 'space.14'),
        paddingX: (theme) => [
          get(theme, 'space.7'),
          get(theme, 'space.9'),
          get(theme, 'space.9'),
          0,
        ],
      }}
    >
      {children}
    </Flex>
  </Box>
)

const ExtraLinks = ({ children }: PropsWithChildren<{}>) => (
  <Flex
    sx={{
      marginTop: (theme) => [get(theme, 'space.8'), get(theme, 'space.8'), '0'],
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
