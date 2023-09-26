import { UseFormRegisterReturn } from 'react-hook-form';

type Props = {
  count: number;
  title: string;
  register: UseFormRegisterReturn;
};

const ReviewStar = ({ count, title, register }: Props) => (
  <>
    <input
      className="visually-hidden"
      id={`star-${count}`}
      type="radio"
      value={count}
      {...register}
    />
    <label className="rate__label" htmlFor={`star-${count}`} title={title} />
  </>
);

export default ReviewStar;
