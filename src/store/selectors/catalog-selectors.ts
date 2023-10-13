import { NameSpace } from '../../const';
import { BasketItems, CatalogItem, CatalogItems, PromoItems } from '../../type/catalog';
import { State } from '../../type/state';

export const catalogItemsSelector = (state: State): CatalogItems => state[NameSpace.Products].catalog;
export const promoItemsSelector = (state: State): PromoItems => state[NameSpace.Products].promos;
export const productSelector = (state: State): CatalogItem | null => state[NameSpace.Products].product;
export const similarProductsSelector = (state: State): CatalogItems => state[NameSpace.Products].similarProducts;
export const isLoadingSelector = (state: State): boolean => state[NameSpace.Products].isDataLoading;
export const isAddedToBasketSelector = (state: State): boolean => state[NameSpace.Products].isAddedToBasket;
export const basketSelector = (state: State): BasketItems => state[NameSpace.Products].basket;
export const productToAddSelector = (state: State): CatalogItem | null => state[NameSpace.Products].productToAdd;
