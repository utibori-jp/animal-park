# 詳細要件

## 1. ホーム画面
### 概要:
サイトに訪れた際に最初に表示される画面。ユーザーが欲しい画像を探すための検索機能と、画像を見つけやすいレイアウトを提供します。


### 検索機能 (詳細化):
- **キーワード検索バー**:
    - プレースホルダーテキストで検索のヒントを表示（例: 「キーワードを入力」、「風景写真を探す」など）。
    - 検索ボタンまたはEnterキーで検索を実行。
    - **検索結果の状態を通知**: ロード中、該当なし、エラーなどを適切に表示。
- **フィルターオプション**:
    - **表示形式の変更**: ドロップダウン、ラジオボタン、チェックボックスなど、ユーザーが操作しやすい形式を採用。
    - **価格帯**: スライダーまたは選択肢で指定。
    - **人気順**: ダウンロード数、いいね数、閲覧数などでソート。
    - **アップロード日時順**: 新着順、古い順でソート。
    - **タグ・ジャンル**: 複数選択を可能にし、絞り込みを強化。
    - **フィルターのクリア**: 適用したフィルターをリセットする機能を追加。
    - **フィルターの適用状況**: 現在適用中のフィルターを明示的に表示。
- **検索履歴**:
    - 過去の検索履歴を表示し、再検索を容易にする。

### 画像表示 (詳細化):
- **カード型レイアウト**:
    - **ホバーエフェクト**: カーソルを合わせた時にカードに影の効果を付与。
    - **情報表示**:
      - サムネイル画像
      - タイトル（画像名または説明）
      - 価格
      - ダウンロードボタン
      - **ユーザー評価**: いいね数やレビュー数などを表示。
      - **ブランド名**: クリエイターのプロフィールページへリンク。
      - **タグ**: 画像に関連するタグを表示。
    - **プレビュー**:
      - サムネイルをクリックすると、モーダルウィンドウや拡大表示でプレビューを表示。
      - 画像によっては、拡大時の画質やウォーターマークの有無を調整。
      - プレビュー画面でダウンロードはできず、「ダウンロード」ボタンを押下すると、ページ遷移する。
- **ローディング表示**:
    - 画像のロード中はローディングアニメーションを表示し、ユーザー体験を向上。

### おすすめセクション (詳細化):
- **動的な表示**:
    - APIからデータを取得し、動的に表示内容を更新。
    - **セクションの切り替え**: 人気順、新着順、注目ブランドの表示をタブやスライダーで切り替え。
    - **パーソナライズ**: 実施しない
- **コンテンツの多様化**:
    - **「人気画像」**: ダウンロード数やいいね数が多い画像をランキング形式で表示。
    - **「新着画像」**: 最近アップロードされた画像を表示。
    - **「注目ブランド」**: 人気クリエイターやブランドの画像を表示。
    - **「おすすめのテーマ」**: 特定のジャンルやテーマに沿った画像をまとめたものを表示。

### 通貨残高表示 (詳細化):
- **表示場所**:
    - 画面上部のヘッダー部分に表示。
- **表示内容**:
    - 現在の通貨残高を表示。
    - 通貨単位を表示。
- **機能**:
    - 残高をクリックすると、入金履歴や残高詳細ページへ遷移できるようにする。

### その他:
- **レスポンシブデザイン**: PCのみを想定する。
- **アクセシビリティ**:
    - Material UIを用いて、Themeをすでに適用済み
- **エラーハンドリング**:
    - APIエラーや画像の読み込みエラーを適切に処理し、ユーザーにエラーメッセージを表示。
- **UI/UX設計**:
  - ユーザーが直感的に操作できるように、分かりやすいデザインを心がける。
  - 情報のグルーピングや視覚的な階層化を行い、情報を整理する。

### 考慮事項

- **API設計**: バックエンドでAPIを設計する際には、上記の要件を考慮してエンドポイントやデータ構造を定義する。
- **状態管理**: 検索条件やフィルター状態、画像データなどを適切に管理するために、ReactのRecoilを利用する

# Prompt

あなたは熟練のReactエンジニアです。以下の要件に基づいて、ECサイトのホーム画面をReactで実装してください。

