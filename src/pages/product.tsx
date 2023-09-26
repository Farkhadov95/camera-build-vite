import Header from '../components/header/header';
import Footer from '../components/footer/footer';
import SimilarProducts from '../components/similar-products/similar-products';
import Reviews from '../components/product-reviews/product-reviews';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  fetchProductAction,
  fetchProductReviewsAction,
  fetchSimilarProductsAction,
} from '../store/reducers/catalog-data';
import { useAppDispatch } from '../hooks';
import { useSelector } from 'react-redux';
import NotFound from './not-found';
import {
  isPostReviewSuccessSelector,
  productSelector,
} from '../store/selectors/catalog-selectors';
import SpecsTab from '../components/product-tabs/specs-tab';
import DescriptionTab from '../components/product-tabs/description-tab';
import { Tabs } from '../const';
import Stars from '../components/rating-stars/stars';
import ReviewSuccess from '../components/product-reviews/review-success';

const Product = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const product = useSelector(productSelector);
  const successStatus = useSelector(isPostReviewSuccessSelector);
  const [activeTab, setActiveTab] = useState<Tabs>(Tabs.SPECS);

  useEffect(() => {
    async function fetchData() {
      dispatch(fetchProductAction({ id: Number(id) }));
      dispatch(fetchProductReviewsAction({ id: Number(id) }));
      await dispatch(fetchSimilarProductsAction({ id: Number(id) }));
    }
    fetchData();
  }, [id]);

  if (!product) {
    return <NotFound />;
  }

  const {
    name,
    vendorCode,
    type,
    category,
    description,
    level,
    price,
    rating,
    reviewCount,
    previewImg,
    previewImg2x,
    previewImgWebp,
    previewImgWebp2x,
  } = product;

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
                    {name}
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
                      srcSet={`/${previewImgWebp}, /${previewImgWebp2x}, 2x`}
                    />
                    <img
                      src={`/${previewImg}`}
                      srcSet={`/${previewImg2x} 2x`}
                      width="560"
                      height="480"
                      alt={name}
                    />
                  </picture>
                </div>
                <div className="product__content">
                  <h1 className="title title--h3">{name}</h1>
                  <div className="rate product__rate">
                    <Stars rating={rating} />
                    <p className="visually-hidden">Рейтинг: {rating}</p>
                    <p className="rate__count">
                      <span className="visually-hidden">Всего оценок:</span>
                      {reviewCount}
                    </p>
                  </div>
                  <p className="product__price">
                    <span className="visually-hidden">Цена:</span>
                    {price} ₽
                  </p>
                  <button className="btn btn--purple" type="button">
                    <svg width="24" height="16" aria-hidden="true">
                      <use xlinkHref="#icon-add-basket"></use>
                    </svg>
                    Добавить в корзину
                  </button>
                  <div className="tabs product__tabs">
                    <div className="tabs__controls product__tabs-controls">
                      <button
                        className={`tabs__control ${
                          activeTab === Tabs.SPECS ? 'is-active' : ''
                        }`}
                        type="button"
                        onClick={() => setActiveTab(Tabs.SPECS)}
                      >
                        Характеристики
                      </button>
                      <button
                        className={`tabs__control ${
                          activeTab === Tabs.DESCRIPTION ? 'is-active' : ''
                        }`}
                        type="button"
                        onClick={() => setActiveTab(Tabs.DESCRIPTION)}
                      >
                        Описание
                      </button>
                    </div>
                    <div className="tabs__content">
                      {activeTab === Tabs.SPECS ? (
                        <SpecsTab
                          vendorCode={vendorCode}
                          type={type}
                          category={category}
                          level={level}
                        />
                      ) : (
                        <DescriptionTab description={description} />
                      )}
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
        {successStatus && <ReviewSuccess />}
      </main>
      <Footer />
    </>
  );
};

export default Product;
