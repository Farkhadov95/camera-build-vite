type Props = {
  currentPage: number;
  pageNumber: number;
  handlePageChange: (pageNumber: number) => void;
};

const PaginationItem = ({
  currentPage,
  pageNumber,
  handlePageChange,
}: Props) => (
  <li key={pageNumber} className="pagination__item">
    <a
      className={`pagination__link ${
        currentPage === pageNumber ? 'pagination__link--active' : ''
      }`}
      href="#!"
      onClick={(e) => {
        e.preventDefault();
        handlePageChange(pageNumber);
      }}
    >
      {pageNumber}
    </a>
  </li>
);

export default PaginationItem;
