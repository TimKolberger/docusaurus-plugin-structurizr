import type { ThemeConfig } from '@docusaurus/preset-classic'
import type { Config } from '@docusaurus/types'
import type { DocusaurusPluginStructurizrOptions } from 'docusaurus-plugin-structurizr'
import { themes as prismThemes } from 'prism-react-renderer'

const config: Config = {
  title: 'Docusaurus Structurizr Plugin',
  tagline: 'Use structurizr DSL files to generate diagrams in your Docusaurus site.',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://your-docusaurus-site.example.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'timkolberger', // Usually your GitHub org/user name.
  projectName: 'docusaurus-plugin-structurizr', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        theme: {
          customCss: './src/css/custom.css',
        },
      },
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'Docusaurus Structurizr Plugin',
      logo: {
        alt: 'Docusaurus Structurizr Plugin Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          to: '/docs',
          label: 'Docs',
          position: 'left',
        },
        {
          href: 'https://github.com/timkolberger/docusaurus-plugin-structurizr',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Docs',
              to: '/docs',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/timkolberger/docusaurus-plugin-structurizr',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Tim Kolberger`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies ThemeConfig,
  themes: ['@docusaurus/theme-mermaid'],
  plugins: [
    [
      'docusaurus-plugin-structurizr',
      {
        enabled: !process.env.CI,
      } satisfies DocusaurusPluginStructurizrOptions,
    ],
  ],
  markdown: {
    mermaid: true,
  },
}

export default config
