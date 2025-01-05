import React from 'react';
import {Box, Button, IconButton, Modal, Typography} from '@mui/material';
import {Close as CloseIcon} from '@mui/icons-material';

interface PreviewModalProps {
    open: boolean;
    onClose: () => void;
    imageUrl: string;
    title: string;
    brandName: string;
    price: number;
}

const PreviewModal: React.FC<PreviewModalProps> = ({
                                                       open,
                                                       onClose,
                                                       imageUrl,
                                                       title,
                                                       brandName,
                                                       price,
                                                   }) => {
    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '70%',
                    maxWidth: 800,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                }}
            >
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6" component="h2">
                        プレビュー
                    </Typography>
                    <IconButton onClick={onClose} aria-label="close">
                        <CloseIcon/>
                    </IconButton>
                </Box>

                <Box display="flex" justifyContent="center" mt={2}>
                    <img src={imageUrl} alt={title}
                         style={{maxWidth: '100%', maxHeight: '400px', objectFit: 'contain'}}/>
                </Box>

                <Typography variant="h6" mt={2}>
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    ブランド: {brandName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    価格: {price}円
                </Typography>
                <Box mt={2}>
                    <Button variant="contained" color="primary" onClick={() => {
                        /*TODO: 画像詳細ページに遷移する */
                    }}>
                        ダウンロード
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default PreviewModal;
