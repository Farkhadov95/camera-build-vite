export const convertDateFormat = (dateStr: string) => {
  const date = new Date(dateStr);
  const monthNames = [
    'Января', 'Февраля', 'Марта', 'Апреля', 'Мая',
    'Июня', 'Июля', 'Августа', 'Сентября',
    'Октября', 'Ноября', 'Декабря'
  ];
  return `${date.getUTCDate()} ${monthNames[date.getUTCMonth()]}`;
};
