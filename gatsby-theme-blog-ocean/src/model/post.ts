import { IGatsbyImageData } from "gatsby-plugin-image";

export interface Post {
  id: string;
  title: string;
  excerpt: string;
  slug: string;
  date: string;
  image?: {
    childImageSharp: {
      gatsbyImageData: IGatsbyImageData;
    }
  };
  imageAlt?: string;
  tags?: string[];
}
