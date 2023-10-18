import { useAppSelector } from '../../hooks';
import {
  catalogItemsSelector,
  isAddedToBasketSelector,
  isLoadingSelector,
  productToAddSelector,
} from '../../store/selectors/catalog-selectors';
import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import CatalogItemCard from '../../components/catalog/catalog-item-card';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import Banner from '../../components/promo-banner/banner';
import { CatalogItems } from '../../type/catalog';
import FilterItem from '../../components/filters/filter-item';
import Pagination from '../../components/pagination/pagination';
import BasketAddModal from '../../components/basket/basket-add-success';
import BasketAdd from '../../components/basket/basket-add';
import { ITEMS_PER_PAGE, SortOrder, SortType } from '../../const';

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

  const location = useLocation();
  const navigate = useNavigate();
  const catalogItems = useAppSelector(catalogItemsSelector);
  const isLoading = useAppSelector(isLoadingSelector);
  const isAddedToBasket = useAppSelector(isAddedToBasketSelector);
  const productToAdd = useAppSelector(productToAddSelector);

  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState(initialFilters);

  const [sortType, setSortType] = useState<SortType>(SortType.none);
  const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.none);
  const [searchParams, setSearchParams] = useSearchParams();

  const updateURL = useCallback(
    (pageNumber: number, sort: SortType, order: SortOrder) => {
      const currentParams = new URLSearchParams(location.search);
      currentParams.set('page', pageNumber.toString());
      currentParams.set('sort', sort);
      currentParams.set('order', order);
      navigate(`${location.pathname}?${currentParams.toString()}`);
    },
    [location.search, location.pathname, navigate]
  );

  const totalPages = Math.ceil(catalogItems.length / ITEMS_PER_PAGE);

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

  // const filteredItems = catalogItems.filter(
  //   (item) =>
  //     // Price filters
  //     (filters.price === '' || item.price >= Number(filters.price)) &&
  //     (filters.priceUp === '' || item.price <= Number(filters.priceUp)) &&
  //     // Category filters
  //     ((filters.photocamera && item.category === Category.photocamera) ||
  //       (filters.videocamera && item.category === Category.videocamera) ||
  //       (!filters.photocamera && !filters.videocamera)) &&
  //     // Type filters
  //     ((filters.digital && item.type === Type.digital) ||
  //       (filters.film && item.type === Type.film) ||
  //       (filters.snapshot && item.type === Type.snapshot) ||
  //       (filters.collection && item.type === Type.collection) ||
  //       (!filters.digital &&
  //         !filters.film &&
  //         !filters.snapshot &&
  //         !filters.collection)) &&
  //     // Level filters
  //     ((filters.zero && item.level === Level.zero) ||
  //       (filters.nonProfessional && item.level === Level.nonProfessional) ||
  //       (filters.professional && item.level === Level.professional) ||
  //       (!filters.zero && !filters.nonProfessional && !filters.professional))
  // );

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

  const modifiedCatalogList = () => {
    if (sortType === SortType.none && sortOrder !== SortOrder.none) {
      setSortType(SortType.price);
      return sortByOrder(sortedByType(catalogItems, sortType), sortOrder);
    } else {
      return sortByOrder(sortedByType(catalogItems, sortType), sortOrder);
    }
  };

  const productsToDisplay = (items: CatalogItems) =>
    items.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      currentPage * ITEMS_PER_PAGE
    );

  useEffect(() => {
    const getPageFromURL = () => {
      const query = new URLSearchParams(location.search);
      const pageFromUrl = query.get('page');

      const requiredPage = pageFromUrl ? parseInt(pageFromUrl, 10) : 1;

      if (requiredPage < 1 || requiredPage > 5) {
        //5 - should be the total number of pages
        updateURL(1, sortType, sortOrder);
        return 1;
      }
      return requiredPage;
    };

    const getSortTypeFromURL = () => {
      const query = new URLSearchParams(location.search);
      const sortTypeFromUrl = query.get('sort') as SortType;
      const requiredSortType = sortTypeFromUrl ? sortTypeFromUrl : sortType;
      return requiredSortType;
    };

    const getSortOrderFromURL = () => {
      const query = new URLSearchParams(location.search);
      const sortOrderFromUrl = query.get('order') as SortOrder;
      const requiredSortOrder = sortOrderFromUrl ? sortOrderFromUrl : sortOrder;
      return requiredSortOrder;
    };

    setCurrentPage(getPageFromURL());
    setSortType(getSortTypeFromURL());
    setSortOrder(getSortOrderFromURL());
  }, [filters, location.search, sortOrder, sortType, updateURL]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setSearchParams((prevParams) => {
      const currentParams = Object.fromEntries(prevParams);
      currentParams.page = page.toString();
      return currentParams;
    });
  };

  const handleSortTypeChange = (type: SortType) => {
    setSortType(type);
    setSearchParams((prevParams) => {
      const currentParams = Object.fromEntries(prevParams);
      currentParams.sort = type;
      return currentParams;
    });
  };

  const handleSortOrderChange = (order: SortOrder) => {
    setSortOrder(order);
    setSearchParams((prevParams) => {
      const currentParams = Object.fromEntries(prevParams);
      currentParams.order = order;
      return currentParams;
    });
  };

  useEffect(() => {
    const pageValue = searchParams.get('page');
    const pageNumber = pageValue ? parseInt(pageValue, 10) : 1;

    const sortValue = searchParams.get('sort');
    const orderValue = searchParams.get('order');

    setCurrentPage(pageNumber);
    setSortType(sortValue as SortType);
    setSortOrder(orderValue as SortOrder);
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

  return (
    <div className="wrapper">
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
                  <div className="cards catalog__cards">
                    {isLoading && (
                      <div className="cards__loader">loading...</div>
                    )}
                    {!isLoading &&
                      productsToDisplay(modifiedCatalogList()).map((item) => (
                        <CatalogItemCard key={item.id} product={item} />
                      ))}
                  </div>
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

// import { useAppSelector } from '../../hooks';
// import {
//   catalogItemsSelector,
//   isAddedToBasketSelector,
//   isLoadingSelector,
//   productToAddSelector,
// } from '../../store/selectors/catalog-selectors';
// import CatalogItemCard from '../../components/catalog/catalog-item-card';
// import Header from '../../components/header/header';
// import Footer from '../../components/footer/footer';
// import Banner from '../../components/promo-banner/banner';
// import { useCallback, useEffect, useState } from 'react';
// import { CatalogItems } from '../../type/catalog';
// import FilterItem from '../../components/filters/filter-item';
// import { useLocation, useNavigate } from 'react-router-dom';
// import Pagination from '../../components/pagination/pagination';
// import BasketAddModal from '../../components/basket/basket-add-success';
// import BasketAdd from '../../components/basket/basket-add';
// import { ITEMS_PER_PAGE, SortOrder, SortType } from '../../const';

// const Catalog = () => {
//   const initialFilters = {
//     price: '',
//     priceUp: '',
//     photocamera: false,
//     videocamera: false,
//     digital: false,
//     film: false,
//     snapshot: false,
//     collection: false,
//     zero: false,
//     nonProfessional: false,
//     professional: false,
//   };

//   const location = useLocation();
//   const navigate = useNavigate();
//   const catalogItems = useAppSelector(catalogItemsSelector);
//   const isLoading = useAppSelector(isLoadingSelector);
//   const isAddedToBasket = useAppSelector(isAddedToBasketSelector);
//   const productToAdd = useAppSelector(productToAddSelector);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [filters, setFilters] = useState(initialFilters);

//   const [sortType, setSortType] = useState<SortType>(SortType.none);
//   const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.none);

//   const updatePageInURL = useCallback(
//     (pageNumber: number) => {
//       const currentParams = new URLSearchParams(location.search);
//       currentParams.set('page', pageNumber.toString());
//       navigate(`${location.pathname}?${currentParams.toString()}`);
//     },
//     [location.search, location.pathname, navigate]
//   );

//   const totalPages = Math.ceil(catalogItems.length / ITEMS_PER_PAGE);

//   const handlePageChange = (page: number) => {
//     setCurrentPage(page);
//     updatePageInURL(page);
//   };

//   const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, type, value, checked } = e.target;
//     setFilters((prevState) => ({
//       ...prevState,
//       [name]: type === 'checkbox' ? checked : value,
//     }));
//   };

//   const handleResetFilters = () => {
//     setFilters(initialFilters);
//     setCurrentPage(1);
//   };

//   // const filteredItems = catalogItems.filter(
//   //   (item) =>
//   //     // Price filters
//   //     (filters.price === '' || item.price >= Number(filters.price)) &&
//   //     (filters.priceUp === '' || item.price <= Number(filters.priceUp)) &&
//   //     // Category filters
//   //     ((filters.photocamera && item.category === Category.photocamera) ||
//   //       (filters.videocamera && item.category === Category.videocamera) ||
//   //       (!filters.photocamera && !filters.videocamera)) &&
//   //     // Type filters
//   //     ((filters.digital && item.type === Type.digital) ||
//   //       (filters.film && item.type === Type.film) ||
//   //       (filters.snapshot && item.type === Type.snapshot) ||
//   //       (filters.collection && item.type === Type.collection) ||
//   //       (!filters.digital &&
//   //         !filters.film &&
//   //         !filters.snapshot &&
//   //         !filters.collection)) &&
//   //     // Level filters
//   //     ((filters.zero && item.level === Level.zero) ||
//   //       (filters.nonProfessional && item.level === Level.nonProfessional) ||
//   //       (filters.professional && item.level === Level.professional) ||
//   //       (!filters.zero && !filters.nonProfessional && !filters.professional))
//   // );

//   const sortedByType = (items: CatalogItems, type: SortType) => {
//     if (type === SortType.none) {
//       return [...items]; // returns original
//     }
//     return [...items].sort((a, b) => a[type] - b[type]);
//   };

//   const sortByOrder = (items: CatalogItems, order: SortOrder) => {
//     if (order === SortOrder.none) {
//       return [...items]; // returns original
//     }
//     return order === SortOrder.ascending ? [...items] : [...items].reverse();
//   };

//   const modifiedCatalogList = () => {
//     if (sortType === SortType.none && sortOrder !== SortOrder.none) {
//       setSortType(SortType.price);
//       return sortByOrder(sortedByType(catalogItems, sortType), sortOrder);
//     } else {
//       return sortByOrder(sortedByType(catalogItems, sortType), sortOrder);
//     }
//   };

//   const productsToDisplay = (items: CatalogItems) =>
//     items.slice(
//       (currentPage - 1) * ITEMS_PER_PAGE,
//       currentPage * ITEMS_PER_PAGE
//     );

//   useEffect(() => {
//     const getPageFromURL = () => {
//       const query = new URLSearchParams(location.search);
//       const pageFromUrl = query.get('page');
//       const requiredPage = pageFromUrl ? parseInt(pageFromUrl, 10) : 1;

//       if (requiredPage < 1 || requiredPage > 5) {
//         //5 - should be the total number of pages
//         updatePageInURL(1);
//         return 1;
//       }
//       return requiredPage;
//     };

//     setCurrentPage(getPageFromURL());
//   }, [filters, location.search, updatePageInURL]);

//   useEffect(() => {
//     if (isAddedToBasket || productToAdd !== null) {
//       document.body.classList.add('no-scroll');
//     } else {
//       document.body.classList.remove('no-scroll');
//     }
//     return () => {
//       document.body.classList.remove('no-scroll');
//     };
//   }, [isAddedToBasket, productToAdd]);

//   return (
//     <div className="wrapper">
//       <Header />
//       <main>
//         <Banner />
//         <div className="page-content">
//           <div className="breadcrumbs">
//             <div className="container">
//               <ul className="breadcrumbs__list">
//                 <li className="breadcrumbs__item">
//                   <a className="breadcrumbs__link" href="index.html">
//                     Главная
//                     <svg width="5" height="8" aria-hidden="true">
//                       <use xlinkHref="#icon-arrow-mini"></use>
//                     </svg>
//                   </a>
//                 </li>
//                 <li className="breadcrumbs__item">
//                   <span className="breadcrumbs__link breadcrumbs__link--active">
//                     Каталог
//                   </span>
//                 </li>
//               </ul>
//             </div>
//           </div>
//           <section className="catalog">
//             <div className="container">
//               <h1 className="title title--h2">Каталог фото- и видеотехники</h1>
//               <div className="page-content__columns">
//                 <div className="catalog__aside">
//                   <div className="catalog-filter">
//                     <form action="#">
//                       <h2 className="visually-hidden">Фильтр</h2>
//                       <fieldset className="catalog-filter__block">
//                         <legend className="title title--h5">Цена, ₽</legend>
//                         <div className="catalog-filter__price-range">
//                           <div className="custom-input">
//                             <label>
//                               <input
//                                 type="number"
//                                 name="price"
//                                 placeholder="от"
//                                 value={filters.price}
//                                 onChange={handleFilterChange}
//                               />
//                             </label>
//                           </div>
//                           <div className="custom-input">
//                             <label>
//                               <input
//                                 type="number"
//                                 name="priceUp"
//                                 placeholder="до"
//                                 value={filters.priceUp}
//                                 onChange={handleFilterChange}
//                               />
//                             </label>
//                           </div>
//                         </div>
//                       </fieldset>
//                       <fieldset className="catalog-filter__block">
//                         <legend className="title title--h5">Категория</legend>
//                         <FilterItem
//                           name="photocamera"
//                           title="Фотокамера"
//                           onChecked={filters.photocamera}
//                           onChange={handleFilterChange}
//                         />
//                         <FilterItem
//                           name="videocamera"
//                           title="Видеокамера"
//                           onChecked={filters.videocamera}
//                           onChange={handleFilterChange}
//                         />
//                       </fieldset>
//                       <fieldset className="catalog-filter__block">
//                         <legend className="title title--h5">Тип камеры</legend>
//                         <FilterItem
//                           name="digital"
//                           title="Цифровая"
//                           onChecked={filters.digital}
//                           onChange={handleFilterChange}
//                         />
//                         <FilterItem
//                           name="film"
//                           title="Плёночная"
//                           onChecked={filters.film}
//                           onChange={handleFilterChange}
//                         />
//                         <FilterItem
//                           name="snapshot"
//                           title="Моментальная"
//                           onChecked={filters.snapshot}
//                           onChange={handleFilterChange}
//                         />
//                         <FilterItem
//                           name="collection"
//                           title="Коллекционная"
//                           onChecked={filters.collection}
//                           onChange={handleFilterChange}
//                         />
//                       </fieldset>
//                       <fieldset className="catalog-filter__block">
//                         <legend className="title title--h5">Уровень</legend>
//                         <FilterItem
//                           name="zero"
//                           title="Нулевой"
//                           onChecked={filters.zero}
//                           onChange={handleFilterChange}
//                         />
//                         <FilterItem
//                           name="nonProfessional"
//                           title="Любительский"
//                           onChecked={filters.nonProfessional}
//                           onChange={handleFilterChange}
//                         />
//                         <FilterItem
//                           name="professional"
//                           title="Профессиональный"
//                           onChecked={filters.professional}
//                           onChange={handleFilterChange}
//                         />
//                       </fieldset>
//                       <button
//                         className="btn catalog-filter__reset-btn"
//                         type="reset"
//                         onClick={handleResetFilters}
//                       >
//                         Сбросить фильтры
//                       </button>
//                     </form>
//                   </div>
//                 </div>
//                 <div className="catalog__content">
//                   <div className="catalog-sort">
//                     <form action="#">
//                       <div className="catalog-sort__inner">
//                         <p className="title title--h5">Сортировать:</p>
//                         <div className="catalog-sort__type">
//                           <div className="catalog-sort__btn-text">
//                             <input
//                               type="radio"
//                               id="sortPrice"
//                               name="sort"
//                               checked={sortType === SortType.price}
//                               onChange={() => setSortType(SortType.price)}
//                             />
//                             <label htmlFor="sortPrice">по цене</label>
//                           </div>
//                           <div className="catalog-sort__btn-text">
//                             <input
//                               type="radio"
//                               id="sortPopular"
//                               name="sort"
//                               checked={sortType === SortType.reviewCount}
//                               onChange={() => setSortType(SortType.reviewCount)}
//                             />
//                             <label htmlFor="sortPopular">по популярности</label>
//                           </div>
//                         </div>
//                         <div className="catalog-sort__order">
//                           <div className="catalog-sort__btn catalog-sort__btn--up">
//                             <input
//                               type="radio"
//                               id="up"
//                               name="sort-icon"
//                               aria-label="По возрастанию"
//                               checked={sortOrder === SortOrder.ascending}
//                               onChange={() => setSortOrder(SortOrder.ascending)}
//                             />
//                             <label htmlFor="up">
//                               <svg width="16" height="14" aria-hidden="true">
//                                 <use xlinkHref="#icon-sort"></use>
//                               </svg>
//                             </label>
//                           </div>
//                           <div className="catalog-sort__btn catalog-sort__btn--down">
//                             <input
//                               type="radio"
//                               id="down"
//                               name="sort-icon"
//                               aria-label="По убыванию"
//                               checked={sortOrder === SortOrder.descending}
//                               onChange={() =>
//                                 setSortOrder(SortOrder.descending)
//                               }
//                             />
//                             <label htmlFor="down">
//                               <svg width="16" height="14" aria-hidden="true">
//                                 <use xlinkHref="#icon-sort"></use>
//                               </svg>
//                             </label>
//                           </div>
//                         </div>
//                       </div>
//                     </form>
//                   </div>
//                   <div className="cards catalog__cards">
//                     {isLoading && (
//                       <div className="cards__loader">loading...</div>
//                     )}
//                     {!isLoading &&
//                       productsToDisplay(modifiedCatalogList()).map((item) => (
//                         <CatalogItemCard key={item.id} product={item} />
//                       ))}
//                   </div>
//                   <div className="pagination">
//                     <Pagination
//                       currentPage={currentPage}
//                       totalPages={totalPages}
//                       handlePageChange={handlePageChange}
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </section>
//         </div>
//         {isAddedToBasket && <BasketAddModal />}
//         {productToAdd !== null && <BasketAdd />}
//       </main>
//       <Footer />
//     </div>
//   );
// };

// export default Catalog;
