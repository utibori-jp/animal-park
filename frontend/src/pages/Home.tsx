import React, {useCallback, useState} from 'react';
import {Box, Container, Grid2} from '@mui/material';
import SearchBar from '../components/Home/SearchBar';
import ImageGrid from '../components/Home/ImageGrid';
import PreviewModal from '../components/Home/PreviewModal';
import RecommendationSection from '../components/Home/RecommendationSection';
import {useRecoilValue} from 'recoil';
import {searchState} from '../atoms/searchState';
import useFetchImages from '../hooks/useFetchImages';

const Home: React.FC = () => {
    const {keyword} = useRecoilValue(searchState);
    const {
        data = [],
        loading,
        error,
        fetchImages,
        recommendations,
        setImageUrl,
    } = useFetchImages();
    const [previewOpen, setPreviewOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState<App.Image | null>(null);

    // モーダルを開く処理
    const handleOpenPreview = useCallback(
        (id: number) => {
            const targetImage: App.Image | undefined = data.find((image: App.Image) => image.id === id);
            if (targetImage) {
                setSelectedImage(targetImage);
                setImageUrl(targetImage.imageUrl);
                setPreviewOpen(true);
            } else {
                console.error('Image with ID ${id} not found.');
            }
        },
        [data, setImageUrl]
    );

    // モーダルを閉じる処理
    const handleClosePreview = () => {
        setPreviewOpen(false);
        setSelectedImage(null);
    };

    // 検索条件に変更があった場合にAPIを叩く
    React.useEffect(() => {
        (async () => {
            try {
                await fetchImages(keyword);
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        })();
    }, [keyword, fetchImages]);

    return (
        <Container maxWidth="lg" sx={{padding: {xs: 2, md: 4}}}>
            <Grid2 container spacing={4}>
                {/* 検索バー */}
                <Grid2 size={{xs: 12}}>
                    <SearchBar/>
                </Grid2>

                {/* エラー表示 */}
                {error && (
                    <Grid2 size={{xs: 12}}>
                        <Box color="red" textAlign="center">
                            エラーが発生しました。
                        </Box>
                    </Grid2>
                )}

                {/* 画像一覧 */}
                <Grid2 size={{xs: 12}}>
                    <ImageGrid imageList={data || []} onOpenPreview={handleOpenPreview}/>
                </Grid2>

                {/* 推奨セクション */}
                <Grid2 size={{xs: 12}}>
                    <RecommendationSection
                        loading={loading}
                        recommendations={
                            recommendations || {
                                popular: [],
                                newArrivals: [],
                                featuredBrands: [],
                                recommendedThemes: [],
                            }
                        }
                        onOpenPreview={handleOpenPreview}
                    />
                </Grid2>
            </Grid2>

            {/* プレビュー モーダル */}
            {selectedImage && (
                <PreviewModal
                    open={previewOpen}
                    onClose={handleClosePreview}
                    imageUrl={selectedImage.imageUrl}
                    title={selectedImage.title}
                    brandName={selectedImage.brandName}
                    price={selectedImage.price}
                />
            )}
        </Container>
    );
};

export default Home;
