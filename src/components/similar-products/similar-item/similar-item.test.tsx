import { render, screen } from '@testing-library/react';
import SimilarItem from './similar-item';
import { catalogItemMock, catalogItemsMock } from '../../../mocks';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { NameSpace } from '../../../const';

describe('Component: SimilarItem', () => {
  it('Should be rendered correctly', () => {
    const mockStore = configureMockStore();
    const store = mockStore({
      [NameSpace.Products]: {
        similarProducts: catalogItemsMock,
        basket: [],
      },
    });

    render(
      <MemoryRouter initialEntries={['/catalog']}>
        <Provider store={store}>
          <SimilarItem product={catalogItemMock} />
        </Provider>
      </MemoryRouter>
    );

    expect(screen.getByText(/Цена:/i)).toBeInTheDocument();
    expect(screen.getByText(/Рейтинг:/i)).toBeInTheDocument();
    expect(screen.getByText(/Всего оценок:/i)).toBeInTheDocument();
    expect(screen.getByText(/Купить/i)).toBeInTheDocument();
  });
});
