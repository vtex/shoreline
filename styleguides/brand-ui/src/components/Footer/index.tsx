import React, { ReactNode, PropsWithChildren } from 'react'
import { Box, Text, Link as ThemeUILink, Flex } from 'theme-ui'

import IconFacebook from './icons/IconFacebook'
import IconInstagram from './icons/IconInstagram'
import IconYouTube from './icons/IconYouTube'
import IconLinkedIn from './icons/IconLinkedIn'

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
  {
    name: 'LinkedIn',
    to: 'https://www.linkedin.com/company/vtex/',
    icon: <IconLinkedIn />,
  },
]

const LinkGroups = ({ children }: PropsWithChildren<{}>) => (
  <Flex
    sx={{
      maxWidth: '70rem',
      margin: '0 auto',
      paddingTop: ['4rem', '4rem', '8rem'],
      paddingBottom: ['2rem', '4rem'],
      paddingX: ['1rem', '1.5rem', '1.5rem', '0'],
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
        marginTop: ['2rem', '4rem', '4rem', '0'],
      }}
    >
      {children}
    </Flex>
  </Flex>
)

interface GroupProps {
  title: string
}

const Group = ({ title, children }: PropsWithChildren<GroupProps>) => (
  <Box sx={{ marginRight: ['0', '3rem'], marginBottom: '1rem' }}>
    <Text
      as="p"
      sx={{
        color: 'white',
        fontSize: '1.25rem',
        lineHeight: '1.875rem',
        fontStyle: 'normal',
        fontWeight: 'normal',
        marginBottom: '1rem',
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

interface FooterLinkProps {
  href: string
  fontSize?: string
}

const Link = ({
  href,
  fontSize = '1rem',
  children,
}: PropsWithChildren<FooterLinkProps>) => (
  <ThemeUILink
    sx={{
      fontSize,
      textDecoration: 'none',
      color: 'muted.1',
      '&:hover': {
        color: 'primary.contrast',
      },
    }}
    href={href}
  >
    {children}
  </ThemeUILink>
)

interface FooterSocialMediaProps extends FooterLinkProps {
  icon: ReactNode
  ariaLabel: string
}

const SocialMedia = () => (
  <Flex>
    {socialMediaLinks.map((socialMediaLink) => (
      <SocialMediaIcon
        ariaLabel={socialMediaLink.name}
        key={socialMediaLink.to}
        href={socialMediaLink.to}
        icon={socialMediaLink.icon}
      />
    ))}
  </Flex>
)

const SocialMediaIcon = ({ href, icon, ariaLabel }: FooterSocialMediaProps) => (
  <ThemeUILink
    aria-label={ariaLabel}
    sx={{
      width: '2.5rem',
      height: '2.5rem',
      marginRight: '1rem',
      bg: '#111C2D',
      padding: '0.6rem',
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
  >
    {icon}
  </ThemeUILink>
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
        paddingY: '3rem',
        paddingX: ['1rem', '1.5rem', '1.5rem', '0'],
      }}
    >
      {children}
    </Flex>
  </Box>
)

const ExtraLinks = ({ children }: PropsWithChildren<{}>) => (
  <Flex sx={{ marginTop: ['2rem', '2rem', '0'] }}>{children}</Flex>
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
