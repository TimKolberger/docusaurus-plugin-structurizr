import type { OptionValidationContext, PluginOptions } from '@docusaurus/types'
import { Joi } from '@docusaurus/utils-validation'

export type DocusaurusPluginStructurizrOptions = PluginOptions & {
  /**
   * Whether the plugin is enabled or not
   * @example Disable the plugin in CI
   * ```js
   * {
   *   enabled: !process.env.CI
   * }
   * ```
   * @default true
   */
  enabled?: boolean
  /**
   * The paths to search in for diagrams. E.g. all documentation directories
   * @default ['docs']
   */
  paths?: string[]
  /**
   * The diagram format to use
   * @see https://docs.structurizr.com/cli/export
   * @default 'mermaid'
   */
  format?:
    | 'mermaid'
    | 'plantuml'
    | 'plantuml/structurizr'
    | 'plantuml/c4plantuml'
    | 'dot'
    | 'd2'
    | 'json'
    | 'ilograph'
    | 'websequencediagrams'
    // eslint-disable-next-line @typescript-eslint/ban-types
    | (string & {})
  /**
   * The executor to use when generating diagrams
   * @default 'auto'
   */
  executor?: 'docker' | 'cli' | 'auto'
  /**
   * The docker image to use when using the docker executor
   * @default 'structurizr/cli'
   */
  dockerImage?: string
  /**
   * Additional arguments to pass to the structurizr CLI
   * @default ''
   */
  additionalStructurizrArgs?: string

  /**
   * Patterns to ignore when searching for diagrams
   * @default ['/**\/include.*.dsl']
   */
  ignorePatterns?: string[]

  /**
   * The output directory for the diagrams
   * If not set, the diagrams will be generated in the same directory as the source file
   * @default undefined
   */
  outputDir?: string
}

export type InternalDocusaurusPluginStructurizrOptions =
  Required<DocusaurusPluginStructurizrOptions>

const Schema = Joi.object<DocusaurusPluginStructurizrOptions>({
  enabled: Joi.boolean().default(true),
  paths: Joi.array().items(Joi.string()).default(['docs']),
  format: Joi.string().default('mermaid'),
  executor: Joi.string().valid('docker', 'cli', 'auto').default('auto'),
  dockerImage: Joi.string().default('structurizr/cli'),
  additionalStructurizrArgs: Joi.string().default(''),
  ignorePatterns: Joi.array().items(Joi.string()).default(['/**/include.*.dsl']),
  outputDir: Joi.string().optional(),
})

export function validateOptions({
  validate,
  options,
}: OptionValidationContext<DocusaurusPluginStructurizrOptions, PluginOptions>): PluginOptions {
  return validate(Schema, options)
}