**前提:**
- Material UI v6 を利用しており、Themeが適用済みであること。
- 状態管理には Recoil を利用すること。
- APIとの連携は、axiosを用いて行うこと。
- エラーハンドリングはtry-catch文を用いて行うこと。
- 画像のロード中は、ローディングアニメーションを表示すること。
- PC環境でのみ動作するようにレスポンシブ対応は不要です。
- 開発環境はNode.js v23.5.0, npm v10.9.2を想定しています。
- 各コンポーネントは機能ごとにファイル分割し、可読性と保守性を重視してください。
- TypeScriptを用いて開発を行う。

**要件:**

## 1. ホーム画面
### 概要:
サイトに訪れた際に最初に表示される画面。ユーザーが欲しい画像を探すための検索機能と、画像を見つけやすいレイアウトを提供します。

### 検索機能 (詳細化):
- **キーワード検索バー**:
    - プレースホルダーテキストで検索のヒントを表示（例: 「キーワードを入力」、「風景写真を探す」など）。
    - 検索ボタンまたはEnterキーで検索を実行。
    - **検索結果の状態を通知**: ロード中、該当なし、エラーなどを適切に表示。
- **フィルターオプション**:
    - **表示形式の変更**: ドロップダウン、ラジオボタン、チェックボックスなど、ユーザーが操作しやすい形式を採用。
    - **価格帯**: スライダーまたは選択肢で指定。
    - **人気順**: ダウンロード数、いいね数、閲覧数などでソート。
    - **アップロード日時順**: 新着順、古い順でソート。
    - **タグ・ジャンル**: 複数選択を可能にし、絞り込みを強化。
    - **フィルターのクリア**: 適用したフィルターをリセットする機能を追加。
    - **フィルターの適用状況**: 現在適用中のフィルターを明示的に表示。
- **検索履歴**:
    - 過去の検索履歴を表示し、再検索を容易にする。

### 画像表示 (詳細化):
- **カード型レイアウト**:
    - **ホバーエフェクト**: カーソルを合わせた時にカードに影の効果を付与。
    - **情報表示**:
      - サムネイル画像
      - タイトル（画像名または説明）
      - 価格
      - ダウンロードボタン
      - **ユーザー評価**: いいね数やレビュー数などを表示。
      - **ブランド名**: クリエイターのプロフィールページへリンク。
      - **タグ**: 画像に関連するタグを表示。
    - **プレビュー**:
      - サムネイルをクリックすると、モーダルウィンドウや拡大表示でプレビューを表示。
      - 画像によっては、拡大時の画質やウォーターマークの有無を調整。
      - プレビュー画面でダウンロードはできず、「ダウンロード」ボタンを押下すると、ページ遷移する。
- **ローディング表示**:
    - 画像のロード中はローディングアニメーションを表示し、ユーザー体験を向上。

### おすすめセクション (詳細化):
- **動的な表示**:
    - APIからデータを取得し、動的に表示内容を更新。
    - **セクションの切り替え**: 人気順、新着順、注目ブランドの表示をタブやスライダーで切り替え。
    - **パーソナライズ**: 実施しない
- **コンテンツの多様化**:
    - **「人気画像」**: ダウンロード数やいいね数が多い画像をランキング形式で表示。
    - **「新着画像」**: 最近アップロードされた画像を表示。
    - **「注目ブランド」**: 人気クリエイターやブランドの画像を表示。
    - **「おすすめのテーマ」**: 特定のジャンルやテーマに沿った画像をまとめたものを表示。

### 通貨残高表示 (詳細化):
- **表示場所**:
    - 画面上部のヘッダー部分に表示。
- **表示内容**:
    - 現在の通貨残高を表示。
    - 通貨単位を表示。
- **機能**:
    - 残高をクリックすると、入金履歴や残高詳細ページへ遷移できるようにする。

### その他:
- **レスポンシブデザイン**:
  - 本アプリはPC環境のみでの利用を想定しており、レスポンシブ対応は不要。
  - 最小幅を960px、推奨幅を1440pxとする。
- **エラーハンドリング**:
    - APIエラー: ユーザーにフレンドリーなメッセージを表示（例:「現在サーバーに接続できません。しばらくしてからお試しください。」）。
    - 画像の読み込みエラー: デフォルト画像を表示し、画像が見つからない場合に備える。
