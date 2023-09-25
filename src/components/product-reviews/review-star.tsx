import React from 'react';

type Props = {
  count: number;
  title: string;
};

const ReviewStar = ({ count, title }: Props) => (
  <>
    <input
      className="visually-hidden"
      id={`star-${count}`}
      name="rate"
      type="radio"
      value={count}
    />
    <label
      className="rate__label"
      htmlFor={`star-${count}`}
      title={title}
    >
    </label>
  </>
);

export default ReviewStar;
