# Karthik Suresh - Personal Website

A modular, markdown-driven personal website for Karthik Suresh, featuring automatic builds and deployments.

## Features

✨ **Modular Content Management** - Edit markdown files to update website content  
🚀 **Automatic Build & Deploy** - GitHub Actions automatically builds and deploys on content changes  
📱 **Responsive Design** - Beautiful, mobile-friendly design with scrolling background  
🔗 **Clickable Detail Pages** - Separate pages for news, papers, and courses  
⚡ **Fast Performance** - Static site generation for optimal loading speeds  

## Quick Start

### Making Content Changes

Simply edit the markdown files in the `content/` directory:

- **`content/intro.md`** - Main introduction section
- **`content/news.md`** - Latest news and updates  
- **`content/papers.md`** - Publications and research papers
- **`content/courses.md`** - Courses and workshops

After editing and committing changes, GitHub Actions will automatically build and deploy the updated website.

### Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Build the website:**
   ```bash
   npm run build
   ```

3. **Preview locally:**
   ```bash
   npm run dev
   ```
   This will build the site and start a local server at `http://localhost:8000`

## Project Structure

```
├── content/           # Markdown content files
│   ├── intro.md      # Main introduction
│   ├── news.md       # News and updates
│   ├── papers.md     # Publications
│   └── courses.md    # Courses and workshops
├── templates/         # Handlebars templates
│   ├── index.hbs     # Main page template
│   └── detail.hbs    # Detail pages template
├── assets/           # CSS, JS, and images
├── build.js          # Build script
├── package.json      # Dependencies and scripts
└── .github/workflows/ # GitHub Actions for deployment
```

## Content Format

### Front Matter
Each markdown file supports YAML front matter for metadata:

```yaml
---
title: "Page Title"
description: "Page description"
---

Your markdown content here...
```

### Markdown Features
- Standard markdown syntax
- Automatic link generation
- Code highlighting
- Tables and lists
- Horizontal rules for separation

## Build Process

1. **Content Processing** - Markdown files are parsed and converted to HTML
2. **Template Rendering** - Content is injected into Handlebars templates
3. **Static Generation** - Final HTML files are generated
4. **Asset Copying** - CSS, JS, and images are included

## Deployment

The site automatically deploys to GitHub Pages when changes are pushed to the main branch. The deployment process:

1. Detects changes to content, templates, or build files
2. Installs Node.js dependencies
3. Runs the build process
4. Deploys to GitHub Pages

## Customization

### Adding New Sections
1. Create a new markdown file in `content/`
2. Update `build.js` to include the new section
3. Add navigation links in `templates/index.hbs`

### Styling Changes
- Modify `assets/css/custom.css` for styling updates
- The design uses the HTML5 UP Hyperspace template as a base

### Template Modifications
- Edit `templates/index.hbs` for the main page layout
- Edit `templates/detail.hbs` for detail page layouts

## Technologies Used

- **Node.js** - Build system
- **Handlebars** - Template engine
- **markdown-it** - Markdown processing
- **GitHub Actions** - CI/CD pipeline
- **GitHub Pages** - Hosting

## Development Notes

- The intro section now has a full-screen scrollable background without card styling
- Detail pages feature clean, academic-style layouts
- All content is now modular and easily editable
- The build system is designed for simplicity and maintainability

## License

This project is open source and available under the [MIT License](LICENSE.txt).