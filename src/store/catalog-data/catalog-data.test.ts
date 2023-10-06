import { catalogItemMock } from '../../mocks';
import { catalogData, removeAddedToBasketMessage, removeBasketItem, setBasketItem } from './catalog-data';

describe('Reducer: CatalogData', () => {
  it('should return the initial state', () => {
    expect(catalogData.reducer(void 0, { type: 'unknown' })).toEqual({
      catalog: [],
      product: null,
      basket: [],
      similarProducts: [],
      promos: [],
      isDataLoading: false,
      isAddedToBasket: false,
    });
  });

  it('should add item to the basket', () => {
    const state = {
      catalog: [],
      product: null,
      basket: [],
      similarProducts: [],
      promos: [],
      isDataLoading: false,
      isAddedToBasket: false,
    };
    const action = setBasketItem(catalogItemMock);
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
      product: null,
      basket: [{
        product: catalogItemMock,
        quantity: 1,
      }],
      similarProducts: [],
      promos: [],
      isDataLoading: false,
      isAddedToBasket: false,
    };
    const action = removeBasketItem(catalogItemMock);
    const newState = catalogData.reducer(state, action);
    expect(newState).toEqual({
      ...state,
      basket: [],
    });
  });

  it('should remove Added-To-Basket Message', () => {
    const state = {
      catalog: [],
      product: null,
      basket: [],
      similarProducts: [],
      promos: [],
      isDataLoading: false,
      isAddedToBasket: true,
    };
    const action = removeAddedToBasketMessage();
    const newState = catalogData.reducer(state, action);
    expect(newState).toEqual({
      ...state,
      isAddedToBasket: false,
    });
  });
});
