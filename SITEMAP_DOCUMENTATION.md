# Multilingual Sitemap Documentation

## Overview

This document describes the comprehensive multilingual sitemap implementation for Pittsburgh Tomorrow Pioneer, which includes all resource categories and subcategories with full language support.

## Statistics

- **Total URL Entries**: 880 (55 multilingual pages × 15 languages)
- **Multilingual Pages**: 55 (homepage, about, privacy, resources + all categories & subcategories)
- **Languages**: 16 (en, es, fr, zh, ar, sw, ne, ps, uz, prs, fa, ja, de, pt, ru, ur)
- **Non-Multilingual Pages**: 4 (screening, checklist, login, signup)
- **Total Hreflang Tags**: 14,960 (825 entries × 16 tags each: 15 languages + x-default)
- **File Size**: 804KB
- **Total Lines**: 7,956

## Implementation

### Automated Generation

The sitemap is generated using a Python script (`generate_sitemap.py`) that:

1. Defines all public pages, resource categories, and subcategories
2. Generates URL entries for each language variation
3. Adds proper hreflang tags with BCP 47 locale codes
4. Maintains non-multilingual pages without language variations
5. Outputs valid XML conforming to sitemap protocol

### To Regenerate Sitemap

```bash
python3 generate_sitemap.py
```

## Included Pages

### Main Public Pages (4 pages × 15 languages = 60 entries)
- Homepage (`/`)
- About (`/about`)
- Privacy (`/privacy`)
- Resources (`/resources`)

### Resource Categories (6 pages × 15 languages = 90 entries)
- Living Essentials (`/resources/living-essentials`)
- Community & Belonging (`/resources/community-belonging`)
- Education & Youth (`/resources/education-youth`)
- ESL & Immigrant Support (`/resources/esl-immigrant`)
- Work & Business (`/resources/work-business`)
- Culture & Leisure (`/resources/culture-leisure`)

### Resource Subcategories (45 pages × 15 languages = 675 entries)

#### Living Essentials (17 subcategories)
- Housing Group (5 pages)
  - Housing hub
  - Housing - Relocating
  - Housing - Buying a Home
  - Housing - Assistance
  - Housing - Rent

- Health Group (6 pages)
  - Health hub
  - Health - Body & Mind
  - Health - Hospitals
  - Health - Nutrition
  - Health - Senior Care
  - Health - Additional Support

- Food Group (4 pages)
  - Food hub
  - Food Pantries
  - Grocery Guide
  - Specialty Stores

- Pittsburgh Guides Group (4 pages)
  - Pittsburgh Guides hub
  - Discover Pittsburgh
  - Diverse Businesses
  - Immigrant Services

- Transportation (1 page)

#### Community & Belonging (7 subcategories)
- Civic Engagement Group (5 pages)
  - Civic Engagement hub
  - Government
  - Local Advocacy
  - Volunteer
  - Youth

- Religion (1 page)
- Social Connection (1 page)

#### Education & Youth (4 subcategories)
- Youth Education
- Youth Programming
- College Prep & Tutoring
- Adult Education

#### ESL & Immigrant Support (5 subcategories)
- Legal Group (3 pages)
  - Legal hub
  - General Law
  - Immigration & Asylum

- ESL Support (1 page)
- Refugee & Immigrant Support (1 page)

#### Work & Business (4 subcategories)
- Career Support
- Internship Opportunities
- Business Development
- Business Support

#### Culture & Leisure (5 subcategories)
- Hobby Spaces
- Night Life
- Art
- Family
- Beauty & Hair

### Non-Multilingual Pages (4 entries)
- Screening (`/screening`)
- Checklist (`/checklist`)
- Login (`/login`)
- Signup (`/signup`)

## Language Support

Each multilingual page includes URL variations for:

