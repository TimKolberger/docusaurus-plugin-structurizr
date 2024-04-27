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
  > &
    Partial<Pick<InternalDocusaurusPluginStructurizrOptions, 'outputDir'>> & { docsPath: string },
) {
  const { format, docsPath, additionalStructurizrArgs, executor, dockerImage, outputDir } = options
  const fileName = path.relative(docsPath, file)
  const resolvedOutputDir = outputDir ? path.resolve(outputDir) : ''

  const executorMap = {
    docker: [
      `docker run --rm`,
      `-v "${docsPath}:/usr/local/structurizr"`,
      resolvedOutputDir ? `-v "${resolvedOutputDir}:/usr/local/output"` : null,
      dockerImage,
      `export -workspace "${fileName}"`,
      resolvedOutputDir ? `-output "/usr/local/output"` : null,
      additionalStructurizrArgs,
    ]
      .filter(Boolean)
      .join(' '),
    cli: [
      `structurizr-cli export -workspace ${file}`,
      resolvedOutputDir ? `-output "${resolvedOutputDir}"` : null,
      additionalStructurizrArgs,
    ]
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
