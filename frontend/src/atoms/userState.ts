import { atom } from 'recoil';

interface UserState {
    currencyBalance: number;
}

export const userState = atom<UserState>({
    key: 'userState',
    default: {
        currencyBalance: 12345,
    },
});