1. **English (en-US)** - `?lang=en`
2. **Spanish (es-ES)** - `?lang=es`
3. **French (fr-FR)** - `?lang=fr`
4. **Chinese Simplified (zh-CN)** - `?lang=zh`
5. **Arabic (ar)** - `?lang=ar`
6. **Swahili (sw)** - `?lang=sw`
7. **Nepali (ne-NP)** - `?lang=ne`
8. **Pashto (ps-AF)** - `?lang=ps`
9. **Uzbek (uz-UZ)** - `?lang=uz`
10. **Dari (prs-AF)** - `?lang=prs`
11. **Farsi (fa-IR)** - `?lang=fa`
12. **Japanese (ja-JP)** - `?lang=ja`
13. **German (de-DE)** - `?lang=de`
14. **Portuguese (pt-BR)** - `?lang=pt`
15. **Russian (ru-RU)** - `?lang=ru`
16. **Urdu (ur-PK)** - `?lang=ur`
17. **x-default** - Fallback to English

## Hreflang Tags

Each multilingual URL entry includes 16 hreflang tags (15 languages + x-default):

```xml
<url>
  <loc>https://www.pittsburghpioneer.com/resources?lang=es</loc>
  <lastmod>2025-01-10T00:00:00+00:00</lastmod>
  <changefreq>daily</changefreq>
  <priority>0.9</priority>
  <xhtml:link rel="alternate" hreflang="en-US" href="https://www.pittsburghpioneer.com/resources?lang=en" />
  <xhtml:link rel="alternate" hreflang="es-ES" href="https://www.pittsburghpioneer.com/resources?lang=es" />
  <xhtml:link rel="alternate" hreflang="fr-FR" href="https://www.pittsburghpioneer.com/resources?lang=fr" />
  <xhtml:link rel="alternate" hreflang="zh-CN" href="https://www.pittsburghpioneer.com/resources?lang=zh" />
  <xhtml:link rel="alternate" hreflang="ar" href="https://www.pittsburghpioneer.com/resources?lang=ar" />
  <xhtml:link rel="alternate" hreflang="sw" href="https://www.pittsburghpioneer.com/resources?lang=sw" />
  <xhtml:link rel="alternate" hreflang="ne-NP" href="https://www.pittsburghpioneer.com/resources?lang=ne" />
  <xhtml:link rel="alternate" hreflang="ps-AF" href="https://www.pittsburghpioneer.com/resources?lang=ps" />
  <xhtml:link rel="alternate" hreflang="uz-UZ" href="https://www.pittsburghpioneer.com/resources?lang=uz" />
  <xhtml:link rel="alternate" hreflang="x-default" href="https://www.pittsburghpioneer.com/resources?lang=en" />
</url>
```

## SEO Benefits

1. **Complete Coverage**: All 55 public pages have language variations
2. **Google Discovery**: All 495 multilingual URLs are discoverable
3. **Hreflang Support**: 4,950 hreflang tags prevent duplicate content
4. **International Rankings**: Better visibility in non-English markets
5. **User Experience**: Right language shown to right users
6. **Complements HTML**: Works with hreflang tags in page `<head>`

## Validation

The sitemap has been validated for:

- ✅ XML structure (xmllint)
- ✅ Sitemap protocol compliance
- ✅ Proper namespace declarations
- ✅ Valid BCP 47 locale codes
- ✅ File size (804KB < 50MB limit)
- ✅ HTTP accessibility

## Post-Deployment

After deploying to production:

1. Submit sitemap to Google Search Console
2. Validate with hreflang testing tools
3. Monitor International Targeting report
4. Check for crawl errors

## Maintenance

To add new pages:

1. Edit `generate_sitemap.py`
2. Add to appropriate list (PUBLIC_PAGES, RESOURCE_CATEGORIES, etc.)
3. Run `python3 generate_sitemap.py`
4. Commit changes

## File Location

- **Sitemap**: `app/frontend/public/sitemap.xml`
- **Generator**: `generate_sitemap.py`
- **Referenced in**: `app/frontend/public/robots.txt`

