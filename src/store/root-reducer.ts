import { combineReducers } from '@reduxjs/toolkit';
import { catalogData } from './catalog-data/catalog-data';
import { reviewData } from './review-data/review-data';
import { NameSpace } from '../const';
import { orderData } from './order-data/order-data';

export const rootReducer = combineReducers({
  [NameSpace.Products]: catalogData.reducer,
  [NameSpace.Reviews]: reviewData.reducer,
  [NameSpace.Order]: orderData.reducer,
});
