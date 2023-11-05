import { CatalogItem } from '../../type/catalog';
import { Link } from 'react-router-dom';
import Stars from '../rating-stars/stars';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setProductToAdd } from '../../store/catalog-data/catalog-data';
import { basketSelector } from '../../store/selectors/catalog-selectors';
import { isInBasket } from '../../utils';

type Props = {
  product: CatalogItem;
};

const CatalogItemCard = ({ product }: Props) => {
  const dispatch = useAppDispatch();
  const basket = useAppSelector(basketSelector);
  const handleAddToBasket = () => dispatch(setProductToAdd(product));
  const {
    id,
    rating,
    reviewCount,
    price,
    name,
    previewImg,
    previewImg2x,
    previewImgWebp,
    previewImgWebp2x,
  } = product;

  return (
    <div className="product-card">
      <div className="product-card__img">
        <picture>
          <source
            type="image/webp"
            srcSet={`${previewImgWebp}, ${previewImgWebp2x}, 2x`}
          />
          <img
            src={previewImg}
            srcSet={`${previewImg2x} 2x`}
            width="280"
            height="240"
            alt={name}
          />
        </picture>
      </div>
      <div className="product-card__info">
        <div className="rate product-card__rate">
          <Stars rating={rating} />
          <p className="visually-hidden">Рейтинг: {rating}</p>

          <p className="rate__count">
            <span className="visually-hidden">Всего оценок:</span>
            {reviewCount}
          </p>
        </div>
        <div className="product-card--wrapper">
          <p className="product-card__title">{name}</p>
          <p className="product-card__price">
            <span className="visually-hidden">Цена: </span>
            {price} ₽
          </p>
        </div>
      </div>
      <div className="product-card__buttons">
        {isInBasket(basket, id) ? (
          <Link
            className="btn btn--purple-border product-card__btn product-card__btn--in-cart"
            to="/basket"
          >
            <svg width="16" height="16" aria-hidden="true">
              <use xlinkHref="#icon-basket"></use>
            </svg>
            В корзине
          </Link>
        ) : (
          <button
            className="btn btn--purple product-card__btn"
            type="button"
            onClick={handleAddToBasket}
          >
            Купить
          </button>
        )}

        <Link className="btn btn--transparent" to={`/product/${id}`}>
          Подробнее
        </Link>
      </div>
    </div>
  );
};

export default CatalogItemCard;
