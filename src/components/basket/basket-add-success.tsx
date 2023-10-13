import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { removeAddedToBasketMessage } from '../../store/catalog-data/catalog-data';
import { useCallback, useEffect } from 'react';

const BasketAddSuccess = () => {
  const dispatch = useAppDispatch();

  const handleClose = useCallback(() => {
    dispatch(removeAddedToBasketMessage());
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

  return (
    <div className="modal is-active modal--narrow">
      <div className="modal__wrapper">
        <div className="modal__overlay" onClick={handleClose}></div>
        <div className="modal__content" onClick={(e) => e.stopPropagation()}>
          <p className="title title--h4">Товар успешно добавлен в корзину</p>
          <svg
            className="modal__icon"
            width="86"
            height="80"
            aria-hidden="true"
          >
            <use xlinkHref="#icon-success"></use>
          </svg>
          <div className="modal__buttons">
            <button
              className="btn btn--transparent modal__btn"
              onClick={() => handleClose()}
            >
              Продолжить покупки
            </button>
            <Link
              className="btn btn--purple modal__btn modal__btn--fit-width"
              to="/basket"
              onClick={() => handleClose()}
            >
              Перейти в корзину
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
  );
};

export default BasketAddSuccess;
