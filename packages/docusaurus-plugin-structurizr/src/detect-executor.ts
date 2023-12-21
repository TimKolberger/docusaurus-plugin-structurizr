import { exec } from './exec.js'
import { logger } from './logger.js'

/**
 * Detects which executor to run. Supports the structurizr-cli or docker.
 * @see https://docs.structurizr.com/cli/installation
 */
export async function detectExecutor(executor: 'auto' | 'docker' | 'cli') {
  if (executor !== 'auto') {
    return executor
  }

  try {
    await exec('docker version')
    return 'docker'
  } catch (error) {
    logger.warn('docker not found or not started, falling back to cli')
  }

  try {
    await exec('structurizr-cli help')
    return 'cli'
  } catch (error) {
    logger.warn('structurizr-cli not found')
  }

  throw new Error(
    'No viable executor found. Please install structurizr-cli or docker. See https://docs.structurizr.com/cli/installation for more information.',
  )
}
