const formatDateTime = (date: string): string => {
  // '2024-03-13T07:37:33.866Z' -> '13/03/24 - 19:37'
  const d = new Date(date);
  const year = d.getFullYear().toString().slice(-2);
  const month = (d.getMonth() + 1).toString().padStart(2, '0');
  const day = d.getDate().toString().padStart(2, '0');
  const hour = d.getHours().toString().padStart(2, '0');
  const minute = d.getMinutes().toString().padStart(2, '0');
  return `${day}/${month}/${year} - ${hour}:${minute}`;
};

export { formatDateTime };
