import { expect, test } from '@playwright/test'
import axe from 'axe-core'
import { writeFile } from 'node:fs/promises'
import { environmentDetails, readManifest } from './runtime.mjs'

const manifest = readManifest()

async function attachJson(testInfo, name, value) {
  const path = testInfo.outputPath(name)
  await writeFile(path, `${JSON.stringify(value, null, 2)}\n`)
  await testInfo.attach(name, { path, contentType: 'application/json' })
}

for (const story of manifest.stories) {
  test(story.id, async ({ page, browser, baseURL }, testInfo) => {
    const errors = []
    page.on('pageerror', (error) => errors.push(error.message))
    page.on('console', (message) => {
      if (message.type() === 'error') {
        errors.push(
          `${message.text()} (${message.location().url || 'console'})`
        )
      }
    })
    await page.route('**/*', async (route) => {
      const url = new URL(route.request().url())
      if (
        url.origin === new URL(baseURL).origin ||
        ['data:', 'blob:'].includes(url.protocol)
      ) {
        await route.continue()
      } else {
        errors.push(`External request blocked: ${url.origin}${url.pathname}`)
        await route.abort()
      }
    })
    await page.addInitScript(() => {
      const NativeDate = Date
      const instant = NativeDate.parse('2026-01-15T12:00:00Z')
      window.Date = new Proxy(NativeDate, {
        apply: () => new NativeDate(instant).toString(),
        construct: (Target, args) =>
          Reflect.construct(Target, args.length ? args : [instant]),
        get: (Target, key, receiver) =>
          key === 'now' ? () => instant : Reflect.get(Target, key, receiver),
      })
      let seed = 12345
      Math.random = () => {
        seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0
        return seed / 4294967296
      }
    })
    await page.goto(`${baseURL}iframe.html`, { waitUntil: 'load' })
    await page.waitForFunction(() =>
      Boolean(window.__STORYBOOK_ADDONS_CHANNEL__)
    )
    // Storybook 8.6 emits storyFinished after render, play and afterEach.
    // Subscribe before selecting the story so fast renders cannot race us.
    await page.evaluate(
      (storyId) =>
        new Promise((resolve, reject) => {
          const channel = window.__STORYBOOK_ADDONS_CHANNEL__
          const cleanup = () => {
            clearTimeout(timeout)
            for (const [event, listener] of Object.entries(listeners))
              channel.off(event, listener)
          }
          const fail = (error) => {
            cleanup()
            reject(
              new Error(error?.description ?? error?.message ?? String(error))
            )
          }
          const listeners = {
            storyFinished: (result) => {
              if (result.storyId !== storyId) return
              cleanup()
              if (result.status === 'success') resolve()
              else reject(new Error(`Story failed: ${storyId}`))
            },
            storyErrored: fail,
            storyThrewException: fail,
            playFunctionThrewException: fail,
            unhandledErrorsWhilePlaying: fail,
            storyMissing: fail,
          }
          const timeout = setTimeout(
            () => fail(new Error(`Story did not finish: ${storyId}`)),
            20000
          )
          for (const [event, listener] of Object.entries(listeners))
            channel.on(event, listener)
          channel.emit('setCurrentStory', { storyId, viewMode: 'story' })
        }),
      story.id
    )
    await expect(page.locator('#storybook-root')).toBeVisible()
    await page.evaluate(async () => {
      await document.fonts.ready
      await Promise.all(
        [...document.images].map(async (image) => {
          if (!image.complete) {
            await new Promise((resolve, reject) => {
              image.addEventListener('load', resolve, { once: true })
              image.addEventListener(
                'error',
                () => reject(new Error(`Image failed: ${image.currentSrc}`)),
                { once: true }
              )
            })
          }
          if (image.currentSrc && image.naturalWidth === 0)
            throw new Error(`Broken image: ${image.currentSrc}`)
        })
      )
    })
    await page.addScriptTag({ content: axe.source })
    const accessibility = await page.evaluate(async () =>
      window.axe.run(document.body, {
        runOnly: {
          type: 'tag',
          values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'],
        },
      })
    )
    await attachJson(testInfo, 'accessibility.json', accessibility)
    await attachJson(testInfo, 'environment.json', {
      theme: testInfo.project.metadata.theme,
      viewport: testInfo.project.metadata.viewport,
      browser: browser.version(),
      environment: environmentDetails(),
      mode: process.env.SHORELINE_VISUAL_MODE ?? 'check',
      inputHash: manifest.inputHash,
      approval: 'pending-human-review',
    })
    expect
      .soft(errors, 'Browser console, rendering and asset errors')
      .toEqual([])
    expect
      .soft(
        accessibility.violations.map(({ id, impact, nodes }) => ({
          id,
          impact,
          affectedNodes: nodes.length,
        })),
        'axe WCAG violations; details attached'
      )
      .toEqual([])
    if (process.env.SHORELINE_VISUAL_MODE === 'capture') {
      const path = testInfo.outputPath('diagnostic.png')
      await page.screenshot({
        path,
        fullPage: true,
        animations: 'disabled',
        caret: 'hide',
      })
      await testInfo.attach('diagnostic.png', {
        path,
        contentType: 'image/png',
      })
    } else {
      await expect
        .soft(page)
        .toHaveScreenshot(`${story.id}.png`, { fullPage: true })
    }
  })
}
