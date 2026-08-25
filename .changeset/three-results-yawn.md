---
'docusaurus-plugin-structurizr': major
---

Removed support for the [deprecated Structurizr CLI](https://docs.structurizr.com/cli).

**Docker is now the only supported executor.**

To migrate, remove the plugin option `executor`:

```diff title="docusaurus.config.js"
export default {
  // ...
  plugins: [
    [
      'docusaurus-plugin-structurizr',
      {
        enabled: true,
        paths: ['docs'],
        format: 'mermaid',
-        executor: 'auto', 
        dockerImage: 'structurizr/structurizr', 
      },
    ],
  ],
// ...
}
```
