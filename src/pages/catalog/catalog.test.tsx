import { render, screen } from '@testing-library/react';
import Catalog from './catalog';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { NameSpace } from '../../const';
import { catalogItemsMock } from '../../mocks';

describe('Page: Catalog', () => {
  it('should render the page correctrly', () => {
    const mockStore = configureMockStore();
    const store = mockStore({
      [NameSpace.Products]: {
        catalog: catalogItemsMock,
        similarProducts: catalogItemsMock,
        promos: [],
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
});
