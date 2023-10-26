// import { useCallback, useEffect, useMemo, useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import FilterItem from '../../../components/filters/filter-item';
// import { useAppDispatch, useAppSelector } from '../../../hooks';
// import {
//   catalogItemsSelector,
//   visibleItemsSelector,
// } from '../../../store/selectors/catalog-selectors';
// import {
//   CatalogItem,
//   Category,
//   Type,
//   Level,
//   Filters,
//   CatalogItems,
// } from '../../../type/catalog';
// import queryString from 'query-string';
// import { setVisibleItems } from '../../../store/catalog-data/catalog-data';

// const parseQueryToFilters = (
//   query: Record<string, string | undefined>
// ): Filters => ({
//   price: query.price || '',
//   priceUp: query.priceUp || '',
//   photocamera: query.photocamera === 'true',
//   videocamera: query.videocamera === 'true',
//   digital: query.digital === 'true',
//   film: query.film === 'true',
//   snapshot: query.snapshot === 'true',
//   collection: query.collection === 'true',
//   zero: query.zero === 'true',
//   nonProfessional: query.nonProfessional === 'true',
//   professional: query.professional === 'true',
// });

// const CatalogFilter = () => {
//   const initialFilters: Filters = useMemo(
//     () => ({
//       price: '',
//       priceUp: '',
//       photocamera: false,
//       videocamera: false,
//       digital: false,
//       film: false,
//       snapshot: false,
//       collection: false,
//       zero: false,
//       nonProfessional: false,
//       professional: false,
//     }),
//     []
//   );

//   const location = useLocation();
//   const navigate = useNavigate();
//   const dispatch = useAppDispatch();
//   const catalogItems = useAppSelector(catalogItemsSelector);
//   const visibleItems = useAppSelector(visibleItemsSelector);

//   const [filters, setFilters] = useState(initialFilters);
//   //   const [searchParams, setSearchParams] = useSearchParams();

//   // const allFalseOrEmpty = (obj: Filters) =>
//   //   Object.values(obj).every((value) => value === false || value === '');

//   const setFiltersToURL = useCallback(
//     (updatedFilters: typeof initialFilters) => {
//       const currentParams = new URLSearchParams(location.search);

//       // setting filter params
//       Object.entries(updatedFilters).forEach(([k, value]) => {
//         const key = k as keyof typeof initialFilters;
//         if (value !== initialFilters[key]) {
//           currentParams.set(key, value.toString());
//         } else {
//           currentParams.delete(key);
//         }
//       });

//       navigate(`${location.pathname}?${currentParams.toString()}`);
//     },
//     [location.search, location.pathname, navigate, initialFilters]
//   );

//   const getFiltersFromURL = useCallback(() => {
//     const queryObject = queryString.parse(location.search) as Record<
//       string,
//       string | undefined
//     >;
//     const initialFiltersFromURL = parseQueryToFilters(queryObject);
//     if (Object.keys(initialFiltersFromURL).length === 0) {
//       setFilters(initialFilters);
//     } else {
//       setFilters(initialFiltersFromURL);
//     }
//   }, [initialFilters, location.search]);

//   const filterProducts = useCallback(
//     (visibleProducts: CatalogItems = visibleItems) => {
//       const catalogProducts = visibleProducts;
//       // Filter by price range
//       const filterByPrice = (item: CatalogItem) =>
//         (filters.price === '' || item.price >= Number(filters.price)) &&
//         (filters.priceUp === '' || item.price <= Number(filters.priceUp));

//       // Filter by category
//       const filterByCategory = (item: CatalogItem) =>
//         (filters.photocamera && item.category === Category.photocamera) ||
//         (filters.videocamera && item.category === Category.videocamera) ||
//         (!filters.photocamera && !filters.videocamera);

//       // Filter by type
//       const filterByType = (item: CatalogItem) =>
//         (filters.digital && item.type === Type.digital) ||
//         (filters.film && item.type === Type.film) ||
//         (filters.snapshot && item.type === Type.snapshot) ||
//         (filters.collection && item.type === Type.collection) ||
//         (!filters.digital &&
//           !filters.film &&
//           !filters.snapshot &&
//           !filters.collection);

//       // Filter by level
//       const filterByLevel = (item: CatalogItem) =>
//         (filters.zero && item.level === Level.zero) ||
//         (filters.nonProfessional && item.level === Level.nonProfessional) ||
//         (filters.professional && item.level === Level.professional) ||
//         (!filters.zero && !filters.nonProfessional && !filters.professional);

