import {useCallback, useState} from 'react';
import apiService from '../services/apiService';

const useFetchImages = () => {
    const [data, setData] = useState<App.Image[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [recommendations, setRecommendations] = useState<{
        popular: App.Image[];
        newArrivals: App.Image[];
        featuredBrands: App.Image[];
        recommendedThemes: App.Image[];
    }>({
        popular: [],
        newArrivals: [],
        featuredBrands: [],
        recommendedThemes: []
    });
    const [imageUrl, setImageUrl] = useState('');

    const fetchImages = useCallback(
        async (keyword: string) => {
            setLoading(true);
            setError(null);
            try {
                const params = {
                    keyword,
                };

                const res = await apiService.fetchImages(params);
                if (res.status === 200) {
                    setData(res.data.images);
                    setRecommendations(res.data.recommendations);
                } else {
                    setError('Failed to fetch images');
                }
            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(
                        err.message === 'Failed to fetch images'
                            ? '現在サーバーに接続できません。しばらくしてからお試しください。'
                            : '不明なエラーが発生しました。'
                    );
                } else {
                    setError('不明なエラーが発生しました。');
                }
            } finally {
                setLoading(false);
            }
        },
        []
    );

    const handleSetImageUrl = useCallback((url: string) => {
        setImageUrl(url);
    }, []);

    return {
        data,
        loading,
        error,
        fetchImages,
        recommendations,
        imageUrl,
        setImageUrl: handleSetImageUrl
    };
};

export default useFetchImages;
