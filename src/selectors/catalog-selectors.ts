import { CatalogItems } from '../type/catalog-items';
import { State } from '../type/state';

export const catalogItemsSelector = (state: State): CatalogItems => state.catalog;
