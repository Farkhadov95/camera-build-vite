import { useAppSelector } from '../hooks';
import { catalogItemsSelector } from '../store/selectors/catalog-selectors';
import CatalogItemCard from '../components/catalog/catalog-item-card';
import Header from '../components/header/header';
import Footer from '../components/footer/footer';
import Banner from '../components/promo-banner/banner';
import { useEffect, useState } from 'react';
import PaginationItem from '../components/pagination/pagination';
import { Category, Level, Type } from '../type/catalog';
import FilterItem from '../components/catalog/filter-item';

const Catalog = () => {
  const initialFilters = {
    price: '',
    priceUp: '',
    photocamera: false,
    videocamera: false,
    digital: false,
    film: false,
    snapshot: false,
    collection: false,
    zero: false,
    nonProfessional: false,
    professional: false,
  };

  const catalogItems = useAppSelector(catalogItemsSelector);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState(initialFilters);
  const perPage = 9;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, value, checked } = e.target;
    setFilters((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleResetFilters = () => {
    setFilters(initialFilters);
    setCurrentPage(1);
  };

  const filteredItems = catalogItems.filter(
    (item) =>
      // Price filters
      (filters.price === '' || item.price >= Number(filters.price)) &&
      (filters.priceUp === '' || item.price <= Number(filters.priceUp)) &&
      // Category filters
      ((filters.photocamera && item.category === Category.photocamera) ||
        (filters.videocamera && item.category === Category.videocamera) ||
        (!filters.photocamera && !filters.videocamera)) &&
      // Type filters
      ((filters.digital && item.type === Type.digital) ||
        (filters.film && item.type === Type.film) ||
        (filters.snapshot && item.type === Type.snapshot) ||
        (filters.collection && item.type === Type.collection) ||
        (!filters.digital &&
          !filters.film &&
          !filters.snapshot &&
          !filters.collection)) &&
      // Level filters
      ((filters.zero && item.level === Level.zero) ||
        (filters.nonProfessional && item.level === Level.nonProfessional) ||
        (filters.professional && item.level === Level.professional) ||
        (!filters.zero && !filters.nonProfessional && !filters.professional))
  );

  const totalPages = Math.ceil(filteredItems.length / perPage);
  // const sortedItems = filteredItems;
  const displayedItems = filteredItems.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  return (
    <>
      <Header />
      <main>
        <Banner />
        <div className="page-content">
          <div className="breadcrumbs">
            <div className="container">
              <ul className="breadcrumbs__list">
                <li className="breadcrumbs__item">
                  <a className="breadcrumbs__link" href="index.html">
                    Главная
                    <svg width="5" height="8" aria-hidden="true">
                      <use xlinkHref="#icon-arrow-mini"></use>
                    </svg>
                  </a>
                </li>
                <li className="breadcrumbs__item">
                  <span className="breadcrumbs__link breadcrumbs__link--active">
                    Каталог
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <section className="catalog">
            <div className="container">
              <h1 className="title title--h2">Каталог фото- и видеотехники</h1>
              <div className="page-content__columns">
                <div className="catalog__aside">
                  <div className="catalog-filter">
                    <form action="#">
                      <h2 className="visually-hidden">Фильтр</h2>
                      <fieldset className="catalog-filter__block">
                        <legend className="title title--h5">Цена, ₽</legend>
                        <div className="catalog-filter__price-range">
                          <div className="custom-input">
                            <label>
                              <input
                                type="number"
                                name="price"
                                placeholder="от"
                                value={filters.price}
                                onChange={handleFilterChange}
                              />
                            </label>
                          </div>
                          <div className="custom-input">
                            <label>
                              <input
                                type="number"
                                name="priceUp"
                                placeholder="до"
                                value={filters.priceUp}
                                onChange={handleFilterChange}
                              />
                            </label>
                          </div>
                        </div>
                      </fieldset>
                      <fieldset className="catalog-filter__block">
                        <legend className="title title--h5">Категория</legend>
                        <FilterItem
                          name="photocamera"
                          title="Фотокамера"
                          onChecked={filters.photocamera}
                          onChange={handleFilterChange}
                        />
                        <FilterItem
                          name="videocamera"
                          title="Видеокамера"
                          onChecked={filters.videocamera}
                          onChange={handleFilterChange}
                        />
                      </fieldset>
                      <fieldset className="catalog-filter__block">
                        <legend className="title title--h5">Тип камеры</legend>
                        <FilterItem
                          name="digital"
                          title="Цифровая"
                          onChecked={filters.digital}
                          onChange={handleFilterChange}
                        />
                        <FilterItem
                          name="film"
                          title="Плёночная"
                          onChecked={filters.film}
                          onChange={handleFilterChange}
                        />
                        <FilterItem
                          name="snapshot"
                          title="Моментальная"
                          onChecked={filters.snapshot}
                          onChange={handleFilterChange}
                        />
                        <FilterItem
                          name="collection"
                          title="Коллекционная"
                          onChecked={filters.collection}
                          onChange={handleFilterChange}
                        />
                      </fieldset>
                      <fieldset className="catalog-filter__block">
                        <legend className="title title--h5">Уровень</legend>
                        <FilterItem
                          name="zero"
                          title="Нулевой"
                          onChecked={filters.zero}
                          onChange={handleFilterChange}
                        />
                        <FilterItem
                          name="nonProfessional"
                          title="Любительский"
                          onChecked={filters.nonProfessional}
                          onChange={handleFilterChange}
                        />
                        <FilterItem
                          name="professional"
                          title="Профессиональный"
                          onChecked={filters.professional}
                          onChange={handleFilterChange}
                        />
                      </fieldset>
                      <button
                        className="btn catalog-filter__reset-btn"
                        type="reset"
                        onClick={handleResetFilters}
                      >
                        Сбросить фильтры
                      </button>
                    </form>
                  </div>
                </div>
                <div className="catalog__content">
                  <div className="catalog-sort">
                    <form action="#">
                      <div className="catalog-sort__inner">
                        <p className="title title--h5">Сортировать:</p>
                        <div className="catalog-sort__type">
                          <div className="catalog-sort__btn-text">
                            <input type="radio" id="sortPrice" name="sort" />
                            <label htmlFor="sortPrice">по цене</label>
                          </div>
                          <div className="catalog-sort__btn-text">
                            <input type="radio" id="sortPopular" name="sort" />
                            <label htmlFor="sortPopular">по популярности</label>
                          </div>
                        </div>
                        <div className="catalog-sort__order">
                          <div className="catalog-sort__btn catalog-sort__btn--up">
                            <input
                              type="radio"
                              id="up"
                              name="sort-icon"
                              aria-label="По возрастанию"
                            />
                            <label htmlFor="up">
                              <svg width="16" height="14" aria-hidden="true">
                                <use xlinkHref="#icon-sort"></use>
                              </svg>
                            </label>
                          </div>
                          <div className="catalog-sort__btn catalog-sort__btn--down">
                            <input
                              type="radio"
                              id="down"
                              name="sort-icon"
                              aria-label="По убыванию"
                            />
                            <label htmlFor="down">
                              <svg width="16" height="14" aria-hidden="true">
                                <use xlinkHref="#icon-sort"></use>
                              </svg>
                            </label>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="cards catalog__cards">
                    {displayedItems.map((item) => (
                      <CatalogItemCard key={item.id} item={item} />
                    ))}
                  </div>
                  <div className="pagination">
                    <ul className="pagination__list">
                      {Array.from({ length: totalPages }).map((_, index) => (
                        <PaginationItem
                          key={`page-${index + 1}`}
                          currentPage={currentPage}
                          index={index}
                          handlePageChange={handlePageChange}
                        />
                      ))}
                      <li className="pagination__item">
                        <a
                          className="pagination__link pagination__link--text"
                          href="2"
                        >
                          Далее
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Catalog;
