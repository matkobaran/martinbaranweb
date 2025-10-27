import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'profile';
  structuredData?: object;
  language?: 'en' | 'sk';
}

export const SEO = ({
  title = "Martin Baran | Professional Event & Sports Photographer in Prague",
  description = "Professional photographer specializing in conference photography, event photography, and sports photography in Prague, Czech Republic. Available for corporate events, diplomatic conferences, and sports matches.",
  keywords = "photographer Prague, event photographer Czech Republic, conference photographer, sports photographer Prague, corporate photography, diplomatic photography, Best Diplomats, football photography",
  image = "https://martinbaran.com/resources/img/hero/title_medium.webp",
  url = "https://martinbaran.com",
  type = "website",
  structuredData,
  language = "en"
}: SEOProps) => {
  const defaultTitles = {
    en: "Martin Baran | Professional Event & Sports Photographer in Prague",
    sk: "Martin Baran | Profesionálny fotograf udalostí a športu v Prahe"
  };
  
  const defaultDescriptions = {
    en: "Professional photographer specializing in conference photography, event photography, and sports photography in Prague, Czech Republic. Available for corporate events, diplomatic conferences, and sports matches.",
    sk: "Profesionálny fotograf špecializujúci sa na fotografovanie konferencií, udalostí a športu v Prahe, Česká republika. Dostupné pre korporátne udalosti, diplomatické konferencie a športové zápasy."
  };
  
  const defaultKeywords = {
    en: "photographer Prague, event photographer Czech Republic, conference photographer, sports photographer Prague, corporate photography, diplomatic photography, Best Diplomats, football photography",
    sk: "fotograf Praha, fotograf udalostí Česká republika, fotograf konferencií, športový fotograf Praha, korporátne fotografovanie, diplomatické fotografovanie, Best Diplomats, futbalové fotografovanie"
  };

  const finalTitle = title || defaultTitles[language];
  const finalDescription = description || defaultDescriptions[language];
  const finalKeywords = keywords || defaultKeywords[language];
  const locale = language === 'sk' ? 'sk_SK' : 'en_US';

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{finalTitle}</title>
      <meta name="title" content={finalTitle} />
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={finalKeywords} />
      <meta name="robots" content="index, follow" />
      <html lang={language} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Martin Baran Photography" />
      <meta property="og:locale" content={locale} />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={finalTitle} />
      <meta property="twitter:description" content={finalDescription} />
      <meta property="twitter:image" content={image} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
      
      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

// Portfolio-specific SEO component
export const PortfolioSEO = ({ 
  galleryTitle, 
  galleryDescription, 
  photoCount, 
  galleryUrl,
  language = "en"
}: {
  galleryTitle: string;
  galleryDescription: string;
  photoCount: number;
  galleryUrl: string;
  language?: 'en' | 'sk';
}) => {
  const titleTemplates = {
    en: `${galleryTitle} | Martin Baran Photography`,
    sk: `${galleryTitle} | Martin Baran Fotografia`
  };
  
  const descriptionTemplates = {
    en: `${galleryDescription} Professional photography by Martin Baran. ${photoCount} high-quality photos available.`,
    sk: `${galleryDescription} Profesionálne fotografovanie od Martina Barana. Dostupné ${photoCount} vysokokvalitných fotografií.`
  };
  
  const keywordTemplates = {
    en: `${galleryTitle}, Martin Baran photography, event photography, conference photography, sports photography, Prague photographer`,
    sk: `${galleryTitle}, Martin Baran fotografovanie, fotografovanie udalostí, fotografovanie konferencií, športové fotografovanie, fotograf Praha`
  };
  
  const title = titleTemplates[language];
  const description = descriptionTemplates[language];
  const keywords = keywordTemplates[language];
  
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "name": galleryTitle,
    "description": galleryDescription,
    "url": galleryUrl,
    "author": {
      "@type": "Person",
      "name": "Martin Baran",
      "email": "martin.baran12@gmail.com"
    },
    "publisher": {
      "@type": "Person",
      "name": "Martin Baran"
    },
    "numberOfItems": photoCount,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": galleryUrl
    }
  };

  return (
    <SEO
      title={title}
      description={description}
      keywords={keywords}
      url={galleryUrl}
      structuredData={structuredData}
      language={language}
    />
  );
};
