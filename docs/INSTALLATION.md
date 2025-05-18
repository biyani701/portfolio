# Docusaurus Installation Guide

This guide provides instructions for setting up the Docusaurus documentation site for the portfolio project.

## Prerequisites

- Node.js version 16.14 or above
- npm or yarn package manager
- Git

## Installation Steps

1. **Clone the repository** (if you haven't already):
   ```bash
   git clone https://github.com/vishal-biyani/portfolio.git
   cd portfolio
   ```

2. **Install Docusaurus**:
   ```bash
   npm init docusaurus@latest docs-site classic
   cd docs-site
   ```

3. **Copy configuration files**:
   ```bash
   cp ../docs/docusaurus.config.js ./
   cp ../docs/sidebars.js ./
   ```

4. **Copy documentation content**:
   ```bash
   mkdir -p docs/architecture docs/libraries docs/sbom
   cp ../docs/docs/intro.md ./docs/
   cp ../docs/docs/architecture/overview.md ./docs/architecture/
   cp ../docs/docs/libraries/mui.md ./docs/libraries/
   cp ../docs/docs/sbom/dependencies.md ./docs/sbom/
   ```

5. **Install dependencies**:
   ```bash
   npm install
   ```

6. **Start the development server**:
   ```bash
   npm start
   ```

   This will start a local development server and open up a browser window. Most changes are reflected live without having to restart the server.

## Building for Production

To build the documentation site for production:

```bash
npm run build
```

This command generates static content into the `build` directory that can be served using any static content hosting service.

## Deploying to GitHub Pages

1. **Update the `docusaurus.config.js` file**:
   - Set the `url` to your GitHub Pages URL (e.g., 'https://vishal.biyani.xyz')
   - Set the `baseUrl` to '/docs/'
   - Set the `organizationName` to your GitHub username
   - Set the `projectName` to your repository name

2. **Deploy using GitHub Actions**:
   Create a `.github/workflows/documentation.yml` file with the following content:

   ```yaml
   name: Deploy Documentation

   on:
     push:
       branches: [main]
       paths:
         - 'docs-site/**'

   jobs:
     deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - uses: actions/setup-node@v3
           with:
             node-version: 18
             cache: npm
             cache-dependency-path: docs-site/package-lock.json
         - name: Install dependencies
           run: |
             cd docs-site
             npm ci
         - name: Build website
           run: |
             cd docs-site
             npm run build
         - name: Deploy to GitHub Pages
           uses: peaceiris/actions-gh-pages@v3
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: ./docs-site/build
             destination_dir: docs
   ```

3. **Push changes to GitHub**:
   ```bash
   git add .
   git commit -m "Add documentation site"
   git push
   ```

4. **Configure GitHub Pages**:
   - Go to your repository settings
   - Navigate to the "Pages" section
   - Set the source to the GitHub Actions workflow

## Customizing the Documentation

### Adding New Pages

1. Create a new Markdown file in the `docs` directory
2. Add front matter at the top of the file:
   ```md
   ---
   sidebar_position: 1
   ---
   ```
3. Update the `sidebars.js` file to include the new page

### Customizing the Theme

1. Edit the `src/css/custom.css` file to change colors and styles
2. Update the `themeConfig` in `docusaurus.config.js` to customize the navbar and footer

### Adding Images

1. Place images in the `static/img` directory
2. Reference them in Markdown using relative paths:
   ```md
   ![Alt Text](/img/example.png)
   ```

## Troubleshooting

- **Build errors**: Check the console output for specific error messages
- **Broken links**: Run `npm run build` to check for broken links
- **Deployment issues**: Verify GitHub Actions permissions and settings
