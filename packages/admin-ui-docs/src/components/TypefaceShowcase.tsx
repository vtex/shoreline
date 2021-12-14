import React, { useState } from 'react'
import { tag, Flex, jsx } from '@vtex/admin-ui'
import { Code } from './Code'

const Range = jsx('input')({
  width: '100%',
  margin: '8px 0',
  backgroundColor: 'transparent',
  WebkitAppearance: 'none',

  ':focus': { outline: 'none' },
  '::-webkit-slider-runnable-track': {
    background: 'rgba(0, 0, 0, 0.6)',
    border: '1.1px solid rgba(24, 213, 1, 0)',
    borderRadius: '25px',
    width: '100%',
    height: '2px',
    cursor: 'pointer',
  },
  '::-webkit-slider-thumb': {
    marginTop: '-9.1px',
    width: '18px',
    height: '18px',
    background: '#21211f',
    border: '0.2px solid rgba(131, 229, 132, 0)',
    borderRadius: '12px',
    cursor: 'pointer',
    WebkitAppearance: 'none',
  },
  ':focus::-webkit-slider-runnable-track': {
    background: '#4d4d4d',
  },
  '::-moz-range-track': {
    background: 'rgba(0, 0, 0, 0.6)',
    border: '1.1px solid rgba(24, 213, 1, 0)',
    borderRadius: '25px',
    width: '100%',
    height: '2px',
    cursor: 'pointer',
  },
  '::-moz-range-thumb': {
    width: '18px',
    height: '18px',
    background: '#21211f',
    border: '0.2px solid rgba(131, 229, 132, 0)',
    borderRadius: '12px',
    cursor: 'pointer',
  },
  '::-ms-track': {
    background: 'transparent',
    borderColor: 'transparent',
    borderWidth: '10.6px 0',
    color: 'transparent',
    width: '100%',
    height: '2px',
    cursor: 'pointer',
  },
  '::-ms-fill-lower': {
    background: '#000000',
    border: '1.1px solid rgba(24, 213, 1, 0)',
    borderRadius: '50px',
  },
  '::-ms-fill-upper': {
    background: 'rgba(0, 0, 0, 0.6)',
    border: '1.1px solid rgba(24, 213, 1, 0)',
    borderRadius: '50px',
  },
  '::-ms-thumb': {
    width: '18px',
    height: '18px',
    background: '#21211f',
    border: '0.2px solid rgba(131, 229, 132, 0)',
    borderRadius: '12px',
    cursor: 'pointer',
    marginTop: '0px',
  },
  ':focus::-ms-fill-lower': {
    background: 'rgba(0, 0, 0, 0.6)',
  },
  ':focus::-ms-fill-upper': { background: '#4d4d4d' },
  '@supports (-ms-ime-align:auto)': { margin: '0' },
})

Range.defaultProps = {
  type: 'range',
  min: 0,
}

const Row = jsx('tr')({})

const Cell = jsx('td')({
  paddingY: 6,
  paddingX: 2,
})

export function TypefaceShowcase() {
  const [fontSize, setFontSize] = useState(80)
  const [wght, setWght] = useState(500)
  const [wdth, setWdth] = useState(1000)
  const [ital, setItal] = useState(0)

  return (
    <tag.div
      csx={{
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 8,
        border: 'default',
      }}
    >
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
            padding: 2,
            fontSize,
            fontSettings: `"WGHT" ${wght}, "WDTH" ${wdth}, "ITAL" ${ital}`,
          }}
        >
          VTEX Trust
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
                <Cell>Font Size</Cell>
                <Cell>
                  <Range
                    value={fontSize}
                    onChange={(e: any) => setFontSize(Number(e.target.value))}
                    max={200}
                  />
                </Cell>
              </Row>
              <Row>
                <Cell>WGHT</Cell>
                <Cell>
                  <Range
                    value={wght}
                    onChange={(e: any) => setWght(Number(e.target.value))}
                    max={1000}
                  />
                </Cell>
              </Row>
              <Row>
                <Cell>WDTH</Cell>
                <Cell>
                  <Range
                    value={wdth}
                    onChange={(e: any) => setWdth(Number(e.target.value))}
                    max={1000}
                  />
                </Cell>
              </Row>
              <Row>
                <Cell>ITAL</Cell>
                <Cell>
                  <Range
                    value={ital}
                    onChange={(e: any) => setItal(Number(e.target.value))}
                    step={0.1}
                    max={1}
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
    fontVariationSettings: "'WGHT' ${wght}, 'WDTH' ${wdth}, 'ITAL' ${ital}"
  }}
>
  VTEX Trust
</tag.p>`}
          />
        </Flex>
      </Flex>
    </tag.div>
  )
}
