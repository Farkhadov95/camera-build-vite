import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  catalogItemsSelector,
  errorSelector,
  isAddedToBasketSelector,
  isLoadingSelector,
  productToAddSelector,
} from '../../store/selectors/catalog-selectors';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import queryString from 'query-string';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CatalogItemCard from '../../components/catalog/catalog-item-card';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import Banner from '../../components/promo-banner/banner';
import {
  CatalogItem,
  CatalogItems,
  Category,
  Filters,
  Level,
  Type,
} from '../../type/catalog';
import FilterItem from '../../components/filters/filter-item';
import Pagination from '../../components/pagination/pagination';
import BasketAddModal from '../../components/basket/basket-add-success';
import BasketAdd from '../../components/basket/basket-add';
import { ITEMS_PER_PAGE, SortOrder, SortType } from '../../const';
import { getPriceRange } from '../../utils';
import { clearErrors } from '../../store/catalog-data/catalog-data';

const Catalog = () => {
  const FIRST_PAGE = 1;
  const initialFilters = useMemo(
    () => ({
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
    }),
    []
  );

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const catalogItems = useAppSelector(catalogItemsSelector);
  const isLoading = useAppSelector(isLoadingSelector);
  const isAddedToBasket = useAppSelector(isAddedToBasketSelector);
  const productToAdd = useAppSelector(productToAddSelector);
  const error = useAppSelector(errorSelector);

  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState(initialFilters);

  const [sortType, setSortType] = useState<SortType>(SortType.none);
  const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.none);
  const [priceRange, setPriceRange] = useState([0, 0]);
  const [searchParams, setSearchParams] = useSearchParams();

  // const {
  //   register,
  //   formState: { errors },
  // } = useForm<Filters>();

  const parseQueryToFilters = (
    query: Record<string, string | undefined>
  ): Filters => ({
    price: query.price_gte || '',
    priceUp: query.price_lte || '',
    photocamera: query.photocamera === 'true',
    videocamera: query.videocamera === 'true',
    digital: query.digital === 'true',
    film: query.film === 'true',
    snapshot: query.snapshot === 'true',
    collection: query.collection === 'true',
    zero: query.zero === 'true',
    nonProfessional: query.nonProfessional === 'true',
    professional: query.professional === 'true',
  });

  const updateURL = useCallback(
    (
      pageNumber: number,
      sort: SortType,
      order: SortOrder,
      updatedFilters: typeof initialFilters
    ) => {
      const currentParams = new URLSearchParams(location.search);

      // setting sorting params
      currentParams.set('page', pageNumber.toString());
      currentParams.set('sort', sort);
      currentParams.set('order', order);

      // setting filter params
      Object.entries(updatedFilters).forEach(([key, value]) => {
        const filterKey = key as keyof typeof initialFilters;

        if (filterKey === 'price') {
          if (value) {
            currentParams.set('price_gte', value.toString());
          } else {
            currentParams.delete('price_gte');
          }
        } else if (filterKey === 'priceUp') {
          if (value) {
            currentParams.set('price_lte', value.toString());
          } else {
            currentParams.delete('price_lte');
          }
        } else {
          if (value !== initialFilters[filterKey]) {
            currentParams.set(key, value.toString());
          } else {
            currentParams.delete(key);
          }
        }
      });

      navigate(`${location.pathname}?${currentParams.toString()}`);
    },
    [location.search, location.pathname, navigate, initialFilters]
  );

  const getPrice = (input: string) => {
    const intValue = Math.abs(Number(input));
    if (intValue < 0) {
      return '0';
    } else if (intValue > priceRange[1]) {
      return priceRange[1].toString();
    } else if (intValue > parseInt(filters.priceUp, 10)) {
      return filters.priceUp;
    } else {
      return intValue.toString();
    }
  };

  const getPriceUp = (input: string) => {
    const intValue = Math.abs(Number(input));
    if (intValue < 0) {
      return '0';
    } else if (intValue > priceRange[1]) {
      return priceRange[1].toString();
    } else {
      return intValue.toString();
    }
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, value, checked } = e.target;

    let updatedFilters;

    if (name === 'photocamera') {
      updatedFilters = {
        ...filters,
        photocamera: checked,
        videocamera: checked ? false : filters.videocamera,
      };
    } else if (name === 'videocamera') {
      updatedFilters = {
        ...filters,
        videocamera: checked,
        photocamera: checked ? false : filters.photocamera,
      };
    } else if (name === 'price') {
      updatedFilters = {
        ...filters,
        price: getPrice(value),
      };
    } else if (name === 'priceUp') {
      updatedFilters = {
        ...filters,
        priceUp: getPriceUp(value),
      };
    } else {
      updatedFilters = {
        ...filters,
        [name]: type === 'checkbox' ? checked : value,
      };
    }

    setFilters(updatedFilters);
    updateURL(FIRST_PAGE, sortType, sortOrder, updatedFilters);
  };

  const handleResetFilters = () => {
    setFilters(initialFilters);
    setCurrentPage(1);
    updateURL(1, SortType.none, SortOrder.none, initialFilters);
  };

  const filteredProducts = useMemo(() => {
    const catalogProducts = catalogItems;
    // Filter by price range
    const filterByPrice = (item: CatalogItem) =>
      (filters.price === '' || item.price >= Number(filters.price)) &&
      (filters.priceUp === '' || item.price <= Number(filters.priceUp));

    // Filter by category
    const filterByCategory = (item: CatalogItem) =>
      (filters.photocamera && item.category === Category.photocamera) ||
      (filters.videocamera && item.category === Category.videocamera) ||
      (!filters.photocamera && !filters.videocamera);

    // Filter by type
    const filterByType = (item: CatalogItem) =>
      (filters.digital && item.type === Type.digital) ||
      (filters.film && item.type === Type.film) ||
      (filters.snapshot && item.type === Type.snapshot) ||
      (filters.collection && item.type === Type.collection) ||
      (!filters.digital &&
        !filters.film &&
        !filters.snapshot &&
        !filters.collection);

    // Filter by level
    const filterByLevel = (item: CatalogItem) =>
      (filters.zero && item.level === Level.zero) ||
      (filters.nonProfessional && item.level === Level.nonProfessional) ||
      (filters.professional && item.level === Level.professional) ||
      (!filters.zero && !filters.nonProfessional && !filters.professional);

    // Main filter function

    const filteredItems = catalogProducts.filter(
      (item) =>
        filterByPrice(item) &&
        filterByCategory(item) &&
        filterByType(item) &&
        filterByLevel(item)
    );

    return filteredItems;
  }, [
    catalogItems,
    filters.collection,
    filters.digital,
    filters.film,
    filters.nonProfessional,
    filters.photocamera,
    filters.price,
    filters.priceUp,
    filters.professional,
    filters.snapshot,
    filters.videocamera,
    filters.zero,
  ]);

  const sortedByType = (items: CatalogItems, type: SortType) => {
    if (type === SortType.none) {
      return [...items]; // returns original
    }
    return [...items].sort((a, b) => a[type] - b[type]);
  };

  const sortByOrder = (items: CatalogItems, order: SortOrder) => {
    if (order === SortOrder.none) {
      return [...items]; // returns original
    }

    return order === SortOrder.ascending ? [...items] : [...items].reverse();
  };

  const modifiedCatalogList = useMemo(
    () => sortByOrder(sortedByType(filteredProducts, sortType), sortOrder),
    [filteredProducts, sortOrder, sortType]
  );

  const productsToDisplay = (items: CatalogItems) =>
    items.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      currentPage * ITEMS_PER_PAGE
    );

  const productsToShow = productsToDisplay(modifiedCatalogList);

  const handlePageChange = useCallback(
    (page: number) => {
      setCurrentPage(page);
      setSearchParams((prevParams) => {
        const currentParams = Object.fromEntries(prevParams);
        currentParams.page = page.toString();
        return currentParams;
      });
    },
    [setSearchParams]
  );

  const handleSortTypeChange = useCallback(
    (type: SortType) => {
      const isFirstLaunch =
        type === SortType.price && sortOrder === SortOrder.none;
      setSortType(type);
      if (isFirstLaunch) {
        setSortOrder(SortOrder.ascending);
      }
      setSearchParams((prevParams) => {
        const currentParams = Object.fromEntries(prevParams);
        currentParams.sort = type;
        if (isFirstLaunch) {
          currentParams.order = SortOrder.ascending;
        } else {
          currentParams.order = sortOrder;
        }
        return currentParams;
      });
    },
    [setSearchParams, sortOrder]
  );

  const handleSortOrderChange = useCallback(
    (order: SortOrder) => {
      const isFirstLaunch =
        order !== SortOrder.none && sortType === SortType.none;
      setSortOrder(order);
      if (isFirstLaunch) {
        setSortType(SortType.price);
      }
      setSearchParams((prevParams) => {
        const currentParams = Object.fromEntries(prevParams);
        currentParams.order = order;
        if (isFirstLaunch) {
          currentParams.sort = SortType.price;
        } else {
          currentParams.sort = sortType;
        }
        return currentParams;
      });
    },
    [setSearchParams, sortType]
  );

  useEffect(() => {
    const isAnyCheckboxFilterApplied = () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { price, priceUp, ...checkboxFilters } = filters;
      return Object.values(checkboxFilters).some((value) => value !== false);
    };

    const datasetForPriceRange = isAnyCheckboxFilterApplied()
      ? filteredProducts
      : catalogItems;

    setTotalPages(Math.ceil(filteredProducts.length / ITEMS_PER_PAGE));
    if (filteredProducts.length !== 0) {
      const priceRangeAvailable = getPriceRange(datasetForPriceRange);
      setPriceRange(priceRangeAvailable);
    }
  }, [catalogItems, filteredProducts, filters]);

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const getPageFromURL = (): number => {
      const pageFromUrl = query.get('page');
      const requiredPage = pageFromUrl ? parseInt(pageFromUrl, 10) : 1;

      if (requiredPage < 1 || requiredPage > totalPages) {
        return 1;
      }
      return requiredPage;
    };

    const getSortTypeFromURL = (): SortType => {
      const sortTypeFromUrl = query.get('sort') as SortType;
      return sortTypeFromUrl || sortType;
    };

    const getSortOrderFromURL = (): SortOrder => {
      const sortOrderFromUrl = query.get('order') as SortOrder;
      return sortOrderFromUrl || sortOrder;
    };

    const getFiltersFromURL = () => {
      const queryObject = queryString.parse(location.search) as Record<
        string,
        string | undefined
      >;
      const filtersFromURL = parseQueryToFilters(queryObject);
      return filtersFromURL || initialFilters;
    };

    const newPage = getPageFromURL();
    const newSortType = getSortTypeFromURL();
    const newSortOrder = getSortOrderFromURL();
    const newFilters = getFiltersFromURL();

    if (
      currentPage !== newPage ||
      sortType !== newSortType ||
      sortOrder !== newSortOrder ||
      filters !== newFilters
    ) {
      setCurrentPage(newPage);
      setSortType(newSortType);
      setSortOrder(newSortOrder);
      setFilters(newFilters);

      if (newPage < 1 || newPage > totalPages) {
        updateURL(FIRST_PAGE, newSortType, newSortOrder, newFilters);
      }
    }
  }, [location.search]);

  useEffect(() => {
    const pageValue = searchParams.get('page');
    const pageNumber = pageValue ? parseInt(pageValue, 10) : 1;

    const sortValue = searchParams.get('sort');
    const orderValue = searchParams.get('order');

    setCurrentPage(pageNumber);
    setSortType((sortValue as SortType) || SortType.none);
    setSortOrder((orderValue as SortOrder) || SortOrder.none);
  }, [searchParams]);

  useEffect(() => {
    if (isAddedToBasket || productToAdd !== null) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [isAddedToBasket, productToAdd]);

  useEffect(() => {
    if (error) {
      toast(error);
      dispatch(clearErrors());
    }
  }, [error, dispatch]);

  return (
    <div className="wrapper">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
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
                                placeholder={priceRange[0].toString()}
                                value={filters.price}
                                name="price"
                                onInput={handleFilterChange}
                              />
                            </label>
                          </div>
                          <div className="custom-input">
                            <label>
                              <input
                                type="number"
                                placeholder={priceRange[1].toString()}
                                value={filters.priceUp}
                                name="priceUp"
                                onInput={handleFilterChange}
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
                          disabled={false}
                        />
                        <FilterItem
                          name="videocamera"
                          title="Видеокамера"
                          onChecked={filters.videocamera}
                          onChange={handleFilterChange}
                          disabled={filters.film || filters.snapshot}
                        />
                      </fieldset>
                      <fieldset className="catalog-filter__block">
                        <legend className="title title--h5">Тип камеры</legend>
                        <FilterItem
                          name="digital"
                          title="Цифровая"
                          onChecked={filters.digital}
                          onChange={handleFilterChange}
                          disabled={false}
                        />
                        <FilterItem
                          name="film"
                          title="Плёночная"
                          onChecked={filters.film}
                          onChange={handleFilterChange}
                          disabled={filters.videocamera}
                        />
                        <FilterItem
                          name="snapshot"
                          title="Моментальная"
                          onChecked={filters.snapshot}
                          onChange={handleFilterChange}
                          disabled={filters.videocamera}
                        />
                        <FilterItem
                          name="collection"
                          title="Коллекционная"
                          onChecked={filters.collection}
                          onChange={handleFilterChange}
                          disabled={false}
                        />
                      </fieldset>
                      <fieldset className="catalog-filter__block">
                        <legend className="title title--h5">Уровень</legend>
                        <FilterItem
                          name="zero"
                          title="Нулевой"
                          onChecked={filters.zero}
                          onChange={handleFilterChange}
                          disabled={false}
                        />
                        <FilterItem
                          name="nonProfessional"
                          title="Любительский"
                          onChecked={filters.nonProfessional}
                          onChange={handleFilterChange}
                          disabled={false}
                        />
                        <FilterItem
                          name="professional"
                          title="Профессиональный"
                          onChecked={filters.professional}
                          onChange={handleFilterChange}
                          disabled={false}
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
                            <input
                              type="radio"
                              id="sortPrice"
                              name="sort"
                              checked={sortType === SortType.price}
                              onChange={() =>
                                handleSortTypeChange(SortType.price)}
                            />
                            <label htmlFor="sortPrice">по цене</label>
                          </div>
                          <div className="catalog-sort__btn-text">
                            <input
                              type="radio"
                              id="sortPopular"
                              name="sort"
                              checked={sortType === SortType.reviewCount}
                              onChange={() =>
                                handleSortTypeChange(SortType.reviewCount)}
                            />
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
                              checked={sortOrder === SortOrder.ascending}
                              onChange={() =>
                                handleSortOrderChange(SortOrder.ascending)}
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
                              checked={sortOrder === SortOrder.descending}
                              onChange={() =>
                                handleSortOrderChange(SortOrder.descending)}
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

                  {productsToShow.length === 0 ? (
                    <p className="empty-list-message">
                      по вашему запросу ничего не найдено
                    </p>
                  ) : (
                    <div className="cards catalog__cards">
                      {isLoading && (
                        <div className="cards__loader">loading...</div>
                      )}
                      {!isLoading &&
                        productsToShow.length > 0 &&
                        productsToShow.map((item) => (
                          <CatalogItemCard key={item.id} product={item} />
                        ))}
                    </div>
                  )}
                  <div className="pagination">
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      handlePageChange={handlePageChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        {isAddedToBasket && <BasketAddModal />}
        {productToAdd !== null && <BasketAdd />}
      </main>
      <Footer />
    </div>
  );
};

export default Catalog;
