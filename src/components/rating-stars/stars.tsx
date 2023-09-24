type Props = {
  rating: number;
};

const Stars = ({ rating }: Props) => {
  const starsTotal = 5;
  const emptyStars = starsTotal - rating;
  return (
    <>
      {Array.from({ length: rating }).map((_, index) => (
        <svg
          width="17"
          height="16"
          aria-hidden="true"
          key={`full-${index + 1}`}
        >
          <use xlinkHref="#icon-full-star"></use>
        </svg>
      ))}

      {Array.from({ length: emptyStars }).map((_, index) => (
        <svg
          width="17"
          height="16"
          aria-hidden="true"
          key={`empty-${index + rating + 1}`}
        >
          <use xlinkHref="#icon-star"></use>
        </svg>
      ))}
    </>
  );
};

export default Stars;