- **UI/UX設計**:
  - ユーザー体験を重視: 直感的でシンプルなナビゲーションを採用し、ユーザーが迷わない設計を心がける。
  - 情報整理: 商品情報やセクションごとにカードやセクション区切りを用い、視覚的な階層を明確化する。
  - フィードバックの提供: ボタン操作後やデータロード中は、スピナーやトースト通知で状態をユーザーに伝える。
  - Material UIを用いて、全体に共通のThemeを適用する
- **テスト**:
  - 今回は、個人レベルのWEBアプリであるため実施しない。

### 考慮事項
- **API設計**: バックエンドでAPIを設計する際には、上記の要件を考慮してエンドポイントやデータ構造を定義する。
- **状態管理**: 検索条件やフィルター状態、画像データなどを適切に管理するために、ReactのRecoilを利用する。
- **モックデータ**: API連携がまだの場合は、モックデータを用いて開発を進めてください。

**出力形式:**
- srcディレクトリ内に、コンポーネントごとのファイルを作成してください。
- 全てのコンポーネントやカスタムフックには適切な型定義を追加してください。
- 各コンポーネントは関数コンポーネントで作成してください。
- コードへのコメントは必要最小限のみにしてください。必要であれば、適宜こちらで対応します。
- CSSについては、Material UIが提供するスタイリング手法（例: sxプロップやstyled API）を用いてください。
- APIや外部サービスとのやり取りはservicesディレクトリで管理し、カスタムフックはhooksディレクトリに作成してください。

以下を含めてください。
- `src/components/` ディレクトリを作成し、その中にコンポーネントを配置する。
- `src/components/common/` ディレクトリを作成し、ヘッダーやフッターなど共通コンポーネントを配置する。
- `src/atoms/` ディレクトリを作成し、Recoilの状態を定義する。
- `src/hooks/` ディレクトリを作成し、カスタムフックを配置する。
- `src/services/` ディレクトリを作成し、APIや外部サービスとのやり取りを管理する。
- `src/utils/` ディレクトリは作成するが、汎用性が高く、特定のドメインに依存しない関数のみを配置する。
- `src/config/` ディレクトリを作成し、axiosの設定や環境変数を管理する。

**出力例（ファイル構成イメージ）:**
```
src/
├── atoms/
│   ├── searchState.ts
│   └── userState.ts
├── components/
│   ├── common/
│   │   ├── Header.tsx
│   │   └── Loading.tsx
│   ├── Home/
│   │   ├── ImageCard.tsx
│   │   ├── ImageGrid.tsx
│   │   ├── FilterOptions.tsx
│   │   ├── SearchBar.tsx
│   │   ├── PreviewModel.tsx
│   │   └── RecommendationSection.tsx
│   └── 他のページ名/
│       └── ページ内のコンポーネント
├── config/
│   └── axiosConfig.ts
├── pages/
│   └── Home.tsx
├── hooks/
│   └── useFetchImages.ts
├── services/
│   └── apiService.ts
├── utils/
│   ├── format.ts
│   ├── validation.ts
│   └── 他の汎用関数
└── App.ts
```

上記の要件と指示に従い、Reactコードを生成してください。
```

# Output
はい、承知いたしました。TypeScript、Material UI v6、Recoil、axiosを用いたReactコードを生成します。以下に、各ファイルの内容を示します。

**ファイル構成:**

```
src/
├── atoms/
│   ├── searchState.ts
│   └── userState.ts
├── components/
│   ├── common/
│   │   ├── Header.tsx
│   │   └── Loading.tsx
│   ├── Home/
│   │   ├── ImageCard.tsx
│   │   ├── ImageGrid.tsx
│   │   ├── FilterOptions.tsx
│   │   ├── SearchBar.tsx
│   │   ├── PreviewModal.tsx
│   │   └── RecommendationSection.tsx
├── config/
│   └── axiosConfig.ts
├── pages/
│   └── Home.tsx
├── hooks/
│   └── useFetchImages.ts
├── services/
│   └── apiService.ts
├── utils/
│   └── format.ts
└── App.tsx
```

**コード:**

**`src/atoms/searchState.ts`:**

```typescript
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
```

**`src/atoms/userState.ts`:**

```typescript
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
```

**`src/components/common/Header.tsx`:**

```typescript
import React from 'react';
import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
import { useRecoilValue } from 'recoil';
import { userState } from '../../atoms/userState';

