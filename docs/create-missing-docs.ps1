# PowerShell script to create missing documentation files

# Define the missing files
$missingFiles = @(
    @{
        Path = "docs/architecture/components.md"
        Title = "Components"
        Content = @"
---
sidebar_position: 2
---

# Components

This document describes the key components of the portfolio application.

## Header

The header component provides navigation and user authentication controls.

## Footer

The footer component displays copyright information and links.

## Skills Section

The skills section displays technical skills in a periodic table format.

## Blog

The blog component allows viewing and editing blog posts.

## Knowledge Base

The knowledge base component provides access to glossary and domain knowledge.
"@
    },
    @{
        Path = "docs/architecture/data-flow.md"
        Title = "Data Flow"
        Content = @"
---
sidebar_position: 3
---

# Data Flow

This document describes the data flow within the portfolio application.

## Authentication Flow

1. User clicks on the authentication button
2. User is redirected to the authentication provider
3. After successful authentication, user is redirected back to the application
4. The application stores the authentication token
5. Protected routes are now accessible

## Blog Data Flow

1. Blog posts are fetched from the API
2. Posts are displayed in the blog list
3. When a post is selected, the full content is displayed
4. Authenticated users can edit or create new posts
5. Changes are saved back to the API

## Skills Data Flow

1. Skills data is loaded from a JSON file
2. Experience is calculated based on start and end dates
3. Skills are filtered based on user selection
4. Filtered skills are displayed in the periodic table view
"@
    },
    @{
        Path = "docs/libraries/react.md"
        Title = "React"
        Content = @"
---
sidebar_position: 1
---

# React

This document describes how React is used in the portfolio application.

## Component Structure

The application follows a component-based architecture with:

- Functional components
- React hooks for state management
- Context API for global state

## Routing

React Router is used for navigation with the following routes:

- Home: `/`
- Skills: `/skills`
- Blog: `/blog`
- Knowledge Base: `/kb`
- Documentation: `/docs`

## State Management

The application uses:

- Local state with useState for component-specific state
- Context API for global state like authentication and theme
- Custom hooks for reusable logic
"@
    },
    @{
        Path = "docs/libraries/slate.md"
        Title = "Slate.js"
        Content = @"
---
sidebar_position: 3
---

# Slate.js

This document describes how Slate.js is used for the blog editor in the portfolio application.

## Editor Configuration

The Slate.js editor is configured with:

- Rich text formatting
- Image embedding
- Code blocks with syntax highlighting
- Custom serialization for storage

## Custom Plugins

The following custom plugins have been implemented:

- Markdown shortcuts
- Auto-save functionality
- Image upload and resizing
- Table support

## Integration with MUI

The Slate.js editor is integrated with Material-UI components for:

- Toolbar buttons
- Dialogs
- Tooltips
- Responsive layout
"@
    },
    @{
        Path = "docs/sbom/licenses.md"
        Title = "Licenses"
        Content = @"
---
sidebar_position: 2
---

# Licenses

This document provides information about the licenses of dependencies used in the portfolio application.

## License Types

The application uses dependencies with the following license types:

- MIT License
- Apache License 2.0
- ISC License
- BSD License

## License Compliance

All dependencies have been reviewed for license compliance. The application:

- Includes all required license notices
- Complies with all license terms
- Does not use any dependencies with conflicting license requirements

## Third-Party Licenses

### React and React DOM
- License: MIT
- Copyright: Facebook, Inc.

### Material-UI
- License: MIT
- Copyright: Material-UI Team

### Auth.js
- License: ISC
- Copyright: Auth.js Contributors

### Slate.js
- License: MIT
- Copyright: Slate Contributors
"@
    }
)

# Create the files
foreach ($file in $missingFiles) {
    $filePath = $file.Path
    $fullPath = Join-Path -Path (Get-Location) -ChildPath $filePath
    
    # Create directory if it doesn't exist
    $directory = Split-Path -Path $fullPath -Parent
    if (-not (Test-Path -Path $directory)) {
        New-Item -Path $directory -ItemType Directory -Force | Out-Null
        Write-Host "Created directory: $directory" -ForegroundColor Green
    }
    
    # Create the file
    Set-Content -Path $fullPath -Value $file.Content
    Write-Host "Created file: $filePath" -ForegroundColor Green
}

# Update sidebars.js to include the new files
$sidebarsPath = Join-Path -Path (Get-Location) -ChildPath "docs/sidebars.js"
$sidebarsContent = Get-Content -Path $sidebarsPath -Raw

# Replace the sidebar items
$updatedSidebarsContent = $sidebarsContent -replace 
    "items: \['architecture/overview'\]", 
    "items: ['architecture/overview', 'architecture/components', 'architecture/data-flow']"

$updatedSidebarsContent = $updatedSidebarsContent -replace 
    "items: \['libraries/mui'\]", 
    "items: ['libraries/react', 'libraries/mui', 'libraries/slate']"

$updatedSidebarsContent = $updatedSidebarsContent -replace 
    "items: \['sbom/dependencies'\]", 
    "items: ['sbom/dependencies', 'sbom/licenses']"

# Save the updated sidebars.js
Set-Content -Path $sidebarsPath -Value $updatedSidebarsContent
Write-Host "Updated sidebars.js to include the new files" -ForegroundColor Green

Write-Host "`nAll missing documentation files have been created and sidebars.js has been updated." -ForegroundColor Cyan
Write-Host "You can now run the test-local-build.ps1 script to verify that the documentation builds correctly." -ForegroundColor Cyan
