// @ts-check
import { PLUGIN_NAME } from "./globals.mjs";

export const logger = {
    warn: (...args) => console.warn(`[${PLUGIN_NAME}:WARN] `, ...args),
    info: (...args) => console.info(`[${PLUGIN_NAME}:INFO] `, ...args),
    error: (...args) => console.info(`[${PLUGIN_NAME}:ERROR] `, ...args),
};