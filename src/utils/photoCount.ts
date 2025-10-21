// Photo count pluralization utility
// Handles proper pluralization for English and Slovak

export const getPhotoCountText = (count: number, language: string): string => {
  // Handle invalid count
  if (typeof count !== 'number' || count < 0) {
    console.warn('Invalid photo count:', count);
    return language === 'sk' ? '0 fotiek' : '0 photos';
  }

  if (language === 'sk') {
    // Slovak pluralization rules
    if (count === 1) {
      return `${count} fotka`;
    } else if (count >= 2 && count <= 4) {
      return `${count} fotky`;
    } else {
      return `${count} fotiek`;
    }
  } else {
    // English pluralization rules
    if (count === 1) {
      return `${count} photo`;
    } else {
      return `${count} photos`;
    }
  }
};

// Helper function to get current language from i18n
export const getCurrentLanguage = (i18n: any): string => {
  return i18n.language || 'en';
};
