import BasketItem from '../components/basket/basket-item';
import BasketRemoveModal from '../components/basket/basket-remove';
import Footer from '../components/footer/footer';
import Header from '../components/header/header';
import { useAppSelector } from '../hooks';
import {
  basketSelector,
  productToDeleteSelector,
} from '../store/selectors/catalog-selectors';

const Basket = () => {
  const basketItems = useAppSelector(basketSelector);
  const productToDelete = useAppSelector(productToDeleteSelector);

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
                  <p className="basket__empty">Корзина пуста</p>
                )}
              </ul>
              <div className="basket__summary">
                <div className="basket__promo">
                  <p className="title title--h4">
                    Если у вас есть промокод на скидку, примените его в этом
                    поле
                  </p>
                  <div className="basket-form">
                    <form action="#">
                      <div className="custom-input">
                        <label>
                          <span className="custom-input__label">Промокод</span>
                          <input
                            type="text"
                            name="promo"
                            placeholder="Введите промокод"
                          />
                        </label>
                        <p className="custom-input__error">Промокод неверный</p>
                        <p className="custom-input__success">
                          Промокод принят!
                        </p>
                      </div>
                      <button className="btn" type="submit">
                        Применить
                      </button>
                    </form>
                  </div>
                </div>
                <div className="basket__summary-order">
                  <p className="basket__summary-item">
                    <span className="basket__summary-text">Всего:</span>
                    <span className="basket__summary-value">
                      {basketItems.reduce(
                        (acc, item) => acc + item.product.price * item.quantity,
                        0
                      )}{' '}
                      ₽
                    </span>
                  </p>
                  <p className="basket__summary-item">
                    <span className="basket__summary-text">Скидка:</span>
                    <span className="basket__summary-value basket__summary-value--bonus">
                      0 ₽
                    </span>
                  </p>
                  <p className="basket__summary-item">
                    <span className="basket__summary-text basket__summary-text--total">
                      К оплате:
                    </span>
                    <span className="basket__summary-value basket__summary-value--total">
                      {basketItems.reduce(
                        (acc, item) => acc + item.product.price * item.quantity,
                        0
                      )}{' '}
                      ₽
                    </span>
                  </p>
                  <button className="btn btn--purple" type="submit">
                    Оформить заказ
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
        {productToDelete && <BasketRemoveModal />}
      </main>
      <Footer />
    </>
  );
};

export default Basket;
