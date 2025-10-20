// Social Media Configuration
// You can easily modify these URLs and settings

export const SOCIAL_MEDIA_CONFIG = {
  // Choose your Instagram strategy:
  // 'single' - Show only one Instagram account
  // 'portfolio' - Show only portfolio Instagram
  // 'both' - Show both portfolio and personal Instagram
  instagramStrategy: 'portfolio' as 'single' | 'portfolio' | 'both',

  // Instagram accounts
  instagram: {
    // Main/Portfolio Instagram account
    portfolio: {
      url: 'https://www.instagram.com/matkoplus/',
      username: 'matkoplus',
      type: 'portfolio' as const
    },
    // Personal Instagram account (optional)
    personal: {
      url: 'https://www.instagram.com/matko_baran/',
      username: 'matko_baran',
      type: 'personal' as const
    }
  },

  // Other social media
  github: 'https://github.com/matkobaran',
  linkedin: 'https://www.linkedin.com/in/martin-baran/'
};

// Helper function to get active Instagram links
export const getInstagramLinks = (strategy?: 'single' | 'portfolio' | 'both') => {
  const { instagram } = SOCIAL_MEDIA_CONFIG;
  const instagramStrategy = strategy || SOCIAL_MEDIA_CONFIG.instagramStrategy;
  
  switch (instagramStrategy) {
    case 'single':
      return [instagram.portfolio];
    case 'portfolio':
      return [instagram.portfolio];
    case 'both':
      return [instagram.portfolio, instagram.personal];
    default:
      return [instagram.portfolio];
  }
};
