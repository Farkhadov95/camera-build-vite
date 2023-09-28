import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../../type/state';
import { AxiosInstance } from 'axios';
import { BasketItems, CatalogData, CatalogItem, CatalogItems, PostReview, Review, Reviews } from '../../type/catalog';
import { PromoItems } from '../../type/catalog';

const persistedBasket = localStorage.getItem('basket');

const initialState: CatalogData = {
  catalog: [],
  product: null,
  basket: persistedBasket ? JSON.parse(persistedBasket) as BasketItems : [],
  reviews: [],
  similarProducts: [],
  promos: [],
  isDataLoading: false,
  isReviewLoading: false,
  isPostReviewSuccess: false,
};

export const fetchCatalogDataAction = createAsyncThunk<CatalogItems, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchCatalogItems',
  async(_arg, {extra: api}) => {
    const {data} = await api.get<CatalogItems>('/cameras');
    return data;
  },
);

export const fetchProductAction = createAsyncThunk<CatalogItem, {id:number}, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchProduct',
  async({id}, {extra: api}) => {
    const {data} = await api.get<CatalogItem>(`/cameras/${id}`);
    return data;
  },
);

export const fetchSimilarProductsAction = createAsyncThunk<CatalogItems, {id:number}, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchSimilarProducts',
  async({id}, {extra: api}) => {
    const {data} = await api.get<CatalogItems>(`/cameras/${id}/similar`);
    return data;
  },
);

export const fetchProductReviewsAction = createAsyncThunk<Reviews, {id:number}, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchProductReviews',
  async({id}, {extra: api}) => {
    const {data} = await api.get<Reviews>(`/cameras/${id}/reviews`);
    return data;
  },
);

export const fetchPromoDataAction = createAsyncThunk<PromoItems, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchPromoItems',
  async(_arg, {extra: api}) => {
    const {data} = await api.get<PromoItems>('/promo');
    return data;
  },
);

export const postReviewAction = createAsyncThunk<Review, { review: PostReview; cameraId: number }, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/postReview',
  async ({ review, cameraId }, { dispatch, extra: api }) => {
    const {data} = await api.post<Review>('/reviews', review);
    dispatch(fetchProductReviewsAction({ id: cameraId }));
    return data;
  }
);

export const catalogData = createSlice({
  name: 'catalogData',
  initialState,
  reducers: {
    setSuccessStatus: (state, action: {payload: boolean}) => {
      state.isPostReviewSuccess = action.payload;
    },
    setBasketItem: (state, action: {payload: CatalogItem}) => {
      const existingItem = state.basket.find((item) => item.product.id === action.payload.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.basket.push({
          product: action.payload,
          quantity: 1,
        });
      }
      localStorage.setItem('basket', JSON.stringify(state.basket));
    },
    removeBasketItem: (state, action: {payload: CatalogItem}) => {
      const existingItemIndex = state.basket.findIndex((item) => item.product.id === action.payload.id);

      if (existingItemIndex !== -1) {
        if (state.basket[existingItemIndex].quantity > 1) {
          state.basket[existingItemIndex].quantity -= 1;
        } else {
          state.basket.splice(existingItemIndex, 1);
        }
      }
      localStorage.setItem('basket', JSON.stringify(state.basket));
    }},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCatalogDataAction.pending, (state) => {
        state.isDataLoading = true;
      })
      .addCase(fetchCatalogDataAction.fulfilled, (state, action) => {
        state.catalog = action.payload;
        state.isDataLoading = false;
        // console.log(state.catalog);
      })
      .addCase(fetchCatalogDataAction.rejected, (state) => {
        state.isDataLoading = false;
      })
      .addCase(fetchPromoDataAction.pending, (state) => {
        state.isDataLoading = true;
      })
      .addCase(fetchPromoDataAction.fulfilled, (state, action) => {
        state.promos = action.payload;
        state.isDataLoading = false;
      })
      .addCase(fetchPromoDataAction.rejected, (state) => {
        state.isDataLoading = false;
      })
      .addCase(fetchProductAction.pending, (state) => {
        state.isDataLoading = true;
      })
      .addCase(fetchProductAction.fulfilled, (state, action) => {
        state.product = action.payload;
        state.isDataLoading = false;
      })
      .addCase(fetchProductAction.rejected, (state) => {
        state.isDataLoading = false;
      })
      .addCase(fetchSimilarProductsAction.pending, (state) => {
        state.isDataLoading = true;
      })
      .addCase(fetchSimilarProductsAction.fulfilled, (state, action) => {
        state.similarProducts = action.payload;
        state.isDataLoading = false;
      })
      .addCase(fetchSimilarProductsAction.rejected, (state) => {
        state.isDataLoading = false;
      })
      .addCase(fetchProductReviewsAction.pending, (state) => {
        state.isDataLoading = true;
      })
      .addCase(fetchProductReviewsAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
        state.isDataLoading = false;
      })
      .addCase(fetchProductReviewsAction.rejected, (state) => {
        state.isDataLoading = false;
      })
      .addCase(postReviewAction.pending, (state) => {
        state.isReviewLoading = true;
      })
      .addCase(postReviewAction.fulfilled, (state) => {
        state.isReviewLoading = false;
        state.isPostReviewSuccess = true;
      })
      .addCase(postReviewAction.rejected, (state) => {
        state.isReviewLoading = false;
      });

  }
});

export const { setSuccessStatus, setBasketItem, removeBasketItem } = catalogData.actions;
