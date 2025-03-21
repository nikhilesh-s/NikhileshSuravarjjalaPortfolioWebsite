import React from 'react';
import { Helmet } from 'react-helmet';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
}

const SEO: React.FC<SEOProps> = ({ 
  title = "Nikhilesh Suravarjjala | Software Developer & Student Leader",
  description = "Portfolio website of Nikhilesh Suravarjjala (Nik Suravarjjala, Nik Suravar), a student developer passionate about creating innovative web applications.",
  keywords = "Nikhilesh Suravarjjala, Nik Suravarjjala, Nik Suravar, software developer, web developer, student leader, portfolio"
}) => {
  const siteUrl = "https://nikhileshsuravarjjala.com";
  
  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Nikhilesh Suravarjjala" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${siteUrl}/meta-image.jpg`} />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={siteUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={`${siteUrl}/meta-image.jpg`} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={siteUrl} />
    </Helmet>
  );
};

export default SEO;
