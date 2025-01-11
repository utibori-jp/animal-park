import { atom } from 'recoil';

export const detailImageState = atom<App.Image | null>({
  key: 'detailImageState',
  default: null,
});

export const imageDetailState = atom<App.Image | null>({
  key: 'imageDetailState',
  default: null,
})

export const reviewsState = atom<App.Review[]>({
  key: 'reviewsState',
  default: [],
});

export const reviewFilterState = atom<number | null>({
  key: 'reviewFilterState',
  default: null,
});

export const relatedImagesState = atom<App.Image[]>({
  key: 'relatedImagesState',
  default: [],
});
