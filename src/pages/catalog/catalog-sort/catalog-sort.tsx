// import React, { useCallback } from 'react';
// import { SortType, SortOrder } from '../../../const';
// import { useLocation, useNavigate } from 'react-router-dom';

// const CatalogSort = () => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const updateURL = useCallback(
//     (pageNumber: number, sort: SortType, order: SortOrder) => {
//       const currentParams = new URLSearchParams(location.search);

//       // setting sorting params
//       currentParams.set('page', pageNumber.toString());
//       currentParams.set('sort', sort);
//       currentParams.set('order', order);

//       navigate(`${location.pathname}?${currentParams.toString()}`);
//     },
//     [location.search, location.pathname, navigate]
//   );

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

//   const modifiedCatalogList = useMemo(
//     () => sortByOrder(sortedByType(visibleItems, sortType), sortOrder),
//     [sortOrder, sortType, visibleItems]
//   );

//   const handleSortOrderChange = useCallback(
//     (order: SortOrder) => {
//       setSortOrder(order);
//       setSearchParams((prevParams) => {
//         const currentParams = Object.fromEntries(prevParams);
//         currentParams.order = order;
//         return currentParams;
//       });
//     },
//     [setSearchParams]
//   );

//   const handleSortTypeChange = useCallback(
//     (type: SortType) => {
//       setSortType(type);
//       setSearchParams((prevParams) => {
//         const currentParams = Object.fromEntries(prevParams);
//         currentParams.sort = type;
//         return currentParams;
//       });
//     },
//     [setSearchParams]
//   );

//   const handleSortOrderChange = useCallback(
//     (order: SortOrder) => {
//       setSortOrder(order);
//       setSearchParams((prevParams) => {
//         const currentParams = Object.fromEntries(prevParams);
//         currentParams.order = order;
//         return currentParams;
//       });
//     },
//     [setSearchParams]
//   );

//   const productsToShow = productsToDisplay(modifiedCatalogList);

//   useEffect(() => {
//     if (sortType === SortType.none && sortOrder !== SortOrder.none) {
//       handleSortTypeChange(SortType.price);
//     }
//   }, [sortType, sortOrder, handleSortTypeChange]);

//   return (
//     <div className="catalog-sort">
//       <form action="#">
//         <div className="catalog-sort__inner">
//           <p className="title title--h5">Сортировать:</p>
//           <div className="catalog-sort__type">
//             <div className="catalog-sort__btn-text">
//               <input
//                 type="radio"
//                 id="sortPrice"
//                 name="sort"
//                 checked={sortType === SortType.price}
//                 onChange={() => handleSortTypeChange(SortType.price)}
//               />
//               <label htmlFor="sortPrice">по цене</label>
//             </div>
//             <div className="catalog-sort__btn-text">
//               <input
//                 type="radio"
//                 id="sortPopular"
//                 name="sort"
//                 checked={sortType === SortType.reviewCount}
//                 onChange={() => handleSortTypeChange(SortType.reviewCount)}
//               />
//               <label htmlFor="sortPopular">по популярности</label>
//             </div>
//           </div>
//           <div className="catalog-sort__order">
//             <div className="catalog-sort__btn catalog-sort__btn--up">
//               <input
//                 type="radio"
//                 id="up"
//                 name="sort-icon"
//                 aria-label="По возрастанию"
//                 checked={sortOrder === SortOrder.ascending}
//                 onChange={() => handleSortOrderChange(SortOrder.ascending)}
//               />
//               <label htmlFor="up">
//                 <svg width="16" height="14" aria-hidden="true">
//                   <use xlinkHref="#icon-sort"></use>
//                 </svg>
//               </label>
//             </div>
//             <div className="catalog-sort__btn catalog-sort__btn--down">
//               <input
//                 type="radio"
//                 id="down"
//                 name="sort-icon"
//                 aria-label="По убыванию"
//                 checked={sortOrder === SortOrder.descending}
//                 onChange={() => handleSortOrderChange(SortOrder.descending)}
//               />
//               <label htmlFor="down">
//                 <svg width="16" height="14" aria-hidden="true">
//                   <use xlinkHref="#icon-sort"></use>
//                 </svg>
//               </label>
//             </div>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default CatalogSort;
