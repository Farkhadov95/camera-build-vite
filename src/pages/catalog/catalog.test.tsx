import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Catalog from './catalog';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { NameSpace } from '../../const';
import { basketMocks, catalogItemsMock } from '../../mocks';

describe('Page: Catalog', () => {
  it('should render the page correctrly', () => {
    const mockStore = configureMockStore();
    const store = mockStore({
      [NameSpace.Products]: {
        catalog: catalogItemsMock,
        similarProducts: catalogItemsMock,
        promos: [],
        productToAdd: catalogItemsMock[0],
        basket: [],
      },
    });
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/catalog']}>
          <Catalog />
        </MemoryRouter>
      </Provider>
    );

    expect(
      screen.getByText(/Каталог фото- и видеотехники/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Сортировать:/i)).toBeInTheDocument();
  });

  it('Should display the lowest priced items first on sort by price', async () => {
    const mockStore = configureMockStore();
    const store = mockStore({
      [NameSpace.Products]: {
        catalog: catalogItemsMock,
        similarProducts: catalogItemsMock,
        promos: [],
        productToAdd: catalogItemsMock[0],
        basket: [],
      },
    });
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/catalog']}>
          <Catalog />
        </MemoryRouter>
      </Provider>
    );

    const sortByPriceButton = screen.getByLabelText(/по цене/i);
    const sortAscendingButton = screen.getByLabelText(/По возрастанию/i);

    expect(sortByPriceButton).toBeInTheDocument();
    expect(sortAscendingButton).toBeInTheDocument();

    fireEvent.change(sortByPriceButton);

    await waitFor(
      () => {
        const allItems = screen.getAllByText(/₽/i);
        allItems.forEach((item) => {
          expect(item).toBeInTheDocument();
        });
      },
      {
        timeout: 1000,
      }
    );
  });

  it('items in the basket should have different button', () => {
    const mockStore = configureMockStore();
    const store = mockStore({
      [NameSpace.Products]: {
        catalog: catalogItemsMock,
        similarProducts: catalogItemsMock,
        promos: [],
        productToAdd: catalogItemsMock[0],
        basket: basketMocks,
      },
    });
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/catalog']}>
          <Catalog />
        </MemoryRouter>
      </Provider>
    );

    const allBasketItems = screen.getAllByText(/В корзине/i);
    allBasketItems.forEach((item) => {
      expect(item).toBeInTheDocument();
    });
  });
});
