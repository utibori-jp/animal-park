# 詳細要件

## 2. 詳細画面

### 概要
ユーザーがホーム画面で選択した画像の詳細情報を閲覧し、購入や関連画像の探索を行うための画面。

---

### 要件詳細

#### 1. **画像の詳細情報**
- **表示項目**:
  - **価格**: 強調表示（例: 太字やカラー表示）。必要通貨数を具体的に表示。
  - **評価・レビュー情報**: 
    - 5段階評価（例: 星評価）。
    - 合計レビュー数を数値で表示（例: 「レビュー (32件)」）。
- **UI**:
  - 上部に画像のプレビューを配置。
  - その下に、情報をカード形式またはリスト形式で配置。

#### 2. **レビュー機能**
- **ユーザー操作**:
  - 評価（1〜5の星評価）を追加可能。
  - コメント欄に自由入力可能。
- **UI**:
  - レビュー投稿フォームをページ下部に固定またはスムーズスクロールで表示。
  - レビュー一覧は最新順でのみ表示。
- **バックエンド連携**:
  - APIで評価データを取得・送信。
  - フィルタリング（例: 星4以上）に対応。

#### 3. **関連商品**
- **動的表示**:
  - 「関連画像」:
    - 同じカテゴリまたはタグで絞り込み。
    - 他のブランドやジャンルにも拡張可能。
  - 「このブランドの他の画像」:
    - ブランドIDを基にAPIで取得。
- **UI**:
  - 横スクロール可能なカード形式。
  - 各カードにサムネイル、タイトル、価格、ダウンロードボタンを配置。

#### 4. **ダウンロードボタン**
- **機能**:
  - 現在の通貨残高をAPIで取得。
  - 足りない場合はエラーメッセージを表示し、「通貨をチャージ」ボタンを表示。
  - 購入後、画像を即時ダウンロード可能にする。
- **UI**:
  - ダウンロードボタンの隣に通貨残高を表示（例: 「残高: 500コイン」）。
  - 通貨不足の場合は赤文字で警告。

---

### その他詳細

#### 1. **レスポンシブデザイン**
- **対応デバイス**:
  - PC、スマホ、iPad
- **アプローチ**:
  - カラム分割で情報を整理。
  - 左: プレビュー画像。
  - 右: 詳細情報と操作ボタン。

#### 2. **アクセシビリティ**
- Material UIの既存テーマを利用。
- **アクセシブルなUI**:
  - キーボード操作でレビュー投稿可能。

#### 3. **エラーハンドリング**
- **可能なエラー**:
  - 画像詳細データの取得失敗。
  - 残高不足での購入。
- **対策**:
  - 明確なエラーメッセージを画面中央に表示（例: 「画像の情報を取得できませんでした。再読み込みしてください。」）。
  - ネットワークエラー時の再試行ボタン。

#### 4. **状態管理**
- **ライブラリ**: Recoilを使用。
- **管理対象**:
  - 画像情報、レビュー一覧、ユーザー残高。
  - フィルタ状態（レビューの並び替え、関連画像のカテゴリ）。

#### 5. **API設計**
- **エンドポイント例**:
  - GET `/api/images/:id` (画像詳細取得)
  - GET `/api/images/:id/reviews` (レビュー取得)
  - POST `/api/images/:id/reviews` (レビュー投稿)
  - GET `/api/images/:id/related` (関連画像取得)
  - GET `/api/user/balance` (残高取得)

#### 6. **デザイン**
- シンプルで直感的なUI。
- 各セクションに余白を設けて視認性を向上。

---

### 実装優先度
1. **画像の詳細情報表示**。
2. **ダウンロード機能の実装**。
3. **レビュー投稿と一覧機能**。
4. **関連商品表示**。

# Prompt

あなたは熟練のReactエンジニアです。以下の要件に基づいて、ECサイトの詳細画面をReactで実装してください。

---

## **前提:**

- **技術スタック**: React, TypeScript, Material UI v6, Recoil。
- **デザイン**: Material UIのテーマを既に適用済み。
- **API連携**: `axios`を使用。
- **開発環境**: Node.js v23.5.0, npm v10.9.2。
- **ディレクトリ構成**: コンポーネント、カスタムフック、状態管理などをディレクトリごとに整理。
- **レスポンシブ対応**: PC、スマートフォン、iPadに対応。

---

## **要件:**

