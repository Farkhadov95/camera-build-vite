import { similarProductsSelector } from '../../selectors/catalog-selectors';
import { useAppSelector } from '../../type';
import SimilarItem from './similar-item';

const SimilarProducts = () => {
  const similarItems = useAppSelector(similarProductsSelector);

  return (
    <section className="product-similar">
      <div className="container">
        <h2 className="title title--h3">Похожие товары</h2>
        <div className="product-similar__slider">
          <div className="product-similar__slider-list">
            {similarItems.slice(0, 3).map((item) => (
              <SimilarItem key={item.id} item={item} />
            ))}
          </div>
          <button
            className="slider-controls slider-controls--prev"
            type="button"
            aria-label="Предыдущий слайд"
            disabled
          >
            <svg width="7" height="12" aria-hidden="true">
              <use xlinkHref="#icon-arrow"></use>
            </svg>
          </button>
          <button
            className="slider-controls slider-controls--next"
            type="button"
            aria-label="Следующий слайд"
          >
            <svg width="7" height="12" aria-hidden="true">
              <use xlinkHref="#icon-arrow"></use>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default SimilarProducts;
