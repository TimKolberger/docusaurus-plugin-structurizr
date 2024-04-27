import path from 'node:path'
import { expect } from 'vitest'

import { exec } from '../src/exec.js'
import { runStructurizr } from '../src/run-structurizr.js'

vi.mock('../src/exec.js', async () => ({
  exec: vi.fn(),
}))

describe('run-structurizr', () => {
  afterEach(() => {
    vi.resetAllMocks()
  })

  it('should run structurizr with cli', async () => {
    await runStructurizr('some-file.dsl', {
      docsPath: '.',
      executor: 'cli',
      format: 'mermaid',
      dockerImage: 'structurizr/cli',
      additionalStructurizrArgs: '',
    })

    expect(exec).toHaveBeenCalledWith(
      'structurizr-cli export -workspace some-file.dsl -format "mermaid"',
    )
  })

  it('should run structurizr with docker', async () => {
    await runStructurizr('some-file.dsl', {
      docsPath: '.',
      executor: 'docker',
      format: 'mermaid',
      dockerImage: 'structurizr/cli',
      additionalStructurizrArgs: '',
    })

    expect(exec).toHaveBeenCalledWith(
      'docker run --rm -v ".:/usr/local/structurizr" structurizr/cli export -workspace "some-file.dsl" -format "mermaid"',
    )
  })

  it('should run structurizr with docker mounted with the correct dir', async () => {
    await runStructurizr('/some-folder/some-file.dsl', {
      docsPath: '/some-folder/',
      executor: 'docker',
      format: 'mermaid',
      dockerImage: 'structurizr/cli',
      additionalStructurizrArgs: '',
    })

    expect(exec).toHaveBeenCalledWith(
      'docker run --rm -v "/some-folder/:/usr/local/structurizr" structurizr/cli export -workspace "some-file.dsl" -format "mermaid"',
    )
  })

  it('should throw if executor is unknown', async () => {
    expect(() =>
      runStructurizr('some-file.dsl', {
        docsPath: '.',
        // @ts-expect-error - intentionally invalid value
        executor: 'unknown',
        format: 'mermaid',
        dockerImage: 'structurizr/cli',
        additionalStructurizrArgs: '',
      }),
    ).rejects.toThrowErrorMatchingInlineSnapshot(
      `[Error: docusaurus-plugin-structurizr: Unknown executor: unknown]`,
    )
  })

  it('should write files to output dir with executor docker', async () => {
    const outputDir = 'my-output dir'
    await runStructurizr('some-file.dsl', {
      docsPath: '.',
      executor: 'docker',
      format: 'mermaid',
      dockerImage: 'structurizr/cli',
      additionalStructurizrArgs: '',
      outputDir,
    })

    const resolvedPath = path.resolve(outputDir)
    expect(exec).toHaveBeenCalledWith(
      `docker run --rm -v ".:/usr/local/structurizr" -v "${resolvedPath}:/usr/local/output" structurizr/cli export -workspace "some-file.dsl" -output "/usr/local/output" -format "mermaid"`,
    )
  })

  it('should write files to output dir with executor cli', async () => {
    const outputDir = 'my-output dir'
    await runStructurizr('some-file.dsl', {
      docsPath: '.',
      executor: 'cli',
      format: 'mermaid',
      dockerImage: '',
      additionalStructurizrArgs: '',
      outputDir,
    })

    const resolvedPath = path.resolve(outputDir)
    expect(exec).toHaveBeenCalledWith(
      `structurizr-cli export -workspace some-file.dsl -output "${resolvedPath}" -format "mermaid"`,
    )
  })
})
