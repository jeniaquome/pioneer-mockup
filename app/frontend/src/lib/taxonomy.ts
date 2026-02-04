// Centralized category + subcategory taxonomy for the Newcomer Toolkit
// Slugs are lowercase, kebab-cased identifiers used in routes

export type Subcategory = {
  id: string
  label: string
  description?: string
}

export type Category = {
  id: string
  label: string
  description?: string
  icon: string
  // Tailwind classes for background/text/hover following brand guidelines
  color: string
  textColor: string
  hoverColor: string
  subcategories: Subcategory[]
}

export const TAXONOMY: Category[] = [
  // 1. Living Essentials
  {
    id: 'living-essentials',
    label: 'Living Essentials',
    description: 'Housing, health, transit and food',
    icon: 'compass',
    color: 'bg-yellow-100',
    textColor: 'text-brand-pms-129',
    hoverColor: 'hover:bg-yellow-50',
    subcategories: [
      { id: 'housing-rent', label: 'Housing / Renting' },
      { id: 'housing-buying-home', label: 'Housing / Buying a home' },
      { id: 'housing-assistance', label: 'Housing / Housing assistance' },
      { id: 'housing-relocating', label: 'Housing / Relocating to Pittsburgh' },
      { id: 'health-body-mind', label: 'Health / Body and mind care' },
      { id: 'health-hospitals', label: 'Health / Hospitals' },
      { id: 'health-nutrition', label: 'Health / Nutrition' },
      { id: 'health-senior-care', label: 'Health / Senior care' },
      { id: 'health-additional-support', label: 'Health / Additional support' },
      { id: 'food-pantries', label: 'Food / Food pantries' },
      { id: 'grocery-guide', label: 'Food / Grocery guide' },
      { id: 'specialty-stores', label: 'Food / Specialty stores' },
      { id: 'transportation', label: 'Transit' },
      { id: 'guide-discover-pittsburgh', label: 'Pittsburgh Guides / Discover Pittsburgh' },
      { id: 'guide-diverse-businesses', label: 'Pittsburgh Guides / Diverse businesses' },
      { id: 'guide-immigrant-services', label: 'Pittsburgh Guides / Immigrant services' },
    ],
  },

  // 2. Community and Belonging
  {
    id: 'community-belonging',
    label: 'Community and Belonging',
    description: 'Connect, participate, and build community in Pittsburgh',
    icon: 'users',
    color: 'bg-brand-pms-290',
    textColor: 'text-brand-pms-285',
    hoverColor: 'hover:bg-brand-pms-285/20',
    subcategories: [
      { id: 'civic-government', label: 'Civic engagement / Government' },
      { id: 'civic-advocacy', label: 'Civic engagement / Local advocacy' },
      { id: 'civic-volunteer', label: 'Civic engagement / Volunteer' },
      { id: 'civic-youth', label: 'Civic engagement / Youth' },
      { id: 'religion', label: 'Religion' },
      { id: 'social-connection', label: 'Social connection' },
    ],
  },

  // 3. Education: Adult and Youth
  {
    id: 'education-youth',
    label: 'Education: Adult and Youth',
    description: 'Adult learning, tutoring, and youth opportunities',
    icon: 'graduation-cap',
    color: 'bg-brand-pms-354/20',
    textColor: 'text-brand-pms-354',
    hoverColor: 'hover:bg-brand-pms-354/30',
    subcategories: [
      { id: 'youth-education', label: 'Youth education' },
      { id: 'youth-programming', label: 'Youth programming' },
      { id: 'college-prep-tutoring', label: 'College prep / Tutoring' },
      { id: 'adult-education', label: 'Adult education' },
    ],
  },

  // 4. ESL and Immigrant Support
  {
    id: 'esl-immigrant',
    label: 'ESL and Immigrant Support',
    description: 'Language learning, immigration help, and newcomer services',
    icon: 'globe',
    color: 'bg-brand-pms-382/20',
    textColor: 'text-brand-pms-382',
    hoverColor: 'hover:bg-brand-pms-382/30',
    subcategories: [
      { id: 'esl-support', label: 'ESL support' },
      { id: 'refugee-immigrant-support', label: 'Refugee / Immigrant support' },
      { id: 'general-law', label: 'General law' },
      { id: 'immigration-asylum', label: 'Immigration / Asylum' },
    ],
  },

  // 5. Jobs and Business Resources
  {
    id: 'work-business',
    label: 'Jobs and Business Resources',
    description: 'Jobs, career support, and business resources',
    icon: 'briefcase',
    color: 'bg-brand-pms-267/20',
    textColor: 'text-brand-pms-267',
    hoverColor: 'hover:bg-brand-pms-267/30',
    subcategories: [
      { id: 'career-support', label: 'Career support' },
      { id: 'internship-opportunities', label: 'Internship opportunities' },
      { id: 'business-development', label: 'Business development' },
      { id: 'business-support', label: 'Business support' },
    ],
  },

  // 6. Culture, Arts and Fun
  {
    id: 'culture-leisure',
    label: 'Culture, Arts and Fun',
    description: 'Explore arts, family activities, hobbies, and nightlife',
    icon: 'palette',
    color: 'bg-brand-pms-179/20',
    textColor: 'text-brand-pms-179',
    hoverColor: 'hover:bg-brand-pms-179/30',
    subcategories: [
      // Custom order: Hobby Spaces, Night Life, Art, Family, Hair care / Beauty
      { id: 'hobby-spaces', label: 'Hobby spaces' },
      { id: 'night-life', label: 'Night life' },
      { id: 'art', label: 'Arts' },
      { id: 'family', label: 'Family Recreation' },
      { id: 'beauty-hair', label: 'Hair care / Beauty' },
    ],
  },
]

export const getCategoryById = (id: string | undefined) =>
  TAXONOMY.find((c) => c.id === id)

export const getSubcategoryById = (categoryId: string | undefined, subId: string | undefined) =>
  getCategoryById(categoryId)?.subcategories.find((s) => s.id === subId)

// Map frontend category IDs to backend canonical category labels
export const getCanonicalCategoryLabel = (id: string): string | undefined => {
  switch (id) {
    case 'community-belonging':
      return 'Community/Belonging'
    case 'culture-leisure':
      return 'Culture/Leisure'
    case 'esl-immigrant':
      return 'ESL/Immigrant'
    case 'education-youth':
      return 'Education/Youth'
    case 'living-essentials':
      return 'Living/Essentials'
    case 'work-business':
      return 'Work/Business'
    default:
      return undefined
  }
}

