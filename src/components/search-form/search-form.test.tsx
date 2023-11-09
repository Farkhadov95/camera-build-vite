import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { describe } from 'vitest';
import { NameSpace } from '../../const';
import { catalogItemsMock } from '../../mocks';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import SearchForm from './search-form';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

describe('Component: SearchFrom', () => {
  it('Should render the component correctly', () => {
    const mockStore = configureMockStore();
    const store = mockStore({
      [NameSpace.Products]: {
        catalogItems: catalogItemsMock,
      },
    });

    render(
      <MemoryRouter initialEntries={['/catalog']}>
        <Provider store={store}>
          <SearchForm />
        </Provider>
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText('Поиск по сайту');
    const resetBtn = screen.getByRole('button', { name: 'Сбросить поиск' });
    expect(input).toBeInTheDocument();
    expect(resetBtn).toBeInTheDocument();
  });

  it('Should show available options on input', async () => {
    const mockStore = configureMockStore();
    const store = mockStore({
      [NameSpace.Products]: {
        catalog: catalogItemsMock,
      },
    });

    render(
      <MemoryRouter initialEntries={['/catalog']}>
        <Provider store={store}>
          <SearchForm />
        </Provider>
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText('Поиск по сайту');
    act(() => {
      fireEvent.click(input);
    });

    await userEvent.type(input, 'Mock');

    await waitFor(() => {
      const allResults = screen.getAllByText(/Retrocamera/i);
      allResults.forEach((item) => {
        expect(item).toBeInTheDocument();
      });
    });
  });
});
