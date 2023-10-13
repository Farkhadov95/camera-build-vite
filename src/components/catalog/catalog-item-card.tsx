import { CatalogItem } from '../../type/catalog';
import { Link } from 'react-router-dom';
import Stars from '../rating-stars/stars';
import { useAppDispatch } from '../../hooks';
import { setProductToAdd } from '../../store/catalog-data/catalog-data';

type Props = {
  product: CatalogItem;
};

const CatalogItemCard = ({ product }: Props) => {
  const dispatch = useAppDispatch();
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
        <button
          className="btn btn--purple product-card__btn"
          type="button"
          onClick={handleAddToBasket}
        >
          Купить
        </button>
        <Link className="btn btn--transparent" to={`/product/${id}`}>
          Подробнее
        </Link>
      </div>
    </div>
  );
};

export default CatalogItemCard;
