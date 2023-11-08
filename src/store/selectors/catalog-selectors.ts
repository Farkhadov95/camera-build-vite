import { NameSpace } from '../../const';
import { BasketItems, CatalogItem, CatalogItems, PromoItems } from '../../type/catalog';
import { Coupons } from '../../type/order';
import { State } from '../../type/state';

export const catalogItemsSelector = (state: State): CatalogItems => state[NameSpace.Products].catalog;
export const visibleItemsSelector = (state: State): CatalogItems => state[NameSpace.Products].visibleCatalog;
export const promoItemsSelector = (state: State): PromoItems => state[NameSpace.Products].promos;
export const productSelector = (state: State): CatalogItem | null => state[NameSpace.Products].product;
export const similarProductsSelector = (state: State): CatalogItems => state[NameSpace.Products].similarProducts;
export const isLoadingSelector = (state: State): boolean => state[NameSpace.Products].isDataLoading;
export const isAddedToBasketSelector = (state: State): boolean => state[NameSpace.Products].isAddedToBasket;
export const basketSelector = (state: State): BasketItems => state[NameSpace.Products].basket;
export const productToAddSelector = (state: State): CatalogItem | null => state[NameSpace.Products].productToAdd;
export const productToDeleteSelector = (state: State): CatalogItem | null => state[NameSpace.Products].productToDelete;
export const errorSelector = (state: State): string | null => state[NameSpace.Products].error;

export const reviewsErrorSelector = (state: State): string | null => state[NameSpace.Reviews].reviewsError;

export const CouponSeletor = (state: State): Coupons | null => state[NameSpace.Order].coupon;
export const isCouponValidSelector = (state: State): boolean | null => state[NameSpace.Order].isCouponValid;
export const couponDiscountSelector = (state: State): number => state[NameSpace.Order].couponDiscount;
export const isOrderSuccessfulSelector = (state: State): boolean | null => state[NameSpace.Order].isOrderSuccessful;
export const orderErrorSelector = (state: State): string | null => state[NameSpace.Order].error;