### 1. 画像の詳細情報
- **表示項目**:
  - 価格（強調表示: 太字またはカラー）。
  - 評価情報: 星評価（1〜5）とレビュー件数（例:「レビュー (32件)」）。
- **UI配置**:
  - 上部に画像のプレビュー。
  - その下に詳細情報（カードまたはリスト形式）。

---

### 2. レビュー機能
- **機能**:
  - ユーザーが星評価（1〜5）とコメントを投稿可能。
  - レビュー一覧を最新順に表示。
  - フィルタリング: 星評価（例: 星4以上）。
- **UI配置**:
  - ページ下部にレビュー投稿フォーム。
  - レビュー一覧はモジュール形式で表示。

---

### 3. 関連商品
- **機能**:
  - 同じブランドの関連画像を動的に表示。
  - カード形式でサムネイル、タイトル、価格、詳細画面への遷移ボタンを表示。
- **UI配置**:
  - 横スクロール対応のレイアウト。

---

### 4. ダウンロードボタン
- **機能**:
  - 現在の通貨残高を取得。
  - 足りない場合はエラーメッセージを表示し、「通貨をチャージ」ボタンを表示。
  - ダウンロード完了後、画像を提供。
- **UI配置**:
  - ダウンロードボタンの隣に残高を表示（例:「残高: 500コイン」）。

---

### その他詳細

#### 1. **レスポンシブデザイン**
- **対応デバイス**:
  - PC、スマホ、iPadに対応
- **アプローチ**:
  - カラム分割で情報を整理。
  - 左: プレビュー画像。
  - 右: 詳細情報と操作ボタン。
  - 横スクロールには`overflow-x`を設定。

#### 2. **アクセシビリティ**
- Material UIの既存テーマを利用。
- **アクセシブルなUI**:
  - キーボード操作でレビュー投稿可能。

#### 3. **エラーハンドリング**
- **可能なエラー**:
  - 画像詳細データの取得失敗。
  - 残高不足での購入。
- **対策**:
  - 明確なエラーメッセージを画面中央に表示（例: 「画像の情報を取得できませんでした。再読み込みしてください。」）。
  - ネットワークエラー時の再試行ボタン。

#### 4. **状態管理**
- **ライブラリ**: Recoilを使用。
- **管理対象**:
  - 画像情報、レビュー一覧、ユーザー残高。
  - フィルタ状態（レビューの並び替え、関連画像のカテゴリ）。

#### 5. **デザイン**
- シンプルで直感的なUI。
- 各セクションに余白を設けて視認性を向上。

---

## **ディレクトリ構成:**

以下の構成を使用して、コンポーネント、カスタムフック、状態管理、API通信を分割してください。

```
src/
├── atoms/
│   ├── detailPageState.ts
├── components/
│   ├── common/
│   │   ├── Header.tsx
│   │   ├── Loading.tsx
│   ├── Detail/
│   │   ├── ImagePreview.tsx
│   │   ├── ImageDetails.tsx
│   │   ├── Reviews.tsx
│   │   ├── RelatedImages.tsx
│   │   └── DownloadButton.tsx
├── config/
│   └── axiosConfig.ts
├── hooks/
│   ├── useFetchDetails.ts
│   ├── useFetchReviews.ts
│   └── useFetchRelatedImages.ts
├── pages/
│   └── DetailPage.tsx
├── services/
│   └── apiService.ts
├── utils/
│   ├── formatPrice.ts
│   └── validation.ts
├── global.d.ts/
└── App.tsx
```

---

## **実装指針:**

1. **状態管理**:
   - Recoilを使用して画像情報、レビュー、残高を管理。
   - フィルタリング状態をRecoilのAtomで保持。

2. **API連携**:
   - APIエンドポイント:
     - GET `/api/images/:id` (詳細取得)
     - GET `/api/images/:id/reviews` (レビュー取得・投稿)
     - POST `api/images/:id/reviews`（レビュー投稿）
     - GET `/api/images/:id/related` (関連画像取得)
     - GET `/api/user/balance` (残高取得)
     - POST `/api/user/download`(ダウンロード（ECサイトでの購入にあたる）)
   - `axios`を用いた通信処理を`services/`ディレクトリで管理。

---

## **出力形式:**

- `src/components/Detail/`配下にコンポーネントを作成。
- `src/hooks/`配下にカスタムフックを作成。
- 各コンポーネントには適切な型定義を追加。
- CSSはMaterial UIの`styled API`または`sx`プロップを使用。

