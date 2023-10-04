import PaginationItem from './paginationItem';

type Props = {
  currentPage: number;
  totalPages: number;
  handlePageChange: (pageNumber: number) => void;
};

const Pagination = ({ currentPage, totalPages, handlePageChange }: Props) => {
  const getVisiblePages = () => {
    if (currentPage === 1) {
      return [1, 2, 3];
    } else if (currentPage === totalPages) {
      return [totalPages - 2, totalPages - 1, totalPages];
    } else {
      return [currentPage - 1, currentPage, currentPage + 1];
    }
  };

  const visiblePages = getVisiblePages();
  return (
    <ul className="pagination__list">
      {currentPage > 2 && (
        <li className="pagination__item">
          <a
            className="pagination__link pagination__link--text"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(currentPage - 2);
            }}
          >
            Назад
          </a>
        </li>
      )}
      {visiblePages.map((pageNumber) => (
        <PaginationItem
          key={`page-${pageNumber + 1}`}
          currentPage={currentPage}
          pageNumber={pageNumber}
          handlePageChange={handlePageChange}
        />
      ))}
      {currentPage + 1 < totalPages && (
        <li className="pagination__item">
          <a
            className="pagination__link pagination__link--text"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(currentPage + 2);
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
