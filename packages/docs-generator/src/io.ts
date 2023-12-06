import {
  existsSync,
  writeFile,
  writeFileSync,
  mkdirSync,
  lstatSync,
  readdirSync,
  copyFileSync,
  readFileSync,
} from 'fs'
import { join, basename } from 'path'
import { format } from 'prettier'

/**
 * Create or update a file
 */
export async function createOrUpdateFile(filePath: string, content: string) {
  if (!existsSync(filePath)) {
    // Create file with content on filePath
    await new Promise((res, reject) => {
      writeFile(filePath, content, (err) => {
        if (err) {
          console.error('Error writing to file:', err)
          reject(err)
        }

        res(true)
      })
    })
  } else {
    writeFileSync(filePath, content)
  }
}

/**
 * Copy a folder recursively and sychronously
 */
export function copyFolderRecursiveSync(source: string, target: string) {
  const targetFolder = join(target, basename(source))

  if (!existsSync(targetFolder)) {
    mkdirSync(targetFolder)
  }

  // Copy while preserving the content from the target folder
  if (lstatSync(source).isDirectory()) {
    const files = readdirSync(source)

    files.forEach(function (file) {
      const curSource = join(source, file)

      if (lstatSync(curSource).isDirectory()) {
        copyFolderRecursiveSync(curSource, targetFolder)
      } else {
        copyFileSync(curSource, join(targetFolder, file))
      }
    })
  }
}

/**
 * Prettify a file using the .prettierrc config
 */
export async function prettify(filePath: string) {
  const prettierOptions = {
    parser: 'markdown',
  }

  const file = readFileSync(filePath, 'utf8')
  const formatted = format(file, prettierOptions)

  await createOrUpdateFile(filePath, formatted)
}
