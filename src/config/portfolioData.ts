// Centralized portfolio data with all galleries
// isHighlight: true means it appears in the main PortfolioSection carousel
export const portfolioData = [
  {
    id: 'pmi-pmo',
    titleKey: "portfolio.galleries.pmi_pmo.title",
    descriptionKey: "portfolio.galleries.pmi_pmo.description",
    folder: "PMI_PMO",
    photoCount: 36,
    titlePhoto: 7,
    tags: ['events', 'conference'],
    date: '2025-01-26',
    description: '',
    isHighlight: true // Shows in main carousel
  },
  {
    id: 'bd-paris-2025',
    titleKey: "portfolio.galleries.bd_paris.title",
    descriptionKey: "portfolio.galleries.bd_paris.description",
    folder: "BD_Paris",
    photoCount: 66,
    titlePhoto: 62,
    tags: ['events', 'conference'],
    date: '2025-01-15',
    description: '',
    isHighlight: true // Shows in main carousel
  },
  {
    id: 'bd-london-2024',
    titleKey: "portfolio.galleries.bd_london.title",
    descriptionKey: "portfolio.galleries.bd_london.description", 
    folder: "BD_London",
    photoCount: 86,
    titlePhoto: 3,
    tags: ['events', 'conference'],
    date: '2024-12-01',
    description: '',
    isHighlight: true // Shows in main carousel
  },  
  {
    id: 'cyber-wine-2024',
    titleKey: "portfolio.galleries.cyber_wine.title",
    descriptionKey: "portfolio.galleries.cyber_wine.description",
    folder: "Cyber_Wine",
    photoCount: 31, // Updated to match translation
    titlePhoto: 1,
    tags: ['events', 'networking'],
    date: '2024-11-15',
    description: '',
    isHighlight: true // Shows in main carousel
  },
  {
    id: 'kendice-kosice-2025',
    titleKey: "portfolio.galleries.kendice_kosice.title",
    descriptionKey: "portfolio.galleries.kendice_kosice.description",
    folder: "Kendice_Kosice",
    photoCount: 48,
    titlePhoto: 30,
    tags: ['sports', 'football', 'cup match'],
    date: '2024-12-15',
    description: '',
    isHighlight: true // Shows in main carousel
  },
  {
    id: 'kendice-bardejov-2025',
    titleKey: "portfolio.galleries.kendice_bardejov.title",
    descriptionKey: "portfolio.galleries.kendice_bardejov.description",
    folder: "Kendice_Bardejov",
    photoCount: 37,
    titlePhoto: 32,
    tags: ['sports', 'football', 'cup match'],
    date: '2024-12-15',
    description: '',
    isHighlight: true // Shows in main carousel
  },
  {
    id: 'kendice-saris-2025',
    titleKey: "portfolio.galleries.kendice_saris.title",
    descriptionKey: "portfolio.galleries.kendice_saris.description",
    folder: "Kendice_Saris",
    photoCount: 36,
    titlePhoto: 6,
    tags: ['sports', 'football', 'cup match'],
    date: '2024-12-15',
    description: '',
    isHighlight: true // Shows in main carousel
  }
];

// Helper functions
export const getHighlightedPortfolios = () => {
  return portfolioData.filter(item => item.isHighlight);
};

export const getPortfoliosByCategory = (category: 'events' | 'sports') => {
  return portfolioData.filter(item => 
    category === 'events' ? item.tags.includes('events') : item.tags.includes('sports')
  );
};

export const getPortfolioById = (id: string) => {
  return portfolioData.find(item => item.id === id);
};

export const getPortfolioByTranslatedTitle = (translatedTitle: string, t: (key: string) => string) => {
  return portfolioData.find(item => t(item.titleKey) === translatedTitle);
};
