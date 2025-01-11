import {useEffect} from 'react';
import {useRecoilState, useSetRecoilState} from 'recoil';
import axiosInstance from '../config/axiosConfig';
import {imageDetailState, relatedImagesState} from '../atoms/detailPageState';

export const useFetchDetails = (imageId: string) => {
    const [imageDetail, setImageDetail] = useRecoilState(imageDetailState)
    const setRelatedImages = useSetRecoilState(relatedImagesState);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const response = await axiosInstance.get(`/imageDetails`);
                const data = response.data;

                setImageDetail(data.imageDetail);

                setRelatedImages(data.relatedImages || []);
            } catch (error) {
                console.error('Error fetching image details:', error);
            }
        };

        if (imageId) {
            fetchDetails();
        }
    }, [imageId]);

    return {imageDetail};
};
