import React from 'react';
import {Card, CardMedia, CardContent, Typography, CardActionArea, Box, IconButton} from '@mui/material';
import {FavoriteBorder} from '@mui/icons-material';

interface ImageCardProps {
    id: number;
    imageUrl: string;
    title: string;
    price: number;
    likes: number;
    brandName: string;
    tags: string[];
    onOpenPreview: () => void;
}

const ImageCard: React.FC<ImageCardProps> = ({
                                                 imageUrl,
                                                 title,
                                                 price,
                                                 likes,
                                                 brandName,
                                                 tags,
                                                 onOpenPreview
                                             }) => {
    return (
        <Card sx={{maxWidth: 345, boxShadow: 3, '&:hover': {boxShadow: 6}}}>
            <CardActionArea onClick={onOpenPreview}>
                <CardMedia
                    component="img"
                    height="140"
                    image={imageUrl}
                    alt={title}
                    sx={{objectFit: "cover"}}
                />
                <CardContent>
                    <Typography variant="h6" component="div">
                        {title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        ブランド: {brandName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        価格: {price} 円
                    </Typography>
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                        <Typography variant="body2" color="text.secondary">
                            いいね: {likes}

                        </Typography>
                    </Box>

                </CardContent>
            </CardActionArea>
            <Box display="flex" justifyContent="space-between" alignItems="center" p={1}>
                <Box>
                    {tags.map((tag, index) => (
                        <Typography key={index} variant="caption" color="text.secondary" sx={{mr: 0.5}}>
                            #{tag}
                        </Typography>
                    ))}
                </Box>
                <IconButton aria-label="like">
                    <FavoriteBorder/>
                </IconButton>
            </Box>
        </Card>
    );
};

export default ImageCard;
