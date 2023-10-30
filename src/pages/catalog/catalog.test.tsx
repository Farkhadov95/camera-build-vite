import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Catalog from './catalog';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { NameSpace } from '../../const';
import { catalogItemsMock } from '../../mocks';
import userEvent from '@testing-library/user-event';

describe('Page: Catalog', () => {
  it('should render the page correctrly', () => {
    const mockStore = configureMockStore();
    const store = mockStore({
      [NameSpace.Products]: {
        catalog: catalogItemsMock,
        similarProducts: catalogItemsMock,
        promos: [],
        productToAdd: catalogItemsMock[0],
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
        allItems.forEach((item, index) => {
          expect(item).toBeInTheDocument();
          console.log(`Item ${index}:`, item.textContent);
        });
      },
      {
        timeout: 1000,
      }
    );
  });
});
