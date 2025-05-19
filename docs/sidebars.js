/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  tutorialSidebar: [
    {
      type: 'category',
      label: 'Introduction',
      items: ['intro'],
    },
    {
      type: 'category',
      label: 'Architecture',
      items: ['architecture/overview'],
    },
    {
      type: 'category',
      label: 'Libraries',
      items: ['libraries/mui'],
    },
    {
      type: 'category',
      label: 'Development',
      items: ['development/eslint-version'],
    },
    {
      type: 'category',
      label: 'SBOM',
      items: ['sbom/dependencies'],
    },
    {
      type: 'category',
      label: 'Policies',
      items: [
        'policies/privacy-policy',
        'policies/terms-of-use',
        'policies/security-policy',
        'policies/cookie-policy',
        'policies/eula',
      ],
    },
  ],
};

module.exports = sidebars;
