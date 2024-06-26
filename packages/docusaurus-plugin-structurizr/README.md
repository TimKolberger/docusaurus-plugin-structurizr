# Docusaurus Plugin Structurizr

<p align="center">
  <a href="https://www.npmjs.com/package/docusaurus-plugin-structurizr">
    <img
      alt="npm"
      src="https://img.shields.io/npm/v/docusaurus-plugin-structurizr?style=for-the-badge"
    />
  </a>
  <a href="https://github.com/TimKolberger/docusaurus-plugin-structurizr">
    <img
      alt="GitHub stars"
      src="https://img.shields.io/github/stars/TimKolberger/docusaurus-plugin-structurizr?logo=github&style=for-the-badge"
    />
  </a>
  <a href="https://github.com/TimKolberger/docusaurus-plugin-structurizr/blob/main/LICENSE.md">
    <img
      alt="NPM"
      src="https://img.shields.io/npm/l/docusaurus-plugin-structurizr?style=for-the-badge"
    />
  </a>
  <img
    alt="GitHub Workflow Status (with event)"
    src="https://img.shields.io/github/actions/workflow/status/TimKolberger/docusaurus-plugin-structurizr/release.yml?style=for-the-badge"
  />
</p>

This plugin allows you to use [Structurizr](https://structurizr.com/) diagrams in your
[Docusaurus](https://docusaurus.io/) documentation.

## Installation

> **Note**: This plugin requires `structurizr-cli` or `docker` to be installed on your machine!
>
> See [Structurizr installation docs](https://docs.structurizr.com/cli/installation).

Add the plugin to your Docusaurus project. If you want to use mermaid diagrams in your markdown
files, you also need to install the official mermaid theme.

```bash
npm install -D docusaurus-plugin-structurizr @docusaurus/theme-mermaid
```

Add the plugin to your `docusaurus.config.js`:

```js title="docusaurus.config.js"
export default {
  plugins: [
    [
      'docusaurus-plugin-structurizr',
      // All options are optional
      // Default values are shown below
      {
        enabled: true,
        paths: ['docs'],
        format: 'mermaid', // "mermaid" | "plantuml" | <structurizr-cli format: https://docs.structurizr.com/cli/export>
        executor: 'auto', // "docker" | "cli" | "auto",
        dockerImage: 'structurizr/cli', // see https://hub.docker.com/r/structurizr/cli
        additionalStructurizrArgs: undefined, // string
        outputDir: undefined, // Generate all diagrams in a single directory. E.g. "diagrams".
        ignorePatterns: ['/**/include.*.dsl'], // automatically exclude import files (eg: !import ../common/import.actors.dsl)
      },
    ],
  ],

  // to use mermaid diagrams in your markdown files, install the official mermaid theme
  // see https://docusaurus.io/docs/api/themes/@docusaurus/theme-mermaid
  themes: ['@docusaurus/theme-mermaid'],
  markdown: {
    mermaid: true,
  },
}
```

## Documentation

See https://timkolberger.github.io/docusaurus-plugin-structurizr/ for the full documentation.

## Usage

The plugin will look for files with `.dsl` extension and will generate a diagram for each file. The
diagram will be placed in the same directory.

Import the diagram in your markdown file using the `raw-loader`, see
[importing code snippets in Docusaurus](https://docusaurus.io/docs/markdown-features/react#importing-code-snippets)
for more information.

```mdx
import awsMermaid from '!!raw-loader!./structurizr-AmazonWebServicesDeployment.mmd'
import Mermaid from '@theme/Mermaid'

<Mermaid value={awsMermaid} />
```

### CI environments

If you want to use this plugin in your CI pipeline, you need to install `structurizr-cli` or
`docker` on your CI machine.

If that is not possible, you can opt out of using the plugin in CI by setting the `enabled` option
to `false`. Make sure to commit your generated diagrams to your repository.

```js title="docusaurus.config.js"
export default {
  plugins: [
    [
      'docusaurus-plugin-structurizr',
      {
        enabled: !process.env.CI,
      },
    ],
  ],
}
```

## License

This project is licensed under the terms of the [MIT license](./LICENSE.md).
