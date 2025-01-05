import React from 'react';
import {Box, Tab, Tabs} from '@mui/material';
import ImageGrid from './ImageGrid';
import Loading from '../common/Loading';


interface RecommendationSectionProps {
    loading: boolean;
    recommendations: {
        popular: App.Image[];
        newArrivals: App.Image[];
        featuredBrands: App.Image[];
        recommendedThemes: App.Image[];
    };
    onOpenPreview: (id: number) => void;
}

const RecommendationSection: React.FC<RecommendationSectionProps> = ({
                                                                         loading,
                                                                         recommendations,
                                                                         onOpenPreview
                                                                     }) => {
    const [selectedTab, setSelectedTab] = React.useState(0);

    const handleTabChange = (_e: React.SyntheticEvent, newValue: number) => {
        setSelectedTab(newValue);
    };

    if (loading) {
        return <Loading/>;
    }

    let currentImages: App.Image[];
    switch (selectedTab) {
        case 0:
            currentImages = recommendations.popular || [];
            break;
        case 1:
            currentImages = recommendations.newArrivals || [];
            break;
        case 2:
            currentImages = recommendations.featuredBrands || [];
            break;
        case 3:
            currentImages = recommendations.recommendedThemes || [];
            break;
        default:
            currentImages = [];
    }


    return (
        <Box mt={3}>
            <Box>
                <Tabs value={selectedTab} onChange={handleTabChange}>
                    <Tab label="人気画像"/>
                    <Tab label="新着画像"/>
                    <Tab label="注目ブランド"/>
                    <Tab label="おすすめのテーマ"/>
                </Tabs>
            </Box>
            <Box mt={2}>
                <ImageGrid imageList={currentImages || []} onOpenPreview={(id: number) => onOpenPreview(id)}/>
            </Box>
        </Box>
    );
};

export default RecommendationSection;
