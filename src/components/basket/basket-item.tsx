import { useEffect, useRef, useState } from 'react';
import { useAppDispatch } from '../../hooks';
import {
  decreaseBasketItem,
  setBasketItem,
  setBasketMultipleItems,
  setProductToDelete,
} from '../../store/catalog-data/catalog-data';
import { CatalogItem } from '../../type/catalog';
import { MAX_BASKET_COUNT, MIN_BASKET_COUNT } from '../../const';
import { formatNumberWithSpace } from '../../utils';

type Props = {
  product: CatalogItem;
  quantity: number;
};

const BasketItem = ({ product, quantity }: Props) => {
  const dispatch = useAppDispatch();
  const [itemQuantity, setItemQuantity] = useState<number | ''>(1);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleBasketChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const enteredValue = e.target.value;

    if (enteredValue === '') {
      setItemQuantity('');
    } else {
      const value = parseInt(enteredValue, 10);
      if (!isNaN(value)) {
        setItemQuantity(value);
      }
    }
  };

  const handleBasketBlur = (id: number) => {
    let validatedQuantity =
      typeof itemQuantity === 'number' ? itemQuantity : MIN_BASKET_COUNT;

    if (isNaN(validatedQuantity) || validatedQuantity < MIN_BASKET_COUNT) {
      validatedQuantity = MIN_BASKET_COUNT;
    } else if (validatedQuantity > MAX_BASKET_COUNT) {
      validatedQuantity = MAX_BASKET_COUNT;
    }

    setItemQuantity(validatedQuantity);
    dispatch(setBasketMultipleItems({ id, quantity: validatedQuantity }));
  };

  const handleBasketKeyDown = (e: React.KeyboardEvent, id: number) => {
    if (e.key === 'Enter') {
      handleBasketBlur(id);
      if (inputRef.current) {
        inputRef.current.blur();
      }
    }
  };

  const handleBasketDecrease = () => {
    if (itemQuantity !== '') {
      if (itemQuantity > MIN_BASKET_COUNT) {
        dispatch(decreaseBasketItem(product));
        setItemQuantity(itemQuantity - 1);
      }
    }
  };

  const handleBasketIncrease = () => {
    if (itemQuantity !== '') {
      if (itemQuantity < MAX_BASKET_COUNT) {
        dispatch(setBasketItem(product.id));
        setItemQuantity(itemQuantity + 1);
      }
    }
  };

  useEffect(() => {
    setItemQuantity(quantity);
  }, [quantity]);

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
        {formatNumberWithSpace(product.price)} ₽
      </p>
      <div className="quantity">
        <button
          className="btn-icon btn-icon--prev"
          aria-label="уменьшить количество товара"
          onClick={handleBasketDecrease}
        >
          <svg width="7" height="12" aria-hidden="true">
            <use xlinkHref="#icon-arrow"></use>
          </svg>
        </button>
        <label
          className="visually-hidden"
          htmlFor={`counter ${product.id + 1}`}
        />
        <input
          ref={inputRef}
          type="number"
          id={`counter ${product.id + 1}`}
          value={itemQuantity}
          min="1"
          max="99"
          maxLength={2}
          aria-label="количество товара"
          onChange={(e) => handleBasketChange(e)}
          onBlur={() => handleBasketBlur(product.id)}
          onKeyDown={(e) => handleBasketKeyDown(e, product.id)}
        />
        <button
          className="btn-icon btn-icon--next"
          aria-label="увеличить количество товара"
          onClick={handleBasketIncrease}
        >
          <svg width="7" height="12" aria-hidden="true">
            <use xlinkHref="#icon-arrow"></use>
          </svg>
        </button>
      </div>
      <div className="basket-item__total-price">
        <span className="visually-hidden">Общая цена:</span>
        {formatNumberWithSpace(product.price * quantity)} ₽
      </div>
      <button
        className="cross-btn"
        type="button"
        aria-label="Удалить товар"
        onClick={() => dispatch(setProductToDelete(product))}
      >
        <svg width="10" height="10" aria-hidden="true">
          <use xlinkHref="#icon-close"></use>
        </svg>
      </button>
    </li>
  );
};

export default BasketItem;
