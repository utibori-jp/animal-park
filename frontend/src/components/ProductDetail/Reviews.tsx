import React, {useState} from 'react';
import {Box, Button, Card, CardContent, Divider, Rating, TextField, Typography,} from '@mui/material';
import {useRecoilState, useRecoilValue} from 'recoil';
import {reviewsState} from '../../atoms/detailPageState';
import {userState} from '../../atoms/userState';

const Reviews: React.FC<{ imageId: string }> = ({imageId}) => {
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState<number | null>(null);
    const [reviews, setReviews] = useRecoilState(reviewsState);
    const user = useRecoilValue(userState);
    const [loading, setLoading] = useState(false);

    // レビューをサーバーに送信する関数
    const postReview = async ({review, userId}: { review: App.Review; userId: string }) => {
        try {
            console.log(`review is successfully added! imageId: ${imageId} review: ${review} userId: ${userId} `)
            // setLoading(true);
            // // サーバーにレビューを送信
            // await fetch('/api/reviews', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({
            //         ...review,
            //         userId,
            //         imageId,
            //     }),
            // });
        } catch (error) {
            console.error('Error posting review:', error);
        } finally {
            setLoading(false);
        }
    };

    // レビューを投稿するハンドラー
    const handlePostReview = async () => {
        if (rating && comment) {
            const newReview: App.Review = {
                id: reviews.length + 1, // IDは仮に配列の長さ + 1とする
                rating: rating,
                comment: comment,
            };

            // レビューをサーバーに送信
            await postReview({review: newReview, userId: user.userId});

            // 状態を更新
            setComment('');
            setRating(null);
            setReviews([...reviews, newReview]);
        }
    };

    return (
        <Box mt={3}>
            <Typography variant="h6" gutterBottom>
                レビュー
            </Typography>

            {/* レビュー投稿カード */}
            <Card sx={{mb: 2}}>
                <CardContent>
                    <Typography variant="subtitle1" gutterBottom>
                        レビューを投稿する
                    </Typography>
                    <Box display="flex" alignItems="center" mb={2}>
                        <Typography component="legend">評価:</Typography>
                        <Rating
                            name="simple-controlled"
                            value={rating}
                            onChange={(_e, newValue) => {
                                setRating(newValue);
                            }}
                            sx={{ml: 1}}
                        />
                    </Box>
                    <TextField
                        label="コメント"
                        multiline
                        rows={4}
                        fullWidth
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        margin="normal"
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handlePostReview}
                        disabled={loading || !rating || !comment}
                    >
                        {loading ? '投稿中...' : '投稿'}
                    </Button>
                </CardContent>
            </Card>

            {/* レビュー一覧 */}
            {reviews.map((review) => (
                <Card key={review.id} sx={{mb: 1}}>
                    <CardContent>
                        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                            <Box display="flex" alignItems="center">
                                <Rating value={review.rating} readOnly size="small"/>
                            </Box>
                        </Box>
                        <Typography variant="body2">{review.comment}</Typography>
                    </CardContent>
                    <Divider/>
                </Card>
            ))}
            {reviews.length === 0 && <Typography>まだレビューはありません。</Typography>}
        </Box>
    );
};

export default Reviews;
