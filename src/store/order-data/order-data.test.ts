import { orderData, removeError, removeSuccessMessage } from './order-data';

describe('Reducer: Order-data', () => {
  it('Should remove success message', () => {
    const state = {
      camerasIds: [],
      coupon: null,
      couponDiscount: 0,
      isCouponLoading: false,
      isCouponValid: null,
      isOrderSending: false,
      isOrderSuccessful: true,
      error: null,
    };

    const action = removeSuccessMessage();
    const newState = orderData.reducer(state, action);
    expect(newState).toEqual({
      ...state,
      isOrderSuccessful: null,
    });
  });
  it('Should remove error message', () => {
    const state = {
      camerasIds: [],
      coupon: null,
      couponDiscount: 0,
      isCouponLoading: false,
      isCouponValid: null,
      isOrderSending: false,
      isOrderSuccessful: true,
      error: 'Error',
    };

    const action = removeError();
    const newState = orderData.reducer(state, action);
    expect(newState).toEqual({
      ...state,
      error: null,
    });
  });
});
