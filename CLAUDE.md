# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 🎨 Project Overview

**LoginLab** is a comprehensive mobile-focused login page collection featuring 39 unique visual styles. The project showcases modern frontend development with HTML5, CSS3 animations, and JavaScript ES6+.

### Core Architecture

- **Static Website**: Pure HTML/CSS/JS with no build system
- **Component Structure**: Each style consists of HTML template + CSS file + JS file
- **Style Gallery**: Centralized style selector with preview thumbnails
- **File-based Deployment**: Direct file serving compatible with any web server

## 🚀 Development Commands

### Local Development

- **Start server**: `npm run dev` (uses http-server on port 8000)
- **Preview**: Open `index.html` directly in browser
- **Auto-reload**: Use VS Code Live Server or similar
- **No build process**: Pure HTML/CSS/JS development

### Testing

- **E2E Testing**: `npx playwright test` (if tests are added)
- **Manual testing**: Open individual style pages in browser
- **Mobile testing**: Use browser dev tools mobile emulation

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

### Core Architecture Patterns

**LoginSystem Class** (`src/js/common.js`):
- Encapsulates common login functionality
- Handles form switching (login ↔ register ↔ forgot password)
- Provides form validation and submission handling
- Manages verification code functionality

**Style Selector** (`src/js/style-selector.js`):
- Initializes scroll-triggered animations for style cards
- Handles style card click events and navigation
- Manages download functionality via JSZip
- Implements interactive effects and magic portal

**Individual Style JavaScript** (`src/js/{style-name}.js`):
- Follows consistent initialization pattern: `DOMContentLoaded` event
- Implements style-specific animations and interactions
- Integrates with the common LoginSystem class
- Adds unique visual effects and interactions

## 🔧 Technology Stack

### Frontend

- **HTML5**: Semantic markup with proper accessibility (ARIA labels)
- **CSS3**: Advanced animations, CSS Grid, Flexbox, custom properties
- **JavaScript ES6+**: Classes, modules, arrow functions, async/await

### External Dependencies

- **JSZip**: Client-side ZIP file generation for style downloads
- **Supabase JS**: Real-time analytics and usage statistics
- **Anime.js**: Advanced animation library for loading effects
- **CDN Hosting**: External libraries loaded via CDN for performance

## 📊 Analytics & Data

### Supabase Integration

- Project analytics tracked in real-time via `analytics.js`
- Style download statistics and user behavior tracking
- Connection to `analytics.html` dashboard for visualization
- Anonymous usage data for improvement insights

## 🔄 Development Workflow

### Branch Strategy

- `master`: Production (auto-deploy to Vercel)
- `develop`: Development (preview deploy)
- Feature branches: `feature/{style-name}`

### Code Patterns

**HTML Structure**:
- Semantic HTML5 with proper ARIA labels
- Consistent meta tags and viewport settings
- Mobile-first responsive design
- Form validation attributes

**CSS Architecture**:
- BEM-like naming convention (e.g., `.login-form__input`)
- CSS custom properties for theming
- Performance-optimized animations (transform, opacity)
- Mobile-first media queries

**JavaScript Patterns**:
- ES6 Class-based architecture
- Event delegation for performance
- Consistent error handling
- Async/await for API calls

## 🎨 Creating New Styles

### File Structure Pattern

When adding a new style, create three files:
1. `src/styles/{style-name}.html` - Login page template
2. `src/assets/styles/{style-name}.css` - Styles and animations
3. `src/js/{style-name}.js` - Style-specific interactions

### HTML Template Requirements

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{Style Name} - LoginLab</title>
    <link rel="stylesheet" href="../assets/styles/{style-name}.css">
</head>
<body>
    <!-- Include back button, login form, register form, forgot password form -->
    <script src="../js/common.js"></script>
    <script src="../js/{style-name}.js"></script>
</body>
</html>
```

### JavaScript Initialization Pattern

```javascript
document.addEventListener('DOMContentLoaded', () => {
    // Initialize page animations
    initPageAnimations();
    
    // Initialize interactive effects
    initInteractiveEffects();
    
    // Initialize style-specific effects
    initStyleSpecificEffects();
});

function initPageAnimations() {
    // Page load animations
}

function initInteractiveEffects() {
    // User interaction handlers
}

function initStyleSpecificEffects() {
    // Unique visual effects for this style
}
```

### CSS Performance Guidelines

- Use `transform` and `opacity` for animations
- Avoid `box-shadow` and `filter` in animations
- Use `will-change` sparingly
- Prefer CSS animations over JavaScript for performance

## 📱 Mobile Optimization

- Touch-friendly interface (minimum 44px tap targets)
- Responsive design with mobile-first approach
- Optimized animations for mobile devices
- Proper viewport meta tags for mobile browsers

## 🔍 Code Quality Standards

### HTML Requirements
- Valid HTML5 markup
- Proper semantic structure
- Complete accessibility attributes
- Mobile-optimized viewport settings

### CSS Requirements
- Consistent naming convention
- Performance-optimized animations
- Mobile-first responsive design
- Cross-browser compatibility

### JavaScript Requirements
- ES6+ syntax and features
- Proper error handling
- Event delegation for performance
- Consistent code structure across styles

## 🎯 Testing Guidelines

### Manual Testing Checklist
- [ ] All forms work correctly (login, register, forgot password)
- [ ] Form validation works as expected
- [ ] Mobile responsiveness on different screen sizes
- [ ] Animation performance is smooth
- [ ] All interactive elements work properly
- [ ] Cross-browser compatibility

### Performance Testing
- [ ] Page load time under 3 seconds
- [ ] Animation frame rate above 30fps
- [ ] Mobile performance on 3G networks
- [ ] Memory usage optimization

---

**LoginLab** - 39 unique mobile login styles with modern web technologies. 🎨
