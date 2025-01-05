import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3001',
    headers: {
        'Content-Type': 'application/json',
    },
});

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
};

export default apiService;
