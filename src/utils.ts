export const convertDateFormat = (dateStr: string) => {
  const date = new Date(dateStr);
  const monthNames = [
    'Января', 'Февраля', 'Марта', 'Апреля', 'Мая',
    'Июня', 'Июля', 'Августа', 'Сентября',
    'Октября', 'Ноября', 'Декабря'
  ];
  return `${date.getUTCDate()} ${monthNames[date.getUTCMonth()]}`;
};

export const splitIntoChunks = (array: number[], chunkSize: number) => {
  const chunks = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
};
