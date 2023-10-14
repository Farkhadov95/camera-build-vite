const ButtonUp = () => {
  const scrollOnClick = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  return (
    <button className="up-btn" onClick={scrollOnClick}>
      <svg width="12" height="18" aria-hidden="true">
        <use xlinkHref="#icon-arrow2"></use>
      </svg>
    </button>
  );
};

export default ButtonUp;
