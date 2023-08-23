import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { useTheme } from "@mui/material";
import {Helmet as ReactHelmet, HelmetProps} from 'react-helmet';
import useI18n from '../utils/use-i18n';

type MetaProps = JSX.IntrinsicElements["meta"];

export declare interface SeoProps {
  description?: string;
  lang?: string;
  meta?: MetaProps[];
  title?: string;
}

// taken from https://github.com/microapps/gatsby-plugin-react-i18next/blob/v2.0.5/src/Helmet.tsx
// will migrate to Head API when it supports i18n context
export const Helmet: React.FC<HelmetProps> = ({children, ...props}) => {
  const {languages, language, originalPath, defaultLanguage, siteUrl = ''} = useI18n();
  const createUrlWithLang = (lng: string) => {
    const url = `${siteUrl}${lng === defaultLanguage ? '' : `/${lng}`}${originalPath}`;
    return url.endsWith('/') ? url : `${url}/`;
  };
  return (
    <ReactHelmet {...props}>
      <html lang={language} />
      <link rel="canonical" href={createUrlWithLang(language)} />
      {languages.map((lng) => (
        <link rel="alternate" key={lng} href={createUrlWithLang(lng)} hrefLang={lng} />
      ))}
      {/* adding a fallback page for unmatched languages */}
      <link rel="alternate" href={createUrlWithLang(defaultLanguage)} hrefLang="x-default" />
      {children}
    </ReactHelmet>
  );
};

export default function Seo({ description, meta = [], title }: SeoProps) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `
  );

  const metaDescription = description || site.siteMetadata.description;
  const defaultTitle = site.siteMetadata?.title;

  const theme = useTheme();
  const defaultMeta: MetaProps[] = [
    {
      name: `description`,
      content: metaDescription,
    },
    {
      property: `og:title`,
      content: title,
    },
    {
      property: `og:description`,
      content: metaDescription,
    },
    {
      property: `og:type`,
      content: `website`,
    },
    {
      name: `twitter:card`,
      content: `summary`,
    },
    {
      name: `twitter:creator`,
      content: site.siteMetadata?.author || ``,
    },
    {
      name: `twitter:title`,
      content: title,
    },
    {
      name: `twitter:description`,
      content: metaDescription,
    },
    {
      name: `theme-color`,
      content: theme.palette.primary.light,
    }
  ];

  const metaProps = [...defaultMeta, ...meta];
  return (
    <Helmet defer={false}>
      <title>{defaultTitle ? `${title} | ${defaultTitle}` : title}</title>
      <meta name="viewport" content="initial-scale=1, width=device-width" />
      {metaProps.map((props, i) => <meta key={i} {...props} />)}
       {/* TODO: lang link when use Head API */}
    </Helmet>
  );
}
