import { Review } from '../../type/reviews';
import { convertDateFormat } from '../../utils';
import Stars from '../rating-stars/stars';

type Props = {
  item: Review;
};

const ReviewCard = ({ item }: Props) => {
  const { userName, createAt, disadvantage, advantage, rating, review } = item;

  return (
    <li className="review-card">
      <div className="review-card__head">
        <p className="title title--h4">{userName}</p>
        <time className="review-card__data" dateTime="2022-04-13">
          {convertDateFormat(createAt)}
        </time>
      </div>
      <div className="rate review-card__rate">
        <Stars rating={rating} />
        <p className="visually-hidden">Оценка: {rating}</p>
      </div>
      <ul className="review-card__list">
        <li className="item-list">
          <span className="item-list__title">Достоинства:</span>
          <p className="item-list__text">{advantage}</p>
        </li>
        <li className="item-list">
          <span className="item-list__title">Недостатки:</span>
          <p className="item-list__text">{disadvantage}</p>
        </li>
        <li className="item-list">
          <span className="item-list__title">Комментарий:</span>
          <p className="item-list__text">{review}</p>
        </li>
      </ul>
    </li>
  );
};

export default ReviewCard;
