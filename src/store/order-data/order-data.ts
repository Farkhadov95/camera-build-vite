import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../../type/state';
import { AxiosInstance } from 'axios';
import { ErrorMessages, NameSpace } from '../../const';
import { Coupons, Order, OrderData } from '../../type/order';

const persistedCoupon = localStorage.getItem('coupon');

const initialState: OrderData = {
  camerasIds: [],
  coupon: persistedCoupon ? JSON.parse(persistedCoupon) as Coupons : null,
  couponDiscount: 0,
  isCouponLoading: false,
  isCouponValid: null,
  isOrderSending: false,
  isOrderSuccessful: null,
  error: null,
};

export const activateCouponAction = createAsyncThunk<
  number,
  { coupon: string },
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/activateCoupon', async ({ coupon }, { extra: api }) => {
  const { data } = await api.post<number>('/coupons', { coupon });
  return data;
});

export const sendOrderAction = createAsyncThunk<
  string,
  { order: Order },
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/sendOrder', async ({order}, {extra: api }) => {
  const { data } = await api.post<string>('/ord1ers', order);
  return data;
});

export const orderData = createSlice({
  name: NameSpace.Order,
  initialState,
  reducers: {
    removeSuccessMessage: (state) => {
      state.isOrderSuccessful = null;
    },
    removeError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(activateCouponAction.pending, (state) => {
        state.isCouponLoading = true;
        state.isCouponValid = null;
      })
      .addCase(activateCouponAction.fulfilled, (state, action) => {
        state.couponDiscount = action.payload;
        state.isCouponLoading = false;
        state.isCouponValid = true;
        state.coupon = action.meta.arg.coupon as Coupons;

        localStorage.setItem('coupon', JSON.stringify(state.coupon));
      })
      .addCase(activateCouponAction.rejected, (state) => {
        state.isCouponLoading = false;
        state.isCouponValid = false;
      })
      .addCase(sendOrderAction.pending, (state) => {
        state.isOrderSending = true;
        state.isOrderSuccessful = null;
      })
      .addCase(sendOrderAction.fulfilled, (state) => {
        state.isOrderSending = false;
        state.isOrderSuccessful = true;

        state.coupon = null;
        state.isCouponValid = null;
        localStorage.removeItem('coupon');
      })
      .addCase(sendOrderAction.rejected, (state) => {
        state.isOrderSending = false;
        state.isOrderSuccessful = false;
        state.error = ErrorMessages.ORDER_SEND as string;
      });
  }
});


export const {removeSuccessMessage, removeError} = orderData.actions;
