---
'docusaurus-plugin-structurizr': patch
---

Fixed an issue where the plugin had a too strict validation for the `format` option. Now you can use
any string as format option, see https://docs.structurizr.com/cli/export for more information.

The TypeScript type for `pluginOptions.format` was updated to:

```ts
type Format =
  | 'mermaid'
  | 'plantuml'
  | 'plantuml/structurizr'
  | 'plantuml/c4plantuml'
  | 'dot'
  | 'd2'
  | 'json'
  | 'ilograph'
  | 'websequencediagrams'
  | (string & {}) // accept any string
```
