import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { useTheme } from "@mui/material";
import { Helmet } from "gatsby-plugin-react-i18next";

type MetaProps = JSX.IntrinsicElements["meta"];

export declare interface SeoProps {
  description?: string;
  lang?: string;
  meta?: MetaProps[];
  title?: string;
}

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

  return (
    <Helmet
      title={title}
      titleTemplate={defaultTitle ? `%s | ${defaultTitle}` : null}
      meta={defaultMeta.concat(meta)}
    />
  );
}
