// @ts-check
import util from "node:util";
import childProcess from "node:child_process";
import path from "node:path";
import { PLUGIN_NAME } from "./globals.mjs";
import { logger } from "./logger.mjs";

const exec = util.promisify(childProcess.exec);

/**
 * Detects which executor to run. Supports the structurizr-cli or docker.
 * @see https://docs.structurizr.com/cli/installation
 *
 * @param executor {"auto" | "docker" | "cli"}
 * @returns {Promise<"docker" | "cli">}
 */
export async function detectExecutor(executor) {
  if (executor !== "auto") {
    return executor;
  }

  try {
    await exec("docker version");
    return "docker";
  } catch (error) {
    logger.warn("docker not found or not started, falling back to cli");
  }

  try {
    await exec("structurizr-cli help");
    return "cli";
  } catch (error) {
    logger.warn("structurizr-cli not found");
  }

  throw new Error(
    "No viable executor found. Please install structurizr-cli or docker. See https://docs.structurizr.com/cli/installation for more information.",
  );
}

/**
 * Runs structurizr-cli or docker to generate diagrams.
 *
 * @param file {string}
 * @param options {{format: "mermaid" | "plantuml" | string, executor: "docker" | "cli", additionalStructurizrArgs?: string}}
 * @returns {Promise<void>}
 */
export async function runStructurizr(file, options) {
  const { format, additionalStructurizrArgs, executor, dockerImage } = options;
  const directory = path.dirname(file);
  const fileName = path.basename(file);

  const executorMap = {
    docker: [
      `docker run --rm -v "${directory}:/usr/local/structurizr" ${dockerImage} export -workspace "${fileName}"`,
      additionalStructurizrArgs,
    ]
      .filter(Boolean)
      .join(" "),
    cli: [
      `structurizr-cli export -workspace ${file}`,
      additionalStructurizrArgs,
    ]
      .filter(Boolean)
      .join(" "),
  };
  const executorCommand = executorMap[executor];
  if (!executorCommand) {
    throw new Error(`${PLUGIN_NAME}: Unknown executor: ${executor}`);
  }
  const command = `${executorCommand} -format "${format}"`;
  await exec(command);
}
