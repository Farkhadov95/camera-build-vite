import { catalogItemMock } from '../../mocks';
import { catalogData, removeAddedToBasketMessage,decreaseBasketItem, setBasketItem } from './catalog-data';

describe('Reducer: CatalogData', () => {
  it('should return the initial state', () => {
    expect(catalogData.reducer(void 0, { type: 'unknown' })).toEqual({
      catalog: [],
      visibleCatalog: [],
      product: null,
      basket: [],
      similarProducts: [],
      promos: [],
      isDataLoading: false,
      isAddedToBasket: false,
      productToAdd: null,
      productToDelete: null,
      error: null,
    });
  });

  it('should add item to the basket', () => {
    const state = {
      catalog: [],
      visibleCatalog: [],
      product: null,
      basket: [],
      similarProducts: [],
      promos: [],
      isDataLoading: false,
      isAddedToBasket: false,
      productToAdd: null,
      productToDelete: null,
      error: null,
    };
    const action = setBasketItem(catalogItemMock.id);
    const newState = catalogData.reducer(state, action);
    expect(newState).toEqual({
      ...state,
      basket: [{
        product: catalogItemMock,
        quantity: 1,
      }],
      isAddedToBasket: true,
    });
  });

  it('should remove item from the basket', () => {
    const state = {
      catalog: [],
      visibleCatalog: [],
      product: null,
      basket: [{
        product: catalogItemMock,
        quantity: 1,
      }],
      similarProducts: [],
      promos: [],
      isDataLoading: false,
      isAddedToBasket: false,
      productToAdd: null,
      productToDelete: null,
      error: null,
    };
    const action = decreaseBasketItem(catalogItemMock);
    const newState = catalogData.reducer(state, action);
    expect(newState).toEqual({
      ...state,
      basket: [],
    });
  });

  it('should remove Added-To-Basket Message', () => {
    const state = {
      catalog: [],
      visibleCatalog: [],
      product: null,
      basket: [],
      similarProducts: [],
      promos: [],
      isDataLoading: false,
      isAddedToBasket: true,
      productToAdd: null,
      productToDelete: null,
      error: null,
    };
    const action = removeAddedToBasketMessage();
    const newState = catalogData.reducer(state, action);
    expect(newState).toEqual({
      ...state,
      isAddedToBasket: false,
    });
  });
});
