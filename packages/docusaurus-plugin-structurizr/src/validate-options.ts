import type { OptionValidationContext, PluginOptions } from '@docusaurus/types'
import { Joi } from '@docusaurus/utils-validation'

export type DocusaurusPluginStructurizrOptions = PluginOptions & {
  enabled?: boolean
  paths?: string[]
  format?: 'mermaid' | 'plantuml'
  executor?: 'docker' | 'cli' | 'auto'
  dockerImage?: string
  additionalStructurizrArgs?: string
}

export type InternalDocusaurusPluginStructurizrOptions =
  Required<DocusaurusPluginStructurizrOptions>

const Schema = Joi.object<DocusaurusPluginStructurizrOptions>({
  enabled: Joi.boolean().default(true),
  paths: Joi.array().items(Joi.string()).default(['docs']),
  format: Joi.string().valid('mermaid', 'plantuml').default('mermaid'),
  executor: Joi.string().valid('docker', 'cli', 'auto').default('auto'),
  dockerImage: Joi.string().default('structurizr/cli'),
  additionalStructurizrArgs: Joi.string().default(''),
})

export function validateOptions({
  validate,
  options,
}: OptionValidationContext<DocusaurusPluginStructurizrOptions, PluginOptions>): PluginOptions {
  return validate(Schema, options)
}
