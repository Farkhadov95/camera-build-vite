import { useForm } from 'react-hook-form';
import BasketItem from '../../components/basket/basket-item';
import BasketRemoveModal from '../../components/basket/basket-remove';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  CouponSeletor,
  basketSelector,
  couponDiscountSelector,
  isCouponValidSelector,
  isOrderSuccessfulSelector,
  productToDeleteSelector,
} from '../../store/selectors/catalog-selectors';
import {
  activateCouponAction,
  sendOrderAction,
} from '../../store/order-data/order-data';
import { BasketItems } from '../../type/catalog';
import OrderSuccessMessage from '../../components/basket/basket-order-success';
import OrderFailMessage from '../../components/basket/basket-order-fail';
import { formatNumberWithSpace } from '../../utils';

const Basket = () => {
  const dispatch = useAppDispatch();
  const basketItems = useAppSelector(basketSelector);
  const productToDelete = useAppSelector(productToDeleteSelector);
  const isCouponValid = useAppSelector(isCouponValidSelector);
  const couponDiscount = useAppSelector(couponDiscountSelector);
  const couponAvailable = useAppSelector(CouponSeletor);
  const isOrderSuccessful = useAppSelector(isOrderSuccessfulSelector);

  type CouponForm = {
    promo: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CouponForm>();

  const onSubmit = (data: CouponForm) => {
    dispatch(activateCouponAction({ coupon: data.promo }));
  };

  const showMessage = () => {
    if (isCouponValid === null) {
      return '';
    } else if (isCouponValid) {
      return 'is-valid';
    } else {
      return 'is-invalid';
    }
  };

  const totalPrice = (items: BasketItems) =>
    items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const discountValue = (price: number, discount: number) =>
    (price / 100) * discount;

  const totalPriceWithDiscount = (originalPrice: number, discount: number) =>
    originalPrice - discountValue(originalPrice, discount);

  const getBasketItemIds = (items: BasketItems): number[] =>
    items.map((item) => item.product.id);

  const handleGetValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const noSpaces = e.target.value.replace(/\s+/g, '');
    e.target.value = noSpaces;
  };

  const handleOrderSubmit = () => {
    const camerasIds = getBasketItemIds(basketItems);
    const coupon = couponAvailable !== null ? couponAvailable : null;
    dispatch(sendOrderAction({ order: { camerasIds, coupon } }));
  };

  return (
    <>
      <Header />
      <main>
        <div className="page-content">
          <div className="breadcrumbs">
            <div className="container">
              <ul className="breadcrumbs__list">
                <li className="breadcrumbs__item">
                  <a className="breadcrumbs__link" href="index.html">
                    Главная
                    <svg width="5" height="8" aria-hidden="true">
                      <use xlinkHref="#icon-arrow-mini"></use>
                    </svg>
                  </a>
                </li>
                <li className="breadcrumbs__item">
                  <a className="breadcrumbs__link" href="catalog.html">
                    Каталог
                    <svg width="5" height="8" aria-hidden="true">
                      <use xlinkHref="#icon-arrow-mini"></use>
                    </svg>
                  </a>
                </li>
                <li className="breadcrumbs__item">
                  <span className="breadcrumbs__link breadcrumbs__link--active">
                    Корзина
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <section className="basket">
            <div className="container">
              <h1 className="title title--h2">Корзина</h1>
              <ul className="basket__list">
                {basketItems.length !== 0 ? (
                  basketItems.map((item) => (
                    <BasketItem
                      key={item.product.id}
                      product={item.product}
                      quantity={item.quantity}
                    />
                  ))
                ) : (
                  <p className="basket__empty">
                    Корзина пуста {errors.promo?.message}
                  </p>
                )}
              </ul>
              <div className="basket__summary">
                <div className="basket__promo">
                  <p className="title title--h4">
                    Если у вас есть промокод на скидку, примените его в этом
                    поле
                  </p>
                  <div className="basket-form">
                    <form
                      method="post"
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmit(onSubmit)();
                      }}
                    >
                      <div className={`custom-input ${showMessage()}`}>
                        <label>
                          <span className="custom-input__label">Промокод</span>
                          <input
                            type="text"
                            {...register('promo')}
                            placeholder="Введите промокод"
                            disabled={couponAvailable !== null}
                            onChange={handleGetValue}
                            onKeyDown={(evt) => {
                              if (evt.key === ' ') {
                                evt.preventDefault();
                              }
                            }}
                          />
                        </label>
                        <p className="custom-input__success">
                          Промокод принят!
                        </p>
                        <p className="custom-input__error">Промокод неверный</p>
                      </div>
                      <button
                        className="btn"
                        type="submit"
                        disabled={
                          couponAvailable !== null &&
                          errors.promo?.message !== ''
                        }
                      >
                        Применить
                      </button>
                    </form>
                  </div>
                </div>
                <div className="basket__summary-order">
                  <p className="basket__summary-item">
                    <span className="basket__summary-text">Всего:</span>
                    <span className="basket__summary-value">
                      {formatNumberWithSpace(totalPrice(basketItems))} ₽
                    </span>
                  </p>
                  <p className="basket__summary-item">
                    <span className="basket__summary-text">Скидка:</span>
                    <span
                      className={`basket__summary-value ${
                        isCouponValid ? 'basket__summary-value--bonus' : ''
                      }`}
                    >
                      {formatNumberWithSpace(
                        discountValue(totalPrice(basketItems), couponDiscount)
                      )}{' '}
                      ₽
                    </span>
                  </p>
                  <p className="basket__summary-item">
                    <span className="basket__summary-text basket__summary-text--total">
                      К оплате:
                    </span>
                    <span className="basket__summary-value basket__summary-value--total">
                      {formatNumberWithSpace(
                        totalPriceWithDiscount(
                          totalPrice(basketItems),
                          couponDiscount
                        )
                      )}{' '}
                      ₽
                    </span>
                  </p>
                  <button
                    className="btn btn--purple"
                    type="submit"
                    onClick={() => handleOrderSubmit()}
                    disabled={basketItems.length === 0}
                  >
                    Оформить заказ
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
        {productToDelete && <BasketRemoveModal />}
        {isOrderSuccessful && <OrderSuccessMessage />}
        {isOrderSuccessful === false && <OrderFailMessage />}
      </main>
      <Footer />
    </>
  );
};

export default Basket;
