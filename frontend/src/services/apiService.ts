import axios from "axios"
import axiosInstance from '../config/axiosConfig';

const apiService = {
    async fetchImages(params: {
        keyword: string;
    }) {
        try {
            const [response] = await Promise.all([axiosInstance.get('/images', {
                params: {
                    keyword: params.keyword,
                },
            })]);
            return response;
        } catch (error) {
            // エラーハンドリング
            if (axios.isAxiosError(error)) {
                console.error('API Error:', error.message);
                throw new Error('APIリクエストに失敗しました。');
            }
            throw error;
        }
    },

    async downloadImage(params: {
        user: App.User,
        imageId: string,
    }) {
        return await axiosInstance.get('/download', {
            params: {
                user: params.user,
                imageId: params.imageId,
            },
        });
    }
};

export default apiService;
