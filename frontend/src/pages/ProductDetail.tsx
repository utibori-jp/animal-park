import React from 'react';
import {useParams} from 'react-router-dom';
import {Box, Grid2} from '@mui/material';
import ImageDetails from '../components/ProductDetail/ImageDetails';
import Reviews from '../components/ProductDetail/Reviews';
import RelatedImages from '../components/ProductDetail/RelatedImages';
import DownloadButton from '../components/ProductDetail/DownloadButton';
import Loading from '../components/common/Loading';
import {useFetchDetails} from '../hooks/useFetchDetails';

const DetailPage: React.FC = () => {
    const {id} = useParams<{ id: string }>();
    const {imageDetail} = useFetchDetails(id || '');

    if (!imageDetail) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
                <Loading/>
            </Box>
        );
    }

    console.log(imageDetail)

    return (
        <Box sx={{p: 3}}>
            <Grid2 container spacing={3}>
                <Grid2 sx={{padding: {xs: 12, md: 6}}}>
                    <ImageDetails
                        imageUrl={imageDetail.imageUrl}
                        title={imageDetail.title}
                        price={imageDetail.price}
                        rating={imageDetail.rating}
                        reviewCount={imageDetail.reviewCount}
                    />
                    <DownloadButton price={imageDetail.price} imageId={id || ''}/>
                </Grid2>
            </Grid2>

            <Reviews imageId={id || ''}/>
            <RelatedImages/>
        </Box>
    );
};

export default DetailPage;
