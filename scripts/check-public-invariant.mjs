// Public-repo invariant for @vtex/shoreline-ai:
// no VTEX-internal runtime config, credentials or RawEnvelope shape may land
// in this public package. See shoreline-specs/specs/shoreline-ai-ci-readiness.md.
import { readdirSync, readFileSync } from 'node:fs'
import { join, relative } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const PACKAGE_DIR = 'packages/shoreline-ai'
const EXTENSIONS = ['.ts', '.tsx', '.md', '.css', '.json']
const SKIPPED_DIRS = new Set(['node_modules', 'dist', 'coverage'])

// Edit this list to extend the invariant. `ignoreCase` applies to patterns only.
const RULES = [
  { name: 'VTEXRuntimeConfig', pattern: /VTEXRuntimeConfig/ },
  { name: 'RawEnvelope', pattern: /RawEnvelope/ },
  { name: 'appkey', pattern: /appkey/i },
  { name: 'apptoken', pattern: /apptoken/i },
  { name: 'vtexidclientautcookie', pattern: /vtexidclientautcookie/i },
  { name: 'Bearer ', pattern: /Bearer /i },
  { name: 'api[_-]?key', pattern: /api[_-]?key/i },
]

// Mentions that are allowed on purpose: the JSDoc that states the invariant.
const ALLOWLIST = [
  {
    file: 'packages/shoreline-ai/src/types/public.ts',
    rule: 'RawEnvelope',
    lineIncludes: 'never reference',
  },
]

/**
 * @param {{ path: string, content: string }[]} files
 * @returns {{ file: string, line: number, rule: string, text: string }[]}
 */
export function findViolations(files) {
  const violations = []

  for (const { path, content } of files) {
    content.split('\n').forEach((text, index) => {
      for (const rule of RULES) {
        if (!rule.pattern.test(text)) continue

        const allowed = ALLOWLIST.some(
          (entry) =>
            entry.file === path &&
            entry.rule === rule.name &&
            text.includes(entry.lineIncludes)
        )

        if (!allowed) {
          violations.push({
            file: path,
            line: index + 1,
            rule: rule.name,
            text: text.trim(),
          })
        }
      }
    })
  }

  return violations
}

function collectFiles(root, dir = root) {
  const files = []

  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (!SKIPPED_DIRS.has(entry.name)) {
        files.push(...collectFiles(root, join(dir, entry.name)))
      }
    } else if (EXTENSIONS.some((ext) => entry.name.endsWith(ext))) {
      const full = join(dir, entry.name)

      files.push({
        path: relative(root, full),
        content: readFileSync(full, 'utf8'),
      })
    }
  }

  return files
}

function main() {
  const root = join(fileURLToPath(import.meta.url), '..', '..')
  const files = collectFiles(root, join(root, PACKAGE_DIR))
  const violations = findViolations(files)

  if (violations.length === 0) {
    console.log(`Public invariant OK (${files.length} files scanned)`)
    return
  }

  for (const v of violations) {
    console.error(`${v.file}:${v.line} [${v.rule}] ${v.text}`)
  }

  console.error(`\n${violations.length} public-invariant violation(s) found.`)
  process.exit(1)
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(process.argv[1]).href
) {
  main()
}
