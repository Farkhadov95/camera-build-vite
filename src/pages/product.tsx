import Header from '../components/header/header';
import Footer from '../components/footer/footer';
import SimilarProducts from '../components/product/product-similar';
import Reviews from '../components/product/product-reviews';

const Product = () => (
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
                  Ретрокамера Das Auge IV
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className="page-content__section">
          <section className="product">
            <div className="container">
              <div className="product__img">
                <picture>
                  <source
                    type="image/webp"
                    srcSet="img/content/das-auge.webp, img/content/das-auge@2x.webp 2x"
                  />
                  <img
                    src="img/content/das-auge.jpg"
                    srcSet="img/content/das-auge@2x.jpg 2x"
                    width="560"
                    height="480"
                    alt="Ретрокамера Das Auge IV"
                  />
                </picture>
              </div>
              <div className="product__content">
                <h1 className="title title--h3">Ретрокамера Das Auge IV</h1>
                <div className="rate product__rate">
                  <svg width="17" height="16" aria-hidden="true">
                    <use xlinkHref="#icon-full-star"></use>
                  </svg>
                  <svg width="17" height="16" aria-hidden="true">
                    <use xlinkHref="#icon-full-star"></use>
                  </svg>
                  <svg width="17" height="16" aria-hidden="true">
                    <use xlinkHref="#icon-full-star"></use>
                  </svg>
                  <svg width="17" height="16" aria-hidden="true">
                    <use xlinkHref="#icon-full-star"></use>
                  </svg>
                  <svg width="17" height="16" aria-hidden="true">
                    <use xlinkHref="#icon-star"></use>
                  </svg>
                  <p className="visually-hidden">Рейтинг: 4</p>
                  <p className="rate__count">
                    <span className="visually-hidden">Всего оценок:</span>12
                  </p>
                </div>
                <p className="product__price">
                  <span className="visually-hidden">Цена:</span>73 450 ₽
                </p>
                <button className="btn btn--purple" type="button">
                  <svg width="24" height="16" aria-hidden="true">
                    <use xlinkHref="#icon-add-basket"></use>
                  </svg>
                  Добавить в корзину
                </button>
                <div className="tabs product__tabs">
                  <div className="tabs__controls product__tabs-controls">
                    <button className="tabs__control" type="button">
                      Характеристики
                    </button>
                    <button className="tabs__control is-active" type="button">
                      Описание
                    </button>
                  </div>
                  <div className="tabs__content">
                    <div className="tabs__element">
                      <ul className="product__tabs-list">
                        <li className="item-list">
                          <span className="item-list__title">Артикул:</span>
                          <p className="item-list__text"> DA4IU67AD5</p>
                        </li>
                        <li className="item-list">
                          <span className="item-list__title">Категория:</span>
                          <p className="item-list__text">Видеокамера</p>
                        </li>
                        <li className="item-list">
                          <span className="item-list__title">Тип камеры:</span>
                          <p className="item-list__text">Коллекционная</p>
                        </li>
                        <li className="item-list">
                          <span className="item-list__title">Уровень:</span>
                          <p className="item-list__text">Любительский</p>
                        </li>
                      </ul>
                    </div>
                    <div className="tabs__element is-active">
                      <div className="product__tabs-text">
                        <p>
                          Немецкий концерн BRW разработал видеокамеру Das Auge
                          IV в&nbsp;начале 80-х годов, однако она до&nbsp;сих
                          пор пользуется популярностью среди коллекционеров
                          и&nbsp;яростных почитателей старинной техники.
                        </p>
                        <p>
                          Вы&nbsp;тоже можете прикоснуться к&nbsp;волшебству
                          аналоговой съёмки, заказав этот чудо-аппарат. Кто
                          знает, может с&nbsp;Das Auge IV&nbsp;начнётся ваш путь
                          к&nbsp;наградам всех престижных кинофестивалей.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <div className="page-content__section">
          <SimilarProducts />
        </div>
        <div className="page-content__section">
          <Reviews />
        </div>
      </div>
    </main>
    <Footer />
  </>
);

export default Product;
