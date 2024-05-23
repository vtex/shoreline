import fs from 'node:fs'
import path from 'node:path'

const SVG_SPRITE_START =
  '<svg xmlns="http://www.w3.org/2000/svg" style="display: none;" xmlns:xlink="http://www.w3.org/1999/xlink"><defs>'
const SVG_SPRITE_END = '</defs></svg>'

async function fetchSvgIcon(
  iconName: string,
  variant: 'bold' | 'duotone' | 'fill' | 'light' | 'regular' | 'thin'
): Promise<string> {
  const url = `https://unpkg.com/@phosphor-icons/core@2.1.1/assets/${variant}/${iconName}.svg`
  const response = await fetch(url)
  console.log({
    response,
  })
  const data = await response.text()
  console.log({
    data,
  })
  return data
}

async function generateSvgSprite(iconNames: string[]): Promise<void> {
  let spriteContent = SVG_SPRITE_START

  for (const iconName of iconNames) {
    try {
      const svgContent = await fetchSvgIcon(iconName, 'regular')
      // Extract only the <svg> inner content
      const innerSvgContent = svgContent
        .replace(/<svg[^>]*>/, '')
        .replace('</svg>', '')
      // Create a symbol with the icon name
      spriteContent += `<symbol id="${iconName}" viewBox="0 0 256 256">${innerSvgContent}</symbol>`
    } catch (error) {
      console.error(`Failed to fetch icon: ${iconName}`, error)
    }
  }

  spriteContent += SVG_SPRITE_END

  const outputPath = path.resolve(__dirname, 'icons-sprite.svg')
  fs.writeFileSync(outputPath, spriteContent)
  console.log(`SVG sprite created at ${outputPath}`)
}

const iconNames = ['archive']

generateSvgSprite(iconNames).catch((error) => {
  console.error('Error generating SVG sprite:', error)
})
