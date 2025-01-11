import {atom} from 'recoil';

export const userState = atom<App.User>({
    key: 'userState', // Atom の一意なキー
    default: {
        userId: "",
        userName: "",
        currencyBalance: 12345,
    },
});
