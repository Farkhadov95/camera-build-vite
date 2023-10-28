import { render, screen } from '@testing-library/react';
import NotFound from './not-found';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { NameSpace } from '../../const';
import { catalogItemsMock } from '../../mocks';

describe('Page: NotFound', () => {
  it('Render correctly', () => {
    const mockStore = configureMockStore();
    const store = mockStore({
      [NameSpace.Products]: {
        catalog: catalogItemsMock,
      },
    });
    render(
      <MemoryRouter initialEntries={['/catalog']}>
        <Provider store={store}>
          <NotFound />
        </Provider>
      </MemoryRouter>
    );

    expect(screen.getByText(/404. Page not found/i)).toBeInTheDocument();
  });
});
