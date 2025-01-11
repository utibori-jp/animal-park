declare namespace App {
    interface Image {
        id: number;
        imageUrl: string;
        title: string;
        price: number;
        likes: number;
        rating: number;
        reviewCount: number;
        brandName: string;
        tags: string[];
    }

    interface Review {
        id: number;
        rating: number;
        comment: string;
    }

    interface User {
        userId: string;
        userName: string;
        currencyBalance: number;
    }

    interface CustomError extends Error {
        type: 'INSUFFICIENT_BALANCE' | 'AUTHENTICATION_FAILED' | 'DOWNLOAD_FAILED';
    }
}
