import { PLUGIN_NAME } from './globals.js'

export const logger = {
  warn: (...args: unknown[]) => console.warn(`[${PLUGIN_NAME}:WARN] `, ...args),
  info: (...args: unknown[]) => console.info(`[${PLUGIN_NAME}:INFO] `, ...args),
  error: (...args: unknown[]) => console.info(`[${PLUGIN_NAME}:ERROR] `, ...args),
}
