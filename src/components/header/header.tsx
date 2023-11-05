import { Link } from 'react-router-dom';
import SearchForm from '../search-form/search-form';
import { useAppSelector } from '../../hooks';
import { basketSelector } from '../../store/selectors/catalog-selectors';

const Header = () => {
  const basketItems = useAppSelector(basketSelector);
  const basketItemsCount = () => {
    let count = 0;
    basketItems.map((item) => {
      count += item.quantity;
    });
    return count;
  };

  return (
    <header className="header" id="header">
      <div className="container">
        <Link className="header__logo" to="/" aria-label="Переход на главную">
          <svg width="100" height="36" aria-hidden="true">
            <use xlinkHref="#icon-logo"></use>
          </svg>
        </Link>
        <nav className="main-nav header__main-nav">
          <ul className="main-nav__list">
            <li className="main-nav__item">
              <Link className="main-nav__link" to="/">
                Каталог
              </Link>
            </li>
            <li className="main-nav__item">
              <a className="main-nav__link" href="#">
                Гарантии
              </a>
            </li>
            <li className="main-nav__item">
              <a className="main-nav__link" href="#">
                Доставка
              </a>
            </li>
            <li className="main-nav__item">
              <a className="main-nav__link" href="#">
                О компании
              </a>
            </li>
          </ul>
        </nav>
        <SearchForm />
        <Link className="header__basket-link" to="/basket">
          <svg width="16" height="16" aria-hidden="true">
            <use xlinkHref="#icon-basket"></use>
          </svg>
          <span className="header__basket-count">{basketItemsCount()}</span>
        </Link>
      </div>
    </header>
  );
};

export default Header;
