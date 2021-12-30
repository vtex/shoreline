import React, { useState } from 'react'
import { tag, Flex, jsx } from '@vtex/admin-ui'
import { Code } from './Code'

const Input = jsx('input')({
  width: '100%',
  height: '2rem',
  border: '$neutral',
  backgroundColor: 'transparent',
})

Input.defaultProps = {
  type: 'number',
  min: 0,
}

const Select = jsx('select')({
  width: '100%',
  height: '2rem',
  border: '$neutral',
  backgroundColor: 'transparent',
})

const Container = jsx('div')({
  display: 'flex',
  flexDirection: 'column',
  borderRadius: 8,
  border: '$neutral',
})

const Row = jsx('tr')({})

const Cell = jsx('td')({
  paddingY: 6,
  paddingX: 2,
})

export function TypefaceShowcase() {
  const [fontSize, setFontSize] = useState(24)
  const [wght, setWght] = useState(500)
  const [wdth, setWdth] = useState(1000)
  const [ital, setItal] = useState(0)
  const [lineHeight, setLineHeight] = useState(1)
  const [letterSpacing, setLetterSpacing] = useState(0)
  const [content, setContent] = useState('All Products')
  const [space, setSpace] = useState('8px')

  return (
    <Container>
      <Flex
        justify="center"
        align="center"
        csx={{
          height: '200px',
          overflow: 'auto',
          wordWrap: 'break-word',
        }}
      >
        <tag.p
          csx={{
            paddingY: 2,
            paddingX: space,
            fontSize,
            fontVariationSettings: `"WGHT" ${wght}, "WDTH" ${wdth}, "ITAL" ${ital}`,
            lineHeight,
            letterSpacing: `${letterSpacing}em`,
          }}
        >
          {content}
        </tag.p>
      </Flex>
      <Flex
        csx={{
          padding: 2,
          bg: 'rgb(246, 248, 250)',
          borderBottomLeftRadius: 8,
          borderBottomRightRadius: 8,
        }}
      >
        <Flex
          direction="column"
          csx={{
            width: '30%',
          }}
        >
          <tag.table csx={{ width: '100%' }}>
            <tag.tbody>
              <Row>
                <Cell>Content Type</Cell>
                <Cell>
                  <Select
                    value={content}
                    onChange={(e: any) => setContent(e.target.value)}
                  >
                    <option value="All Products">Page title</option>
                    <option value="Itens to invoice">Title 1</option>
                    <option value="Package 1">Title 2</option>
                    <option value="Publish">Action</option>
                    <option value="1.273">Display</option>
                    <option value="Designed to take on anything mother-nature has to offer the Guide Jacket from Simms will shield you from all of the relentless elements she brings. Constructed of a Gore-Tex shell and two top-loading pockets for ultimate storage and fast access.">
                      Body
                    </option>
                    <option value="Images must be in the JPEG, PNG or GIF format, with up to 5MB each">
                      Detail
                    </option>
                  </Select>
                </Cell>
              </Row>
              <Row>
                <Cell>Space</Cell>
                <Cell>
                  <Select
                    value={space}
                    onChange={(e: any) => setSpace(e.target.value)}
                  >
                    <option value="8px">Wide</option>
                    <option value="152px">Narrow</option>
                  </Select>
                </Cell>
              </Row>
              <Row>
                <Cell>Font Size</Cell>
                <Cell>
                  <Input
                    value={fontSize}
                    onChange={(e: any) => setFontSize(Number(e.target.value))}
                    max={80}
                  />
                </Cell>
              </Row>
              <Row>
                <Cell>WGHT</Cell>
                <Cell>
                  <Input
                    value={wght}
                    onChange={(e: any) => setWght(Number(e.target.value))}
                    max={1000}
                    step={100}
                  />
                </Cell>
              </Row>
              <Row>
                <Cell>WDTH</Cell>
                <Cell>
                  <Input
                    value={wdth}
                    onChange={(e: any) => setWdth(Number(e.target.value))}
                    max={1000}
                    step={100}
                  />
                </Cell>
              </Row>
              <Row>
                <Cell>ITAL</Cell>
                <Cell>
                  <Input
                    value={ital}
                    onChange={(e: any) => setItal(Number(e.target.value))}
                    step={0.1}
                    max={1}
                  />
                </Cell>
              </Row>
              <Row>
                <Cell>Line Height</Cell>
                <Cell>
                  <Input
                    value={lineHeight}
                    onChange={(e: any) => setLineHeight(Number(e.target.value))}
                    step={0.1}
                    max={10}
                  />
                </Cell>
              </Row>
              <Row>
                <Cell>Letter Spacing</Cell>
                <Cell>
                  <Input
                    value={letterSpacing}
                    onChange={(e: any) =>
                      setLetterSpacing(Number(e.target.value))
                    }
                    step={0.001}
                    max={10}
                  />
                </Cell>
              </Row>
            </tag.tbody>
          </tag.table>
        </Flex>
        <Flex
          csx={{
            overflow: 'auto',
            width: '70%',
          }}
        >
          <Code
            className="jsx"
            isStatic
            codeString={`<tag.p
  csx={{
    fontSize: ${fontSize},
    fontVariationSettings: "'WGHT' ${wght}, 'WDTH' ${wdth}, 'ITAL' ${ital}",
    lineHeight: ${lineHeight},
    letterSpacing: ${letterSpacing}em,
  }}
>
  ${content}
</tag.p>`}
          />
        </Flex>
      </Flex>
    </Container>
  )
}
