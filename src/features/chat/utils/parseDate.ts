const isToday = (date: Date) => {
  const today = new Date();
  return (
    date.getDate() == today.getDate() &&
    date.getMonth() == today.getMonth() &&
    date.getFullYear() == today.getFullYear()
  );
};

export const parseDate = (date?: Date) => {
  if (!date) return '';

  if (isToday(date)) {
    return date.toLocaleTimeString();
  } else {
    return date.toLocaleDateString();
  }
};
