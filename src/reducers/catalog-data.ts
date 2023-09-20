import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../type/state';
import { AxiosInstance } from 'axios';
import { CatalogData, CatalogItems } from '../type/catalog-items';

const initialState: CatalogData = {
  catalog: [],
  isDataLoading: false,
};

export const fetchCatalogDataAction = createAsyncThunk<CatalogItems, undefined, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>(
    'data/fetchFilms',
    async(_arg, {extra: api}) => {
      const {data} = await api.get<CatalogItems>('/cameras');
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
      });
  }
});
