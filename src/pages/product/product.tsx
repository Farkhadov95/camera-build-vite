import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import SimilarProducts from '../../components/similar-products/similar-products/similar-products';
import Reviews from '../../components/product-reviews/product-reviews/product-reviews';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  fetchProductAction,
  fetchSimilarProductsAction,
  setBasketItem,
} from '../../store/catalog-data/catalog-data';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useSelector } from 'react-redux';
import {
  isAddedToBasketSelector,
  isLoadingSelector,
  productSelector,
} from '../../store/selectors/catalog-selectors';
import SpecsTab from '../../components/product-tabs/specs-tab';
import DescriptionTab from '../../components/product-tabs/description-tab';
import { Tabs } from '../../const';
import Stars from '../../components/rating-stars/stars';
import ReviewSuccess from '../../components/product-reviews/product-success/review-success';
import { fetchReviewsAction } from '../../store/review-data/review-data';
import { isPostReviewSuccess } from '../../store/selectors/reviews-selectors';
import BasketAddModal from '../../components/basket/basket-add-modal';

const Product = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const product = useSelector(productSelector);
  const successStatus = useSelector(isPostReviewSuccess);
  const isLoading = useSelector(isLoadingSelector);
  const isAddedToBasket = useAppSelector(isAddedToBasketSelector);
  const [activeTab, setActiveTab] = useState<Tabs>(Tabs.SPECS);

  const updateTabInURL = (tab: Tabs) => {
    const currentParams = new URLSearchParams(location.search);
    currentParams.set('tab', tab);
    navigate(`${location.pathname}?${currentParams.toString()}`);
  };

  const getTabFromURL = () => {
    const query = new URLSearchParams(location.search);
    const tabFromUrl = query.get('tab');

    if (!tabFromUrl) {
      return Tabs.DESCRIPTION;
    }
    return tabFromUrl;
  };

  const handleTabChange = (tab: Tabs) => {
    updateTabInURL(tab);
    setActiveTab(tab);
  };

  useEffect(() => {
    async function fetchData() {
      dispatch(fetchProductAction({ id: Number(id) }));
      dispatch(fetchReviewsAction({ id: Number(id) }));
      await dispatch(fetchSimilarProductsAction({ id: Number(id) }));
    }
    fetchData();
  }, [id]);

  useEffect(() => {
    setActiveTab(getTabFromURL() as Tabs);
  }, [id]);

  if (isLoading || !product) {
    return <div>loading...</div>;
  }

  const handleAddToBasket = () => dispatch(setBasketItem(product));

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
                  <Link className="breadcrumbs__link" to="/">
                    Главная
                    <svg width="5" height="8" aria-hidden="true">
                      <use xlinkHref="#icon-arrow-mini"></use>
                    </svg>
                  </Link>
                </li>
                <li className="breadcrumbs__item">
                  <Link className="breadcrumbs__link" to="/">
                    Каталог
                    <svg width="5" height="8" aria-hidden="true">
                      <use xlinkHref="#icon-arrow-mini"></use>
                    </svg>
                  </Link>
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
                  <button
                    className="btn btn--purple"
                    type="button"
                    onClick={handleAddToBasket}
                  >
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
                        onClick={() => handleTabChange(Tabs.SPECS)}
                      >
                        Характеристики
                      </button>
                      <button
                        className={`tabs__control ${
                          activeTab === Tabs.DESCRIPTION ? 'is-active' : ''
                        }`}
                        type="button"
                        onClick={() => handleTabChange(Tabs.DESCRIPTION)}
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
        {isAddedToBasket && <BasketAddModal />}
      </main>
      <Footer />
    </>
  );
};

export default Product;
