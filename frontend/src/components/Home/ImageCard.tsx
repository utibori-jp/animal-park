import React from 'react';
import {Box, Card, CardActionArea, CardContent, CardMedia, IconButton, Typography} from '@mui/material';
import {FavoriteBorder} from '@mui/icons-material';

interface ImageCardProps {
    id: number;
    imageUrl: string; // `public` に配置された画像パスを使用
    title: string;
    price: number;
    likes: number;
    brandName: string;
    tags: string[];
    onOpenPreview: (id: number) => void;
}

const ImageCard: React.FC<ImageCardProps> = ({
                                                 id,
                                                 imageUrl,
                                                 title,
                                                 price,
                                                 likes,
                                                 brandName,
                                                 tags,
                                                 onOpenPreview,
                                             }) => {
    return (
        <Card
            sx={{
                width: {xs: 200, sm: 250, md: 300},
                height: {xs: 250, sm: 300, md: 350},
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: 3,
                '&:hover': {boxShadow: 6},
            }}
        >
            <CardActionArea
                onClick={() => onOpenPreview(id)}
                sx={{
                    flexGrow: 1, // カードアクションエリアを全体に広げる
                }}
            >
                {/* 画像の表示 */}
                <CardMedia
                    component="img"
                    height="140"
                    image={imageUrl} // `imageUrl` から画像を読み込む
                    alt={title}
                    sx={{
                        objectFit: 'cover', // 画像の比率を保つ
                    }}
                />
                {/* カードの内容 */}
                <CardContent
                    sx={{
                        flexGrow: 1,
                        overflow: 'hidden', // コンテンツが溢れないようにする
                    }}
                >
                    <Typography
                        variant="h6"
                        component="div"
                        noWrap
                        sx={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        {title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                        ブランド: {brandName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        価格: {price} 円
                    </Typography>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography variant="body2" color="text.secondary">
                            いいね: {likes}
                        </Typography>
                    </Box>
                </CardContent>
            </CardActionArea>

            {/* タグとアクション */}
            <Box display="flex" justifyContent="space-between" alignItems="center" p={1}>
                <Box>
                    {tags.map((tag, index) => (
                        <Typography
                            key={index}
                            variant="caption"
                            color="text.secondary"
                            sx={{mr: 0.5}}
                        >
                            #{tag}
                        </Typography>
                    ))}
                </Box>
                <IconButton aria-label="like">
                    <FavoriteBorder/>
                </IconButton>
            </Box>
        </Card>
    );
};

export default ImageCard;
