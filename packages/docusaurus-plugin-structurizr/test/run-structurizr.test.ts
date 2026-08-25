import path from 'node:path'

import { describe, expect, it, vi, afterEach } from 'vitest'

import { exec } from '../src/exec.js'
import { runStructurizr } from '../src/run-structurizr.js'

vi.mock('../src/exec.js', async () => ({
  exec: vi.fn(),
}))

describe('run-structurizr', () => {
  afterEach(() => {
    vi.resetAllMocks()
  })

  it('should run structurizr with docker', async () => {
    await runStructurizr('some-file.dsl', {
      docsPath: '.',
      format: 'mermaid',
      dockerImage: 'structurizr/structurizr',
      additionalStructurizrArgs: '',
    })

    expect(exec).toHaveBeenCalledWith(
      'docker run --rm -v ".:/usr/local/structurizr" structurizr/structurizr export -workspace "some-file.dsl" -format "mermaid"',
    )
  })

  it('should run structurizr with docker mounted with the correct dir', async () => {
    await runStructurizr('/some-folder/some-file.dsl', {
      docsPath: '/some-folder/',
      format: 'mermaid',
      dockerImage: 'structurizr/structurizr',
      additionalStructurizrArgs: '',
    })

    expect(exec).toHaveBeenCalledWith(
      'docker run --rm -v "/some-folder/:/usr/local/structurizr" structurizr/structurizr export -workspace "some-file.dsl" -format "mermaid"',
    )
  })

  it('should write files to output dir with docker', async () => {
    const outputDir = 'my-output dir'
    await runStructurizr('some-file.dsl', {
      docsPath: '.',
      format: 'mermaid',
      dockerImage: 'structurizr/structurizr',
      additionalStructurizrArgs: '',
      outputDir,
    })

    const resolvedPath = path.resolve(outputDir)
    expect(exec).toHaveBeenCalledWith(
      `docker run --rm -v ".:/usr/local/structurizr" -v "${resolvedPath}:/usr/local/output" structurizr/structurizr export -workspace "some-file.dsl" -output "/usr/local/output" -format "mermaid"`,
    )
  })
})
