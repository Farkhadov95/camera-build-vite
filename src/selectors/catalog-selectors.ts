import { CatalogItems, PromoItems } from '../type/catalog';
import { State } from '../type/state';

export const catalogItemsSelector = (state: State): CatalogItems => state.catalog;
export const promoItemsSelector = (state: State): PromoItems => state.promos;
