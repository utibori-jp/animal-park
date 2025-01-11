import React from 'react';
import {Box, Rating, Typography} from '@mui/material';

interface ImageDetailsProps {
    imageUrl: string;
    price: number;
    rating: number;
    reviewCount: number;
    title: string;
}

const ImageDetails: React.FC<ImageDetailsProps> = ({imageUrl, price, rating, reviewCount, title}) => {
    console.log(imageUrl)
    return (
        <Box>
            <Box display="flex" justifyContent="center" mb={2}>
                <img
                    src={imageUrl}
                    alt={title}
                    style={{
                        maxWidth: '100%',
                        height: 'auto',
                        borderRadius: '8px'
                    }}
                />
            </Box>
            <Typography variant="h6" gutterBottom>
                {title}
            </Typography>
            <Typography variant="h5" fontWeight="bold" color="primary" gutterBottom>
                {price} コイン
            </Typography>
            <Box display="flex" alignItems="center">
                <Rating value={rating} precision={0.5} readOnly/>
                <Typography variant="body2" sx={{ml: 1}}>
                    レビュー ({reviewCount}件)
                </Typography>
            </Box>
        </Box>
    );
};

export default ImageDetails;