const Header: React.FC = () => {
  const { currencyBalance } = useRecoilValue(userState);

  return (
    <AppBar position="static">
      <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
        <Typography variant="h6">
          EC Site
        </Typography>
        <Box display="flex" alignItems="center">
          <Typography variant="body1" sx={{ mr: 1 }}>
            残高:
          </Typography>
          <Button
            variant="text"
            color="inherit"
            onClick={() => { /* TODO: 残高詳細ページへ遷移 */}}
          >
           {currencyBalance}
            <Typography variant="body1" sx={{ ml: 0.5 }}>
             円
           </Typography>
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
```

**`src/components/common/Loading.tsx`:**

```typescript
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
```

**`src/components/Home/ImageCard.tsx`:**

```typescript
import React from 'react';
import { Card, CardMedia, CardContent, Typography, CardActionArea, Box, IconButton } from '@mui/material';
import { FavoriteBorder, Favorite } from '@mui/icons-material';

interface ImageCardProps {
  id: number;
  imageUrl: string;
  title: string;
  price: number;
  likes: number;
  brandName: string;
  tags: string[];
  onOpenPreview: () => void;
}

const ImageCard: React.FC<ImageCardProps> = ({
  id,
  imageUrl,
  title,
  price,
  likes,
  brandName,
  tags,
  onOpenPreview
}) => {
  return (
    <Card sx={{ maxWidth: 345, boxShadow: 3, '&:hover': { boxShadow: 6 } }}>
      <CardActionArea onClick={onOpenPreview}>
        <CardMedia
          component="img"
          height="140"
          image={imageUrl}
          alt={title}
          sx={{ objectFit: "cover" }}
        />
        <CardContent>
          <Typography variant="h6" component="div">
            {title}
          </Typography>
           <Typography variant="body2" color="text.secondary">
           ブランド: {brandName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
             価格: {price} 円
          </Typography>
         <Box display="flex" alignItems="center" justifyContent="space-between">
            <Typography variant="body2" color="text.secondary">
              いいね: {likes}
            </Typography>
          </Box>
        </CardContent>
         </CardActionArea>
      <Box display="flex" justifyContent="space-between" alignItems="center" p={1}>
          <Box>
             {tags.map((tag,index) => (
                <Typography key={index} variant="caption" color="text.secondary" sx={{mr: 0.5}}>
                  #{tag}
                </Typography>
              ))}
          </Box>
        <IconButton aria-label="like">
            <FavoriteBorder />
          </IconButton>
      </Box>
    </Card>
  );
};

export default ImageCard;
```

**`src/components/Home/ImageGrid.tsx`:**

```typescript
import React from 'react';
import { Grid } from '@mui/material';
import ImageCard from './ImageCard';

interface ImageGridProps {
  images: any[]; // TODO: APIのレスポンスに合わせて型定義
  onOpenPreview: (id: number) => void;
}

const ImageGrid: React.FC<ImageGridProps> = ({ images, onOpenPreview }) => {
    return (
      <Grid container spacing={3} justifyContent="center">
        {images.map((image) => (
          <Grid item key={image.id}>
            <ImageCard
              id={image.id}
              imageUrl={image.imageUrl}
              title={image.title}
              price={image.price}
              likes={image.likes}
              brandName={image.brandName}
              tags={image.tags}
              onOpenPreview={() => onOpenPreview(image.id)}
            />
          </Grid>
        ))}
      </Grid>
    );
};

export default ImageGrid;
```

**`src/components/Home/FilterOptions.tsx`:**

```typescript
import React, { useState } from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Typography,
  Button,
  Checkbox,
  ListItemText,
  OutlinedInput
} from '@mui/material';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { searchState } from '../../atoms/searchState';
import { useTheme } from '@mui/material/styles';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(tag: string, tags: string[], theme: any) {
  return {
    fontWeight:
      tags.indexOf(tag) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

interface FilterOptionsProps {
  availableTags: string[]
}

const FilterOptions: React.FC<FilterOptionsProps> = ({ availableTags }) => {
  const theme = useTheme();
  const [search, setSearch] = useRecoilState(searchState);
  const setRecoilSearch = useSetRecoilState(searchState);
  const [filterVisible, setFilterVisible] = useState(false);


    const handlePriceChange = (event: Event, newValue: number | number[]) => {
       if (Array.isArray(newValue)) {
            setSearch(prev => ({ ...prev, priceRange: [newValue[0], newValue[1]] }));
       }
    };

  const handleSortChange = (event: React.ChangeEvent<{ value: any }>) => {
    setSearch(prev => ({ ...prev, sortBy: event.target.value }));
  };

  const handleClearFilters = () => {
     setRecoilSearch({
      keyword: '',
      priceRange: [0, 1000],
      sortBy: null,
      tags: [],
     });
    setFilterVisible(false);
  };

  const handleTagChange = (event: React.ChangeEvent<typeof OutlinedInput>) => {
        const { value } = event.target;
        setSearch(prev => ({ ...prev, tags: typeof value === 'string' ? value.split(',') : value }));
  };

    const handleToggleFilterVisible = () => {
      setFilterVisible(prev => !prev);
  }

  return (
     <Box mt={2} mb={2} borderBottom="1px solid #eee" pb={2}>
          <Box mb={1} display="flex" alignItems="center" justifyContent="space-between">
            <Typography variant="h6" color="text.secondary">
                フィルター
            </Typography>
              <Button variant="outlined" size="small" onClick={handleToggleFilterVisible}>
                 {filterVisible ? '閉じる' : '開く'}
              </Button>
         </Box>
       {filterVisible && (
        <>
          <Box mt={2} display="flex" gap={2} flexWrap="wrap">
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="sort-by-label">並び替え</InputLabel>
              <Select
                labelId="sort-by-label"
                id="sort-by-select"
                value={search.sortBy || ''}
                label="並び替え"
                onChange={handleSortChange}
              >
                <MenuItem value="popularity">人気順</MenuItem>
                <MenuItem value="newest">新着順</MenuItem>
              </Select>
            </FormControl>

              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="tags-label">タグ</InputLabel>
                <Select
                  labelId="tags-label"
                  id="tags-select"
                  multiple
                  value={search.tags}
                  onChange={handleTagChange}
                  input={<OutlinedInput label="Tag" />}
                  renderValue={(selected) => selected.join(', ')}
                  MenuProps={MenuProps}
                >
                 {availableTags.map((tag) => (
                   <MenuItem key={tag} value={tag} style={getStyles(tag,search.tags, theme)}>
                     <Checkbox checked={search.tags.indexOf(tag) > -1} />
                      <ListItemText primary={tag} />
                   </MenuItem>
                   ))}
                </Select>
            </FormControl>

             <Box sx={{ m: 1, minWidth: 120 }}>
               <Typography id="price-range-slider" gutterBottom>
                 価格帯
               </Typography>
               <Slider
                 value={search.priceRange}
                 onChange={handlePriceChange}
                 valueLabelDisplay="auto"
                  aria-labelledby="price-range-slider"
                 min={0}
                 max={1000}
                />
                </Box>
         </Box>

           <Box mt={2}>
               {search.keyword || search.sortBy || search.tags.length > 0 || (search.priceRange[0] !== 0 && search.priceRange[1] !== 1000) ? (
                   <Typography variant="body2" color="text.secondary">
                       適用中のフィルター:
                       {search.keyword && ` キーワード: ${search.keyword}`}
                       {search.sortBy && ` 並び順: ${search.sortBy === 'popularity' ? '人気順' : '新着順'}`}
                      {search.tags.length > 0 && ` タグ: ${search.tags.join(', ')}`}
                      {search.priceRange[0] !== 0 && search.priceRange[1] !== 1000 && ` 価格帯: ${search.priceRange[0]} ~ ${search.priceRange[1]} 円`}
                   </Typography>
                ) : (
                   <Typography variant="body2" color="text.secondary">
                    フィルターは適用されていません。
                   </Typography>
               )}
           </Box>

          <Box mt={2}>
             <Button variant="outlined" onClick={handleClearFilters}>フィルターをクリア</Button>
           </Box>
        </>
      )}
    </Box>
  );
};

export default FilterOptions;
```

**`src/components/Home/SearchBar.tsx`:**

```typescript
import React, { useState } from 'react';
import { TextField, IconButton, InputAdornment } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { useSetRecoilState } from 'recoil';
import { searchState } from '../../atoms/searchState';

const SearchBar: React.FC = () => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const setSearch = useSetRecoilState(searchState);

  const handleSearch = () => {
    setSearch(prev => ({ ...prev, keyword: searchKeyword }));
  };

   const handleEnterKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };


  return (
    <TextField
      fullWidth
      placeholder="キーワードを入力"
      variant="outlined"
      value={searchKeyword}
      onChange={(e) => setSearchKeyword(e.target.value)}
      onKeyDown={handleEnterKeyPress}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={handleSearch}>
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchBar;
```

**`src/components/Home/PreviewModal.tsx`:**

```typescript
import React from 'react';
import { Modal, Box, Typography, Button, IconButton } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

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
            <CloseIcon />
          </IconButton>
        </Box>

         <Box display="flex" justifyContent="center" mt={2}>
            <img src={imageUrl} alt={title} style={{ maxWidth: '100%', maxHeight: '400px', objectFit: 'contain' }}/>
        </Box>

        <Typography variant="h6" mt={2}>
           {title}
        </Typography>
         <Typography variant="body2" color="text.secondary" >
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
```

**`src/components/Home/RecommendationSection.tsx`:**

```typescript
import React from 'react';
import { Box, Typography, Tabs, Tab } from '@mui/material';
import ImageGrid from './ImageGrid';
import Loading from '../common/Loading';

interface RecommendationSectionProps {
  loading: boolean;
  recommendations: {
      popular: any[]; // TODO: APIのレスポンスに合わせて型定義
      newArrivals: any[];
      featuredBrands: any[];
      recommendedThemes: any[];
    };
  onOpenPreview: (id: number) => void;
}

const RecommendationSection: React.FC<RecommendationSectionProps> = ({
  loading,
    recommendations,
  onOpenPreview
}) => {
  const [selectedTab, setSelectedTab] = React.useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  if (loading) {
    return <Loading />;
  }

  let currentImages = [];
    switch(selectedTab) {
      case 0:
         currentImages = recommendations.popular;
        break;
      case 1:
        currentImages = recommendations.newArrivals;
        break;
       case 2:
        currentImages = recommendations.featuredBrands;
        break;
      case 3:
        currentImages = recommendations.recommendedThemes;
        break;
       default:
        currentImages = [];
    }


  return (
    <Box mt={3}>
      <Typography variant="h5" gutterBottom>
        おすすめ
      </Typography>
      <Box>
        <Tabs value={selectedTab} onChange={handleTabChange}>
          <Tab label="人気画像" />
           <Tab label="新着画像" />
          <Tab label="注目ブランド" />
          <Tab label="おすすめのテーマ" />
        </Tabs>
      </Box>
      <Box mt={2}>
        <ImageGrid images={currentImages} onOpenPreview={onOpenPreview}/>
      </Box>
    </Box>
  );
};

export default RecommendationSection;
```

**`src/config/axiosConfig.ts`:**

```typescript
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3001/api', // TODO: 環境変数で管理する
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
```

**`src/pages/Home.tsx`:**

```typescript
import React, { useState, useCallback } from 'react';
import { Container, Box } from '@mui/material';
import Header from '../components/common/Header';
import SearchBar from '../components/Home/SearchBar';
import FilterOptions from '../components/Home/FilterOptions';
import ImageGrid from '../components/Home/ImageGrid';
import PreviewModal from '../components/Home/PreviewModal';
import RecommendationSection from '../components/Home/RecommendationSection';
import { useRecoilValue } from 'recoil';
import { searchState } from '../atoms/searchState';
import useFetchImages from '../hooks/useFetchImages';

const Home: React.FC = () => {
  const { keyword, priceRange, sortBy, tags } = useRecoilValue(searchState);
  const { data, loading, error, fetchImages, availableTags, recommendations, setImageUrl } = useFetchImages();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState({} as any); // TODO: 型定義

   // モーダルを開く処理
   const handleOpenPreview = useCallback((id:number) => {
      const targetImage = data.find((image:any) => image.id === id);
      if(targetImage){
        setSelectedImage(targetImage);
         setImageUrl(targetImage.imageUrl);
         setPreviewOpen(true);
       }
    }, [data, setImageUrl]);

    // モーダルを閉じる処理
  const handleClosePreview = () => {
     setPreviewOpen(false);
    setSelectedImage({});
  };

    // 検索条件に変更があった場合にAPIを叩く
   React.useEffect(() => {
      fetchImages(keyword, priceRange, sortBy, tags)
   }, [keyword, priceRange, sortBy, tags, fetchImages]);


  return (
    <>
      <Header />
      <Container maxWidth="lg" sx={{ minWidth: "960px", width: "1440px" }}>
        <Box mt={2}>
          <SearchBar />
          <FilterOptions availableTags={availableTags} />
          {error && (
               <Box color="red">
                  エラーが発生しました。
               </Box>
            )}

         <ImageGrid images={data} onOpenPreview={handleOpenPreview}/>

          <RecommendationSection
            loading={loading}
            recommendations={recommendations}
             onOpenPreview={handleOpenPreview}
          />
        </Box>

        {selectedImage && (
          <PreviewModal
            open={previewOpen}
            onClose={handleClosePreview}
            imageUrl={selectedImage.imageUrl}
            title={selectedImage.title}
            brandName={selectedImage.brandName}
            price={selectedImage.price}
          />
        )}
      </Container>
    </>
  );
};

export default Home;
```

**`src/hooks/useFetchImages.ts`:**

```typescript
import { useState, useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { searchState } from '../atoms/searchState';
import apiService from '../services/apiService';
import { useSetRecoilState } from 'recoil';


const useFetchImages = () => {
  const [data, setData] = useState<any[]>([]); // TODO: 型定義
  const [availableTags, setAvailableTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [recommendations, setRecommendations] = useState<any>({
      popular: [],
      newArrivals: [],
      featuredBrands: [],
       recommendedThemes: []
  }); // TODO: 型定義
  const [imageUrl, setImageUrl] = useState('');

    const setRecoilSearch = useSetRecoilState(searchState);

  const fetchImages = useCallback(
    async (keyword:string, priceRange: [number, number], sortBy: string | null, tags: string[]) => {
      setLoading(true);
      setError(null);
       try {
          const params = {
            keyword,
            priceRange,
            sortBy,
            tags
          }

           const res = await apiService.fetchImages(params);
            if(res.status === 200) {
              setData(res.data.images);
              setAvailableTags(res.data.availableTags);
              setRecommendations(res.data.recommendations);
             } else {
                  throw new Error('Failed to fetch images');
               }
          } catch (err:any) {
            setError(err.message === 'Failed to fetch images' ? '現在サーバーに接続できません。しばらくしてからお試しください。' : '不明なエラーが発生しました。');
          } finally {
            setLoading(false);
          }
    },
    [],
  );

    const handleSetImageUrl = useCallback((url: string) => {
        setImageUrl(url)
    },[])


  return { data, loading, error, fetchImages, availableTags, recommendations, imageUrl, setImageUrl: handleSetImageUrl };
};

export default useFetchImages;
```

**`src/services/apiService.ts`:**

```typescript
import axiosInstance from '../config/axiosConfig';

const apiService = {
  async fetchImages(params: any) { // TODO: 型定義
    try {
      const response = await axiosInstance.get('/images', { params });
      return response;
    } catch (error:any) {
      console.error("API Error:", error);
        throw error;
    }
  },
};

export default apiService;
```

**`src/utils/format.ts`:**

```typescript
// TODO: format関数を追加
```

**`src/App.tsx`:**

```typescript
import React from 'react';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import theme from './theme'; // TODO: themeファイルを作成
import Home from './pages/Home';

const App: React.FC = () => {
  return (
    <RecoilRoot>
       <ThemeProvider theme={theme}>
            <CssBaseline />
           <Home />
       </ThemeProvider>
    </RecoilRoot>
  );
};

export default App;
```

**`src/theme.ts`:**

```typescript
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
   // TODO: themeの内容を記載
});

export default theme;
```

**補足:**
- 各コンポーネントの型定義は、APIのレスポンスに合わせて調整してください。
-  `src/theme.ts` には、Material UIのテーマ設定を記述してください。
- 上記のコードは、最小限の実装をしています。必要に応じて、UIの調整や、詳細な機能を追加してください。
-  モックデータを利用する場合は、 `src/services/apiService.ts` の `fetchImages` 関数内でモックデータを返すように変更してください。

これで、TypeScript、Material UI v6、Recoil、axios を使用したReactアプリケーションの基本構造が完成しました。
`npm start` や `yarn start` を実行してアプリケーションを起動してください。

