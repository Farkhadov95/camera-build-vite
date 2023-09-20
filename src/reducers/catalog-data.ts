import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../type/state';
import { AxiosInstance } from 'axios';
import { CatalogData, CatalogItems } from '../type/catalog';
import { PromoItems } from '../type/catalog';

const initialState: CatalogData = {
  catalog: [],
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
      });

  }
});
