import React from 'react';
import {Box, Button, Card, CardContent, CardMedia, Typography,} from '@mui/material';
import {useRecoilValue} from 'recoil';
import {relatedImagesState} from '../../atoms/detailPageState';
import {useNavigate} from 'react-router-dom';

const RelatedImages: React.FC = () => {
    const relatedImages = useRecoilValue(relatedImagesState);
    const navigate = useNavigate();

    if (!relatedImages || relatedImages.length === 0) {
        return null;
    }

    return (
        <Box mt={3}>
            <Typography variant="h6" gutterBottom>
                関連商品
            </Typography>
            <Box sx={{display: 'flex', overflowX: 'auto', gap: 2, pb: 2}}>
                {relatedImages.map((image: App.Image) => (
                    <Card key={image.id} sx={{minWidth: 200}}>
                        <CardMedia
                            component="img"
                            height="140"
                            image={image.imageUrl}
                            alt={image.title}
                        />
                        <CardContent>
                            <Typography variant="subtitle2" gutterBottom>
                                {image.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {image.price}コイン
                            </Typography>
                            <Button
                                size="small"
                                onClick={() => navigate(`/product/${image.id}`)}
                            >
                                詳細を見る
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </Box>
        </Box>
    );
};

export default RelatedImages;
