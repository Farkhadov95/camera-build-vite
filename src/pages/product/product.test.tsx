import { render, screen } from '@testing-library/react';
import Product from './product';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { NameSpace } from '../../const';
import { catalogItemsMock, reviewsMocks } from '../../mocks';
import thunk from 'redux-thunk';

describe('Page: Product', () => {
  it('Should render the page correctly', () => {
    const middlewares = [thunk]; // add your middlewares like `redux-thunk`
    const mockStore = configureMockStore(middlewares);

    const store = mockStore({
      [NameSpace.Products]: {
        catalog: catalogItemsMock,
        product: catalogItemsMock[0],
        similarProducts: catalogItemsMock,
        isDataLoading: false,
        promos: [],
        productToAdd: catalogItemsMock[0],
      },
      [NameSpace.Reviews]: {
        reviews: reviewsMocks,
      },
    });
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/product']}>
          <Product />
        </MemoryRouter>
      </Provider>
    );

    const allAddToBasketBtns = screen.getAllByText(/Добавить в корзину/i);
    allAddToBasketBtns.forEach((button) => {
      expect(button).toBeInTheDocument();
    });
    expect(screen.getByText(/Характеристики/i)).toBeInTheDocument();
    expect(screen.getByText(/Описание/i)).toBeInTheDocument();
  });
});
