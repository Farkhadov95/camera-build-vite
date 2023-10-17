import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { catalogItemsSelector } from '../../store/selectors/catalog-selectors';
import { CatalogItems } from '../../type/catalog';
import { useNavigate } from 'react-router-dom';

const SearchForm = () => {
  const navigate = useNavigate();
  const products = useSelector(catalogItemsSelector);
  const [isListOpen, setListOpen] = useState(false);
  const [foundProducts, setFoundProducts] = useState<CatalogItems>([]);
  const searchFormRef = useRef<HTMLFormElement>(null);

  const findProducts = (text: string): CatalogItems => {
    const foundItems = products.filter((product) =>
      product.name.includes(text)
    );
    setFoundProducts(foundItems);
    return foundItems;
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const enteredValue = e.target.value;
    const matchedProducts = findProducts(enteredValue);

    if (enteredValue.length >= 3 && matchedProducts.length !== 0) {
      setListOpen(true);
    } else {
      setListOpen(false);
    }
  };

  const resetForm = () => {
    setListOpen(false);
    setFoundProducts([]);
    searchFormRef.current?.reset();
  };

  return (
    <div className={`form-search ${isListOpen ? 'list-opened' : ''}`}>
      <form ref={searchFormRef}>
        <label>
          <svg
            className="form-search__icon"
            width="16"
            height="16"
            aria-hidden="true"
          >
            <use xlinkHref="#icon-lens"></use>
          </svg>
          <input
            className="form-search__input"
            type="text"
            autoComplete="off"
            placeholder="Поиск по сайту"
            name="form-search__input"
            onChange={handleSearch}
          />
        </label>
        <ul className="form-search__select-list">
          {foundProducts?.map((product) => (
            <li
              className="form-search__select-item"
              tabIndex={0}
              key={product.id}
              onClick={() => navigate(`/product/${product.id}`)}
            >
              {product.name}
            </li>
          ))}
        </ul>
      </form>
      <button className="form-search__reset" type="reset" onClick={resetForm}>
        <svg width="10" height="10" aria-hidden="true">
          <use xlinkHref="#icon-close"></use>
        </svg>
        <span className="visually-hidden">Сбросить поиск</span>
      </button>
    </div>
  );
};

export default SearchForm;
