# Portfolio Documentation

This directory contains the Docusaurus documentation site for the portfolio project.

## Setup Instructions

1. Install Docusaurus:
```bash
npm init docusaurus@latest docs-site classic
cd docs-site
```

2. Configure Docusaurus:
- Update the `docusaurus.config.js` file with the appropriate settings
- Set the base URL to `/docs/` for GitHub Pages deployment

3. Create documentation content:
- Add architecture documentation
- Add library documentation
- Add SBOM (Software Bill of Materials)
- Add other relevant documentation

4. Build and deploy:
```bash
npm run build
```

5. Deploy to GitHub Pages:
- Configure GitHub Pages to serve from the `build` directory
- Set up GitHub Actions for automatic deployment

## Documentation Structure

- `/docs/architecture/` - Architecture documentation
- `/docs/libraries/` - Library documentation
- `/docs/sbom/` - Software Bill of Materials
- `/docs/api/` - API documentation
