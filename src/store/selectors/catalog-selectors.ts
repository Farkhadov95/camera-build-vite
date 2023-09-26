import { CatalogItem, CatalogItems, PromoItems, Reviews } from '../../type/catalog';
import { State } from '../../type/state';

export const catalogItemsSelector = (state: State): CatalogItems => state.catalog;
export const promoItemsSelector = (state: State): PromoItems => state.promos;
export const productSelector = (state: State): CatalogItem | null => state.product;
export const similarProductsSelector = (state: State): CatalogItems => state.similarProducts;
export const reviewsSelector = (state: State): Reviews => state.reviews;
export const isLoadingSelector = (state: State): boolean => state.isDataLoading;
export const isReviewLoadingSelector = (state: State): boolean => state.isReviewLoading;
