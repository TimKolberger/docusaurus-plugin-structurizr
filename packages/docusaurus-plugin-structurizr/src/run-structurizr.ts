import path from 'node:path'

import { exec } from './exec.js'
import { PLUGIN_NAME } from './globals.js'
import type { InternalDocusaurusPluginStructurizrOptions } from './validate-options.js'

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
