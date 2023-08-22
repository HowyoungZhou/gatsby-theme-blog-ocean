import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from 'gatsby-material-ui-components';
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image"

interface Image {
  data: IGatsbyImageData;
  alt?: string;
}

interface CardProps {
  title: string;
  subtitle?: string;
  description: string;
  image?: Image;
  link?: string;
}

export default function ContentCard({ title, subtitle, description, image, link }: CardProps) {
  return (
    <Card sx={{ flexShrink: 0 }}>
      <CardActionArea to={link}>
        {
          image &&
          <CardMedia>
            <GatsbyImage
              image={image.data}
              alt={image.alt || ""}
              objectFit="cover"
              style={{ width: '100%', height: '100%', maxHeight: '35vh' }}
            />
          </CardMedia>
        }
        <CardContent>
          <Typography gutterBottom={!subtitle} variant="h5" component="h2">
            {title}
          </Typography>
          {
            subtitle && (
              <Typography variant="body2" color="text.secondary" component="h3" gutterBottom>
                {subtitle}
              </Typography>
            )
          }
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
