type Props = {
  currentPage: number;
  index: number;
  handlePageChange: (page: number) => void;
};

const PaginationItem = ({ currentPage, index, handlePageChange }: Props) => (
  <li key={index} className="pagination__item">
    <a
      className={`pagination__link ${
        currentPage === index + 1 ? 'pagination__link--active' : ''
      }`}
      href="#!"
      onClick={(e) => {
        e.preventDefault();
        handlePageChange(index + 1);
      }}
    >
      {index + 1}
    </a>
  </li>
);

export default PaginationItem;
