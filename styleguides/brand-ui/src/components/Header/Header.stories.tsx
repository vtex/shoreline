import React, { useState } from 'react'
import { Link, Box } from 'theme-ui'

import { Header, HamburgerMenu, LinksProps, LocaleSwitcher } from '.'
import { IconExternalLink } from '../../icons'
import { LocaleOption } from './LocaleSwitcher'

export default {
  title: 'beta/Header',
  component: Header,
}

const options: LocaleOption[] = [
  {
    label: 'EN',
    value: 'en',
  },
  {
    label: 'PT | BR',
    value: 'pt-br',
  },
  {
    label: 'ES',
    value: 'es',
  },
  {
    label: 'ES | LATAM',
    value: 'es-latam',
  },
  {
    label: 'IT',
    value: 'it',
  },
]

const Template = (args: LinksProps) => {
  const [locale, setLocale] = useState('en')

  return (
    <Header>
      <Header.Brand />
      <Header.LeftLinks>
        <Header.LeftLinks.Links {...args} />
        <Header.LeftLinks.Links to="/" title="History" />
      </Header.LeftLinks>
      <Header.RightLinks>
        <Link href="/">CONTACT</Link>
        <Link href="/">
          Help Center
          <Box sx={{ paddingLeft: 3, color: 'primary.base' }}>
            <IconExternalLink size={16} />
          </Box>
        </Link>
      </Header.RightLinks>
      <Header.ActionButton>
        <HamburgerMenu>
          <HamburgerMenu.Menu>
            <HamburgerMenu.Menu.Links {...args} />
            <HamburgerMenu.Menu.Links to="/" title="History" />
            <HamburgerMenu.Menu.Links to="/" title="Help Center" />
            <LocaleSwitcher
              locale={locale}
              options={options}
              onChange={setLocale}
            />
          </HamburgerMenu.Menu>
        </HamburgerMenu>
        <Box
          sx={{
            display: ['none', 'none', 'none', 'block'],
            height: '100%',
            width: '100%',
          }}
        >
          <LocaleSwitcher
            locale={locale}
            options={options}
            onChange={setLocale}
          />
        </Box>
      </Header.ActionButton>
    </Header>
  )
}

export const Playground = Template.bind({})
Playground.args = {
  title: 'Status',
  to: '/',
  active: true,
}

export const LandingPage = () => (
  <Header
    sx={{
      display: ['flex', 'flex', 'flex', 'flex'],
      paddingX: [4, 4, 6, 10],
    }}
  >
    <Header.Brand noMargin />
    <Box
      sx={{
        width: 'min-content',
      }}
    >
      Accelerate Commerce Transformation
    </Box>
  </Header>
)

