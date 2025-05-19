// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Portfolio Documentation',
  tagline: 'Documentation for the portfolio project',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://vishal.biyani.xyz',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/docs/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'biyani701', // Usually your GitHub org/user name.
  projectName: 'portfolio', // Usually your repo name.
  trailingSlash: false,

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/vishal-biyani/portfolio/tree/main/docs/',
          remarkPlugins: [
            [require('@docusaurus/remark-plugin-npm2yarn'), {sync: true}],
          ],
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/vishal-biyani/portfolio/tree/main/docs/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  // Add Mermaid support
  markdown: {
    mermaid: true,
  },

  themes: ['@docusaurus/theme-mermaid'],

  // Add scripts to be loaded before the content
  scripts: [
    {
      src: '/docs/js/theme-init.js',
      async: false,
    },
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      colorMode: {
        defaultMode: 'light',
        disableSwitch: true, // We're using our custom theme toggle
        respectPrefersColorScheme: false,
      },
      navbar: {
        title: 'Portfolio Docs',
        logo: {
          alt: 'Portfolio Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Documentation',
          },
          {to: 'https://vishal.biyani.xyz', label: 'Main Site', position: 'right'},
          {
            href: 'https://github.com/vishal-biyani/portfolio',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Documentation',
            items: [
              {
                label: 'Introduction',
                to: '/docs/intro',
              },
              {
                label: 'Architecture',
                to: '/docs/architecture/overview',
              },
              {
                label: 'Libraries',
                to: '/docs/libraries/mui',
              },
            ],
          },
          {
            title: 'Policies',
            items: [
              {
                label: 'Privacy Policy',
                to: '/docs/policies/privacy-policy',
              },
              {
                label: 'Terms of Use',
                to: '/docs/policies/terms-of-use',
              },
              {
                label: 'Security Policy',
                to: '/docs/policies/security-policy',
              },
              {
                label: 'Cookie Policy',
                to: '/docs/policies/cookie-policy',
              },
            ],
          },
          {
            title: 'Links',
            items: [
              {
                label: 'Main Site',
                href: 'https://vishal.biyani.xyz',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/vishal-biyani/portfolio',
              },
              {
                label: 'LinkedIn',
                href: 'https://www.linkedin.com/in/vishalbiyani2/',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Vishal Biyani. All rights reserved.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ['bash', 'json', 'markdown', 'yaml', 'jsx', 'tsx'],
      },
      mermaid: {
        theme: { light: 'neutral', dark: 'dark' },
      },
    }),
};

module.exports = config;
