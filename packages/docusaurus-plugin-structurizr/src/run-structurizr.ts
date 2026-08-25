import path from 'node:path'

import { exec } from './exec.js'
import type { InternalDocusaurusPluginStructurizrOptions } from './validate-options.js'

/**
 * Runs docker to generate diagrams.
 */
export async function runStructurizr(
  file: string,
  options: Pick<
    InternalDocusaurusPluginStructurizrOptions,
    'dockerImage' | 'format' | 'additionalStructurizrArgs'
  > &
    Partial<Pick<InternalDocusaurusPluginStructurizrOptions, 'outputDir'>> & { docsPath: string },
) {
  const { format, docsPath, additionalStructurizrArgs, dockerImage, outputDir } = options
  const fileName = path.relative(docsPath, file)
  const resolvedOutputDir = outputDir ? path.resolve(outputDir) : ''

  const command = [
    `docker run --rm`,
    `-v "${docsPath}:/usr/local/structurizr"`,
    resolvedOutputDir ? `-v "${resolvedOutputDir}:/usr/local/output"` : null,
    dockerImage,
    `export -workspace "${fileName}"`,
    resolvedOutputDir ? `-output "/usr/local/output"` : null,
    additionalStructurizrArgs,
    `-format "${format}"`,
  ]
    .filter(Boolean)
    .join(' ')
  await exec(command)
}
