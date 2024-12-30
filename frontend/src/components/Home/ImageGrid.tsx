import React from 'react';
import { Grid2 } from '@mui/material';
import ImageCard from './ImageCard';

interface ImageGridProps {
    imageList: {
        id: number;
        imageUrl: string;
        title: string;
        price: number;
        likes: number;
        brandName: string;
        tags: string[];
    }[];
    onOpenPreview: () => void;
}

const ImageGrid: React.FC<ImageGridProps> = ({ imageList, onOpenPreview }) => {
    return (
        <Grid2 container spacing={2} justifyContent={"center"}>
            {imageList.map((image) => (
                <Grid2 key={image.id}>
                    <ImageCard {...image} onOpenPreview={() => onOpenPreview()} />
                </Grid2>
            ))}
        </Grid2>
    )
}

export default ImageGrid;
