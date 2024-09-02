# docusaurus-plugin-structurizr

## 0.5.1

### Patch Changes

- [#304](https://github.com/TimKolberger/docusaurus-plugin-structurizr/pull/304)
  [`99f32b8`](https://github.com/TimKolberger/docusaurus-plugin-structurizr/commit/99f32b860d9c45c49b194d2f4e7ea2f124d19269)
  Thanks [@noobinthisgame](https://github.com/noobinthisgame)! - Added logging after plugin started
  to improve usability.

## 0.5.0

### Minor Changes

- [#160](https://github.com/TimKolberger/docusaurus-plugin-structurizr/pull/160)
  [`f7562f3`](https://github.com/TimKolberger/docusaurus-plugin-structurizr/commit/f7562f381014db34c757698aa9956c7b5b777f68)
  Thanks [@TimKolberger](https://github.com/TimKolberger)! - Support generating all diagrams in one
  output directory.

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

## 0.4.1

### Patch Changes

- [`3e09c42`](https://github.com/TimKolberger/docusaurus-plugin-structurizr/commit/3e09c426623838e52be4cc90295c0c39f2dfe265)
  Thanks [@TimKolberger](https://github.com/TimKolberger)! - Updated Readme to document all options.

## 0.4.0

### Minor Changes

- [#76](https://github.com/TimKolberger/docusaurus-plugin-structurizr/pull/76)
  [`c7f4514`](https://github.com/TimKolberger/docusaurus-plugin-structurizr/commit/c7f451423bbd873ff0a55108c8f9ddeab8823ba0)
  Thanks [@TimKolberger](https://github.com/TimKolberger)! - Added the option property
  `ignorePatterns` of type `string[]` to ignore files and directories from being processed by the
  plugin.

  It defaults to `['/**/include.*.dsl']` to ignore include files from being processed.

## 0.3.0

### Minor Changes

- [#26](https://github.com/TimKolberger/docusaurus-plugin-structurizr/pull/26)
  [`107eaed`](https://github.com/TimKolberger/docusaurus-plugin-structurizr/commit/107eaedb7f109431b24b531cf40f45cd2eda0080)
  Thanks [@renovate](https://github.com/apps/renovate)! - Add support for docusaurus v3.1 by moving
  @docusaurus/utils-validation to peer dependencies.

## 0.2.0

### Minor Changes

- [#8](https://github.com/TimKolberger/docusaurus-plugin-structurizr/pull/8)
  [`e478bf1`](https://github.com/TimKolberger/docusaurus-plugin-structurizr/commit/e478bf1f58179acd64ee99a7433fa06fd3e62922)
  Thanks [@TimKolberger](https://github.com/TimKolberger)! - Removed undocumented and not working
  option `output`

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
