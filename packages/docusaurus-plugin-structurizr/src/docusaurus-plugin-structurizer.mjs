// @ts-check
import path from "node:path";
import globby from "globby";
import { PLUGIN_NAME } from "./globals.mjs";
import { logger } from "./logger.mjs";
import { detectExecutor, runStructurizr } from "./run-structurizr.mjs";

/**
 * Docusaurus plugin to generate diagrams from structurizr DSL files.
 * This plugin requires structurizr-cli or docker to be installed.
 *
 * @see https://docs.structurizr.com/
 *
 * @param context {import("@docusaurus/types").LoadContext}
 * @param options {import("@docusaurus/types").PluginOptions & { enabled?: boolean, paths?: string[], format?: "mermaid" | "plantuml", executor?: "docker" | "cli" | "auto", dockerImage?: string, additionalStructurizrArgs?: string }
 * @returns {import("@docusaurus/types").Plugin}
 */
export async function docusaurusPluginStructurizr(context, options) {
  const {
    enabled,
    paths,
    format,
    executor,
    dockerImage,
    additionalStructurizrArgs,
  } = options;

  if (!enabled) {
    return {
      name: PLUGIN_NAME,
    };
  }

  const detectedExecutor = await detectExecutor(executor);

  const contentPaths = paths.map((contentPath) => {
    const resolvedPath = path.resolve(context.siteDir, contentPath);
    return `${resolvedPath}/**/*.dsl`;
  });

  return {
    name: PLUGIN_NAME,
    async loadContent() {
      const files = await globby(contentPaths);
      const results = await Promise.allSettled(
        files.map((file) =>
          runStructurizr(file, {
            executor: detectedExecutor,
            dockerImage,
            format,
            additionalStructurizrArgs,
          }),
        ),
      );

      const successes = results.filter(
        (result) => result.status === "fulfilled",
      );
      if (successes.length > 0) {
        logger.info(
          `Generated ${successes.length} diagram${
            successes.length !== 1 ? "s" : ""
          }.`,
        );
      }

      const errors = results.filter((result) => result.status === "rejected");
      if (errors.length > 0) {
        logger.error(
          `${errors.length} errors while generating diagrams:\n`,
          ...errors.map((error) => `${error.reason}\n`),
        );
      }
    },
    getPathsToWatch() {
      return contentPaths;
    },
  };
}
