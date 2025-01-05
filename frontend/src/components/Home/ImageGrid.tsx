import React from 'react';
import {Grid2} from '@mui/material';
import ImageCard from './ImageCard';

interface ImageGridProps {
    imageList: App.Image[];
    onOpenPreview: (id: number) => void;
}

const ImageGrid: React.FC<ImageGridProps> = ({imageList = [], onOpenPreview}) => {
    return (
        <Grid2
            container
            spacing={2}
            justifyContent="center"
            sx={{
                padding: 2,
            }}
        >
            {imageList.map((image) => (
                <Grid2
                    key={image.id}
                    size={{xs: 12, sm: 6, md: 4, lg: 3}}
                    display="flex"
                    justifyContent="center"
                >
                    <ImageCard {...image} onOpenPreview={(id: number) => onOpenPreview(id)}/>
                </Grid2>
            ))}
        </Grid2>
    );
};

export default ImageGrid;
