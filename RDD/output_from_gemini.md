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