//       // Main filter function
//       const filteredItems = catalogProducts.filter(
//         (item) =>
//           filterByPrice(item) &&
//           filterByCategory(item) &&
//           filterByType(item) &&
//           filterByLevel(item)
//       );

//       return filteredItems;
//     },
//     [filters]
//   );

//   const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, type, value, checked } = e.target;

//     let updatedFilters;

//     if (name === 'photocamera') {
//       updatedFilters = {
//         ...filters,
//         photocamera: checked,
//         videocamera: checked ? false : filters.videocamera,
//       };
//     } else if (name === 'videocamera') {
//       updatedFilters = {
//         ...filters,
//         videocamera: checked,
//         photocamera: checked ? false : filters.photocamera,
//       };
//     } else {
//       updatedFilters = {
//         ...filters,
//         [name]: type === 'checkbox' ? checked : value,
//       };
//     }

//     setFilters(updatedFilters);
//     setFiltersToURL(updatedFilters);
//   };

//   const handleResetFilters = () => {
//     setFilters(initialFilters);
//     setFiltersToURL(initialFilters);
//   };

//   useEffect(() => {
//     getFiltersFromURL();
//   }, [getFiltersFromURL, location.search]);

//   useEffect(() => {
//     dispatch(setVisibleItems(filterProducts()));
//   }, [dispatch, filterProducts, filters]);

//   return (
//     <div className="catalog-filter">
//       <form action="#">
//         <h2 className="visually-hidden">Фильтр</h2>
//         <fieldset className="catalog-filter__block">
//           <legend className="title title--h5">Цена, ₽</legend>
//           <div className="catalog-filter__price-range">
//             <div className="custom-input">
//               <label>
//                 <input
//                   type="number"
//                   name="price"
//                   placeholder="от"
//                   value={filters.price}
//                   onChange={handleFilterChange}
//                 />
//               </label>
//             </div>
//             <div className="custom-input">
//               <label>
//                 <input
//                   type="number"
//                   name="priceUp"
//                   placeholder="до"
//                   value={filters.priceUp}
//                   onChange={handleFilterChange}
//                 />
//               </label>
//             </div>
//           </div>
//         </fieldset>
//         <fieldset className="catalog-filter__block">
//           <legend className="title title--h5">Категория</legend>
//           <FilterItem
//             name="photocamera"
//             title="Фотокамера"
//             onChecked={filters.photocamera}
//             onChange={handleFilterChange}
//             disabled={false}
//           />
//           <FilterItem
//             name="videocamera"
//             title="Видеокамера"
//             onChecked={filters.videocamera}
//             onChange={handleFilterChange}
//             disabled={filters.film || filters.snapshot}
//           />
//         </fieldset>
//         <fieldset className="catalog-filter__block">
//           <legend className="title title--h5">Тип камеры</legend>
//           <FilterItem
//             name="digital"
//             title="Цифровая"
//             onChecked={filters.digital}
//             onChange={handleFilterChange}
//             disabled={false}
//           />
//           <FilterItem
//             name="film"
//             title="Плёночная"
//             onChecked={filters.film}
//             onChange={handleFilterChange}
//             disabled={filters.videocamera}
//           />
//           <FilterItem
//             name="snapshot"
//             title="Моментальная"
//             onChecked={filters.snapshot}
//             onChange={handleFilterChange}
//             disabled={filters.videocamera}
//           />
//           <FilterItem
//             name="collection"
//             title="Коллекционная"
//             onChecked={filters.collection}
//             onChange={handleFilterChange}
//             disabled={false}
//           />
//         </fieldset>
//         <fieldset className="catalog-filter__block">
//           <legend className="title title--h5">Уровень</legend>
//           <FilterItem
//             name="zero"
//             title="Нулевой"
//             onChecked={filters.zero}
//             onChange={handleFilterChange}
//             disabled={false}
//           />
//           <FilterItem
//             name="nonProfessional"
//             title="Любительский"
//             onChecked={filters.nonProfessional}
//             onChange={handleFilterChange}
//             disabled={false}
//           />
//           <FilterItem
//             name="professional"
//             title="Профессиональный"
//             onChecked={filters.professional}
//             onChange={handleFilterChange}
//             disabled={false}
//           />
//         </fieldset>
//         <button
//           className="btn catalog-filter__reset-btn"
//           type="reset"
//           onClick={handleResetFilters}
//         >
//           Сбросить фильтры
//         </button>
//       </form>
//     </div>
//   );
// };

// export default CatalogFilter;
