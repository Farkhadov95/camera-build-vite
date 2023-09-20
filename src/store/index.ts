import { configureStore } from '@reduxjs/toolkit';
import { createAPI } from '../services/api';
import { catalogData } from '../reducers/catalog-data';

export const api = createAPI();

export const store = configureStore(
  {reducer: catalogData.reducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: api,
        }
      })
  }
);
