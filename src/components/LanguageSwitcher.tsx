import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

interface LanguageSwitcherProps {
  textColor?: string;
}

export const LanguageSwitcher = ({ textColor = 'text-white' }: LanguageSwitcherProps) => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'sk', name: 'Slovenčina', flag: '🇸🇰' },
  ];

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  const changeLanguage = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-white/10 transition-colors ${textColor}`}
        aria-label="Change language"
      >
        <Globe size={18} />
        <span className="text-lg">{currentLanguage.flag}</span>
        <span className={`hidden sm:block text-sm ${textColor}`}>{currentLanguage.code.toUpperCase()}</span>
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute right-0 mt-2 w-48 bg-navy border border-white/20 rounded-lg shadow-lg z-20">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => changeLanguage(language.code)}
                className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-white/10 transition-colors first:rounded-t-lg last:rounded-b-lg ${
                  i18n.language === language.code ? 'bg-white/10' : ''
                }`}
              >
                <span className="text-lg">{language.flag}</span>
                <span className="text-white">{language.name}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
