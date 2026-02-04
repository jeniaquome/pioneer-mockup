# GEO Implementation Testing Guide

## ✅ Current Status
- ✅ JSON-LD structured data is present and working
- ✅ Semantic HTML5 elements are rendered
- ✅ Deep linking IDs are generated from full translated text
- ✅ All 4 GEO phases are implemented and functional

## How to Test Deep Linking IDs Locally

### Method 1: Browser DevTools (Recommended)

1. **Open your browser** and navigate to `http://localhost:3000`
2. **Open DevTools** (F12 or Cmd+Option+I)
3. **Go to Elements/Inspector tab**
4. **Search for headings** - Look for `<h1>`, `<h2>`, `<h3>` elements
5. **Check for `id` attributes** - IDs are generated from full translated text, so you'll see:
   ```html
   <h2 id="how-can-we-help-you-today" class="...">How can we help you today?</h2>
   <h3 id="create-your-personalized-roadmap" class="...">Create Your Personalized Roadmap</h3>
   ```

### Method 2: Test Deep Linking URLs

1. **Navigate to homepage**: `http://localhost:3000/`
2. **Open DevTools Console** (F12 → Console tab)
3. **Run this command** to find all IDs:
   ```javascript
   // Find all headings with IDs
   document.querySelectorAll('h1[id], h2[id], h3[id]').forEach(el => {
     console.log(`${el.tagName}: id="${el.id}" - "${el.textContent.trim()}"`);
   });
   ```

4. **Test deep linking** by navigating to URLs with fragments (use full IDs):
   - `http://localhost:3000/#how-can-we-help-you-today`
   - `http://localhost:3000/#create-your-personalized-roadmap`
   - `http://localhost:3000/about#why-pioneer`

### Method 3: Automated Testing Script

Create a test file to verify IDs are present:

```javascript
// test-geo-ids.js
// Run in browser console on http://localhost:3000

const headings = document.querySelectorAll('h1[id], h2[id], h3[id]');
console.log(`Found ${headings.length} headings with IDs:`);
headings.forEach((h, i) => {
  console.log(`${i + 1}. <${h.tagName.toLowerCase()}> id="${h.id}"`);
  console.log(`   Text: "${h.textContent.trim().substring(0, 50)}..."`);
});

// Test that IDs are URL-friendly
const invalidIds = Array.from(headings).filter(h => {
  const id = h.id;
  return !/^[a-z0-9-]+$/.test(id) || id.startsWith('-') || id.endsWith('-');
});

if (invalidIds.length > 0) {
  console.error('❌ Found invalid IDs:', invalidIds);
} else {
  console.log('✅ All IDs are URL-friendly!');
}
```

### Method 4: Check Semantic HTML Structure

Run in browser console:
```javascript
// Check for semantic HTML5 elements
const semanticElements = {
  main: document.querySelectorAll('main').length,
  header: document.querySelectorAll('header').length,
  section: document.querySelectorAll('section').length,
  article: document.querySelectorAll('article').length,
  nav: document.querySelectorAll('nav').length,
};

console.log('Semantic HTML5 elements found:');
Object.entries(semanticElements).forEach(([tag, count]) => {
  console.log(`  <${tag}>: ${count}`);
});
```

### Method 5: Verify JSON-LD Structured Data

Run in browser console:
```javascript
// Check for JSON-LD structured data
const jsonLdScripts = document.querySelectorAll('script[type="application/ld+json"]');
console.log(`Found ${jsonLdScripts.length} JSON-LD script(s)`);
jsonLdScripts.forEach((script, i) => {
  try {
    const data = JSON.parse(script.textContent);
    console.log(`Script ${i + 1}:`, data['@type'] || data['@graph']?.[0]?.['@type'] || 'Multiple types');
  } catch (e) {
    console.error('Invalid JSON-LD:', e);
  }
});
```

## Expected Results