export const StatusPage = () => {
  const [locale, setLocale] = useState('en')

  return (
    <Header
      sx={{ gridTemplateColumns: '1.5fr 3.75fr 2fr 2fr minmax(6.75rem, auto)' }}
    >
      <Header.Brand>
        <svg
          width="auto"
          height={35}
          viewBox="0 0 1350 250"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g>
            <path
              d="M795.101 24.0996H784.301V235.2H795.101V24.0996Z"
              fill="#F71963"
            />
            <path
              d="M924.2 74.2002C943.5 74.2002 958.4 84.1002 959 102.8V104.1H945C944.2 95.0002 938.1 86.9002 924.9 86.9002C911.5 86.9002 905.6 93.9002 905.6 102.1C905.6 106.7 906.9 109.8 909.8 112.6C917.1 119.9 943 119.1 955.1 131.3C960 136.2 962.8 143.6 962.8 150.3V151.9C962.8 174.4 943.2 182.6 926.9 182.6C906.3 182.6 889.9 170.6 889.4 150.4V149H904.7C905 161.6 913.5 169.4 927.4 169.4C939.5 169.4 947.5 163.3 947.5 152.8C947.5 147.7 946.2 144 943.2 141C933.6 131.4 908.7 133.5 897.5 122.3C892.7 117.5 890.2 112.1 890.2 103.9V102.3C890 84.5002 907.1 74.2002 924.2 74.2002Z"
              fill="#F71963"
            />
            <path
              d="M1024.9 100.101V111.901H1002.7V156.801C1002.7 166.201 1008 168.901 1013.9 168.901C1018.1 168.901 1022.2 167.601 1025.4 165.201H1028V177.501C1024.2 179.601 1017.5 181.301 1012.7 181.301C995.5 181.301 988.1 171.901 988.1 157.201V111.901H976.6V104.901C988.7 100.701 993.4 90.7006 995.4 82.1006H1002.7V100.101H1024.9Z"
              fill="#F71963"
            />
            <path
              d="M1073 182.5C1057.8 182.5 1045.4 172.6 1045.4 157.8V156.7C1045.4 149.4 1047.8 144.1 1052.1 139.8C1058.2 133.4 1069.8 130.5 1079.2 130.5C1084.9 130.5 1091.3 131.3 1096.6 132.7V126.8C1096.6 116.1 1091.2 109.6 1079.2 109.6C1070.1 109.6 1063.7 113.6 1063.2 122.5H1049.5V121.2C1051.3 104.6 1064 97.7002 1079.8 97.7002C1098 97.7002 1111.1 106.2 1111.1 129.8V179.9H1100.2L1097.5 171.1H1097.2C1091.9 178.2 1082.4 182.5 1073 182.5ZM1096.6 150.9V144.5C1091.7 142.7 1085.4 141.8 1080 141.8C1070.3 141.8 1060 146 1060 156.3C1060 165.2 1066.2 170.2 1075.5 170.2C1084.6 170.2 1096.6 162.5 1096.6 150.9Z"
              fill="#F71963"
            />
            <path
              d="M1176.4 100.101V111.901H1154.2V156.801C1154.2 166.201 1159.5 168.901 1165.4 168.901C1169.6 168.901 1173.7 167.601 1176.9 165.201H1179.5V177.501C1175.7 179.601 1169 181.301 1164.2 181.301C1147 181.301 1139.6 171.901 1139.6 157.201V111.901H1128V104.901C1140.1 100.701 1144.8 90.7006 1146.8 82.1006H1154.1V100.101H1176.4Z"
              fill="#F71963"
            />
            <path
              d="M1212.8 100.101V149.101C1212.8 164.901 1222.2 169.701 1231.6 169.701C1241 169.701 1250.4 164.901 1250.4 149.101V100.101H1264.8V149.701C1264.8 172.701 1248.7 182.401 1231.6 182.401C1214.5 182.401 1198.4 172.701 1198.4 149.701V100.101H1212.8Z"
              fill="#F71963"
            />
            <path
              d="M1286.5 156V154.7H1300.4C1300.4 165.2 1306.5 170.7 1318.8 170.7C1329.5 170.7 1334.9 166.2 1334.9 158.9C1334.9 155.7 1333.9 153.3 1331.9 151.2C1324.2 143.5 1304 145.9 1293.6 135.6C1290.6 132.6 1287.9 127.3 1287.9 121.7V120.6C1287.9 104.5 1302.3 97.7998 1317 97.7998C1332.6 97.7998 1346.1 105 1346.2 120.1V121.4H1332.3C1331.8 112.1 1325.8 109.1 1316.5 109.1C1307.4 109.1 1302.3 113.3 1302.3 119.2C1302.3 121.9 1303.3 124.3 1305.2 126.2C1312.5 133.5 1332.8 131 1343.5 141.7C1347.2 145.4 1349.2 150.2 1349.2 157.5C1349.2 175.7 1333.7 182.4 1319 182.4C1299.6 182.3 1287.2 173.5 1286.5 156Z"
              fill="#F71963"
            />
            <path
              d="M270 0H52.1C35.2 0 24.3 18 32.2 32.9L54 74.2H14.5C6.5 74.2 0 80.7 0 88.7C0 91.1 0.6 93.4 1.7 95.5L71.8 228.2C75.6 235.3 84.4 238 91.4 234.2C94 232.8 96.1 230.7 97.4 228.2L116.4 192.4L140.3 237.6C148.7 253.5 171.5 253.5 179.9 237.6L289.3 32.1C297 17.5 286.4 0 270 0ZM172.1 87.8L125 176.5C122.5 181.2 116.6 183 111.9 180.5C110.2 179.6 108.8 178.2 107.9 176.5L61.3 88.2C58.8 83.5 60.6 77.6 65.3 75.1C66.7 74.4 68.2 74 69.8 74H163.8C169 74 173.2 78.2 173.2 83.4C173.2 84.9 172.8 86.5 172.1 87.8ZM501.8 95.4H478V177.1C478 178.6 476.7 179.9 475.2 179.9H456.8C455.3 179.9 454 178.6 454 177.1V95.4H430C428.5 95.5 427.3 94.3 427.2 92.8V92.7V78.2C427.2 76.7 428.4 75.5 429.9 75.5H430H501.8C503.3 75.4 504.7 76.6 504.7 78.2V92.7C504.6 94.2 503.3 95.4 501.8 95.4ZM578.3 179.3C573.4 180 565.1 181.1 550 181.1C531.9 181.1 515.9 176.5 515.9 150.9V104.3C515.9 78.8 532 74.3 550.1 74.3C565.2 74.3 573.4 75.4 578.3 76.1C580.3 76.4 581.1 77.1 581.1 78.9V92C581.1 93.5 579.8 94.8 578.3 94.8H548.7C542.1 94.8 539.7 97 539.7 104.3V117.1H577.1C578.6 117.1 579.9 118.4 579.9 119.9V133.2C579.9 134.7 578.6 136 577.1 136H539.7V150.9C539.7 158.2 542.1 160.4 548.7 160.4H578.3C579.8 160.4 581.1 161.7 581.1 163.2V176.3C581.1 178.1 580.3 179 578.3 179.3ZM684.2 179.8H661.9C660.1 179.8 659.2 179.2 658.3 177.7L638.9 147L621.4 177C620.4 178.7 619.4 179.8 617.9 179.8H597.1C595.7 179.8 595 179 595 178C595 177.7 595.1 177.3 595.3 177L625.7 126.3L595 78.2C594.8 77.9 594.7 77.7 594.7 77.4C594.8 76.3 595.7 75.5 596.8 75.6H619.4C620.9 75.6 622.1 77 622.9 78.3L640.9 106.6L658.3 78.3C659 77 660.3 75.6 661.8 75.6H682.6C683.7 75.6 684.6 76.4 684.7 77.4C684.7 77.7 684.6 78 684.4 78.2L653.8 126.6L685.7 177C685.9 177.4 686.1 177.9 686.1 178.4C686 179.3 685.3 179.8 684.2 179.8ZM413.4 75.8C413.6 75.8 413.7 75.8 413.9 75.9C415.1 76.2 415.8 77.3 415.5 78.5C415.5 78.5 391.2 164.7 390.8 165.8C387.5 175.8 378.9 181 369.2 181C358.9 181 350.9 176.1 347.6 165.8C347.3 164.9 322.4 78.5 322.4 78.5C322.4 78.3 322.3 78.2 322.3 78C322.3 76.8 323.3 75.8 324.5 75.8H344.6C345.6 75.8 346.5 76.5 346.7 77.5L367.1 152.9C367.4 154.4 367.8 155 369.1 155C370.4 155 370.8 154.4 371.1 152.9L391.5 77.5C391.7 76.5 392.6 75.8 393.6 75.8H413.4Z"
              fill="#F71963"
            />
          </g>
          <defs>
            <clipPath id="clip0">
              <rect width="1349.1" height="249.5" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </Header.Brand>
      <Header.LeftLinks>
        <Header.LeftLinks.Links active to="/" title="Status" />
        <Header.LeftLinks.Links to="/" title="History" />
      </Header.LeftLinks>
      <Header.RightLinks>
        <Link href="/">CONTACT</Link>
        <Link href="/">
          Help Center
          <Box sx={{ paddingLeft: 3, color: 'primary.base' }}>
            <IconExternalLink size={16} />
          </Box>
        </Link>
      </Header.RightLinks>
      <Header.ActionButton>
        <HamburgerMenu>
          <HamburgerMenu.Menu>
            <HamburgerMenu.Menu.Links active to="/" title="Status" />
            <HamburgerMenu.Menu.Links to="/" title="History" />
            <HamburgerMenu.Menu.Links to="/" title="Help Center" />
            <LocaleSwitcher
              locale={locale}
              options={options}
              onChange={setLocale}
            />
          </HamburgerMenu.Menu>
        </HamburgerMenu>
        <Box
          sx={{
            display: ['none', 'none', 'none', 'block'],
            height: '100%',
            width: '100%',
          }}
        >
          <LocaleSwitcher
            locale={locale}
            options={options}
            onChange={setLocale}
          />
        </Box>
      </Header.ActionButton>
    </Header>
  )
}
