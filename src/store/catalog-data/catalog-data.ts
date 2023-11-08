import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../../type/state';
import { AxiosInstance } from 'axios';
import { BasketItem, BasketItems, CatalogData, CatalogItem, CatalogItems, SetBasketItemType} from '../../type/catalog';
import { PromoItems } from '../../type/catalog';
import { ErrorMessages, MAX_BASKET_COUNT, MIN_BASKET_COUNT, NameSpace } from '../../const';

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
  productToAdd: null,
  productToDelete: null,
  error: null,
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
    setBasketItem: (state, action: {payload: number}) => {
      const existingItem = state.basket.find((item) => item.product.id === action.payload);
      const newItem = state.catalog.find((item) => item.id === action.payload);

      const checkAvailableSlots = (item: BasketItem) => {
        const availableCount = MAX_BASKET_COUNT - item.quantity;
        return availableCount;
      };

      if (existingItem && checkAvailableSlots(existingItem) >= MIN_BASKET_COUNT) {
        existingItem.quantity += 1;
      } else if (newItem && !existingItem){
        state.basket.push({
          product: newItem,
          quantity: 1,
        });
      }
      localStorage.setItem('basket', JSON.stringify(state.basket));
      state.isAddedToBasket = true;
      state.productToAdd = null;
    },
    setBasketMultipleItems: (state, action: {payload: SetBasketItemType}) => {
      const existingItem = state.basket.find((item) => item.product.id === action.payload.id);
      const newItem = state.catalog.find((item) => item.id === action.payload.id);

      if (existingItem) {
        existingItem.quantity = action.payload.quantity;
      } else if (newItem && !existingItem){
        state.basket.push({
          product: newItem,
          quantity: action.payload.quantity,
        });
      } else {
        state.error = 'Wrong Quantity';
        return;
      }
      localStorage.setItem('basket', JSON.stringify(state.basket));
      state.isAddedToBasket = true;
      state.productToAdd = null;
    },
    decreaseBasketItem: (state, action: {payload: CatalogItem}) => {
      const existingItemIndex = state.basket.findIndex((item) => item.product.id === action.payload.id);

      if (state.basket[existingItemIndex].quantity > MIN_BASKET_COUNT && state.basket[existingItemIndex].quantity !== 0) {
        state.basket[existingItemIndex].quantity -= 1;
      }

      localStorage.setItem('basket', JSON.stringify(state.basket));
    },
    removeBasketItem: (state, action: {payload: number}) => {
      const existingItemIndex = state.basket.findIndex((item) => item.product.id === action.payload);

      if (existingItemIndex !== -1) {
        state.basket.splice(existingItemIndex, 1);
      }
      localStorage.setItem('basket', JSON.stringify(state.basket));
      state.productToDelete = null;
    },
    clearBasket: (state) => {
      state.basket = [];
      localStorage.removeItem('basket');
    },
    clearRemoveBasketItemMessage: (state) => {
      state.productToDelete = null;
    },
    removeAddedToBasketMessage: (state) => {
      state.isAddedToBasket = false;
      state.productToAdd = null;
    },
    setProductToAdd: (state, action: {payload: CatalogItem}) => {
      state.productToAdd = action.payload;
    },
    setProductToDelete: (state, action: {payload: CatalogItem}) => {
      state.productToDelete = action.payload;
    },
    removeProductToAdd: (state) => {
      state.productToAdd = null;
    },
    clearErrors: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCatalogDataAction.pending, (state) => {
        state.isDataLoading = true;
        state.error = null;
      })
      .addCase(fetchCatalogDataAction.fulfilled, (state, action) => {
        state.catalog = action.payload;
        state.visibleCatalog = action.payload;
        state.isDataLoading = false;
      })
      .addCase(fetchCatalogDataAction.rejected, (state) => {
        state.isDataLoading = false;
        state.error = ErrorMessages.CATALOG_ITEMS_LOAD;
      })
      .addCase(fetchPromoDataAction.pending, (state) => {
        state.isDataLoading = true;
        state.error = null;
      })
      .addCase(fetchPromoDataAction.fulfilled, (state, action) => {
        state.promos = action.payload;
        state.isDataLoading = false;
      })
      .addCase(fetchPromoDataAction.rejected, (state) => {
        state.isDataLoading = false;
        state.error = ErrorMessages.PROMO_LOAD;
      })
      .addCase(fetchProductAction.pending, (state) => {
        state.isDataLoading = true;
        state.error = null;
      })
      .addCase(fetchProductAction.fulfilled, (state, action) => {
        state.product = action.payload;
        state.isDataLoading = false;
      })
      .addCase(fetchProductAction.rejected, (state) => {
        state.isDataLoading = false;
        state.error = ErrorMessages.PRODUCT_LOAD;
      })
      .addCase(fetchSimilarProductsAction.pending, (state) => {
        state.isDataLoading = true;
        state.error = null;
      })
      .addCase(fetchSimilarProductsAction.fulfilled, (state, action) => {
        state.similarProducts = action.payload;
        state.isDataLoading = false;
      })
      .addCase(fetchSimilarProductsAction.rejected, (state) => {
        state.isDataLoading = false;
        state.error = ErrorMessages.SIMILAR_ITEMS_LOAD;
      });
  }
});

export const { setBasketItem,setBasketMultipleItems, decreaseBasketItem, removeBasketItem, clearRemoveBasketItemMessage, removeAddedToBasketMessage, clearBasket, setProductToAdd, setProductToDelete, removeProductToAdd, setVisibleItems, removeVisibleItems, clearErrors } = catalogData.actions;