### HomePage (`/`)
- ✅ `<h2 id="how-can-we-help-you-today">` (from "How can we help you today?")
- ✅ `<h3 id="create-your-personalized-roadmap">` (from "Create Your Personalized Roadmap")
- ✅ `<h3 id="browse-resources">` (from "Browse Resources")
- ✅ `<h3 id="ask-bridgit">` (from "Ask BRIDGIT")
- ✅ `<main>` wrapper
- ✅ `<header>` for hero section
- ✅ `<article>` for main content
- ✅ JSON-LD `@graph` with Organization, WebSite, SoftwareApplication, Service

### AboutPage (`/about`)
- ✅ `<h1>` with ID (generated from page title)
- ✅ Multiple `<h2>` and `<h3>` with IDs (generated from full translated text)
- ✅ `<main>`, `<header>`, `<section>`, `<article>` elements
- ✅ JSON-LD Organization schema

### ResourcePage (`/resources`)
- ✅ `<h1 id="resource-toolkit">` (from "Resource Toolkit")
- ✅ `<h2 id="need-personalized-recommendations">` (from "Need Personalized Recommendations?")
- ✅ `<main>`, `<header>`, `<section>` elements
- ✅ JSON-LD CollectionPage schema

### ScreeningPage (`/screening`)
- ✅ `<h1 id="settlement-survey">` (from "Settlement Survey")
- ✅ `<h2 id="you-ve-already-completed-the-survey">` (from completed survey message)
- ✅ `<main>`, `<header>`, `<section>` elements

### Other Pages
- ✅ DashboardPage, ProfilePage, ChecklistPage, BookmarksPage all have semantic HTML and deep linking IDs
- ✅ All IDs are URL-friendly (lowercase, hyphen-separated, no special characters)

## Testing Deep Linking

1. **Manual Test**: Navigate to `http://localhost:3000/#how-can-we-help`
   - Page should scroll to that section
   - URL should update with the fragment

2. **Programmatic Test**:
   ```javascript
   // Test scroll-to-text functionality with correct full ID
   const testId = 'how-can-we-help-you-today'; // Full ID from translated text
   const element = document.getElementById(testId);
   if (element) {
     element.scrollIntoView({ behavior: 'smooth', block: 'start' });
     console.log(`✅ Scrolled to #${testId}`);
   } else {
     console.error(`❌ Element with id="${testId}" not found`);
     // Debug: Show all heading IDs
     document.querySelectorAll('h1[id], h2[id], h3[id]').forEach(h => {
       console.log(`Available: id="${h.id}" - "${h.textContent.trim().substring(0, 50)}"`);
     });
   }
   ```

## How IDs Are Generated

IDs are created using the `generateSectionId()` function from `/lib/geo-utils.ts`:

```javascript
// Example: "How can we help you today?" → "how-can-we-help-you-today"
const id = text
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')  // Replace non-alphanumeric with hyphens
  .replace(/^-|-$/g, '');        // Remove leading/trailing hyphens
```

**Important**: IDs are generated from the **full translated text**, not shortened versions. For example:
- Translation: `"How can we help you today?"`
- Generated ID: `"how-can-we-help-you-today"`

## Why IDs Don't Appear in "View Source"

React is a **client-side framework**, so:
- **View Source** shows the initial HTML template (before React renders)
- **DevTools Elements** shows the **rendered DOM** (after React renders)
- IDs are added by React during rendering, so they only appear in DevTools

This is **normal and expected**! The IDs are there for AI crawlers and browsers that execute JavaScript.

## Production Testing

After deployment, test with:
1. **Google Rich Results Test**: https://search.google.com/test/rich-results
2. **Schema.org Validator**: https://validator.schema.org/
3. **Perplexity AI**: Ask "What is Pittsburgh Pioneer?" and check if it links to your site
4. **ChatGPT**: Ask about Pittsburgh newcomer resources and see if your site is cited