# Output
```typescript
// src/atoms/detailPageState.ts
import { atom } from 'recoil';

export const detailImageState = atom<any | null>({
  key: 'detailImageState',
  default: null,
});

export const reviewsState = atom<any[]>({
  key: 'reviewsState',
  default: [],
});

export const userBalanceState = atom<number>(({
  key: 'userBalanceState',
  default: 0,
}));

export const reviewFilterState = atom<number | null>({
  key: 'reviewFilterState',
  default: null,
});

export const relatedImagesState = atom<any[]>({
  key: 'relatedImagesState',
  default: [],
});
```

```typescript
// src/components/common/Header.tsx
import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

const Header: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">
          ECサイト
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
```

```typescript
// src/components/common/Loading.tsx
import React from 'react';
import { CircularProgress, Box } from '@mui/material';

const Loading: React.FC = () => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100px">
      <CircularProgress />
    </Box>
  );
};

export default Loading;
```

```typescript
// src/components/Detail/ImagePreview.tsx
import React from 'react';
import { Box, Card, CardMedia, Typography } from '@mui/material';

interface ImagePreviewProps {
  imageUrl: string;
  title?: string;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ imageUrl, title }) => {
  return (
    <Card>
      <CardMedia
        component="img"
        image={imageUrl}
        alt={title || '商品画像'}
        sx={{ width: '100%', maxHeight: 500, objectFit: 'contain' }}
      />
    </Card>
  );
};

export default ImagePreview;
```

```typescript
// src/components/Detail/ImageDetails.tsx
import React from 'react';
import { Box, Typography, Rating } from '@mui/material';
import { formatPrice } from '../../utils/formatPrice';

interface ImageDetailsProps {
  price: number;
  rating: number;
  reviewCount: number;
  title: string;
}

const ImageDetails: React.FC<ImageDetailsProps> = ({ price, rating, reviewCount, title }) => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Typography variant="h5" fontWeight="bold" color="primary" gutterBottom>
        {formatPrice(price)}
      </Typography>
      <Box display="flex" alignItems="center" gutterBottom>
        <Rating value={rating} precision={0.5} readOnly />
        <Typography variant="body2" sx={{ ml: 1 }}>
          レビュー ({reviewCount}件)
        </Typography>
      </Box>
    </Box>
  );
};

export default ImageDetails;
```

```typescript
// src/components/Detail/Reviews.tsx
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Rating,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  Divider,
} from '@mui/material';
import { useRecoilState, useRecoilValue } from 'recoil';
import { reviewsState, reviewFilterState } from '../../atoms/detailPageState';
import { useFetchReviews } from '../../hooks/useFetchReviews';

interface Review {
  id: string;
  rating: number;
  comment: string;
  createdAt: string;
  userId: string;
}

const Reviews: React.FC<{ imageId: string }> = ({ imageId }) => {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState<number | null>(null);
  const [localReviews, setLocalReviews] = useRecoilState(reviewsState);
  const [filter, setFilter] = useRecoilState(reviewFilterState);
  const { postReview, loading } = useFetchReviews(imageId);

  const handlePostReview = async () => {
    if (rating && comment) {
      await postReview({ rating, comment });
      setComment('');
      setRating(null);
    }
  };

  const filteredReviews = localReviews.filter(
    (review) => filter === null || review.rating >= filter
  );

  const sortedReviews = [...filteredReviews].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <Box mt={3}>
      <Typography variant="h6" gutterBottom>
        レビュー
      </Typography>

      {/* レビュー投稿フォーム */}
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="subtitle1" gutterBottom>
            レビューを投稿する
          </Typography>
          <Box display="flex" alignItems="center" mb={2}>
            <Typography component="legend">評価:</Typography>
            <Rating
              name="simple-controlled"
              value={rating}
              onChange={(event, newValue) => {
                setRating(newValue);
              }}
              sx={{ ml: 1 }}
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
          <Button variant="contained" color="primary" onClick={handlePostReview} disabled={loading}>
            投稿
          </Button>
        </CardContent>
      </Card>

      {/* レビュー一覧 */}
      {sortedReviews.map((review) => (
        <Card key={review.id} sx={{ mb: 1 }}>
          <CardContent>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
              <Box display="flex" alignItems="center">
                <Rating value={review.rating} readOnly size="small" />
                <Typography variant="caption" sx={{ ml: 1 }}>
                  投稿者: {review.userId}
                </Typography>
              </Box>
              <Typography variant="caption">
                {new Date(review.createdAt).toLocaleDateString()}
              </Typography>
            </Box>
            <Typography variant="body2">{review.comment}</Typography>
          </CardContent>
          <Divider />
        </Card>
      ))}
      {sortedReviews.length === 0 && <Typography>まだレビューはありません。</Typography>}
    </Box>
  );
};

export default Reviews;
```

