import { combineReducers } from '@reduxjs/toolkit';
import { catalogData } from './catalog-data/catalog-data';
import { reviewData } from './review-data/review-data';
import { NameSpace } from '../const';

export const rootReducer = combineReducers({
  [NameSpace.Products]: catalogData.reducer,
  [NameSpace.Reviews]: reviewData.reducer,
});
