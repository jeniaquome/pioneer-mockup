#!/usr/bin/env python3
"""
Generate multilingual sitemap for Pittsburgh Tomorrow Pioneer
Includes all 15 language variations for public pages with hreflang tags
(English, Spanish, French, Chinese, Arabic, Swahili, Nepali, Pashto, Uzbek, Farsi, Japanese, German, Portuguese, Russian, Urdu)
"""

from datetime import datetime

# Configuration
LANGUAGES = [
    {'code': 'en', 'locale': 'en-US'},
    {'code': 'es', 'locale': 'es-ES'},
    {'code': 'fr', 'locale': 'fr-FR'},
    {'code': 'zh', 'locale': 'zh-CN'},
    {'code': 'ar', 'locale': 'ar'},
    {'code': 'sw', 'locale': 'sw'},
    {'code': 'ne', 'locale': 'ne-NP'},
    {'code': 'ps', 'locale': 'ps-AF'},
    {'code': 'uz', 'locale': 'uz-UZ'},
    {'code': 'fa', 'locale': 'fa-IR'},
    {'code': 'ja', 'locale': 'ja-JP'},
    {'code': 'de', 'locale': 'de-DE'},
    {'code': 'pt', 'locale': 'pt-BR'},
    {'code': 'ru', 'locale': 'ru-RU'},
    {'code': 'ur', 'locale': 'ur-PK'},
]

BASE_URL = 'https://www.pittsburghpioneer.com'
DEFAULT_LANG = 'en'
LASTMOD = '2025-01-10T00:00:00+00:00'

# Public pages that should have multilingual versions
PUBLIC_PAGES = [
    {'path': '/', 'priority': '1.0', 'changefreq': 'weekly'},
    {'path': '/about', 'priority': '0.8', 'changefreq': 'monthly'},
    {'path': '/privacy', 'priority': '0.3', 'changefreq': 'yearly'},
    {'path': '/resources', 'priority': '0.9', 'changefreq': 'daily'},
]

# Resource categories
RESOURCE_CATEGORIES = [
    {'path': '/resources/living-essentials', 'priority': '0.8', 'changefreq': 'daily'},
    {'path': '/resources/community-belonging', 'priority': '0.8', 'changefreq': 'daily'},
    {'path': '/resources/education-youth', 'priority': '0.8', 'changefreq': 'daily'},
    {'path': '/resources/esl-immigrant', 'priority': '0.8', 'changefreq': 'daily'},
    {'path': '/resources/work-business', 'priority': '0.8', 'changefreq': 'daily'},
    {'path': '/resources/culture-leisure', 'priority': '0.8', 'changefreq': 'daily'},
]