```typescript
// src/components/Detail/RelatedImages.tsx
import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
} from '@mui/material';
import { useRecoilValue } from 'recoil';
import { relatedImagesState } from '../../atoms/detailPageState';
import { useNavigate } from 'react-router-dom';
import { formatPrice } from '../../utils/formatPrice';

interface RelatedImage {
  id: string;
  title: string;
  imageUrl: string;
  price: number;
}

const RelatedImages: React.FC = () => {
  const relatedImages = useRecoilValue(relatedImagesState);
  const navigate = useNavigate();

  if (!relatedImages || relatedImages.length === 0) {
    return null;
  }

  return (
    <Box mt={3}>
      <Typography variant="h6" gutterBottom>
        関連商品
      </Typography>
      <Box sx={{ display: 'flex', overflowX: 'auto', gap: 2, pb: 2 }}>
        {relatedImages.map((image: RelatedImage) => (
          <Card key={image.id} sx={{ minWidth: 200 }}>
            <CardMedia
              component="img"
              height="140"
              image={image.imageUrl}
              alt={image.title}
            />
            <CardContent>
              <Typography variant="subtitle2" gutterBottom>
                {image.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {formatPrice(image.price)}
              </Typography>
              <Button
                size="small"
                onClick={() => navigate(`/detail/${image.id}`)}
              >
                詳細を見る
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default RelatedImages;
```

```typescript
// src/components/Detail/DownloadButton.tsx
import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useRecoilState } from 'recoil';
import { userBalanceState } from '../../atoms/detailPageState';
import { apiService } from '../../services/apiService';

interface DownloadButtonProps {
  imageId: string;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ imageId }) => {
  const [balance, setBalance] = useRecoilState(userBalanceState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDownload = async () => {
    setLoading(true);
    setError(null);
    try {
      const balanceData = await apiService.getUserBalance();
      setBalance(balanceData.balance);

      // 仮の価格設定
      const downloadCost = 100;

      if (balanceData.balance >= downloadCost) {
        // 実際のダウンロード処理はAPIに依存
        const downloadResult = await apiService.downloadImage(imageId);
        if (downloadResult.success) {
          alert('ダウンロードが完了しました！');
        } else {
          setError('ダウンロードに失敗しました。');
        }
      } else {
        setError('残高が不足しています。');
      }
    } catch (err: any) {
      setError('残高の取得に失敗しました。');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box mt={2}>
      <Typography variant="body2" gutterBottom>
        残高: {balance} コイン
      </Typography>
      <Button variant="contained" color="primary" onClick={handleDownload} disabled={loading}>
        ダウンロード
      </Button>
      {error && (
        <Typography color="error" mt={1}>
          {error}
          {error === '残高が不足しています。' && (
            <Button size="small" sx={{ ml: 1 }}>
              通貨をチャージ
            </Button>
          )}
        </Typography>
      )}
    </Box>
  );
};

export default DownloadButton;
```

```typescript
// src/config/axiosConfig.ts
import axios from 'axios';

const baseURL = '/api'; // 例: バックエンドAPIのベースURL

export const axiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});
```

```typescript
// src/hooks/useFetchDetails.ts
import { useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { detailImageState } from '../atoms/detailPageState';
import { apiService } from '../services/apiService';

export const useFetchDetails = (imageId: string) => {
  const [detailImage, setDetailImage] = useRecoilState(detailImageState);
  const setRelatedImages = useSetRecoilState(require('../atoms/detailPageState').relatedImagesState); // 遅延import

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await apiService.getImageDetails(imageId);
        setDetailImage(data);
        setRelatedImages(data.relatedImages || []); // 仮に関連画像データがあるとする
      } catch (error) {
        console.error('Error fetching image details:', error);
        // エラーハンドリングはコンポーネント側で行うのが望ましい
      }
    };

    if (imageId) {
      fetchDetails();
    }
  }, [imageId, setDetailImage, setRelatedImages]);

  return { detailImage };
};
```

