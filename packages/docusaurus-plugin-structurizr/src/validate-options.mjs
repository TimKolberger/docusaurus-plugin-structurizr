// @ts-check
import Joi from "joi";

const Schema = Joi.object({
  enabled: Joi.boolean().default(true),
  paths: Joi.array().items(Joi.string()).default(["docs"]),
  format: Joi.string().valid("mermaid", "plantuml").default("mermaid"),
  executor: Joi.string().valid("docker", "cli", "auto").default("auto"),
  dockerImage: Joi.string().default("structurizr/cli"),
  additionalStructurizrArgs: Joi.string().default(""),
})

export function validateOptions({ validate, options }) {
  return validate(Schema, options);
}
