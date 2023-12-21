import childProcess from 'node:child_process'
import path from 'node:path'
import util from 'node:util'

import { PLUGIN_NAME } from './globals.js'
import { logger } from './logger.js'
import type { InternalDocusaurusPluginStructurizrOptions } from './validate-options.js'

const exec = util.promisify(childProcess.exec)

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

/**
 * Runs structurizr-cli or docker to generate diagrams.
 */
export async function runStructurizr(
  file: string,
  options: Pick<
    InternalDocusaurusPluginStructurizrOptions,
    'executor' | 'dockerImage' | 'format' | 'additionalStructurizrArgs'
  >,
) {
  const { format, additionalStructurizrArgs, executor, dockerImage } = options
  const directory = path.dirname(file)
  const fileName = path.basename(file)

  const executorMap = {
    docker: [
      `docker run --rm -v "${directory}:/usr/local/structurizr" ${dockerImage} export -workspace "${fileName}"`,
      additionalStructurizrArgs,
    ]
      .filter(Boolean)
      .join(' '),
    cli: [`structurizr-cli export -workspace ${file}`, additionalStructurizrArgs]
      .filter(Boolean)
      .join(' '),
    auto: '',
  }
  const executorCommand = executorMap[executor]
  if (!executorCommand) {
    throw new Error(`${PLUGIN_NAME}: Unknown executor: ${executor}`)
  }
  const command = `${executorCommand} -format "${format}"`
  await exec(command)
}
