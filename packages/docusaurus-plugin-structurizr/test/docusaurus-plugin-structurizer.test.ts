import type { LoadContext } from '@docusaurus/types'
import { type Mock, expect } from 'vitest'

import { findFiles } from '../src/find-files.js'
import docusaurusPluginStructurizr, {
  type DocusaurusPluginStructurizrOptions,
} from '../src/index.js'
import { runStructurizr } from '../src/run-structurizr.js'

const defaultOptions = {
  enabled: true,
  additionalStructurizrArgs: '',
  dockerImage: 'structurizr/cli',
  executor: 'auto',
  format: 'mermaid',
  id: 'default',
  paths: ['docs'],
} satisfies DocusaurusPluginStructurizrOptions

vi.mock('../src/detect-executor.js', async () => ({
  detectExecutor: vi.fn(() => 'docker'),
}))

vi.mock('../src/run-structurizr.js', async () => ({
  runStructurizr: vi.fn(),
}))

vi.mock('../src/find-files.js', async () => ({
  findFiles: vi.fn(),
}))

describe('docusaurus-plugin-structurizr', () => {
  afterEach(() => {
    vi.resetAllMocks()
  })

  it('should be disabled', async () => {
    const plugin = await docusaurusPluginStructurizr(
      {
        siteDir: 'pwd',
      } as unknown as LoadContext,
      {
        ...defaultOptions,
        enabled: false,
      },
    )

    expect(plugin).toMatchInlineSnapshot(`
      {
        "name": "docusaurus-plugin-structurizr",
      }
    `)
  })

  it('should return a real plugin when enabled', async () => {
    const plugin = await docusaurusPluginStructurizr(
      {
        siteDir: 'pwd',
      } as unknown as LoadContext,
      defaultOptions,
    )

    expect(Object.keys(plugin).length).toBeGreaterThan(1)
  })

  it('should run structurizr for each file', async () => {
    ;(findFiles as Mock).mockImplementationOnce(async () => ['docs/file1.dsl', 'docs/file2.dsl'])
    const plugin = await docusaurusPluginStructurizr(
      {
        siteDir: 'pwd',
      } as unknown as LoadContext,
      defaultOptions,
    )

    await plugin.loadContent?.()

    expect(runStructurizr).toHaveBeenCalledTimes(2)
  })

  it('should not exit when an error occurs', async () => {
    ;(findFiles as Mock).mockImplementationOnce(async () => ['docs/file1.dsl', 'docs/file2.dsl'])
    ;(runStructurizr as Mock).mockImplementationOnce(async () => {
      throw new Error('Error in test')
    })
    const plugin = await docusaurusPluginStructurizr(
      {
        siteDir: 'pwd',
      } as unknown as LoadContext,
      defaultOptions,
    )

    expect(plugin.loadContent?.()).resolves.not.toThrow()
  })

  it('should watch paths', async () => {
    const plugin = await docusaurusPluginStructurizr(
      {
        siteDir: 'pwd',
      } as unknown as LoadContext,
      defaultOptions,
    )

    const paths = plugin.getPathsToWatch?.()
    expect(paths?.length).toBeGreaterThan(0)
  })
})
