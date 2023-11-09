import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { NameSpace } from '../../../const';
import { render, screen } from '@testing-library/react';
import { basketMocks, catalogItemsMock } from '../../../mocks';
import SimilarProducts from './similar-products';
import { MemoryRouter } from 'react-router-dom';

describe('Component: SimilarProducts', () => {
  it('should be rendered correctly', () => {
    const mockStore = configureMockStore();
    const store = mockStore({
      [NameSpace.Products]: {
        similarProducts: catalogItemsMock,
        basket: [],
      },
    });
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/catalog']}>
          <SimilarProducts />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Похожие товары')).toBeInTheDocument();
    expect(screen.getByLabelText('Предыдущий слайд')).toBeInTheDocument();
    expect(screen.getByLabelText('Следующий слайд')).toBeInTheDocument();
  });

  it('basket items should have have different button', () => {
    const mockStore = configureMockStore();
    const store = mockStore({
      [NameSpace.Products]: {
        catalog: catalogItemsMock,
        similarProducts: catalogItemsMock,
        basket: basketMocks,
      },
    });
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/catalog']}>
          <SimilarProducts />
        </MemoryRouter>
      </Provider>
    );

    const allBasketItems = screen.getAllByText(/В корзине/i);
    allBasketItems.forEach((item) => {
      expect(item).toBeInTheDocument();
    });
    expect(allBasketItems.length).toBe(5);
  });
});
