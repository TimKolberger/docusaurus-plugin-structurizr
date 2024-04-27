---
'docusaurus-plugin-structurizr': minor
---

Support generating all diagrams in one output directory.

By default, the option `outputDir` is `undefined` and all diagrams are generated in the same
directory as the source file.

Set `outputDir` to a string to generate all diagrams in a single directory relative to the
docusaurus project root.

```js
const pluginOptions = {
  // ...
  outputDir: 'diagrams', // Generate all diagrams in a single directory. E.g. "diagrams".
}
```
