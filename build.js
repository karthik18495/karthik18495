const fs = require('fs-extra');
const path = require('path');
const MarkdownIt = require('markdown-it');
const matter = require('gray-matter');
const Handlebars = require('handlebars');

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true
});

// Initialize directories
const contentDir = path.join(__dirname, 'content');
const templatesDir = path.join(__dirname, 'templates');
const srcDir = path.join(__dirname, 'src');
const outputDir = __dirname;

async function readMarkdownFile(filePath) {
  const fileContent = await fs.readFile(filePath, 'utf8');
  const { data, content } = matter(fileContent);
  const html = md.render(content);
  return { frontMatter: data, content: html, rawContent: content };
}

async function loadTemplate(templateName) {
  const templatePath = path.join(templatesDir, templateName);
  const templateContent = await fs.readFile(templatePath, 'utf8');
  return Handlebars.compile(templateContent);
}

async function generateDetailPage(fileName, title, description) {
  console.log(`Generating ${fileName}...`);
  
  try {
    // Read the markdown content
    const contentPath = path.join(contentDir, `${fileName.replace('.html', '.md')}`);
    const { frontMatter, content } = await readMarkdownFile(contentPath);
    
    // Load the detail page template
    const template = await loadTemplate('detail.hbs');
    
    // Generate the HTML
    const html = template({
      title: frontMatter.title || title,
      description: frontMatter.description || description,
      content: content,
      pageClass: fileName.replace('.html', '')
    });
    
    // Write the file
    const outputPath = path.join(outputDir, fileName);
    await fs.writeFile(outputPath, html);
    console.log(`✅ Generated ${fileName}`);
    
  } catch (error) {
    console.error(`❌ Error generating ${fileName}:`, error.message);
  }
}

async function updateMainIndex() {
  console.log('Updating main index.html...');
  
  try {
    // Read intro content
    const introPath = path.join(contentDir, 'intro.md');
    const { frontMatter: introFM, content: introContent } = await readMarkdownFile(introPath);
    
    // Load the main template
    const template = await loadTemplate('index.hbs');
    
    // Generate the HTML
    const html = template({
      intro: {
        title: introFM.title,
        subtitle: introFM.subtitle,
        content: introContent
      }
    });
    
    // Write the file
    const outputPath = path.join(outputDir, 'index.html');
    await fs.writeFile(outputPath, html);
    console.log('✅ Updated index.html');
    
  } catch (error) {
    console.error('❌ Error updating index.html:', error.message);
  }
}

async function ensureTemplatesExist() {
  // Create templates directory if it doesn't exist
  await fs.ensureDir(templatesDir);
  
  // Check if templates exist, if not create basic ones
  const indexTemplatePath = path.join(templatesDir, 'index.hbs');
  const detailTemplatePath = path.join(templatesDir, 'detail.hbs');
  
  if (!await fs.pathExists(indexTemplatePath)) {
    console.log('Creating basic index template...');
    // We'll create this template next
  }
  
  if (!await fs.pathExists(detailTemplatePath)) {
    console.log('Creating basic detail template...');
    // We'll create this template next
  }
}

async function build() {
  console.log('🚀 Starting build process...');
  
  try {
    await ensureTemplatesExist();
    
    // Generate detail pages
    await generateDetailPage('talks.html', 'Recent talks and Lectures', 'Recent talks, lectures, and presentations on AI and physics.');
    await generateDetailPage('papers.html', 'Publications', 'Research papers and publications');
    await generateDetailPage('other_projects.html', 'Other Projects', 'Other Personal Projects');

    // Update main index
    await updateMainIndex();
    
    console.log('✨ Build completed successfully!');
    
  } catch (error) {
    console.error('❌ Build failed:', error.message);
    process.exit(1);
  }
}

// Helper function to copy assets
async function copyAssets() {
  console.log('📁 Copying assets...');
  // Assets are already in place, just ensure they exist
  const assetsExist = await fs.pathExists(path.join(__dirname, 'assets'));
  if (assetsExist) {
    console.log('✅ Assets found');
  } else {
    console.log('⚠️  Assets directory not found');
  }
}

// Run the build
if (require.main === module) {
  build().then(() => copyAssets());
}

module.exports = { build, generateDetailPage, updateMainIndex };