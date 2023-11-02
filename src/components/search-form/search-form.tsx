import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { catalogItemsSelector } from '../../store/selectors/catalog-selectors';
import { CatalogItem, CatalogItems } from '../../type/catalog';
import { useNavigate } from 'react-router-dom';

const SearchForm = () => {
  const navigate = useNavigate();
  const products = useSelector(catalogItemsSelector);
  const [isListOpen, setListOpen] = useState(false);
  const [isDropList, setDropList] = useState(false);
  const [foundProducts, setFoundProducts] = useState<CatalogItems>([]);
  const searchFormRef = useRef<HTMLFormElement>(null);

  const [focusedIndex, setFocusedIndex] = useState(-1);

  useEffect(() => {
    if (
      isDropList &&
      focusedIndex >= 0 &&
      focusedIndex < foundProducts.length
    ) {
      // Scroll the focused item into view
      document
        .querySelectorAll('.form-search__select-item')[focusedIndex].scrollIntoView({
          block: 'nearest',
        });
    }
  }, [focusedIndex, isDropList, foundProducts.length]);

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

    if (enteredValue.length > 0) {
      setListOpen(true);
    }

    if (enteredValue.length >= 3 && matchedProducts.length !== 0) {
      setDropList(true);
    } else {
      setDropList(false);
    }
  };

  // const handleKeyPress = (
  //   product: CatalogItem,
  //   event: React.KeyboardEvent<HTMLLIElement>
  // ) => {
  //   if (event.key === 'Enter') {
  //     navigate(`/product/${product.id}`);
  //   }
  // };

  const handleKeyPress = (
    product: CatalogItem,
    event: React.KeyboardEvent<HTMLLIElement>
  ) => {
    if (event.key === 'Enter') {
      navigate(`/product/${product.id}`);
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      setFocusedIndex((prevIndex) => (prevIndex + 1) % foundProducts.length);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setFocusedIndex((prevIndex) =>
        prevIndex <= 0 ? foundProducts.length - 1 : prevIndex - 1
      );
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
        {isDropList && (
          <ul className="form-search__select-list">
            {foundProducts?.map((product, index) => (
              <li
                className={`form-search__select-item${
                  index === focusedIndex ? ' focused' : ''
                }`}
                tabIndex={0}
                key={product.id}
                onClick={() => navigate(`/product/${product.id}`)}
                onKeyDown={(event) => handleKeyPress(product, event)}
                ref={(el) => {
                  if (index === focusedIndex && el) {
                    el.focus();
                  }
                }}
              >
                {product.name}
              </li>
            ))}
          </ul>
        )}
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
