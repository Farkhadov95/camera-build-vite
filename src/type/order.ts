export type OrderData = {
    camerasIds: number[];
    coupon: Coupons | null;
    couponDiscount: number;
    isCouponLoading: boolean;
    isCouponValid: boolean | null;
    isOrderSending: boolean;
    isOrderSuccessful: boolean | null;
    error: string | null;
}

export enum Coupons {
  first = 'camera-333',
  second = 'camera-444',
  third = 'camera-555',
}

export type Order = {
    camerasIds: number[];
    coupon: Coupons | null;
}