# Resource subcategories
RESOURCE_SUBCATEGORIES = [
    # Living Essentials - Housing
    {'path': '/resources/living-essentials/housing', 'priority': '0.75', 'changefreq': 'daily'},
    {'path': '/resources/living-essentials/housing/housing-relocating', 'priority': '0.7', 'changefreq': 'weekly'},
    {'path': '/resources/living-essentials/housing/housing-buying-a-home', 'priority': '0.7', 'changefreq': 'weekly'},
    {'path': '/resources/living-essentials/housing/housing-assistance', 'priority': '0.7', 'changefreq': 'weekly'},
    {'path': '/resources/living-essentials/housing/housing-rent', 'priority': '0.7', 'changefreq': 'weekly'},
    
    # Living Essentials - Health
    {'path': '/resources/living-essentials/health', 'priority': '0.75', 'changefreq': 'daily'},
    {'path': '/resources/living-essentials/health/health-body-mind', 'priority': '0.7', 'changefreq': 'weekly'},
    {'path': '/resources/living-essentials/health/health-hospitals', 'priority': '0.7', 'changefreq': 'weekly'},
    {'path': '/resources/living-essentials/health/health-nutrition', 'priority': '0.7', 'changefreq': 'weekly'},
    {'path': '/resources/living-essentials/health/health-senior-care', 'priority': '0.7', 'changefreq': 'weekly'},
    {'path': '/resources/living-essentials/health/health-additional-support', 'priority': '0.7', 'changefreq': 'weekly'},
    
    # Living Essentials - Food
    {'path': '/resources/living-essentials/food', 'priority': '0.75', 'changefreq': 'daily'},
    {'path': '/resources/living-essentials/food/food-pantries', 'priority': '0.7', 'changefreq': 'weekly'},
    {'path': '/resources/living-essentials/food/grocery-guide', 'priority': '0.7', 'changefreq': 'weekly'},
    {'path': '/resources/living-essentials/food/specialty-stores', 'priority': '0.7', 'changefreq': 'weekly'},
    
    # Living Essentials - Pittsburgh Guides
    {'path': '/resources/living-essentials/pittsburgh-guides', 'priority': '0.75', 'changefreq': 'daily'},
    {'path': '/resources/living-essentials/pittsburgh-guides/guide-discover-pittsburgh', 'priority': '0.7', 'changefreq': 'weekly'},
    {'path': '/resources/living-essentials/pittsburgh-guides/guide-diverse-businesses', 'priority': '0.7', 'changefreq': 'weekly'},
    {'path': '/resources/living-essentials/pittsburgh-guides/guide-immigrant-services', 'priority': '0.7', 'changefreq': 'weekly'},
    
    # Living Essentials - Transit
    {'path': '/resources/living-essentials/transportation', 'priority': '0.7', 'changefreq': 'weekly'},
    
    # Community and Belonging - Civic Engagement
    {'path': '/resources/community-belonging/civic-engagement', 'priority': '0.75', 'changefreq': 'daily'},
    {'path': '/resources/community-belonging/civic-engagement/government', 'priority': '0.7', 'changefreq': 'weekly'},
    {'path': '/resources/community-belonging/civic-engagement/local-advocacy', 'priority': '0.7', 'changefreq': 'weekly'},
    {'path': '/resources/community-belonging/civic-engagement/volunteer', 'priority': '0.7', 'changefreq': 'weekly'},
    {'path': '/resources/community-belonging/civic-engagement/youth', 'priority': '0.7', 'changefreq': 'weekly'},
    
    # Community and Belonging - Other
    {'path': '/resources/community-belonging/religion', 'priority': '0.7', 'changefreq': 'weekly'},
    {'path': '/resources/community-belonging/social-connection', 'priority': '0.7', 'changefreq': 'weekly'},
    
    # Education and Youth
    {'path': '/resources/education-youth/youth-education', 'priority': '0.7', 'changefreq': 'weekly'},
    {'path': '/resources/education-youth/youth-programming', 'priority': '0.7', 'changefreq': 'weekly'},
    {'path': '/resources/education-youth/college-prep-tutoring', 'priority': '0.7', 'changefreq': 'weekly'},
    {'path': '/resources/education-youth/adult-education', 'priority': '0.7', 'changefreq': 'weekly'},
    
    # ESL and Immigrant Support - Legal
    {'path': '/resources/esl-immigrant/legal', 'priority': '0.75', 'changefreq': 'daily'},
    {'path': '/resources/esl-immigrant/legal/general-law', 'priority': '0.7', 'changefreq': 'weekly'},
    {'path': '/resources/esl-immigrant/legal/immigration-asylum', 'priority': '0.7', 'changefreq': 'weekly'},
    
    # ESL and Immigrant Support - Other
    {'path': '/resources/esl-immigrant/esl-support', 'priority': '0.7', 'changefreq': 'weekly'},
    {'path': '/resources/esl-immigrant/refugee-immigrant-support', 'priority': '0.7', 'changefreq': 'weekly'},
    
    # Work and Business
    {'path': '/resources/work-business/career-support', 'priority': '0.7', 'changefreq': 'weekly'},
    {'path': '/resources/work-business/internship-opportunities', 'priority': '0.7', 'changefreq': 'weekly'},
    {'path': '/resources/work-business/business-development', 'priority': '0.7', 'changefreq': 'weekly'},
    {'path': '/resources/work-business/business-support', 'priority': '0.7', 'changefreq': 'weekly'},
    
    # Culture, Arts and Fun
    {'path': '/resources/culture-leisure/hobby-spaces', 'priority': '0.7', 'changefreq': 'weekly'},
    {'path': '/resources/culture-leisure/night-life', 'priority': '0.7', 'changefreq': 'weekly'},
    {'path': '/resources/culture-leisure/art', 'priority': '0.7', 'changefreq': 'weekly'},
    {'path': '/resources/culture-leisure/family', 'priority': '0.7', 'changefreq': 'weekly'},
    {'path': '/resources/culture-leisure/beauty-hair', 'priority': '0.7', 'changefreq': 'weekly'},
]

# Pages without multilingual support (excluded from hreflang)
NON_MULTILINGUAL_PAGES = [
    {'path': '/screening', 'priority': '0.9', 'changefreq': 'monthly'},
    {'path': '/checklist', 'priority': '0.8', 'changefreq': 'weekly'}
]


