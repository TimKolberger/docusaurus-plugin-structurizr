# docusaurus-plugin-structurizr

## 0.1.1

### Patch Changes

- [`d7ab574`](https://github.com/TimKolberger/docusaurus-plugin-structurizr/commit/d7ab574527e9ae5f5c6e5b47ebdf51eedff4694c)
  Thanks [@TimKolberger](https://github.com/TimKolberger)! - Fixed an issue where the plugin had a
  too strict validation for the `format` option. Now you can use any string as format option, see
  https://docs.structurizr.com/cli/export for more information.

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

## 0.1.0

### Minor Changes

- [`b6bc570`](https://github.com/TimKolberger/docusaurus-plugin-structurizr/commit/b6bc5707350ecec973db14c3e2c402fa19228b2f)
  Thanks [@TimKolberger](https://github.com/TimKolberger)! - Initial release
