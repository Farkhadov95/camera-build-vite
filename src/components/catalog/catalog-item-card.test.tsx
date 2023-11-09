import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import CatalogItemCard from './catalog-item-card';
import { catalogItemMock } from '../../mocks';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { NameSpace } from '../../const';

const initialState = {
  [NameSpace.Products]: {
    basket: [],
  },
};

const mockStore = configureMockStore();
const store = mockStore(initialState);

describe('Component: Catalog-item-card', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/catalog']}>
          <CatalogItemCard product={catalogItemMock} />
        </MemoryRouter>
      </Provider>
    );

    const productTitle = screen.getByText(catalogItemMock.name);
    const productPrice = screen.getByText(`${catalogItemMock.price} ₽`);

    expect(productTitle).toBeInTheDocument();
    expect(productPrice).toBeInTheDocument();
  });
});
