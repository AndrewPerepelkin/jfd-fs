const getTimeFormat = (timestamp) => {
  const date = new Date(parseInt(timestamp));
  const now = new Date();
  const yearDif = now.getFullYear() - date.getFullYear();
  if (yearDif === 0) {
    const dayDif = now.getDate() - date.getDate();
    if (dayDif === 0) {
      const hourDif = now.getHours() - date.getHours();
      if (hourDif === 0) {
        const minutesDif = now.getMinutes() - date.getMinutes();

        if (minutesDif >= 0 && minutesDif < 5) return '1 минуту назад';
        if (minutesDif >= 5 && minutesDif < 10) return '5 минут назад';
        if (minutesDif >= 10 && minutesDif < 30) {
          return '10 минут назад';
        }
        return '30 минут назад';
      }
      return `${date.getHours()}:${date.getMinutes()}`;
    }

    return `${date.getDate()} ${date.toLocaleString('default', {
      month: 'long'
    })}`;
  }
  return (
    date.getFullYear() + '.' + (date.getMonth() + 1) + '.' + date.getDate()
  );
};
export default getTimeFormat;
