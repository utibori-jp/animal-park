import React, {useState} from 'react';
import {Box, Button, Typography} from '@mui/material';
import {useRecoilValue} from 'recoil';
import {userState} from '../../atoms/userState';
import apiService from "../../services/apiService"
import {saveAs} from 'file-saver'

interface DownloadButtonProps {
    price: number
    imageId: string;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({price, imageId}) => {
    const user = useRecoilValue(userState);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const isCustomError = (error: unknown): error is App.CustomError => {
        return (
            typeof error === 'object' &&
            error !== null &&
            'type' in error
        );
    };

    const handleDownload = async () => {
        setLoading(true);
        setError(null);
        try {
            const [blob, fileName] = await apiService.downloadImage({user, imageId})
            saveAs(blob, fileName);
            alert('ダウンロードが完了しました！');
        } catch (err: unknown) {
            if (isCustomError(err)) {
                if (err.type === 'INSUFFICIENT_BALANCE') {
                    setError('残高が不足しています。');
                } else if (err.type === 'AUTHENTICATION_FAILED') {
                    setError('認証に失敗しました。');
                } else if (err.type === 'DOWNLOAD_FAILED') {
                    setError('ダウンロードに失敗しました。');
                }
            } else {
                setError('システムエラーが発生しました。');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box mt={2}>
            <Typography variant="body2" gutterBottom>
                残高: {user.currencyBalance} コイン
            </Typography>
            <Button variant="contained" color="primary" onClick={handleDownload}
                    disabled={loading || user.currencyBalance < price}>
                ダウンロード
            </Button>
            {error && (
                <Typography color="error" mt={1}>
                    {error}
                    {error === '残高が不足しています。' && (
                        <Button size="small" sx={{ml: 1}}>
                            通貨をチャージ
                        </Button>
                    )}
                </Typography>
            )}
        </Box>
    );
};

export default DownloadButton;
