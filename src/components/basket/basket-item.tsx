import { useAppDispatch } from '../../hooks';
import {
  removeBasketItem,
  setBasketItem,
} from '../../store/catalog-data/catalog-data';
import { CatalogItem } from '../../type/catalog';

type Props = {
  product: CatalogItem;
  quantity: number;
};

const BasketItem = ({ product, quantity }: Props) => {
  const dispatch = useAppDispatch();
  return (
    <li className="basket-item">
      <div className="basket-item__img">
        <picture>
          <source
            type="image/webp"
            srcSet={`${product.previewImgWebp}, ${product.previewImg2x} 2x`}
          />
          <img
            src={`${product.previewImg}`}
            srcSet={`${product.previewImg2x} 2x`}
            width="140"
            height="120"
            alt={product.name}
          />
        </picture>
      </div>
      <div className="basket-item__description">
        <p className="basket-item__title">{product.name}</p>
        <ul className="basket-item__list">
          <li className="basket-item__list-item">
            <span className="basket-item__article">Артикул:</span>{' '}
            <span className="basket-item__number">{product.vendorCode}</span>
          </li>
          <li className="basket-item__list-item">{product.type} фотокамера</li>
          <li className="basket-item__list-item">{product.level} уровень</li>
        </ul>
      </div>
      <p className="basket-item__price">
        <span className="visually-hidden">Цена:</span>
        {product.price} ₽
      </p>
      <div className="quantity">
        <button
          className="btn-icon btn-icon--prev"
          aria-label="уменьшить количество товара"
          onClick={() => dispatch(removeBasketItem(product))}
        >
          <svg width="7" height="12" aria-hidden="true">
            <use xlinkHref="#icon-arrow"></use>
          </svg>
        </button>
        <label className="visually-hidden" htmlFor="counter1"></label>
        <input
          type="number"
          id="counter1"
          value={quantity}
          min="1"
          max="99"
          aria-label="количество товара"
          onChange={() => console.log('')}
        />
        <button
          className="btn-icon btn-icon--next"
          aria-label="увеличить количество товара"
          onClick={() => dispatch(setBasketItem(product))}
        >
          <svg width="7" height="12" aria-hidden="true">
            <use xlinkHref="#icon-arrow"></use>
          </svg>
        </button>
      </div>
      <div className="basket-item__total-price">
        <span className="visually-hidden">Общая цена:</span>
        {product.price * quantity} ₽
      </div>
      <button className="cross-btn" type="button" aria-label="Удалить товар">
        <svg width="10" height="10" aria-hidden="true">
          <use xlinkHref="#icon-close"></use>
        </svg>
      </button>
    </li>
  );
};

export default BasketItem;