```typescript
// src/hooks/useFetchReviews.ts
import { useState, useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { reviewsState } from '../atoms/detailPageState';
import { apiService } from '../services/apiService';

interface PostReviewPayload {
  rating: number;
  comment: string;
}

export const useFetchReviews = (imageId: string) => {
  const [reviews, setReviews] = useRecoilState(reviewsState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchReviews = useCallback(async () => {
    try {
      const data = await apiService.getImageReviews(imageId);
      setReviews(data);
    } catch (err) {
      console.error('Error fetching reviews:', err);
      setError('レビューの取得に失敗しました。');
    }
  }, [imageId, setReviews]);

  const postReview = useCallback(
    async (payload: PostReviewPayload) => {
      setLoading(true);
      setError(null);
      try {
        const newReview = await apiService.postImageReview(imageId, payload);
        setReviews((prevReviews) => [newReview, ...prevReviews]);
      } catch (err) {
        console.error('Error posting review:', err);
        setError('レビューの投稿に失敗しました。');
      } finally {
        setLoading(false);
      }
    },
    [imageId, setReviews]
  );

  // 初期レビュー読み込み
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (imageId) {
      fetchReviews();
    }
  }, [imageId, fetchReviews]);

  return { reviews, loading, error, postReview };
};
```

```typescript
// src/hooks/useFetchRelatedImages.ts
// RelatedImagesコンポーネント内で直接APIを叩くように変更（Recoilでの管理が必須ではないため）
```

```typescript
// src/pages/DetailPage.tsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { Grid, Box, Typography, Button } from '@mui/material';
import { useRecoilValue } from 'recoil';
import { detailImageState } from '../atoms/detailPageState';
import ImagePreview from '../components/Detail/ImagePreview';
import ImageDetails from '../components/Detail/ImageDetails';
import Reviews from '../components/Detail/Reviews';
import RelatedImages from '../components/Detail/RelatedImages';
import DownloadButton from '../components/Detail/DownloadButton';
import Loading from '../components/common/Loading';
import { useFetchDetails } from '../hooks/useFetchDetails';

const DetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { detailImage } = useFetchDetails(id || '');
  const detailImageValue = useRecoilValue(detailImageState);

  if (!detailImageValue) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
        <Loading />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <ImagePreview imageUrl={detailImageValue.imageUrl} title={detailImageValue.title} />
        </Grid>
        <Grid item xs={12} md={6}>
          <ImageDetails
            title={detailImageValue.title}
            price={detailImageValue.price}
            rating={detailImageValue.rating}
            reviewCount={detailImageValue.reviewCount}
          />
          <DownloadButton imageId={id || ''} />
        </Grid>
      </Grid>

      <Reviews imageId={id || ''} />
      <RelatedImages />
    </Box>
  );
};

export default DetailPage;
```

```typescript
// src/services/apiService.ts
import { axiosInstance } from '../config/axiosConfig';

export const apiService = {
  async getImageDetails(id: string): Promise<any> {
    const response = await axiosInstance.get(`/images/${id}`);
    return response.data;
  },

  async getImageReviews(id: string): Promise<any[]> {
    const response = await axiosInstance.get(`/images/${id}/reviews`);
    return response.data;
  },

  async postImageReview(id: string, payload: { rating: number; comment: string }): Promise<any> {
    const response = await axiosInstance.post(`/images/${id}/reviews`, payload);
    return response.data;
  },

  async getRelatedImages(id: string): Promise<any[]> {
    const response = await axiosInstance.get(`/images/${id}/related`);
    return response.data;
  },

  async getUserBalance(): Promise<{ balance: number }> {
    const response = await axiosInstance.get('/user/balance');
    return response.data;
  },

  async downloadImage(id: string): Promise<{ success: boolean }> {
    const response = await axiosInstance.post('/user/download', { imageId: id });
    return response.data;
  },
};
```

```typescript
// src/utils/formatPrice.ts
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(price);
};
```

```typescript
// src/utils/validation.ts
// 必要に応じてバリデーション関数を記述
```

```typescript
// src/global.d.ts
// 必要に応じてグローバルな型定義を記述
```

```typescript
// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import DetailPage from './pages/DetailPage';
import Header from './components/common/Header';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme(); // デフォルトのテーマ

const App: React.FC = () => {
  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Header />
          <Routes>
            <Route path="/detail/:id" element={<DetailPage />} />
            {/* 他のルート */}
          </Routes>
        </Router>
      </ThemeProvider>
    </RecoilRoot>
  );
};

export default App;
```

