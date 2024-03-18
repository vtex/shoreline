/**
 * This script is used to set up the development environment by
 * setting up the VTEX token into the .env file and opening the
 * application in the browser.
 *
 * This could become a separate package eventually to make it
 * reusable across different projects.
 */
import { exec } from 'child_process'
import { EnvCmd } from 'env-cmd'
import fs from 'fs-extra'
import open from 'open'

const { writeFile, pathExists, mkdir, readFile, appendFile } = fs

/**
 * If you change this variable, make sure to change
 * the base path on the dev script from the package.json
 */
const DEVELOPMENT_CONF_BASE_PATH = './.vtex/'

class Dev {
  private parseWhoAmI(whoAmI: string) {
    const workspaceRegex = /(.*workspace\s+)(.*)(\s+\n.*)/
    const accountRegex = /(.*into\s+)(.*)(\s+as.*)/
    const emailRegex = /(.*as\s+)(.*)(\s+at.*)/

    const workspace = whoAmI.replace(workspaceRegex, '$2')
    const account = whoAmI.replace(accountRegex, '$2')
    const email = whoAmI.replace(emailRegex, '$2')

    return { workspace, account, email }
  }

  private async setUp() {
    try {
      console.log('Setting up development environment')
      const { workspace, account } = await new Promise<{
        workspace?: string
        account?: string
      }>((resolve, reject) => {
        console.log('Verifying your identity')
        exec('vtex whoami', async (error, stdout, __) => {
          if (error) {
            reject(error)
          }

          resolve(this.parseWhoAmI(stdout))
        })
      })

      const vtexToken = await new Promise<string | undefined>(
        (resolve, reject) => {
          console.log('Pulling VTEX token from local environment to .env file')
          exec('vtex local token', async (error, stdout, __) => {
            if (error) {
              reject(error)
            }

            resolve(stdout)
          })
        }
      )

      await this.writeVtexEnv(vtexToken, workspace, account)
      await this.copyLocalEnvExample()
    } catch (error) {
      console.error(error)
    }
  }

  private async writeVtexEnv(
    token?: string,
    workspace?: string,
    account?: string
  ) {
    if (!(await pathExists(DEVELOPMENT_CONF_BASE_PATH))) {
      await mkdir(DEVELOPMENT_CONF_BASE_PATH, { recursive: true })
    }

    await writeFile(
      `${DEVELOPMENT_CONF_BASE_PATH}/.env`,
      `NEXT_PUBLIC_VTEX_ACCOUNT=${account}\nNEXT_PUBLIC_VTEX_WORKSPACE=${workspace}\nNEXT_PUBLIC_VTEX_TOKEN=${token}\n`
    )
  }

  private async copyLocalEnvExample() {
    const localEnvPath = './.env.local'
    const localEnvExamplePath = './.env.example'

    if (!(await pathExists(localEnvPath))) {
      await new Promise((resolve, reject) => {
        exec('cp .env.example .env.local', async (error, stdout, __) => {
          if (error) {
            reject(error)
          }

          resolve(stdout)
        })
      })
    } else if (await pathExists(localEnvExamplePath)) {
      const data = `\n${(await readFile(localEnvExamplePath)).toString()}`

      await appendFile(localEnvPath, data)
    }
  }

  public async start() {
    await this.setUp()

    // Add .vtex to .gitignore if not present
    const gitIgnorePath = './.gitignore'
    const vtexIgnorePath = '.vtex'

    console.log('Checking if .vtex is in .gitignore...')
    if (await pathExists(gitIgnorePath)) {
      const gitIgnore = await readFile(gitIgnorePath, { encoding: 'utf-8' })

      if (!gitIgnore.includes(vtexIgnorePath)) {
        console.log('Adding .vtex to .gitignore')
        await appendFile(gitIgnorePath, vtexIgnorePath)
      }
    } else {
      console.log('Creating .gitignore with .vtex')
      await writeFile(gitIgnorePath, vtexIgnorePath)
    }

    console.log('Starting development server...')
    await EnvCmd({
      command: 'next dev -p 3000',
      commandArgs: [],
      options: {
        useShell: true,
      },
      envFile: {
        filePath: './.vtex/.env',
      },
    })

    await open(`http://localhost:${process.env.PORT || 3000}/`)
  }
}

/**
 * The development environment setup for Next.js applications using VTEX services
 *
 * @usage package.json
 * ```diff json
 *    "scripts: {
 * -        "dev": "next dev",
 * +        "dev": "raccoon-dev",
 * ```
 */
export const dev = new Dev()
