import React from 'react';
import { CircularProgress, Box } from '@mui/material';

interface LoadingProps {
    size?: number;
}

const Loading: React.FC<LoadingProps> = ({ size = 40 }) => {
    return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
            <CircularProgress size={size} />
        </Box>
    );
};

export default Loading;
