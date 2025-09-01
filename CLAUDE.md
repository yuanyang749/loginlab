# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 🎨 Project Overview

**LoginLab** is a comprehensive mobile-focused login page collection featuring 39 unique visual styles. The project showcases modern frontend development with HTML5, CSS3 animations, and JavaScript ES6+.

### Core Architecture

- **Static Website**: Pure HTML/CSS/JS with no build system
- **Component Structure**: Each style consists of HTML template + CSS file + JS file
- **Style Gallery**: Centralized style selector with preview thumbnails
- **File-based Deployment**: Direct file serving compatible with any web server

## 📁 Project Structure

```
├── index.html              # Main landing page with style selector
├── analytics.html          # Statistics and analytics dashboard
├── src/
│   ├── assets/styles/      # All CSS files (39 styles + selector)
│   ├── js/                 # JavaScript files (39 styles + utilities)
│   └── styles/            # Individual style HTML templates (37 files)
└── discuss/               # Planning and architecture documents
```

## 🚀 Development Commands

### Local Development

- **Preview**: Open `index.html` directly in browser
- **Auto-reload**: Use VS Code Live Server or similar
- **No build process**: Pure HTML/CSS/JS development

### Deployment (Vercel)

- **Production**: Push to `master` branch -> auto-deploy
- **Staging**: Push to `develop` branch -> preview deploy
- **Manual**: Drag and drop to Vercel dashboard (static deployment)

## 🎯 Key Components

### Style System (39 Styles)

Each style follows the pattern:

- `src/styles/{style-name}.html` - Complete login page template
- `src/assets/styles/{style-name}.css` - All styles and animations
- `src/js/{style-name}.js` - Style-specific JavaScript

### Core Utilities

- **common.js**: Login form validation and state management
- **style-selector.js**: Gallery navigation and preview logic
- **download-manager.js**: ZIP file generation for style downloads
- **analytics.js**: Supabase integration for usage statistics

## 🔧 Technology Stack

### Frontend

- **HTML5**: Semantic markup and modern elements
- **CSS3**: Advanced animations, gradients, and transformations
- **JavaScript ES6+**: Modern syntax with modules and classes

### External Dependencies

- **JSZip**: Client-side ZIP file generation
- **Supabase JS**: Real-time analytics and statistics
- **CDN Hosting**: External libraries through CDNs

## 📊 Analytics & Data

### Supabase Integration

- Project analytics tracked in real-time
- Style download statistics
- Usage pattern analysis
- Connection to `analytics.html` dashboard

### Performance Metrics

- Mobile-first responsive design
- Animation performance optimization
- Lazy loading for better UX

## 🎨 Design System

### Style Categories

1. **Modern & Minimalist** (8 styles)
2. **Nature & Organic** (6 styles)
3. **Tech & Sci-Fi** (7 styles)
4. **Artistic & Creative** (8 styles)
5. **Retro & Vintage** (5 styles)
6. **Luxury & Premium** (5 styles)

### Animation Patterns

- CSS keyframes and transitions
- JavaScript particle systems
- Interactive form elements
- Background effects and overlays

## 🔄 Development Workflow

### Branch Strategy

- `master`: Production (auto-deploy to Vercel)
- `develop`: Development (preview deploy)
- Feature branches: `feature/{style-name}`

### Code Style

- Semantic HTML with proper accessibility
- BEM-like CSS naming convention
- ES6 modules and modern JS patterns
- Consistent file naming across components

## 🚀 Quick Start

1. **Clone**: `git clone` the repository
2. **View**: Open `index.html` in browser
3. **Develop**: Edit HTML/CSS/JS files directly
4. **Deploy**: Push to appropriate branch

## 📱 Mobile Optimization

- Touch-friendly interface
- Responsive design patterns
- Performance-optimized animations
- Mobile form input enhancements

## 🔍 Code Patterns to Follow

When adding new styles:

1. Create consistent file structure
2. Follow existing CSS animation patterns
3. Use semantic HTML structure
4. Implement mobile-responsive design
5. Include preview in style selector

## 🎯 Testing

- Manual browser testing
- Mobile device testing
- Form validation testing
- Animation performance testing

---

**LoginLab** - 39 unique mobile login styles with modern web technologies. 🎨
