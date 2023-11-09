import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { NameSpace } from '../../const';
import { basketItemMock, catalogItemsMock } from '../../mocks';
import Basket from './basket';

const middlewares = [thunk];

describe('Page: Catalog', () => {
  it('should render the page correctrly. No discount.', () => {
    const mockStore = configureMockStore();
    const store = mockStore({
      [NameSpace.Products]: {
        catalog: catalogItemsMock,
        similarProducts: catalogItemsMock,
        promos: [],
        productToAdd: catalogItemsMock[0],
        basket: basketItemMock,
      },
      [NameSpace.Order]: {
        couponDiscount: 0,
        isCouponValid: null,
      },
    });
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/catalog']}>
          <Basket />
        </MemoryRouter>
      </Provider>
    );

    const firstItem = screen.getByText(/Mock Retrocamera 1/i);

    const totalPrice = screen.getAllByText(/600/i);
    totalPrice.forEach((item) => {
      expect(item).toBeInTheDocument();
    });

    expect(totalPrice.length).toBe(3);
    expect(firstItem).toBeInTheDocument();
  });

  it('should display item in the basket with discount.', () => {
    const mockStore = configureMockStore();
    const store = mockStore({
      [NameSpace.Products]: {
        catalog: catalogItemsMock,
        similarProducts: catalogItemsMock,
        promos: [],
        productToAdd: catalogItemsMock[0],
        basket: basketItemMock,
      },
      [NameSpace.Order]: {
        couponDiscount: 15, //15%
        isCouponValid: true,
      },
    });
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/catalog']}>
          <Basket />
        </MemoryRouter>
      </Provider>
    );

    const firstItem = screen.getByText(/Mock Retrocamera 1/i);

    const totalPrice = screen.getAllByText(/600/i);
    const discountedValue = screen.getByText(/90/i);
    const totalPriceWithDiscount = screen.getByText(/510/i);
    const discountApplyBtn = screen.getByText(/Применить/i);

    totalPrice.forEach((item) => {
      expect(item).toBeInTheDocument();
    });
    expect(discountedValue).toBeInTheDocument();
    expect(totalPriceWithDiscount).toBeInTheDocument();
    expect(firstItem).toBeInTheDocument();
    expect(discountApplyBtn).toBeDisabled();
  });

  it('should render the page with empty basket correctly', () => {
    const mockStore = configureMockStore();
    const store = mockStore({
      [NameSpace.Products]: {
        catalog: catalogItemsMock,
        similarProducts: catalogItemsMock,
        promos: [],
        productToAdd: catalogItemsMock[0],
        basket: [],
      },
      [NameSpace.Order]: {
        couponDiscount: 0,
        isCouponValid: null,
      },
    });
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/catalog']}>
          <Basket />
        </MemoryRouter>
      </Provider>
    );

    const emptyBasketMsg = screen.getByText(/Корзина пуста/i);
    const orderBtn = screen.getByText(/Оформить заказ/i);

    expect(emptyBasketMsg).toBeInTheDocument();
    expect(orderBtn).toBeDisabled();
  });

  it('should display success message on success', () => {
    const mockStore = configureMockStore(middlewares);
    const store = mockStore({
      [NameSpace.Products]: {
        catalog: catalogItemsMock,
        similarProducts: catalogItemsMock,
        promos: [],
        productToAdd: catalogItemsMock[0],
        basket: basketItemMock,
      },
      [NameSpace.Order]: {
        couponDiscount: 0,
        isCouponValid: null,
        isOrderSending: false,
        isOrderSuccessful: true,
      },
    });
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/catalog']}>
          <Basket />
        </MemoryRouter>
      </Provider>
    );

    const successMessage = screen.getByText(/Спасибо за покупку/i);
    expect(successMessage).toBeInTheDocument();
  });

  it('should display success message on success', () => {
    const mockStore = configureMockStore(middlewares);
    const store = mockStore({
      [NameSpace.Products]: {
        catalog: catalogItemsMock,
        similarProducts: catalogItemsMock,
        promos: [],
        productToAdd: catalogItemsMock[0],
        basket: basketItemMock,
      },
      [NameSpace.Order]: {
        couponDiscount: 0,
        isCouponValid: null,
        isOrderSending: false,
        isOrderSuccessful: false,
        error: 'Ошибка',
      },
    });
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/catalog']}>
          <Basket />
        </MemoryRouter>
      </Provider>
    );

    const errorMessage = screen.getByText(/Ошибка/i);
    expect(errorMessage).toBeInTheDocument();
  });
});
