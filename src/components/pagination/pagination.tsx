import PaginationItem from './paginationItem';
import { splitIntoChunks } from '../../utils';
import { PAGES_LIST_SIZE } from '../../const';

type Props = {
  currentPage: number;
  totalPages: number;
  handlePageChange: (pageNumber: number) => void;
};

const Pagination = ({ currentPage, totalPages, handlePageChange }: Props) => {
  const getVisiblePages = () => {
    const arrayOfPages = Array.from({ length: totalPages }, (_, i) => i + 1);
    const pagesOfPages = splitIntoChunks(arrayOfPages, PAGES_LIST_SIZE);
    const pagesToShow = pagesOfPages.filter((subArray) =>
      subArray.includes(currentPage)
    );
    return pagesToShow;
  };

  const handlePageForward = () => {
    handlePageChange(currentPage + 1);
  };

  const handlePageBackward = () => {
    handlePageChange(currentPage - 1);
  };

  const visiblePages = getVisiblePages();

  return (
    <ul className="pagination__list">
      {currentPage > 3 && (
        <li className="pagination__item pagination__item--prev">
          <a
            className="pagination__link pagination__link--text"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handlePageBackward();
            }}
          >
            Назад
          </a>
        </li>
      )}
      {visiblePages[0]?.map((pageNumber) => (
        <PaginationItem
          key={`page-${pageNumber + 1}`}
          currentPage={currentPage}
          pageNumber={pageNumber}
          handlePageChange={handlePageChange}
        />
      ))}
      {currentPage + 1 < totalPages && (
        <li className="pagination__item pagination__item--next">
          <a
            className="pagination__link pagination__link--text"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handlePageForward();
            }}
          >
            Далее
          </a>
        </li>
      )}
    </ul>
  );
};

export default Pagination;
