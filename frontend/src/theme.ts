import { createTheme } from '@mui/material';

// 明るくポップなテーマ設定
const theme = createTheme({
    palette: {
        primary: {
            main: '#FFEB3B', // 黄色
        },
        secondary: {
            main: '#ffffff', // 白
        },
        background: {
            default: '#FFF9C4', // 明るい黄色背景
            paper: '#ffffff', // 白いカード背景
        },
        text: {
            primary: '#333333', // ダークグレーで視認性を確保
            secondary: '#616161', // 軽いグレー
        },
    },
    typography: {
        h1: {
            fontFamily: 'Comic Sans MS, cursive, sans-serif',
            fontWeight: 700,
            fontSize: '2.5rem',
            color: '#FFEB3B',
        },
        h2: {
            fontFamily: 'Comic Sans MS, cursive, sans-serif',
            fontWeight: 600,
            fontSize: '2rem',
            color: '#FFEB3B',
        },
        body1: {
            fontFamily: 'Arial, sans-serif',
            fontSize: '1rem',
            color: '#333333',
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    backgroundColor: '#FFEB3B',
                    color: '#ffffff',
                    '&:hover': {
                        backgroundColor: '#FBC02D',
                    },
                },
            },
        },
    },
});

export default theme;
