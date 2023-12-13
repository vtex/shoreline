import {
  existsSync,
  mkdirSync,
  readFileSync,
  writeFile,
  writeFileSync,
} from 'fs'
import path from 'path'
import type { Options as PrettierOptions } from 'prettier'
import { format } from 'prettier'

/**
 * Prettify a file using prettier
 *
 * @param filePath The path of the file to prettify
 * @param options The prettier options to use. Defaults to `{ parser: 'markdown' }`
 */
export async function prettify(
  filePath: string,
  options: PrettierOptions = {
    parser: 'markdown',
  }
) {
  const file = readFileSync(filePath, 'utf8')
  const formatted = format(file, options)

  await createOrUpdateFile(filePath, formatted)
}

/**
 * Create or update a file safely, even if the directory doesn't exist.
 *
 * @param filePath The path of the file to create or update
 * @param content The content to write on the file
 */
export async function createOrUpdateFile(filePath: string, content: string) {
  const directoryPath = path.dirname(filePath)

  if (!existsSync(filePath)) {
    // Create directory if it doesn't exist
    mkdirSync(directoryPath, { recursive: true })

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
    // Update file with content on filePath
    writeFileSync(filePath, content)
  }
}
