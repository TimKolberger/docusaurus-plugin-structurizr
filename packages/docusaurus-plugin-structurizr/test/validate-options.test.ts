import { normalizePluginOptions } from '@docusaurus/utils-validation'
import { expect, it, describe } from 'vitest'

import { validateOptions } from '../src/index.js'

describe('validate options', () => {
  it('should apply default values', () => {
    const result = validateOptions({
      validate: normalizePluginOptions,
      options: {},
    })
    expect(result).toMatchInlineSnapshot(`
      {
        "additionalStructurizrArgs": "",
        "dockerImage": "structurizr/structurizr",
        "enabled": true,
        "format": "mermaid",
        "id": "default",
        "ignorePatterns": [
          "/**/include.*.dsl",
        ],
        "paths": [
          "docs",
        ],
      }
    `)
  })

  it('should allow override of all values', () => {
    const result = validateOptions({
      validate: normalizePluginOptions,
      options: {
        ignorePatterns: ['overridden'],
        additionalStructurizrArgs: 'overridden',
        dockerImage: 'overridden',
        enabled: false,
        format: 'plantuml',
        id: 'overridden',
        paths: ['overridden1', 'overridden2'],
      },
    })
    expect(result).toMatchInlineSnapshot(`
      {
        "additionalStructurizrArgs": "overridden",
        "dockerImage": "overridden",
        "enabled": false,
        "format": "plantuml",
        "id": "overridden",
        "ignorePatterns": [
          "overridden",
        ],
        "paths": [
          "overridden1",
          "overridden2",
        ],
      }
    `)
  })
})
