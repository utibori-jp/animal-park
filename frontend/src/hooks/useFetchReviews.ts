import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import axios from 'axios';
import { reviewsState } from '../atoms/detailPageState';

export const useFetchReviews = (imageId: string) => {
  const [reviews, setReviews] = useRecoilState(reviewsState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get('/reviews/${imageId}');
            const data = response.data;

            setReviews(data);
        } catch (err) {
            console.error('Error fetching reviews:', err);
            setError('レビューの取得に失敗しました。');
        } finally {
            setLoading(false);
        }
    };

    if (imageId) {
        fetchReviews();
    }
  }), [imageId, setReviews];

  return { reviews, loading, error};
};
