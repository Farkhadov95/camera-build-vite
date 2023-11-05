import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { productToDeleteSelector } from '../../store/selectors/catalog-selectors';
import {
  clearRemoveBasketItemMessage,
  removeBasketItem,
} from '../../store/catalog-data/catalog-data';
import { Link } from 'react-router-dom';
import FocusTrap from 'focus-trap-react';

const BasketRemoveModal = () => {
  const dispatch = useAppDispatch();
  const product = useAppSelector(productToDeleteSelector);

  const handleClose = useCallback(() => {
    dispatch(clearRemoveBasketItemMessage());
  }, [dispatch]);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [dispatch, handleClose]);

  useEffect(() => {
    if (product !== null) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [product]);

  if (product === null) {
    return null;
  }

  const {
    name,
    vendorCode,
    type,
    level,
    previewImgWebp,
    previewImgWebp2x,
    previewImg,
    previewImg2x,
  } = product;

  return (
    <FocusTrap
      focusTrapOptions={{
        initialFocus: '#deleteBtn',
        tabbableOptions: {
          displayCheck: 'none',
        },
      }}
    >
      <div className="modal is-active">
        <div className="modal__wrapper">
          <div className="modal__overlay" onClick={handleClose}></div>
          <div className="modal__content" onClick={(e) => e.stopPropagation()}>
            <p className="title title--h4">Удалить этот товар?</p>
            <div className="basket-item basket-item--short">
              <div className="basket-item__img">
                <picture>
                  <source
                    type="image/webp"
                    srcSet={`/${previewImgWebp}, /${previewImgWebp2x}, 2x`}
                  />
                  <img
                    src={`/${previewImg}`}
                    srcSet={`/${previewImg2x} 2x`}
                    width="140"
                    height="120"
                    alt={name}
                  />
                </picture>
              </div>
              <div className="basket-item__description">
                <p className="basket-item__title">{name}</p>
                <ul className="basket-item__list">
                  <li className="basket-item__list-item">
                    <span className="basket-item__article">Артикул:</span>{' '}
                    <span className="basket-item__number">{vendorCode}</span>
                  </li>
                  <li className="basket-item__list-item">{type} фотокамера</li>
                  <li className="basket-item__list-item">{level} уровень</li>
                </ul>
              </div>
            </div>
            <div className="modal__buttons">
              <button
                id="deleteBtn"
                className="btn btn--purple modal__btn modal__btn--half-width"
                type="button"
                onClick={() => dispatch(removeBasketItem(product.id))}
              >
                Удалить
              </button>
              <Link
                className="btn btn--transparent modal__btn modal__btn--half-width"
                to="/"
              >
                Продолжить покупки
              </Link>
            </div>
            <button
              className="cross-btn"
              type="button"
              aria-label="Закрыть попап"
              onClick={() => handleClose()}
            >
              <svg width="10" height="10" aria-hidden="true">
                <use xlinkHref="#icon-close"></use>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </FocusTrap>
  );
};

export default BasketRemoveModal;
