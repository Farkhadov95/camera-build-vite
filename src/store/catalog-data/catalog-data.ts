import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../../type/state';
import { AxiosInstance } from 'axios';
import { BasketItems, CatalogData, CatalogItem, CatalogItems} from '../../type/catalog';
import { PromoItems } from '../../type/catalog';
import { NameSpace } from '../../const';

const persistedBasket = localStorage.getItem('basket');

const initialState: CatalogData = {
  catalog: [],
  visibleCatalog: [],
  product: null,
  basket: persistedBasket ? JSON.parse(persistedBasket) as BasketItems : [],
  similarProducts: [],
  promos: [],
  isDataLoading: false,
  isAddedToBasket: false,
  productToAdd: null
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
  name: NameSpace.Products,
  initialState,
  reducers: {
    setVisibleItems: (state, action: {payload: CatalogItems}) => {
      state.visibleCatalog = action.payload;
    },
    removeVisibleItems: (state) => {
      state.visibleCatalog = [];
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
      state.isAddedToBasket = true;
      state.productToAdd = null;
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
    },
    removeAddedToBasketMessage: (state) => {
      state.isAddedToBasket = false;
      state.productToAdd = null;
    },
    setProductToAdd: (state, action: {payload: CatalogItem}) => {
      state.productToAdd = action.payload;
    },
    removeProductToAdd: (state) => {
      state.productToAdd = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCatalogDataAction.pending, (state) => {
        state.isDataLoading = true;
      })
      .addCase(fetchCatalogDataAction.fulfilled, (state, action) => {
        state.catalog = action.payload;
        state.visibleCatalog = action.payload;
        state.isDataLoading = false;
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
      });
  }
});

export const { setBasketItem, removeBasketItem, removeAddedToBasketMessage, setProductToAdd, removeProductToAdd, setVisibleItems, removeVisibleItems } = catalogData.actions;
