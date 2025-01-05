import { atom } from 'recoil';

interface SearchState {
    keyword: string;
    priceRange: [number, number];
    sortBy: 'popularity' | 'newest' | null;
    tags: string[];
}

export const searchState = atom<SearchState>({
    key: 'searchState',
    default: {
        keyword: '',
        priceRange: [0, 1000],
        sortBy: null,
        tags: [],
    },
});
