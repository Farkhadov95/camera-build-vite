import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../type/state';
import { AxiosInstance } from 'axios';
import { CatalogData, CatalogItem, CatalogItems } from '../type/catalog';
import { PromoItems } from '../type/catalog';

const initialState: CatalogData = {
  catalog: [],
  product: null,
  similarProducts: [],
  promos: [],
  isDataLoading: false,
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

export const catalogData = createSlice({
  name: 'catalogData',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCatalogDataAction.pending, (state) => {
        state.isDataLoading = true;
      })
      .addCase(fetchCatalogDataAction.fulfilled, (state, action) => {
        state.catalog = action.payload;
        console.log(state.catalog);
      })
      .addCase(fetchCatalogDataAction.rejected, (state) => {
        state.isDataLoading = false;
        console.log('rejected');
      })
      .addCase(fetchPromoDataAction.pending, (state) => {
        state.isDataLoading = true;
      })
      .addCase(fetchPromoDataAction.fulfilled, (state, action) => {
        state.promos = action.payload;
        console.log(state.promos);
      })
      .addCase(fetchPromoDataAction.rejected, (state) => {
        state.isDataLoading = false;
        console.log('rejected');
      })
      .addCase(fetchProductAction.pending, (state) => {
        state.isDataLoading = true;
      })
      .addCase(fetchProductAction.fulfilled, (state, action) => {
        state.product = action.payload;
        console.log(state.product);
      })
      .addCase(fetchProductAction.rejected, (state) => {
        state.isDataLoading = false;
        console.log('rejected');
      })
      .addCase(fetchSimilarProductsAction.pending, (state) => {
        state.isDataLoading = true;
      })
      .addCase(fetchSimilarProductsAction.fulfilled, (state, action) => {
        state.similarProducts = action.payload;
        console.log(state.similarProducts);
      })
      .addCase(fetchSimilarProductsAction.rejected, (state) => {
        state.isDataLoading = false;
        console.log('rejected');
      });
  }
});
