import type { Mock } from 'vitest'

import { detectExecutor } from '../src/detect-executor.js'
import { exec } from '../src/exec.js'

vi.mock('../src/exec.js', async () => ({
  exec: vi.fn(),
}))

describe('detect-executor', () => {
  it('pass through value if not set to auto', async () => {
    const result = await detectExecutor('docker')
    expect(result).toEqual('docker')
  })

  it('should detect docker', async () => {
    ;(exec as Mock).mockImplementationOnce(async (arg) => {
      if (arg.includes('docker ')) {
        return
      }
      throw new Error('all other commands should fail')
    })
    const result = await detectExecutor('auto')
    expect(result).toEqual('docker')
  })

  it('should detect docker', async () => {
    ;(exec as Mock).mockImplementationOnce(async (arg) => {
      if (arg.includes('structurizr-cli ')) {
        return
      }
      throw new Error('all other commands should fail')
    })
    const result = await detectExecutor('auto')
    expect(result).toEqual('cli')
  })

  it('should fail if no executor could be found', async () => {
    ;(exec as Mock).mockImplementation(async () => {
      throw new Error('all commands should fail')
    })

    expect(() => detectExecutor('auto')).rejects.toThrowErrorMatchingInlineSnapshot(
      `[Error: No viable executor found. Please install structurizr-cli or docker. See https://docs.structurizr.com/cli/installation for more information.]`,
    )
  })
})
