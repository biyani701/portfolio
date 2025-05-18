# Portfolio Documentation

This directory contains the Docusaurus documentation site for the portfolio project.

## Deployment

The documentation site is automatically built and deployed as part of the main GitHub Actions workflow. The workflow:

1. Builds the main portfolio site
2. Sets up and builds the Docusaurus documentation
3. Combines both builds into a single deployment
4. Deploys to GitHub Pages

The documentation is available at: https://vishal.biyani.xyz/docs/

## Local Development

To run the documentation site locally:

1. Install Docusaurus:
```bash
npx create-docusaurus@latest docs-site classic
cd docs-site
```

2. Copy the configuration and content:
```bash
cp -r ../docs/docs ./
cp ../docs/docusaurus.config.js ./
cp ../docs/sidebars.js ./
```

3. Install dependencies and start the development server:
```bash
npm install
npm start
```

## Documentation Structure

- `/docs/intro.md` - Introduction and overview
- `/docs/architecture/` - Architecture documentation
- `/docs/libraries/` - Library documentation
- `/docs/sbom/` - Software Bill of Materials

## Adding Content

1. Create new Markdown files in the appropriate directories
2. Update the `sidebars.js` file to include new pages
3. Commit changes to the repository
4. The GitHub Actions workflow will automatically build and deploy the updated documentation