def generate_hreflang_links(path: str, indent: str = '    ') -> str:
    """Generate hreflang link tags for all languages"""
    links = []
    
    # Add link for each language
    for lang in LANGUAGES:
        separator = '&' if '?' in path else '?'
        url = f'{BASE_URL}{path}{separator}lang={lang["code"]}'
        links.append(f'{indent}<xhtml:link rel="alternate" hreflang="{lang["locale"]}" href="{url}" />')
    
    # Add x-default
    separator = '&' if '?' in path else '?'
    default_url = f'{BASE_URL}{path}{separator}lang={DEFAULT_LANG}'
    links.append(f'{indent}<xhtml:link rel="alternate" hreflang="x-default" href="{default_url}" />')
    
    return '\n'.join(links)


def generate_multilingual_url_entries(pages: list) -> str:
    """Generate URL entries for all language variations of given pages"""
    entries = []
    
    for page in pages:
        path = page['path']
        priority = page['priority']
        changefreq = page['changefreq']
        
        # Generate entry for each language
        for lang in LANGUAGES:
            separator = '&' if '?' in path else '?'
            url = f'{BASE_URL}{path}{separator}lang={lang["code"]}'
            
            entry = f'''  <url>
    <loc>{url}</loc>
    <lastmod>{LASTMOD}</lastmod>
    <changefreq>{changefreq}</changefreq>
    <priority>{priority}</priority>
{generate_hreflang_links(path)}
  </url>'''
            entries.append(entry)
    
    return '\n'.join(entries)


def generate_non_multilingual_url_entries(pages: list) -> str:
    """Generate URL entries for pages without language variations"""
    entries = []
    
    for page in pages:
        path = page['path']
        priority = page['priority']
        changefreq = page['changefreq']
        url = f'{BASE_URL}{path}'
        
        entry = f'''  <url>
    <loc>{url}</loc>
    <lastmod>{LASTMOD}</lastmod>
    <changefreq>{changefreq}</changefreq>
    <priority>{priority}</priority>
  </url>'''
        entries.append(entry)
    
    return '\n'.join(entries)


def generate_sitemap() -> str:
    """Generate complete sitemap XML"""
    
    # Combine all multilingual pages
    all_multilingual_pages = PUBLIC_PAGES + RESOURCE_CATEGORIES + RESOURCE_SUBCATEGORIES
    
    sitemap = f'''<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  
  <!-- Homepage - All 15 Languages -->
{generate_multilingual_url_entries(PUBLIC_PAGES)}
  
  <!-- Resource Categories - All 15 Languages -->
{generate_multilingual_url_entries(RESOURCE_CATEGORIES)}
  
  <!-- Resource Subcategories - All 15 Languages -->
{generate_multilingual_url_entries(RESOURCE_SUBCATEGORIES)}
  
  <!-- Authentication Pages (no language variations - excluded from hreflang per config) -->
{generate_non_multilingual_url_entries(NON_MULTILINGUAL_PAGES)}
</urlset>
'''
    
    return sitemap


def main():
    """Generate and save sitemap"""
    sitemap_content = generate_sitemap()
    
    # Write to file
    output_file = 'app/frontend/public/sitemap.xml'
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(sitemap_content)
    
    # Calculate statistics
    total_multilingual = len(PUBLIC_PAGES) + len(RESOURCE_CATEGORIES) + len(RESOURCE_SUBCATEGORIES)
    total_urls = (total_multilingual * len(LANGUAGES)) + len(NON_MULTILINGUAL_PAGES)
    total_hreflang = total_multilingual * len(LANGUAGES) * (len(LANGUAGES) + 1)  # +1 for x-default
    total_unique_urls = total_multilingual + len(NON_MULTILINGUAL_PAGES)
    
    print("✅ Sitemap generated successfully!")
    print(f"\n📊 Statistics:")
    print(f"  • Total unique URLs: {total_unique_urls} ({total_multilingual} multilingual + {len(NON_MULTILINGUAL_PAGES)} non-multilingual)")
    print(f"  • Total URL entries: {total_urls} ({total_multilingual} pages × {len(LANGUAGES)} languages + {len(NON_MULTILINGUAL_PAGES)})")
    print(f"  • Multilingual pages: {total_multilingual} (4 main + 6 categories + {len(RESOURCE_SUBCATEGORIES)} subcategories)")
    print(f"  • Non-multilingual pages: {len(NON_MULTILINGUAL_PAGES)}")
    print(f"  • Total hreflang tags: {total_hreflang}")
    print(f"\n📄 Output file: {output_file}")


if __name__ == '__main__':
    main()

